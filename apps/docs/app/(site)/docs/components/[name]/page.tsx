import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/site/code-block";
import { CommandTabs, ComponentPreview, InstallTabs, Steps } from "@/components/site/doc-blocks";
import { Lead, Pager, Prose } from "@/components/site/prose";
import { demos } from "@/demos";
import { usage } from "@/lib/usage";
import {
  componentSource,
  components,
  demoSource,
  getComponent,
  getNeighbours,
  usageImports,
} from "@/lib/registry";

export function generateStaticParams() {
  return components.map((c) => ({ name: c.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const item = getComponent((await params).name);
  return item ? { title: item.title, description: item.description } : {};
}

/** Packages a component needs, minus the runtime that `init` already installed. */
function npmDeps(deps: string[] = []) {
  return deps.filter((d) => d !== "shivlahejat");
}

export default async function ComponentPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const item = getComponent(name);
  const load = demos[name];
  if (!item || !load) notFound();

  const Demo = (await load()).default;
  const files = componentSource(item);
  const deps = npmDeps(item.dependencies);
  const needs = (item.registryDependencies ?? []).filter((d) => d !== "theme");
  const { prev, next } = getNeighbours(name);
  const link = (c?: { name: string; title: string }) =>
    c && { title: c.title, href: `/docs/components/${c.name}` };

  return (
    <Prose style={{ maxWidth: 860 }}>
      <h1>{item.title}</h1>
      <Lead>{item.description}</Lead>
      {deps.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {deps.map((d) => (
            <Badge key={d} variant="secondary">
              {d.replace(/(?<=.)@.*$/, "")}
            </Badge>
          ))}
        </div>
      )}

      <ComponentPreview code={demoSource(name)}>
        <Demo />
      </ComponentPreview>

      <h2 id="installation">Installation</h2>
      <Tabs defaultValue="cli">
        <TabsList>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="shadcn">shadcn CLI</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="cli">
          <CommandTabs command={`shivlahejat-ui@latest add ${name}`} />
        </TabsContent>
        <TabsContent value="shadcn">
          <CommandTabs command={`shadcn@latest add @shivlahejat/${name}`} />
          <p style={{ marginTop: 12 }}>
            Needs the <code>@shivlahejat</code> registry in your <code>components.json</code>.{" "}
            <Link href="/docs/shadcn">How to set it up</Link>.
          </p>
        </TabsContent>
        <TabsContent value="manual">
          <Steps>
            {deps.length > 0 && (
              <li>
                <h3>Install the dependencies</h3>
                <InstallTabs packages={deps} />
              </li>
            )}
            <li>
              <h3>Copy the source into your project</h3>
              <div style={{ display: "grid", gap: 12 }}>
                {files.map((f) => (
                  <CodeBlock key={f.path} code={f.code} title={f.path} maxHeight={420} />
                ))}
              </div>
            </li>
            {needs.length > 0 && (
              <li>
                <h3>Add the components it uses</h3>
                <p style={{ margin: 0 }}>
                  {needs.map((d, i) => (
                    <span key={d}>
                      {i > 0 && ", "}
                      <Link href={`/docs/components/${d}`}>{getComponent(d)?.title ?? d}</Link>
                    </span>
                  ))}
                  .
                </p>
              </li>
            )}
            <li>
              <h3>Check the import paths</h3>
              <p style={{ margin: 0 }}>
                The files import from <code>./theme</code>, which <Link href="/docs/installation">init</Link>{" "}
                adds. Keep them in the same folder, or update the paths.
              </p>
            </li>
          </Steps>
        </TabsContent>
      </Tabs>

      <h2 id="usage">Usage</h2>
      <CodeBlock code={usage[name]?.imports ?? usageImports(name)} />
      {usage[name] && <CodeBlock code={usage[name].code} />}
      <p>
        Values like <code>&quot;default | outline&quot;</code> list the options; pick one. The{" "}
        <strong>Code</strong> tab above has a complete example, and you can restyle any part by editing the
        copied file or extending it with <code>styled(…)</code>.
      </p>

      <Pager prev={link(prev)} next={link(next)} />
    </Prose>
  );
}
