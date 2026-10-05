"use client";

import { Badge } from "@/components/ui/badge";
import { type ColumnDef, DataTable, SortableHeader, selectColumn } from "@/components/ui/data-table";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const payments: Payment[] = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@example.com" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "abe45@example.com" },
  { id: "derv1ws0", amount: 837, status: "processing", email: "monserrat44@example.com" },
  { id: "5kma53ae", amount: 874, status: "success", email: "silas22@example.com" },
  { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@example.com" },
  { id: "p0r8sd2k", amount: 150, status: "pending", email: "lena@example.com" },
  { id: "w1x2y3z4", amount: 499, status: "success", email: "omar@example.com" },
];

const columns: ColumnDef<Payment>[] = [
  selectColumn<Payment>(),
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const s = row.original.status;
      return (
        <Badge variant={s === "failed" ? "destructive" : s === "success" ? "secondary" : "outline"}>
          {s}
        </Badge>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
  },
  {
    accessorKey: "amount",
    header: () => <div style={{ textAlign: "right" }}>Amount</div>,
    cell: ({ row }) => (
      <div style={{ textAlign: "right", fontWeight: 500 }}>
        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(row.original.amount)}
      </div>
    ),
  },
];

export default function DataTableDemo() {
  return (
    <DataTable
      columns={columns}
      data={payments}
      filterColumn="email"
      filterPlaceholder="Filter emails…"
      pageSize={5}
    />
  );
}
