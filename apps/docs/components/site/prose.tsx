import Link from "next/link";
import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";

/** Typography for the written guides. */
export const Prose = styled.article`
  min-width: 0;
  max-width: 760px;
  font-size: 15px;
  line-height: 1.7;
  & > * + * {
    margin-top: 16px;
  }
  & h1 {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }
  & h2 {
    margin-top: 40px;
    padding-bottom: 8px;
    font-size: 22px;
    font-weight: 650;
    letter-spacing: -0.02em;
    border-bottom: 1px solid ${theme.color.border};
    scroll-margin-top: 80px;
  }
  & h3 {
    margin-top: 28px;
    font-size: 17px;
    font-weight: 600;
    scroll-margin-top: 80px;
  }
  & p,
  & ul,
  & ol {
    margin-bottom: 0;
  }
  & ul,
  & ol {
    padding-left: 22px;
  }
  & li + li {
    margin-top: 6px;
  }
  & a {
    font-weight: 500;
    color: ${theme.color.foreground};
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  & :not(pre) > code {
    padding: 2px 6px;
    font-family: ${theme.font.mono};
    font-size: 0.86em;
    background: ${theme.color.muted};
    border-radius: ${theme.radius.sm};
  }
  & table {
    width: 100%;
    font-size: 14px;
    border-collapse: collapse;
  }
  & th,
  & td {
    padding: 8px 10px;
    text-align: left;
    vertical-align: top;
    border-bottom: 1px solid ${theme.color.border};
  }
  & th {
    font-weight: 600;
  }
`;

export const Lead = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${theme.color.mutedForeground};
`;

const PagerRow = styled.nav`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 56px !important;
  & a {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 14px;
    font-size: 14px;
    text-decoration: none;
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.radius.md};
  }
  & a:hover {
    background: ${theme.color.accent};
  }
  & a span {
    font-size: 12px;
    font-weight: 400;
    color: ${theme.color.mutedForeground};
  }
  & a:last-child:not(:first-child) {
    margin-left: auto;
    text-align: right;
  }
`;

type PageLink = { title: string; href: string } | undefined;

export function Pager({ prev, next }: { prev: PageLink; next: PageLink }) {
  return (
    <PagerRow aria-label="Pagination">
      {prev && (
        <Link href={prev.href}>
          <span>Previous</span>
          {prev.title}
        </Link>
      )}
      {next && (
        <Link href={next.href} style={{ marginLeft: "auto", textAlign: "right" }}>
          <span>Next</span>
          {next.title}
        </Link>
      )}
    </PagerRow>
  );
}
