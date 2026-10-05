import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import { CodeBlock } from "@/components/site/code-block";
import { Lead, Pager, Prose } from "@/components/site/prose";

export const metadata = { title: "Theming" };

const Swatches = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
`;

const Swatch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
  & > span:first-child {
    height: 44px;
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius.md};
  }
  & code {
    width: fit-content;
  }
`;

const tokens = [
  "background",
  "foreground",
  "primary",
  "secondary",
  "muted",
  "accent",
  "destructive",
  "border",
  "input",
  "ring",
  "card",
  "popover",
  "chart1",
  "chart2",
  "chart3",
  "sidebar",
] as const;

export default function Theming() {
  return (
    <Prose>
      <h1>Theming</h1>
      <Lead>
        Every component reads its colors, radii, fonts and shadows from one file:{" "}
        <code>components/ui/theme.tsx</code>.
      </Lead>

      <h2 id="tokens">Tokens</h2>
      <p>
        <code>createTheme</code> turns an object of values into CSS variables, and gives you typed references
        to them. <code>theme.color.primary</code> is the string <code>var(--color-primary)</code>, so you can
        use it in any styled template.
      </p>
      <CodeBlock
        title="components/ui/theme.tsx"
        code={`const light = {
  color: {
    background: "#ffffff",
    foreground: "#15171c",
    primary: "#2b45d4",
    primaryForeground: "#ffffff",
    // …
  },
  radius: { sm: "6px", md: "8px", lg: "12px", full: "999px" },
};

export const theme = createTheme(light);`}
      />
      <p>Change a value and every component that uses it updates. The current palette:</p>
      <Swatches>
        {tokens.map((t) => (
          <Swatch key={t}>
            <span style={{ background: theme.color[t] }} />
            <code>{t}</code>
          </Swatch>
        ))}
      </Swatches>

      <h2 id="using-tokens">Using tokens in your own components</h2>
      <CodeBlock
        code={`import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";

const Panel = styled.section\`
  padding: 24px;
  background: \${theme.color.card};
  border: 1px solid \${theme.color.border};
  border-radius: \${theme.radius.lg};
\`;`}
      />

      <h2 id="conventions">Conventions</h2>
      <p>
        Colors come in pairs: <code>primary</code> is a background and <code>primaryForeground</code> is the
        text that sits on it. Keep the pairs readable against each other (aim for a contrast ratio of at least
        4.5:1) when you change them.
      </p>
      <table>
        <thead>
          <tr>
            <th>Token</th>
            <th>Used for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>background</code> / <code>foreground</code>
            </td>
            <td>The page and its text.</td>
          </tr>
          <tr>
            <td>
              <code>primary</code>
            </td>
            <td>Main buttons, selected states, focus rings.</td>
          </tr>
          <tr>
            <td>
              <code>muted</code> / <code>mutedForeground</code>
            </td>
            <td>Subtle backgrounds and secondary text.</td>
          </tr>
          <tr>
            <td>
              <code>accent</code>
            </td>
            <td>Hovered and highlighted items in menus and lists.</td>
          </tr>
          <tr>
            <td>
              <code>popover</code> / <code>card</code>
            </td>
            <td>Floating surfaces and cards.</td>
          </tr>
          <tr>
            <td>
              <code>border</code> / <code>input</code> / <code>ring</code>
            </td>
            <td>Dividers, field borders and keyboard focus.</td>
          </tr>
          <tr>
            <td>
              <code>chart1</code>–<code>chart5</code>
            </td>
            <td>Default series colors in Chart.</td>
          </tr>
        </tbody>
      </table>

      <h2 id="adding-tokens">Adding tokens</h2>
      <p>
        Add a key to <code>light</code> (and to <code>dark</code> if it should change in dark mode).{" "}
        <code>theme.color.yourToken</code> is typed straight away.
      </p>

      <Pager
        prev={{ title: "Installation", href: "/docs/installation" }}
        next={{ title: "Dark mode", href: "/docs/dark-mode" }}
      />
    </Prose>
  );
}
