"use client";

import type { ComponentProps } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { styled, vars } from "shivlahejat";
import { theme } from "./theme";

const Root = styled(ProgressPrimitive.Root)`
  position: relative;
  width: 100%;
  height: 8px;
  overflow: hidden;
  background: color-mix(in srgb, ${theme.color.primary} 18%, transparent);
  border-radius: ${theme.radius.full};
`;

const Indicator = styled(ProgressPrimitive.Indicator)`
  width: 100%;
  height: 100%;
  background: ${theme.color.primary};
  transform: translateX(calc(var(--progress-value, 0) * 1% - 100%));
  transition: transform 300ms ease;
`;

export function Progress({ value, ...props }: ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <Root value={value} {...props}>
      <Indicator style={vars({ "progress-value": value ?? 0 })} />
    </Root>
  );
}
