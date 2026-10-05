"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import type { NavLink } from "@/lib/nav";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 12px 48px 0;
  font-size: 14px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Heading = styled.div`
  padding: 0 8px 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${theme.color.mutedForeground};
`;

const Item = styled(Link)`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 8px;
  color: ${theme.color.foreground};
  text-decoration: none;
  border-radius: ${theme.radius.md};
  &:hover {
    background: ${theme.color.accent};
  }
  &[aria-current="page"] {
    font-weight: 500;
    background: ${theme.color.accent};
  }
  &:focus-visible {
    outline: 2px solid ${theme.color.ring};
    outline-offset: -2px;
  }
`;

type DocsNavProps = {
  guides: NavLink[];
  components: NavLink[];
  /** Called after a link is followed (used to close the mobile sheet). */
  onNavigate?: () => void;
};

export function DocsNav({ guides, components, onNavigate }: DocsNavProps) {
  const pathname = usePathname();
  const link = (l: NavLink) => (
    <Item
      key={l.href}
      href={l.href}
      aria-current={pathname === l.href ? "page" : undefined}
      onClick={onNavigate}
    >
      {l.title}
    </Item>
  );
  return (
    <Nav aria-label="Documentation">
      <Group>
        <Heading>Getting started</Heading>
        {guides.map(link)}
      </Group>
      <Group>
        <Heading>Components</Heading>
        {link({ title: "All components", href: "/docs/components" })}
        {components.map(link)}
      </Group>
    </Nav>
  );
}
