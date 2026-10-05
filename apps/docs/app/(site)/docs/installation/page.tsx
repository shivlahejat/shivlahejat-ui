import Link from "next/link";
import { CodeBlock } from "@/components/site/code-block";
import { CommandTabs, Steps } from "@/components/site/doc-blocks";
import { Lead, Pager, Prose } from "@/components/site/prose";

export const metadata = { title: "Installation" };

export default function Installation() {
  return (
    <Prose>
      <h1>Installation</h1>
      <Lead>Add the theme and your first components to a Next.js app.</Lead>

      <Steps>
        <li>
          <h3>Create a project</h3>
          <p>Skip this if you already have a Next.js 15+ app using the App Router.</p>
          <CommandTabs command="create-next-app@latest my-app" />
        </li>
        <li>
          <h3>Run init</h3>
          <p>
            This creates <code>shivlahejat-ui.json</code>, copies <code>components/ui/theme.tsx</code> and
            installs the <code>shivlahejat</code> runtime. Projects with a <code>src/</code> folder get{" "}
            <code>src/components/ui</code> instead.
          </p>
          <CommandTabs command="shivlahejat-ui@latest init" />
        </li>
        <li>
          <h3>Render the theme once</h3>
          <p>Add the theme&apos;s styles to your root layout.</p>
          <CodeBlock
            title="app/layout.tsx"
            code={`import { ThemeStyles } from "@/components/ui/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeStyles />
        {children}
      </body>
    </html>
  );
}`}
          />
        </li>
        <li>
          <h3>Add components</h3>
          <CommandTabs command="shivlahejat-ui@latest add button card dialog" />
          <p>Then use them anywhere, including Server Components:</p>
          <CodeBlock
            title="app/page.tsx"
            code={`import { Button } from "@/components/ui/button";

export default function Home() {
  return <Button>Click me</Button>;
}`}
          />
        </li>
      </Steps>

      <h2 id="import-alias">Import alias</h2>
      <p>
        The examples import from <code>@/components/ui/…</code>. <code>create-next-app</code> sets up the{" "}
        <code>@/*</code> alias for you; in an older project add it to <code>tsconfig.json</code>:
      </p>
      <CodeBlock
        lang="json"
        code={`{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}`}
      />
      <p>
        Next, <Link href="/docs/theming">change the colors</Link> or{" "}
        <Link href="/docs/components">browse the components</Link>.
      </p>

      <Pager
        prev={{ title: "Introduction", href: "/docs" }}
        next={{ title: "Theming", href: "/docs/theming" }}
      />
    </Prose>
  );
}
