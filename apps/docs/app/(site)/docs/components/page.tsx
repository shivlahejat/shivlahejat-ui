import Link from "next/link";
import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import { Lead, Prose } from "@/components/site/prose";
import { components } from "@/lib/registry";

export const metadata = { title: "Components" };

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  text-decoration: none !important;
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.lg};
  transition:
    background-color 150ms,
    border-color 150ms;
  &:hover {
    background: ${theme.color.accent};
    border-color: ${theme.color.input};
  }
  & strong {
    font-size: 14px;
    font-weight: 600;
    color: ${theme.color.foreground};
  }
  & span {
    font-size: 13px;
    font-weight: 400;
    line-height: 1.45;
    color: ${theme.color.mutedForeground};
  }
`;

export default function ComponentsIndex() {
  return (
    <Prose style={{ maxWidth: "none" }}>
      <h1>Components</h1>
      <Lead>
        {components.length} components, each one a file you copy into your project. Add one with{" "}
        <code>npx shivlahejat-ui add &lt;name&gt;</code>, or all of them with <code>--all</code>.
      </Lead>
      <Grid>
        {components.map((c) => (
          <Card key={c.name} href={`/docs/components/${c.name}`}>
            <strong>{c.title}</strong>
            <span>{c.description}</span>
          </Card>
        ))}
      </Grid>
    </Prose>
  );
}
