"use client";

import type { ComponentProps } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { styled } from "shivlahejat";
import { theme } from "./theme";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./dialog";

/** Fast, filterable command menu built on cmdk. */
export const Command = styled(CommandPrimitive)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${theme.color.popover};
  color: ${theme.color.popoverForeground};
  border-radius: ${theme.radius.md};
`;

type CommandDialogProps = ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
};

/** Command inside a Dialog, e.g. opened with ⌘K. */
export function CommandDialog({
  title = "Command palette",
  description = "Search for a command to run",
  children,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent showClose={false} style={{ padding: 0, gap: 0, overflow: "hidden" }}>
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </VisuallyHidden>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

const VisuallyHidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 12px;
  border-bottom: 1px solid ${theme.color.border};
  & > svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    opacity: 0.5;
  }
`;

const Input = styled(CommandPrimitive.Input)`
  flex: 1;
  height: 100%;
  font: inherit;
  font-size: 14px;
  color: inherit;
  background: transparent;
  border: 0;
  outline: none;
  &::placeholder {
    color: ${theme.color.mutedForeground};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function CommandInput(props: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <InputWrapper cmdk-input-wrapper="">
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
      <Input {...props} />
    </InputWrapper>
  );
}

export const CommandList = styled(CommandPrimitive.List)`
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-padding-block: 4px;
`;

export const CommandEmpty = styled(CommandPrimitive.Empty)`
  padding: 24px 0;
  font-size: 14px;
  text-align: center;
  color: ${theme.color.mutedForeground};
`;

export const CommandGroup = styled(CommandPrimitive.Group)`
  overflow: hidden;
  padding: 4px;
  & [cmdk-group-heading] {
    padding: 6px 8px;
    font-size: 12px;
    font-weight: 500;
    color: ${theme.color.mutedForeground};
  }
`;

export const CommandSeparator = styled(CommandPrimitive.Separator)`
  height: 1px;
  margin: 0 -4px;
  background: ${theme.color.border};
`;

export const CommandItem = styled(CommandPrimitive.Item)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  font-size: 14px;
  border-radius: ${theme.radius.sm};
  cursor: default;
  user-select: none;
  outline: none;
  &[data-selected="true"] {
    background: ${theme.color.accent};
    color: ${theme.color.accentForeground};
  }
  &[data-disabled="true"] {
    opacity: 0.5;
    pointer-events: none;
  }
  & svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const CommandShortcut = styled.span`
  margin-left: auto;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: ${theme.color.mutedForeground};
`;
