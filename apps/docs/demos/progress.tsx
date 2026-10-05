"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function ProgressDemo() {
  const [value, setValue] = useState(13);
  useEffect(() => {
    const timer = setTimeout(() => setValue(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return <Progress value={value} aria-label="Upload progress" style={{ maxWidth: 320 }} />;
}
