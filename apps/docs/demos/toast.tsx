"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

export default function ToastDemo() {
  return (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event created", {
            description: "Sunday, December 3 at 9:00 AM",
            action: { label: "Undo", onClick: () => {} },
          })
        }
      >
        Show toast
      </Button>
      <Button variant="outline" onClick={() => toast.success("Changes saved")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Couldn't save changes")}>
        Error
      </Button>
    </>
  );
}
