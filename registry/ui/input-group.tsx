"use client";

import type { ComponentProps, MouseEvent } from "react";
import { styled, css } from "shivlahejat";
import { theme } from "./theme";
import { Button } from "./button";

/**
 * An input or textarea with icons, text or buttons attached:
 * <InputGroup><InputGroupInput/><InputGroupAddon align="inline-end">…</InputGroupAddon></InputGroup>
 */
export const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  min-width: 0;
  color: ${theme.color.foreground};
  background: ${theme.color.background};
  border: 1px solid ${theme.color.input};
  border-radius: ${theme.radius.md};
  transition:
    border-color 150ms,
    box-shadow 150ms;
  &:has(> textarea) {
    height: auto;
  }
  &:not(:has(> textarea)) {
    height: 36px;
  }
  &:has(> [data-align="block-start"]),
  &:has(> [data-align="block-end"]) {
    height: auto;
    flex-direction: column;
    align-items: stretch;
  }
  &:has([data-slot="input-group-control"]:focus-visible) {
    border-color: ${theme.color.ring};
    box-shadow: 0 0 0 3px color-mix(in srgb, ${theme.color.ring} 25%, transparent);
  }
  &:has(> [data-align="inline-start"]) > input {
    padding-left: 6px;
  }
  &:has(> [data-align="inline-end"]) > input {
    padding-right: 6px;
  }
  &:has([aria-invalid="true"]) {
    border-color: ${theme.color.destructive};
  }
  &:has(:disabled) {
    opacity: 0.5;
  }
`;

const control = css`
  flex: 1;
  min-width: 0;
  font: inherit;
  font-size: 14px;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 0;
  outline: none;
  &::placeholder {
    color: ${theme.color.mutedForeground};
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const InputControl = styled.input`
  ${control}
  height: 100%;
  padding: 0 12px;
`;

const TextareaControl = styled.textarea`
  ${control}
  min-height: 64px;
  padding: 10px 12px;
  resize: none;
  field-sizing: content;
`;

export function InputGroupInput(props: ComponentProps<"input">) {
  return <InputControl data-slot="input-group-control" {...props} />;
}

export function InputGroupTextarea(props: ComponentProps<"textarea">) {
  return <TextareaControl data-slot="input-group-control" {...props} />;
}

const Addon = styled.div({
  base: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    color: ${theme.color.mutedForeground};
    cursor: text;
    user-select: none;
    & > svg {
      width: 16px;
      height: 16px;
    }
    & > kbd {
      border-radius: 4px;
    }
  `,
  variants: {
    align: {
      "inline-start": "order: -1; padding-left: 12px;",
      "inline-end": "order: 99; padding-right: 12px;",
      "block-start": `order: -1; justify-content: flex-start; width: 100%; padding: 10px 12px 0;`,
      "block-end": `order: 99; justify-content: flex-start; width: 100%; padding: 0 12px 10px;`,
    },
  },
  defaultVariants: { align: "inline-start" },
});

type AddonProps = ComponentProps<"div"> & {
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
};

/** Icons, text or buttons. Clicking empty space focuses the input. */
export function InputGroupAddon({ align = "inline-start", onClick, ...props }: AddonProps) {
  return (
    <Addon
      role="group"
      data-align={align}
      align={align}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        onClick?.(e);
        if ((e.target as HTMLElement).closest("button")) return;
        e.currentTarget.parentElement?.querySelector<HTMLElement>("[data-slot=input-group-control]")?.focus();
      }}
      {...props}
    />
  );
}

export const InputGroupText = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${theme.color.mutedForeground};
  & svg {
    width: 16px;
    height: 16px;
  }
`;

type InputGroupButtonProps = Omit<ComponentProps<typeof Button>, "size"> & {
  size?: "xs" | "sm" | "icon-xs" | "icon-sm";
};

const sizes = {
  xs: { height: 24, padding: "0 8px", fontSize: 12 },
  sm: { height: 32, padding: "0 10px" },
  "icon-xs": { height: 24, width: 24, padding: 0 },
  "icon-sm": { height: 32, width: 32, padding: 0 },
} as const;

/** A small ghost Button sized to sit inside the group. */
export function InputGroupButton({ size = "xs", variant = "ghost", style, ...props }: InputGroupButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      style={{ ...sizes[size], borderRadius: 6, ...style }}
      {...props}
    />
  );
}
