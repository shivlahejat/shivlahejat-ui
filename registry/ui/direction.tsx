"use client";

import type { ReactNode } from "react";
import { DirectionProvider as RadixDirectionProvider, useDirection } from "@radix-ui/react-direction";

export { useDirection };

/**
 * Sets text direction for every Radix-based component inside (menus, sliders, tabs…).
 * Also set dir="rtl" on <html> so the browser lays out text and CSS logical properties correctly.
 */
export function DirectionProvider({ dir, children }: { dir: "ltr" | "rtl"; children: ReactNode }) {
  return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>;
}
