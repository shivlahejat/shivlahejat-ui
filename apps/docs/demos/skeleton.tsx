import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Skeleton style={{ width: 48, height: 48, borderRadius: 999 }} />
      <div style={{ display: "grid", gap: 8 }}>
        <Skeleton style={{ width: 220, height: 14 }} />
        <Skeleton style={{ width: 170, height: 14 }} />
      </div>
    </div>
  );
}
