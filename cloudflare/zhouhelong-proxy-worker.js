import { connect } from "cloudflare:sockets";

const ORIGIN = "111.229.225.2";
const PORT = 80;

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    if (incoming.searchParams.get("diag") === "1") {
      return new Response("worker-ok", { status: 200 });
    }
    try {
      return await proxy(request, incoming);
    } catch (err) {
      return new Response("proxy-error: " + err.message, {
        status: 502,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
  },
};

async function proxy(request, incoming) {
  const params = new URLSearchParams(incoming.searchParams);
  params.delete("diag");
  const qs = params.toString();
  const path = incoming.pathname + (qs ? `?${qs}` : "");

  const socket = connect(
    { hostname: ORIGIN, port: PORT },
    { allowHalfOpen: true },
  );
  await socket.opened;

  const reader = socket.readable.getReader();
  const chunks = [];
  const readTask = (async () => {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
  })();

  const encoder = new TextEncoder();
  const writer = socket.writable.getWriter();
  const method = request.method.toUpperCase();
  let bodyBuf = null;
  if (method !== "GET" && method !== "HEAD") {
    bodyBuf = new Uint8Array(await request.arrayBuffer());
  }

  const skip = new Set([
    "host", "connection", "content-length", "transfer-encoding",
    "cf-connecting-ip", "cf-ipcountry", "cf-ray", "cf-visitor", "cf-worker",
    "accept-encoding",
  ]);

  let head = `${method} ${path} HTTP/1.0\r\n`;
  head += `Host: ${ORIGIN}\r\n`;
  head += `Accept-Encoding: identity\r\n`;
  head += `X-Forwarded-Host: ${incoming.hostname}\r\n`;
  head += `X-Forwarded-Proto: https\r\n`;
  const cip = request.headers.get("cf-connecting-ip");
  if (cip) head += `X-Forwarded-For: ${cip}\r\n`;
  for (const [k, v] of request.headers) {
    if (skip.has(k.toLowerCase())) continue;
    head += `${k}: ${v}\r\n`;
  }
  if (bodyBuf) head += `Content-Length: ${bodyBuf.byteLength}\r\n`;
  head += `\r\n`;

  await writer.write(encoder.encode(head));
  if (bodyBuf && bodyBuf.byteLength) await writer.write(bodyBuf);

  const deadline = Date.now() + 25000;
  let headerEnd = -1;
  let contentLength = -1;

  while (Date.now() < deadline) {
    const buf = merge(chunks);
    if (headerEnd < 0) {
      headerEnd = findSep(buf);
      if (headerEnd >= 0) {
        const headerText = new TextDecoder().decode(buf.subarray(0, headerEnd));
        const m = headerText.match(/content-length:\s*(\d+)/i);
        contentLength = m ? parseInt(m[1], 10) : -1;
      }
    }
    if (headerEnd >= 0) {
      const bodyLen = buf.length - (headerEnd + 4);
      if (contentLength >= 0 && bodyLen >= contentLength) break;
      if (contentLength < 0 && bodyLen > 0) {
        await sleep(50);
        if (merge(chunks).length === buf.length) break;
      }
    }
    await sleep(20);
  }

  try { await reader.cancel(); } catch (_) {}
  try { await readTask; } catch (_) {}

  const buf = merge(chunks);
  headerEnd = findSep(buf);
  if (headerEnd < 0) {
    const peek = new TextDecoder().decode(buf.subarray(0, Math.min(200, buf.length)));
    return new Response(`proxy-error: no-sep bytes=${buf.length} peek=${JSON.stringify(peek)}`, { status: 502 });
  }

  const headerText = new TextDecoder().decode(buf.subarray(0, headerEnd));
  let body = buf.subarray(headerEnd + 4);
  const cl = headerText.match(/content-length:\s*(\d+)/i);
  if (cl) {
    const n = parseInt(cl[1], 10);
    if (body.length > n) body = body.subarray(0, n);
  }

  const status = parseInt((headerText.match(/HTTP\/\d(?:\.\d)?\s+(\d+)/) || [])[1] || "502", 10);
  const outHeaders = new Headers();
  for (const line of headerText.split("\r\n").slice(1)) {
    const idx = line.indexOf(":");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    const lk = key.toLowerCase();
    if (["connection", "keep-alive", "transfer-encoding", "content-length"].includes(lk)) continue;
    try { outHeaders.append(key, val); } catch (_) {}
  }
  outHeaders.set("content-length", String(body.byteLength));
  return new Response(body, { status, headers: outHeaders });
}

function merge(chunks) {
  const total = chunks.reduce((n, c) => n + c.byteLength, 0);
  const buf = new Uint8Array(total);
  let o = 0;
  for (const c of chunks) { buf.set(c, o); o += c.byteLength; }
  return buf;
}
function findSep(buf) {
  for (let i = 0; i < buf.length - 3; i++) {
    if (buf[i] === 13 && buf[i + 1] === 10 && buf[i + 2] === 13 && buf[i + 3] === 10) return i;
  }
  return -1;
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
