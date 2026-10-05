import Link from "next/link";
import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import { components } from "@/lib/registry";
import { guides, GITHUB_URL } from "@/lib/nav";
import { Search } from "./search";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
  background: color-mix(in srgb, ${theme.color.background} 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${theme.color.border};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 1400px;
  height: 56px;
  margin: 0 auto;
  padding: 0 24px;
  @media (max-width: 640px) {
    padding: 0 12px;
    gap: 8px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: ${theme.color.foreground};
  text-decoration: none;
  white-space: nowrap;
`;

const Mark = styled.span`
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  font-size: 13px;
  font-weight: 700;
  color: ${theme.color.primaryForeground};
  background: ${theme.color.primary};
  border-radius: 7px;
`;

const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  & a {
    padding: 6px 10px;
    color: ${theme.color.mutedForeground};
    text-decoration: none;
    border-radius: ${theme.radius.md};
  }
  & a:hover {
    color: ${theme.color.foreground};
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
`;

const IconLink = styled.a`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  color: ${theme.color.foreground};
  border-radius: ${theme.radius.md};
  &:hover {
    background: ${theme.color.accent};
  }
  & svg {
    width: 16px;
    height: 16px;
  }
`;

export function SiteHeader() {
  const componentLinks = components.map((c) => ({ title: c.title, href: `/docs/components/${c.name}` }));
  return (
    <Bar>
      <Inner>
        <MobileOnly>
          <MobileNav guides={guides} components={componentLinks} />
        </MobileOnly>
        <Logo href="/">
          <Mark aria-hidden="true">s</Mark>
          shivlahejat/ui
        </Logo>
        <Links aria-label="Main">
          <Link href="/docs">Docs</Link>
          <Link href="/docs/components">Components</Link>
          <Link href="/docs/theming">Theming</Link>
          <Link href="/docs/cli">CLI</Link>
        </Links>
        <Right>
          <Search guides={guides} components={componentLinks} />
          <IconLink href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="Source code on GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
            </svg>
          </IconLink>
          <ThemeToggle />
        </Right>
      </Inner>
    </Bar>
  );
}
