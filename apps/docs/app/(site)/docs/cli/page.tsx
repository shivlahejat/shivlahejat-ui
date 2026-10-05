import { CodeBlock } from "@/components/site/code-block";
import { CommandTabs } from "@/components/site/doc-blocks";
import { Lead, Pager, Prose } from "@/components/site/prose";

export const metadata = { title: "CLI" };

export default function Cli() {
  return (
    <Prose>
      <h1>CLI</h1>
      <Lead>
        <code>shivlahejat-ui</code> sets up your project and copies components into it.
      </Lead>

      <h2 id="init">init</h2>
      <p>
        Writes <code>shivlahejat-ui.json</code>, copies <code>theme.tsx</code> and installs{" "}
        <code>shivlahejat</code>.
      </p>
      <CommandTabs command="shivlahejat-ui@latest init" />

      <h2 id="add">add</h2>
      <p>
        Copies components and the components they use, then installs any npm packages you don&apos;t have yet,
        using the package manager your lockfile points to.
      </p>
      <CommandTabs command="shivlahejat-ui@latest add dialog select" />
      <CommandTabs command="shivlahejat-ui@latest add --all" />
      <p>
        Files you already have are never replaced unless you pass <code>--overwrite</code>, so your edits are
        safe.
      </p>

      <h2 id="list">list</h2>
      <p>Shows every component with a short description.</p>
      <CommandTabs command="shivlahejat-ui@latest list" />

      <h2 id="options">Options</h2>
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>--dir &lt;path&gt;</code>
            </td>
            <td>
              Where to write components. Default: <code>components/ui</code>, or{" "}
              <code>src/components/ui</code> when there&apos;s a <code>src</code> folder.
            </td>
          </tr>
          <tr>
            <td>
              <code>--overwrite</code>
            </td>
            <td>Replace files that already exist.</td>
          </tr>
          <tr>
            <td>
              <code>--no-install</code>
            </td>
            <td>Print the install command instead of running it.</td>
          </tr>
          <tr>
            <td>
              <code>--registry &lt;url|dir&gt;</code>
            </td>
            <td>Load components from another registry (a URL or a local folder).</td>
          </tr>
          <tr>
            <td>
              <code>--quiet</code>
            </td>
            <td>Only print errors.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="config">shivlahejat-ui.json</h2>
      <p>
        <code>init</code> saves your choices so later commands reuse them:
      </p>
      <CodeBlock
        lang="json"
        code={`{
  "dir": "components/ui",
  "registry": "https://shivlahejat-ui.vercel.app/r"
}`}
      />

      <Pager
        prev={{ title: "Dark mode", href: "/docs/dark-mode" }}
        next={{ title: "Styling API", href: "/docs/styled" }}
      />
    </Prose>
  );
}
