#!/usr/bin/env node
// Builds one JSON file per component (shadcn registry-item format) so they can
// be installed with our CLI *or* with `npx shadcn add <url>`.
//
//   node scripts/build-registry.mjs [--out apps/docs/public/r] [--base-url https://site.com/r]
//
// --base-url (or REGISTRY_BASE_URL, or Vercel's production URL) turns registryDependencies
// into absolute URLs, which the shadcn CLI needs. Our own CLI understands both names and URLs.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};
const out = resolve(root, flag("--out", "apps/docs/public/r"));
// On Vercel the production URL is known, so the published JSON gets absolute dependency URLs
// (needed by the shadcn CLI) without extra config. REGISTRY_BASE_URL overrides it.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const envBase = process.env.REGISTRY_BASE_URL ?? (vercelUrl ? `https://${vercelUrl}/r` : "");
const baseUrl = flag("--base-url", envBase)?.replace(/\/$/, "");

const manifest = JSON.parse(await readFile(join(root, "registry/registry.json"), "utf8"));
await mkdir(out, { recursive: true });

const index = [];
for (const item of manifest.items) {
  const files = [];
  for (const path of item.files) {
    files.push({ path, type: "registry:ui", content: await readFile(join(root, "registry", path), "utf8") });
  }
  const deps = item.registryDependencies ?? [];
  const json = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: "registry:ui",
    title: item.title,
    description: item.description,
    dependencies: item.dependencies ?? [],
    registryDependencies: baseUrl ? deps.map((d) => `${baseUrl}/${d}.json`) : deps,
    files,
  };
  await writeFile(join(out, `${item.name}.json`), JSON.stringify(json, null, 2) + "\n");
  index.push({ name: item.name, title: item.title, description: item.description });
}
await writeFile(
  join(out, "index.json"),
  JSON.stringify({ name: manifest.name, items: index }, null, 2) + "\n"
);
console.log(`Built ${index.length} registry items → ${out}`);
