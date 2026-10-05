"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { styled } from "shivlahejat";
import { theme } from "@/components/ui/theme";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import type { NavLink } from "@/lib/nav";

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 240px;
  height: 32px;
  padding: 0 6px 0 12px;
  font: inherit;
  font-size: 13px;
  color: ${theme.color.mutedForeground};
  background: ${theme.color.muted};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  cursor: pointer;
  &:hover {
    color: ${theme.color.foreground};
  }
  @media (max-width: 900px) {
    width: 32px;
    padding: 0;
    justify-content: center;
    & > span,
    & > kbd {
      display: none;
    }
  }
  & > svg {
    display: none;
    width: 16px;
    height: 16px;
  }
  @media (max-width: 900px) {
    & > svg {
      display: block;
    }
  }
`;

/** ⌘K / Ctrl+K palette over every guide and component. */
export function Search({ guides, components }: { guides: NavLink[]; components: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isTyping(e))) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Trigger type="button" onClick={() => setOpen(true)} aria-label="Search documentation">
        <span>Search documentation…</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </Trigger>
      <CommandDialog open={open} onOpenChange={setOpen} title="Search documentation">
        <CommandInput placeholder="Search guides and components…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Guides">
            {guides.map((g) => (
              <CommandItem key={g.href} value={g.title} onSelect={() => go(g.href)}>
                {g.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Components">
            {components.map((c) => (
              <CommandItem key={c.href} value={c.title} onSelect={() => go(c.href)}>
                {c.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

function isTyping(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null;
  return !!el && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName));
}
