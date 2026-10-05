import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Server-only helpers that read the registry and source files at build time. */

export type RegistryItem = {
  name: string;
  title: string;
  description: string;
  files: string[];
  dependencies?: string[];
  registryDependencies?: string[];
};

const docsRoot = process.cwd();
const repoRoot = join(docsRoot, "../..");

const manifest = JSON.parse(readFileSync(join(repoRoot, "registry/registry.json"), "utf8")) as {
  items: RegistryItem[];
};

/** Every component, alphabetically (the theme is set up by `init`, so it isn't listed). */
export const components: RegistryItem[] = manifest.items
  .filter((i) => i.name !== "theme")
  .sort((a, b) => a.title.localeCompare(b.title));

export function getComponent(name: string) {
  return components.find((c) => c.name === name);
}

export function getNeighbours(name: string) {
  const i = components.findIndex((c) => c.name === name);
  return { prev: components[i - 1], next: components[i + 1] };
}

/** The component source exactly as `add` would copy it. */
export function componentSource(item: RegistryItem) {
  return item.files.map((f) => ({
    path: "components/" + f,
    code: readFileSync(join(repoRoot, "registry", f), "utf8"),
  }));
}

/** Where each demo's code lives. The sidebar demo is a whole page. */
export function demoSource(name: string) {
  const file = name === "sidebar" ? "app/examples/sidebar/page.tsx" : `demos/${name}.tsx`;
  return readFileSync(join(docsRoot, file), "utf8");
}

/** The import line(s) a user writes, taken from the demo itself. */
export function usageImports(name: string) {
  const demo = readFileSync(join(docsRoot, `demos/${name}.tsx`), "utf8");
  const re = new RegExp(`import \\{[^}]*\\} from "@/components/ui/${name}";`, "s");
  const match = demo.match(re)?.[0];
  return match ?? `import * as UI from "@/components/ui/${name}";`;
}
