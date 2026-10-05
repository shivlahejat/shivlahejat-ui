import Link from "next/link";
import { Lead, Pager, Prose } from "@/components/site/prose";
import { components } from "@/lib/registry";

export const metadata = { title: "Introduction" };

export default function Introduction() {
  return (
    <Prose>
      <h1>Introduction</h1>
      <Lead>
        A set of accessible components for Next.js that you copy into your own project, written with a
        styled-components API instead of utility classes.
      </Lead>

      <p>
        This is not a package you install and import from <code>node_modules</code>. The CLI copies each
        component&apos;s source file into your app, so you can read it, change it and keep it. The only
        package your app depends on is <code>shivlahejat</code>, the small styling runtime the components use.
      </p>

      <h2 id="why">Why another component collection?</h2>
      <p>
        styled-components is pleasant to write, but in the App Router it needs a server style registry,
        compiler configuration and <code>&quot;use client&quot;</code> on every file that styles something,
        and it can&apos;t run in Server Components at all. <code>shivlahejat</code> keeps the same{" "}
        <code>styled.div`…`</code> API and removes all of that:
      </p>
      <ul>
        <li>
          <strong>No setup.</strong> No registry, no Babel or SWC plugin, no changes to{" "}
          <code>next.config</code>.
        </li>
        <li>
          <strong>Server Components.</strong> Static components such as Button, Card and Table render with no
          client JavaScript. Style tags are hoisted and de-duplicated by React 19 itself.
        </li>
        <li>
          <strong>Typed variants.</strong> <code>variant=&quot;outline&quot;</code> and{" "}
          <code>size=&quot;sm&quot;</code> are checked by TypeScript and never reach the DOM.
        </li>
        <li>
          <strong>Themeable.</strong> Every color, radius and shadow is a token in one file,{" "}
          <code>theme.tsx</code>, with a dark theme included.
        </li>
      </ul>

      <h2 id="whats-included">What&apos;s included</h2>
      <p>
        {components.length} components, from Button and Dialog to Data Table, Sidebar, Calendar and chat
        building blocks. Interactive ones are built on Radix (and on cmdk, vaul, sonner, embla and
        react-day-picker where those are the better fit), so keyboard navigation, focus management and screen
        reader support come included. <Link href="/docs/components">See them all</Link>.
      </p>

      <h2 id="faq">FAQ</h2>
      <h3>Can I use it with the shadcn CLI?</h3>
      <p>
        Yes. The registry uses the same JSON format, so <code>npx shadcn add</code> with one of our component
        URLs works too. See <Link href="/docs/shadcn">shadcn CLI</Link>.
      </p>
      <h3>Do I need Tailwind?</h3>
      <p>No. Nothing here uses Tailwind, and it won&apos;t conflict with it if your app already has it.</p>
      <h3>What versions does it support?</h3>
      <p>React 19 and Next.js 15 or newer. The runtime depends on React 19&apos;s style hoisting.</p>

      <Pager prev={undefined} next={{ title: "Installation", href: "/docs/installation" }} />
    </Prose>
  );
}
