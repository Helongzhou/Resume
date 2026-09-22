/**
 * Edge proxy: bypass Tencent 未备案 Host intercept (IP Host + sockets).
 * Fully buffers HTTP responses including chunked Transfer-Encoding.
 */
import { connect } from "cloudflare:sockets";

const ORIGIN_IP = "111.229.225.2";

/** @type {Record<string, number>} */
const PORTS = {
  "zhouhelong.icedew.online": 80,
  // Public ports terminate on nginx which rewrites Host → real domain
  "dtc.icedew.online": 3000,
  "dtc-vendor.icedew.online": 5174,
  "dtc-channel.icedew.online": 5276,
  "dtc-api.icedew.online": 9000,
};

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    if (incoming.searchParams.get("diag") === "1") {
      const port = PORTS[incoming.hostname] ?? "none";
      return new Response(`worker-ok host=${incoming.hostname} port=${port}`, {
        status: 200,
      });
    }

    const port = PORTS[incoming.hostname];
    if (!port) {
      return new Response(`no route for host: ${incoming.hostname}`, {
        status: 404,
      });
    }

    const method = request.method.toUpperCase();
    let bodyBuf = null;
    if (method !== "GET" && method !== "HEAD") {
      bodyBuf = new Uint8Array(await request.arrayBuffer());
    }

    // Empty RST / no-sep is intermittent on some origin ports — retry idempotent GETs.
    const maxAttempts = method === "GET" || method === "HEAD" ? 3 : 1;
    let lastErr = null;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await proxy(request, incoming, port, method, bodyBuf);
      } catch (err) {
        lastErr = err;
        const msg = err && err.message ? String(err.message) : String(err);
        const retryable =
          msg.includes("no-sep") ||
          msg.includes("reset") ||
          msg.includes("closed") ||
          msg.includes("Network connection lost") ||
          msg.includes("Connection refused");
        if (!retryable || attempt === maxAttempts) break;
        await sleep(80 * attempt);
      }
    }
    return new Response("proxy-error: " + (lastErr && lastErr.message ? lastErr.message : String(lastErr)), {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};

async function proxy(request, incoming, port, method, bodyBuf) {
  const params = new URLSearchParams(incoming.searchParams);
  params.delete("diag");
  const qs = params.toString();
  const path = incoming.pathname + (qs ? `?${qs}` : "");

  const socket = connect(
    { hostname: ORIGIN_IP, port },
    { allowHalfOpen: true },
  );
  await socket.opened;

  const reader = socket.readable.getReader();
  const encoder = new TextEncoder();
  const writer = socket.writable.getWriter();

  const skip = new Set([
    "host",
    "connection",
    "content-length",
    "transfer-encoding",
    "cf-connecting-ip",
    "cf-ipcountry",
    "cf-ray",
    "cf-visitor",
    "cf-worker",
    "accept-encoding",
    // Never forward these — CF may already set them; duplicates become "https, https"
    "x-forwarded-proto",
    "x-forwarded-host",
    "x-forwarded-for",
  ]);

  let head = `${method} ${path} HTTP/1.1\r\n`;
  head += `Host: ${ORIGIN_IP}\r\n`;
  head += `Accept-Encoding: identity\r\n`;
  head += `Connection: close\r\n`;
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
  // Do NOT writer.close() — aborts CF socket before response.

  // Read only until response headers, then stream the body (large JS bundles
  // blow Worker CPU if fully buffered).
  let pending = new Uint8Array(0);
  let headerEnd = -1;
  const headerDeadline = Date.now() + 20000;
  while (headerEnd < 0 && Date.now() < headerDeadline) {
    const { done, value } = await reader.read();
    if (done) break;
    pending = concat(pending, value);
    headerEnd = findSep(pending);
  }
  if (headerEnd < 0) {
    const peek = new TextDecoder().decode(pending.subarray(0, Math.min(200, pending.length)));
    throw new Error(`no-sep bytes=${pending.length} peek=${JSON.stringify(peek)}`);
  }

  const headerText = new TextDecoder().decode(pending.subarray(0, headerEnd));
  const prelude = pending.subarray(headerEnd + 4);
  const status = parseInt(
    (headerText.match(/HTTP\/\d(?:\.\d)?\s+(\d+)/) || [])[1] || "502",
    10,
  );
  const clMatch = headerText.match(/content-length:\s*(\d+)/i);
  const contentLength = clMatch ? parseInt(clMatch[1], 10) : -1;
  const isChunked = /transfer-encoding:\s*chunked/i.test(headerText);

  const outHeaders = new Headers();
  for (const line of headerText.split("\r\n").slice(1)) {
    const idx = line.indexOf(":");
    if (idx < 0) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    const lk = key.toLowerCase();
    if (
      ["connection", "keep-alive", "transfer-encoding", "content-length"].includes(
        lk,
      )
    ) {
      continue;
    }
    try {
      outHeaders.append(key, val);
    } catch (_) {}
  }

  if (contentLength >= 0 && !isChunked) {
    outHeaders.set("content-length", String(contentLength));
    let sent = 0;
    const stream = new ReadableStream({
      async pull(controller) {
        if (sent === 0 && prelude.byteLength) {
          const n = Math.min(prelude.byteLength, contentLength);
          controller.enqueue(prelude.subarray(0, n));
          sent = n;
          if (sent >= contentLength) {
            controller.close();
            try { await reader.cancel(); } catch (_) {}
          }
          return;
        }
        if (sent >= contentLength) {
          controller.close();
          return;
        }
        const { done, value } = await reader.read();
        if (done || !value) {
          controller.close();
          return;
        }
        const need = contentLength - sent;
        if (value.byteLength <= need) {
          controller.enqueue(value);
          sent += value.byteLength;
        } else {
          controller.enqueue(value.subarray(0, need));
          sent += need;
        }
        if (sent >= contentLength) {
          controller.close();
          try { await reader.cancel(); } catch (_) {}
        }
      },
    });
    return new Response(stream, { status, headers: outHeaders });
  }

  // Chunked / unknown length: buffer (storefront HTML is small enough).
  const chunks = prelude.byteLength ? [prelude] : [];
  const deadline = Date.now() + 25000;
  while (Date.now() < deadline) {
    const buf = merge(chunks);
    if (isChunked && chunkedComplete(buf)) break;
    if (!isChunked && buf.byteLength > 0) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      continue;
    }
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    if (!isChunked && chunks.reduce((n, c) => n + c.byteLength, 0) > 8) {
      // keep reading until socket closes (handled by done)
    }
  }
  let body = merge(chunks);
  if (isChunked) body = decodeChunked(body);
  outHeaders.set("content-length", String(body.byteLength));
  return new Response(body, { status, headers: outHeaders });
}

