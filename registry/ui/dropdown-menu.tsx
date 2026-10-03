"use client";

import type { ComponentProps } from "react";
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import { styled, css } from "zerostyled";
import { theme, popIn, popOut } from "./theme";

export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;
export const DropdownMenuGroup = MenuPrimitive.Group;
export const DropdownMenuPortal = MenuPrimitive.Portal;

const Content = styled(MenuPrimitive.Content)`
  z-index: 50;
  min-width: 180px;
  max-height: var(--radix-dropdown-menu-content-available-height);
  overflow-y: auto;
  padding: 4px;
  background: ${theme.color.popover};
  color: ${theme.color.popoverForeground};
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadow.md};
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  &[data-state="open"] {
    animation: ${popIn} 120ms ease-out;
  }
  &[data-state="closed"] {
    animation: ${popOut} 100ms ease-in;
  }
`;

export function DropdownMenuContent({
  sideOffset = 6,
  ...props
}: ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPrimitive.Portal>
      <Content sideOffset={sideOffset} {...props} />
    </MenuPrimitive.Portal>
  );
}

export const DropdownMenuItem = styled(MenuPrimitive.Item)({
  base: css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    font-size: 14px;
    border-radius: ${theme.radius.sm};
    cursor: default;
    user-select: none;
    outline: none;
    &[data-highlighted] {
      background: ${theme.color.accent};
      color: ${theme.color.accentForeground};
    }
    &[data-disabled] {
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
      destructive: css`
        color: ${theme.color.destructive};
        &[data-highlighted] {
          color: ${theme.color.destructive};
          background: color-mix(in srgb, ${theme.color.destructive} 12%, transparent);
        }
      `,
    },
  },
  defaultVariants: { variant: "default" },
});

export const DropdownMenuLabel = styled(MenuPrimitive.Label)`
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${theme.color.mutedForeground};
`;

export const DropdownMenuSeparator = styled(MenuPrimitive.Separator)`
  height: 1px;
  margin: 4px -4px;
  background: ${theme.color.border};
`;

export const DropdownMenuShortcut = styled.span`
  margin-left: auto;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: ${theme.color.mutedForeground};
`;
