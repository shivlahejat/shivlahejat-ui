import type { ReactNode } from "react";
import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import { DocsNav } from "@/components/site/docs-nav";
import { components } from "@/lib/registry";
import { guides } from "@/lib/nav";

const Shell = styled.div`
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    padding: 0 16px;
  }
`;

const Aside = styled.aside`
  position: sticky;
  top: 56px;
  height: calc(100svh - 56px);
  overflow-y: auto;
  border-right: 1px solid ${theme.color.border};
  scrollbar-width: thin;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Main = styled.main`
  min-width: 0;
  padding: 32px 0 80px;
`;

export default function DocsLayout({ children }: { children: ReactNode }) {
  const componentLinks = components.map((c) => ({ title: c.title, href: `/docs/components/${c.name}` }));
  return (
    <Shell>
      <Aside>
        <DocsNav guides={guides} components={componentLinks} />
      </Aside>
      <Main>{children}</Main>
    </Shell>
  );
}
