#!/usr/bin/env node
/** 驗證所有 Google Maps / Tour 連結 HTTP 狀態 */
import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "../src");

function extractUrls(content) {
  const urls = new Set();
  const re = /https?:\/\/[^\s"'`,\)]+/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    let u = m[0].replace(/\\$/, "");
    if (u.endsWith(")")) u = u.slice(0, -1);
    if (u.includes("${") || u.includes("staticmap.openstreetmap")) continue;
    urls.add(u);
  }
  return [...urls];
}

function collectFiles(dir) {
  const files = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...collectFiles(p));
    else if (/\.(js|jsx)$/.test(e.name)) files.push(p);
  }
  return files;
}

const allUrls = new Set();
for (const f of collectFiles(SRC)) {
  extractUrls(readFileSync(f, "utf8")).forEach((u) => allUrls.add(u));
}

const results = [];
for (const url of allUrls) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(12000) });
    results.push({ url, status: res.status, ok: res.ok });
    console.log(res.ok ? "✓" : "✗", res.status, url.slice(0, 80));
  } catch (e) {
    results.push({ url, status: "ERR", ok: false, error: e.message });
    console.log("✗ ERR", url.slice(0, 80), e.message);
  }
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length} URLs, ${failed.length} failed`);
process.exit(failed.length > 0 ? 1 : 0);
