import { CodeBlock } from "@/components/site/code-block";
import { Lead, Pager, Prose } from "@/components/site/prose";

export const metadata = { title: "Styling API" };

export default function StyledApi() {
  return (
    <Prose>
      <h1>Styling API</h1>
      <Lead>
        The components are written with <code>shivlahejat</code>. If you know styled-components, you already
        know it.
      </Lead>

      <h2 id="styled">styled</h2>
      <p>Works in Server and Client Components. Nesting uses native CSS nesting.</p>
      <CodeBlock
        code={`import styled from "shivlahejat";

const Title = styled.h1\`
  font-size: 48px;
  &:hover {
    color: royalblue;
  }
  @media (max-width: 600px) {
    font-size: 32px;
  }
\`;`}
      />

      <h2 id="variants">Variants</h2>
      <p>Pass an object instead of a template. Variant props are typed and never forwarded to the DOM.</p>
      <CodeBlock
        code={`import { styled, css } from "shivlahejat";

const Button = styled.button({
  base: css\`
    padding: 10px 18px;
    border-radius: 8px;
  \`,
  variants: {
    tone: { primary: "background: blue; color: white;", ghost: "background: none;" },
    size: { sm: "font-size: 14px;", md: "" },
  },
  defaultVariants: { tone: "primary", size: "md" },
});

<Button tone="ghost" size="sm">Save</Button>;`}
      />

      <h2 id="extending">Extending and the as prop</h2>
      <CodeBlock
        code={`const Danger = styled(Button)\`
  background: crimson;
\`; // your overrides always win

<Button as="a" href="/docs">Docs</Button>; // renders an <a>, with <a> props`}
      />

      <h2 id="dynamic">Dynamic values</h2>
      <p>
        Function interpolations like <code>{"${(p) => p.color}"}</code> aren&apos;t supported, because styles
        are generated once and shared between server and client. Use a variant for a fixed set of options, or
        a CSS variable for anything else:
      </p>
      <CodeBlock
        code={`import { styled, vars } from "shivlahejat";

const Bar = styled.div\`
  width: var(--progress);
  background: var(--color, royalblue);
\`;

<Bar style={vars({ progress: "40%", color: "tomato" })} />;`}
      />

      <h2 id="more">Also included</h2>
      <ul>
        <li>
          <code>keyframes</code> for animations, <code>css</code> for reusable chunks of styles.
        </li>
        <li>
          <code>globalStyle</code> for global CSS and <code>createTheme</code> for tokens.
        </li>
        <li>
          <code>Flex</code>, a layout helper with the same props as the common styled-components one.
        </li>
        <li>Styled components can be used as selectors inside other templates.</li>
      </ul>

      <Pager
        prev={{ title: "CLI", href: "/docs/cli" }}
        next={{ title: "shadcn CLI", href: "/docs/shadcn" }}
      />
    </Prose>
  );
}
