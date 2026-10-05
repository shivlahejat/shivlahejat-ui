import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Spinner />
      <Spinner style={{ width: 24, height: 24 }} />
      <Button disabled>
        <Spinner /> Saving
      </Button>
    </div>
  );
}
