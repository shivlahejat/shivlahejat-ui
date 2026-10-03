"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Flex } from "zerostyled";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <Flex alignItems="center" gap={8}>
      <Switch id="dark-mode" checked={dark} onCheckedChange={setDark} />
      <Label htmlFor="dark-mode">Dark mode</Label>
    </Flex>
  );
}
