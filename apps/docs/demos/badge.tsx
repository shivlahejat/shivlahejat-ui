import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <>
      <Badge>Live</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="outline">Archived</Badge>
      <Badge variant="destructive">Failed</Badge>
    </>
  );
}
