"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { styled, css } from "shivlahejat";
import { theme, focusRing } from "./theme";

/** Shared with ToggleGroupItem. */
export const toggleConfig = {
  base: css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font: inherit;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    color: ${theme.color.foreground};
    background: transparent;
    border: 1px solid transparent;
    border-radius: ${theme.radius.md};
    cursor: pointer;
    transition:
      background-color 150ms,
      color 150ms;
    ${focusRing}
    &:hover {
      background: ${theme.color.muted};
      color: ${theme.color.mutedForeground};
    }
    &[data-state="on"] {
      background: ${theme.color.accent};
      color: ${theme.color.accentForeground};
    }
    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    & svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  `,
  variants: {
    variant: {
      default: "",
      outline: css`
        border-color: ${theme.color.input};
        box-shadow: ${theme.shadow.sm};
        &:hover {
          background: ${theme.color.accent};
          color: ${theme.color.accentForeground};
        }
      `,
    },
    size: {
      default: "height: 36px; min-width: 36px; padding: 0 8px;",
      sm: "height: 32px; min-width: 32px; padding: 0 6px;",
      lg: "height: 40px; min-width: 40px; padding: 0 10px;",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
} as const;

export const Toggle = styled(TogglePrimitive.Root)(toggleConfig);
