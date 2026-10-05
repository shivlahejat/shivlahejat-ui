"use client";

import type { ComponentProps } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { styled } from "shivlahejat";
import { theme } from "./theme";

const Root = styled(SliderPrimitive.Root)`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  touch-action: none;
  user-select: none;
  &[data-disabled] {
    opacity: 0.5;
  }
  &[data-orientation="vertical"] {
    flex-direction: column;
    width: auto;
    height: 100%;
    min-height: 160px;
  }
`;

const Track = styled(SliderPrimitive.Track)`
  position: relative;
  flex-grow: 1;
  overflow: hidden;
  background: ${theme.color.muted};
  border-radius: ${theme.radius.full};
  &[data-orientation="horizontal"] {
    height: 6px;
    width: 100%;
  }
  &[data-orientation="vertical"] {
    width: 6px;
    height: 100%;
  }
`;

const Range = styled(SliderPrimitive.Range)`
  position: absolute;
  background: ${theme.color.primary};
  &[data-orientation="horizontal"] {
    height: 100%;
  }
  &[data-orientation="vertical"] {
    width: 100%;
  }
`;

const Thumb = styled(SliderPrimitive.Thumb)`
  display: block;
  width: 16px;
  height: 16px;
  background: ${theme.color.background};
  border: 1px solid ${theme.color.primary};
  border-radius: ${theme.radius.full};
  box-shadow: ${theme.shadow.sm};
  cursor: grab;
  transition: box-shadow 150ms;
  &:hover,
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px color-mix(in srgb, ${theme.color.ring} 25%, transparent);
  }
`;

/** One thumb per value: defaultValue={[50]} or defaultValue={[20, 80]} for a range. */
export function Slider({
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: ComponentProps<typeof SliderPrimitive.Root>) {
  const count = (value ?? defaultValue ?? [min]).length;
  return (
    <Root defaultValue={defaultValue} value={value} min={min} max={max} {...props}>
      <Track>
        <Range />
      </Track>
      {Array.from({ length: count }, (_, i) => (
        <Thumb key={i} />
      ))}
    </Root>
  );
}
