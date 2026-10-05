import type { ReactNode } from "react";
import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import { SiteHeader } from "@/components/site/header";
import { GITHUB_URL } from "@/lib/nav";

const Footer = styled.footer`
  padding: 24px;
  font-size: 13px;
  text-align: center;
  color: ${theme.color.mutedForeground};
  border-top: 1px solid ${theme.color.border};
  & a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <Footer>
        Built by shivlahejat. The source code is on{" "}
        <a href={GITHUB_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        .
      </Footer>
    </>
  );
}
