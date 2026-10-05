"use client";

import type { ComponentProps, CSSProperties } from "react";
import { Toaster as Sonner, toast } from "sonner";
import { theme } from "./theme";

export { toast };

/**
 * Render once in your root layout, then call toast("Saved") from anywhere.
 * Built on sonner and themed with your tokens, so it follows light and dark mode.
 */
export function Toaster(props: ComponentProps<typeof Sonner>) {
  return (
    <Sonner
      style={
        {
          "--normal-bg": theme.color.popover,
          "--normal-text": theme.color.popoverForeground,
          "--normal-border": theme.color.border,
          "--border-radius": theme.radius.md,
          "--font-family": theme.font.sans,
        } as CSSProperties
      }
      toastOptions={{ style: { fontFamily: theme.font.sans, boxShadow: theme.shadow.md } }}
      {...props}
    />
  );
}
