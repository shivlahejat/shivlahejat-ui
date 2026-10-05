import type { ComponentProps } from "react";
import { styled } from "shivlahejat";
import { theme } from "./theme";

const Container = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
`;

const Root = styled.table`
  width: 100%;
  font-size: 14px;
  caption-side: bottom;
  border-collapse: collapse;
`;

/** Scrolls horizontally on small screens. */
export function Table(props: ComponentProps<"table">) {
  return (
    <Container>
      <Root {...props} />
    </Container>
  );
}

export const TableHeader = styled.thead`
  & tr {
    border-bottom: 1px solid ${theme.color.border};
  }
`;

export const TableBody = styled.tbody`
  & tr:last-child {
    border-bottom: 0;
  }
`;

export const TableFooter = styled.tfoot`
  font-weight: 500;
  background: color-mix(in srgb, ${theme.color.muted} 50%, transparent);
  border-top: 1px solid ${theme.color.border};
  & > tr:last-child {
    border-bottom: 0;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.color.border};
  transition: background-color 150ms;
  &:hover {
    background: color-mix(in srgb, ${theme.color.muted} 50%, transparent);
  }
  &[data-state="selected"] {
    background: ${theme.color.muted};
  }
`;

export const TableHead = styled.th`
  height: 40px;
  padding: 0 8px;
  font-weight: 500;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
  color: ${theme.color.foreground};
`;

export const TableCell = styled.td`
  padding: 8px;
  vertical-align: middle;
  white-space: nowrap;
`;

export const TableCaption = styled.caption`
  margin-top: 16px;
  font-size: 14px;
  color: ${theme.color.mutedForeground};
`;
