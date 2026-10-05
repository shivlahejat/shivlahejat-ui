import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TableDemo() {
  return (
    <>
      <Table>
        <TableCaption>Recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            ["INV001", "Paid", "$250.00"],
            ["INV002", "Pending", "$150.00"],
            ["INV003", "Unpaid", "$350.00"],
          ].map(([id, status, amount]) => (
            <TableRow key={id}>
              <TableCell style={{ fontWeight: 500 }}>{id}</TableCell>
              <TableCell>{status}</TableCell>
              <TableCell style={{ textAlign: "right" }}>{amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell style={{ textAlign: "right" }}>$750.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
