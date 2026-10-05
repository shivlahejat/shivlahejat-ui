"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { NavLink } from "@/lib/nav";
import { DocsNav } from "./docs-nav";

/** The docs sidebar in a sheet, for small screens. */
export function MobileNav({ guides, components }: { guides: NavLink[]; components: NavLink[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" style={{ width: 32, height: 32 }}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" style={{ padding: "16px 0 0 16px", gap: 0 }}>
        <SheetTitle style={{ padding: "4px 8px" }}>shivlahejat/ui</SheetTitle>
        <div style={{ overflowY: "auto" }}>
          <DocsNav guides={guides} components={components} onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
