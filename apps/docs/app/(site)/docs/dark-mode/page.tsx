import { CodeBlock } from "@/components/site/code-block";
import { Lead, Pager, Prose } from "@/components/site/prose";

export const metadata = { title: "Dark mode" };

export default function DarkMode() {
  return (
    <Prose>
      <h1>Dark mode</h1>
      <Lead>
        The dark theme switches on when <code>&lt;html&gt;</code> has the <code>dark</code> class or{" "}
        <code>data-theme=&quot;dark&quot;</code>.
      </Lead>

      <h2 id="toggle">A toggle that remembers the choice</h2>
      <p>
        Set the class before the page paints so there&apos;s no flash of the wrong theme, then flip it from a
        button. This follows the system setting until the user picks one.
      </p>
      <CodeBlock
        title="app/layout.tsx"
        code={`const themeScript = \`(function(){try{
  var t = localStorage.getItem("theme");
  var dark = t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", dark);
}catch(e){}})()\`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeStyles />
        {children}
      </body>
    </html>
  );
}`}
      />
      <CodeBlock
        title="components/theme-toggle.tsx"
        code={`"use client";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        const dark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", dark ? "dark" : "light");
      }}
    >
      Toggle theme
    </Button>
  );
}`}
      />

      <h2 id="next-themes">Using next-themes</h2>
      <p>
        If you already use <code>next-themes</code>, set <code>attribute=&quot;class&quot;</code> and it works
        with no other changes.
      </p>

      <h2 id="colors">Changing the dark colors</h2>
      <p>
        Edit the <code>dark</code> object in <code>theme.tsx</code>. It only needs the tokens that differ from
        light mode.
      </p>

      <Pager prev={{ title: "Theming", href: "/docs/theming" }} next={{ title: "CLI", href: "/docs/cli" }} />
    </Prose>
  );
}
