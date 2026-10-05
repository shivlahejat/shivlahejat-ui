import type { ComponentProps } from "react";
import { styled } from "shivlahejat";
import { Button } from "./button";

export function Pagination(props: ComponentProps<"nav">) {
  return <Nav role="navigation" aria-label="pagination" {...props} />;
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const PaginationContent = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const PaginationItem = styled.li``;

type PaginationLinkProps = ComponentProps<"a"> & {
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
};

/** A link styled as a Button. Pass `isActive` for the current page. */
export function PaginationLink({ isActive, size = "icon", ...props }: PaginationLinkProps) {
  return (
    <Button
      as="a"
      aria-current={isActive ? "page" : undefined}
      variant={isActive ? "outline" : "ghost"}
      size={size}
      {...props}
    />
  );
}

const chevron = (d: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

export function PaginationPrevious({ children = "Previous", ...props }: ComponentProps<"a">) {
  return (
    <PaginationLink aria-label="Go to previous page" size="default" style={{ paddingLeft: 10 }} {...props}>
      {chevron("m15 18-6-6 6-6")}
      <span>{children}</span>
    </PaginationLink>
  );
}

export function PaginationNext({ children = "Next", ...props }: ComponentProps<"a">) {
  return (
    <PaginationLink aria-label="Go to next page" size="default" style={{ paddingRight: 10 }} {...props}>
      <span>{children}</span>
      {chevron("m9 18 6-6-6-6")}
    </PaginationLink>
  );
}

const Ellipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  & > svg {
    width: 16px;
    height: 16px;
  }
`;

export function PaginationEllipsis(props: ComponentProps<"span">) {
  return (
    <Ellipsis aria-hidden="true" {...props}>
      <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="1.6" />
        <circle cx="12" cy="12" r="1.6" />
        <circle cx="19" cy="12" r="1.6" />
      </svg>
    </Ellipsis>
  );
}
