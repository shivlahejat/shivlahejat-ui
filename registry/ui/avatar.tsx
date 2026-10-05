"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { styled } from "shivlahejat";
import { theme } from "./theme";

export const Avatar = styled(AvatarPrimitive.Root)({
  base: `
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: ${theme.radius.full};
  `,
  variants: {
    size: {
      sm: "width: 24px; height: 24px; font-size: 11px;",
      default: "width: 32px; height: 32px; font-size: 13px;",
      lg: "width: 40px; height: 40px; font-size: 15px;",
    },
  },
  defaultVariants: { size: "default" },
});

export const AvatarImage = styled(AvatarPrimitive.Image)`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  object-fit: cover;
`;

export const AvatarFallback = styled(AvatarPrimitive.Fallback)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 500;
  color: ${theme.color.mutedForeground};
  background: ${theme.color.muted};
  border-radius: inherit;
`;

/** Overlapping row of avatars: <AvatarGroup><Avatar/>…</AvatarGroup> */
export const AvatarGroup = styled.div`
  display: flex;
  & > * {
    box-shadow: 0 0 0 2px ${theme.color.background};
  }
  & > * + * {
    margin-left: -8px;
  }
`;
