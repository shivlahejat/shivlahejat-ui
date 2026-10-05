"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { styled } from "shivlahejat";
import { theme } from "./theme";
import { Button } from "./button";
import { Input } from "./input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

export type { ColumnDef };

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
`;

const Frame = styled.div`
  overflow: hidden;
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
`;

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 12px;
  font-size: 14px;
  color: ${theme.color.mutedForeground};
`;

const EmptyCell = styled.td`
  height: 96px;
  font-size: 14px;
  text-align: center;
  color: ${theme.color.mutedForeground};
`;

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Column id to filter with the search box. Leave out to hide the search box. */
  filterColumn?: string;
  filterPlaceholder?: string;
  pageSize?: number;
  /** Rows selected via a checkbox column; see selectColumn() below. */
  onRowSelectionChange?: (rows: TData[]) => void;
};

/**
 * Sorting, filtering, pagination and row selection on top of Table, powered by TanStack Table.
 * It's a starting point: copy and extend it (column visibility menus, server-side data…).
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = "Filter…",
  pageSize = 10,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize } },
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      const next = typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(next);
      if (onRowSelectionChange) {
        onRowSelectionChange(
          table
            .getCoreRowModel()
            .rows.filter((r) => next[r.id])
            .map((r) => r.original)
        );
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const filter = filterColumn ? table.getColumn(filterColumn) : undefined;
  const selected = table.getFilteredSelectedRowModel().rows.length;
  const total = table.getFilteredRowModel().rows.length;

  return (
    <div style={{ width: "100%" }}>
      {filter && (
        <Toolbar>
          <Input
            placeholder={filterPlaceholder}
            aria-label={filterPlaceholder}
            value={(filter.getFilterValue() as string) ?? ""}
            onChange={(e) => filter.setFilterValue(e.target.value)}
            style={{ maxWidth: 280 }}
          />
        </Toolbar>
      )}
      <Frame>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <tr>
                <EmptyCell colSpan={columns.length}>No results.</EmptyCell>
              </tr>
            )}
          </TableBody>
        </Table>
      </Frame>
      <Footer>
        <span>{selected > 0 ? `${selected} of ${total} row(s) selected` : `${total} row(s)`}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </Footer>
    </div>
  );
}

const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: -8px;
  padding: 4px 8px;
  font: inherit;
  font-weight: 500;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: ${theme.radius.sm};
  cursor: pointer;
  &:hover {
    background: ${theme.color.accent};
  }
  & svg {
    width: 14px;
    height: 14px;
    opacity: 0.6;
  }
`;

/** Clickable header that toggles sorting: header: ({ column }) => <SortableHeader column={column} title="Email" /> */
export function SortableHeader<TData, TValue>({
  column,
  title,
}: {
  column: Column<TData, TValue>;
  title: string;
}) {
  const dir = column.getIsSorted();
  return (
    <SortButton
      type="button"
      onClick={() => column.toggleSorting(dir === "asc")}
      aria-sort={dir === "asc" ? "ascending" : dir === "desc" ? "descending" : "none"}
    >
      {title}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === "asc" ? (
          <path d="m18 15-6-6-6 6" />
        ) : dir === "desc" ? (
          <path d="m6 9 6 6 6-6" />
        ) : (
          <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
        )}
      </svg>
    </SortButton>
  );
}

const SelectBox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: ${theme.color.primary};
  cursor: pointer;
`;

/** A ready-made checkbox column for row selection. */
export function selectColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => (
      <SelectBox
        type="checkbox"
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        ref={(el) => {
          if (el) el.indeterminate = table.getIsSomePageRowsSelected();
        }}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
      />
    ),
    cell: ({ row }) => (
      <SelectBox
        type="checkbox"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(e.target.checked)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}
