import { promises as fs } from "fs";
import path from "path";
import type { QuotaSnapshot } from "@/lib/agent/types";

type QuotaFile = {
  date: string;
  global: number;
  byIp: Record<string, number>;
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function limits() {
  return {
    ipLimit: Number(process.env.AGENT_IP_DAILY_LIMIT || 20),
    globalLimit: Number(process.env.AGENT_GLOBAL_DAILY_LIMIT || 200),
  };
}

function quotaPath() {
  return process.env.AGENT_QUOTA_PATH || path.join("/tmp", "helong-agent-quota.json");
}

async function readFile(): Promise<QuotaFile> {
  const date = todayKey();
  try {
    const raw = await fs.readFile(/*turbopackIgnore: true*/ quotaPath(), "utf8");
    const parsed = JSON.parse(raw) as QuotaFile;
    if (parsed.date !== date) {
      return { date, global: 0, byIp: {} };
    }
    return {
      date: parsed.date,
      global: Number(parsed.global) || 0,
      byIp: parsed.byIp || {},
    };
  } catch {
    return { date, global: 0, byIp: {} };
  }
}

async function writeFile(data: QuotaFile) {
  await fs.writeFile(/*turbopackIgnore: true*/ quotaPath(), JSON.stringify(data), "utf8");
}

export function isLiveLlmEnabled() {
  return Boolean(process.env.LLM_API_KEY?.trim());
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

export async function getQuotaSnapshot(ip: string): Promise<QuotaSnapshot> {
  const { ipLimit, globalLimit } = limits();
  const data = await readFile();
  const ipUsed = data.byIp[ip] || 0;
  return {
    date: data.date,
    ipUsed,
    ipLimit,
    globalUsed: data.global,
    globalLimit,
    liveEnabled: isLiveLlmEnabled(),
    remainingIp: Math.max(0, ipLimit - ipUsed),
    remainingGlobal: Math.max(0, globalLimit - data.global),
  };
}

export async function consumeQuota(ip: string): Promise<
  | { ok: true; quota: QuotaSnapshot }
  | { ok: false; reason: "ip" | "global"; quota: QuotaSnapshot }
> {
  const { ipLimit, globalLimit } = limits();
  const data = await readFile();
  const ipUsed = data.byIp[ip] || 0;

  if (ipUsed >= ipLimit) {
    return {
      ok: false,
      reason: "ip",
      quota: await getQuotaSnapshot(ip),
    };
  }
  if (data.global >= globalLimit) {
    return {
      ok: false,
      reason: "global",
      quota: await getQuotaSnapshot(ip),
    };
  }

  data.byIp[ip] = ipUsed + 1;
  data.global += 1;
  await writeFile(data);

  return { ok: true, quota: await getQuotaSnapshot(ip) };
}
