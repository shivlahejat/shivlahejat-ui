import { CodeBlock } from "@/components/site/code-block";
import { CommandTabs } from "@/components/site/doc-blocks";
import { Lead, Pager, Prose } from "@/components/site/prose";

export const metadata = { title: "shadcn CLI" };

export default function ShadcnCli() {
  return (
    <Prose>
      <h1>shadcn CLI</h1>
      <Lead>
        The registry follows the shadcn registry format, so if you already use the shadcn CLI you can add
        these components with it too.
      </Lead>

      <h2 id="namespace">Add the @shivlahejat registry</h2>
      <p>
        Run our <code>init</code> first so the theme and the <code>shivlahejat</code> package are in place.
        Then add the registry to your <code>components.json</code>:
      </p>
      <CodeBlock
        lang="json"
        title="components.json"
        code={`{
  "registries": {
    "@shivlahejat": "https://shivlahejat-ui.vercel.app/r/{name}.json"
  }
}`}
      />
      <p>Now add components by name:</p>
      <CommandTabs command="shadcn@latest add @shivlahejat/badge" />

      <h2 id="url">Or use the full URL</h2>
      <p>No configuration needed:</p>
      <CommandTabs command="shadcn@latest add https://shivlahejat-ui.vercel.app/r/badge.json" />
      <p>
        Every component is published at <code>/r/&lt;name&gt;.json</code>, and the list of all of them at{" "}
        <code>/r/index.json</code>. The components each one depends on (for example, Alert Dialog uses Button)
        are listed as full URLs, so they&apos;re added too.
      </p>

      <h2 id="mixing">Using both libraries</h2>
      <p>
        Both put files in <code>components/ui</code> and many names are the same. If your project already has
        shadcn/ui components, put these in another folder with{" "}
        <code>npx shivlahejat-ui add badge --dir components/sl</code>.
      </p>

      <Pager
        prev={{ title: "Styling API", href: "/docs/styled" }}
        next={{ title: "Components", href: "/docs/components" }}
      />
    </Prose>
  );
}