function concat(a, b) {
  const out = new Uint8Array(a.byteLength + b.byteLength);
  out.set(a, 0);
  out.set(b, a.byteLength);
  return out;
}

function merge(chunks) {
  const total = chunks.reduce((n, c) => n + c.byteLength, 0);
  const buf = new Uint8Array(total);
  let o = 0;
  for (const c of chunks) {
    buf.set(c, o);
    o += c.byteLength;
  }
  return buf;
}

function findSep(buf) {
  for (let i = 0; i < buf.length - 3; i++) {
    if (
      buf[i] === 13 &&
      buf[i + 1] === 10 &&
      buf[i + 2] === 13 &&
      buf[i + 3] === 10
    ) {
      return i;
    }
  }
  return -1;
}

function chunkedComplete(buf) {
  // Walk chunks; complete when we see a 0-size chunk
  let i = 0;
  const dec = new TextDecoder();
  while (i < buf.length) {
    let lineEnd = i;
    while (
      lineEnd + 1 < buf.length &&
      !(buf[lineEnd] === 13 && buf[lineEnd + 1] === 10)
    ) {
      lineEnd++;
    }
    if (lineEnd + 1 >= buf.length) return false;
    const sizeLine = dec.decode(buf.subarray(i, lineEnd)).split(";")[0].trim();
    if (!/^[0-9a-fA-F]+$/.test(sizeLine)) return false;
    const size = parseInt(sizeLine, 16);
    i = lineEnd + 2;
    if (size === 0) return true;
    if (i + size + 2 > buf.length) return false;
    i += size + 2; // data + CRLF
  }
  return false;
}

function decodeChunked(buf) {
  const out = [];
  let i = 0;
  const dec = new TextDecoder();
  while (i < buf.length) {
    let lineEnd = i;
    while (
      lineEnd + 1 < buf.length &&
      !(buf[lineEnd] === 13 && buf[lineEnd + 1] === 10)
    ) {
      lineEnd++;
    }
    if (lineEnd + 1 >= buf.length) break;
    const size = parseInt(
      dec.decode(buf.subarray(i, lineEnd)).split(";")[0].trim(),
      16,
    );
    i = lineEnd + 2;
    if (!size) break;
    if (i + size > buf.length) {
      out.push(buf.subarray(i));
      break;
    }
    out.push(buf.subarray(i, i + size));
    i += size + 2;
  }
  if (!out.length) return buf;
  const total = out.reduce((n, c) => n + c.byteLength, 0);
  const merged = new Uint8Array(total);
  let o = 0;
  for (const c of out) {
    merged.set(c, o);
    o += c.byteLength;
  }
  return merged;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
