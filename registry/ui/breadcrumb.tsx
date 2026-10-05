import type { ComponentProps } from "react";
import { styled } from "shivlahejat";
import { theme, focusRing } from "./theme";

export function Breadcrumb(props: ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" {...props} />;
}

export const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  color: ${theme.color.mutedForeground};
  word-break: break-word;
`;

export const BreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

/** Use `as={Link}` for next/link. */
export const BreadcrumbLink = styled.a`
  color: inherit;
  text-decoration: none;
  border-radius: 2px;
  transition: color 150ms;
  &:hover {
    color: ${theme.color.foreground};
  }
  ${focusRing}
`;

export function BreadcrumbPage(props: ComponentProps<"span">) {
  return <Current role="link" aria-disabled="true" aria-current="page" {...props} />;
}

const Current = styled.span`
  font-weight: 400;
  color: ${theme.color.foreground};
`;

const SeparatorItem = styled.li`
  display: inline-flex;
  & > svg {
    width: 14px;
    height: 14px;
  }
`;

export function BreadcrumbSeparator({ children, ...props }: ComponentProps<"li">) {
  return (
    <SeparatorItem role="presentation" aria-hidden="true" {...props}>
      {children ?? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </SeparatorItem>
  );
}

const Ellipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  & > svg {
    width: 16px;
    height: 16px;
  }
`;

export function BreadcrumbEllipsis(props: ComponentProps<"span">) {
  return (
    <Ellipsis role="presentation" aria-hidden="true" {...props}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="1.6" />
        <circle cx="12" cy="12" r="1.6" />
        <circle cx="19" cy="12" r="1.6" />
      </svg>
    </Ellipsis>
  );
}
