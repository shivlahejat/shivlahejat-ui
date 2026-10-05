"use client";

import { useState } from "react";
import { styled } from "shivlahejat";
import { theme } from "./theme";
import { Button } from "./button";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "./command";

export type ComboboxOption = { value: string; label: string; disabled?: boolean };

type ComboboxProps = {
  options: ComboboxOption[];
  /** Controlled value. Leave out to let the combobox manage it. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  /** Width of the trigger and the list. */
  width?: number | string;
  "aria-label"?: string;
};

/**
 * A searchable select: Popover + Command.
 * For anything fancier (multi-select, async results) copy this file and compose the parts yourself.
 */
export function Combobox({
  options,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search…",
  emptyText = "No results.",
  disabled,
  width = 220,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState(defaultValue);
  const value = valueProp ?? inner;
  const selected = options.find((o) => o.value === value);

  const choose = (next: string) => {
    const v = next === value ? "" : next;
    setInner(v);
    onValueChange?.(v);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={props["aria-label"]}
          disabled={disabled}
          style={{ width, justifyContent: "space-between", fontWeight: 400 }}
        >
          <TriggerText data-placeholder={selected ? undefined : ""}>
            {selected?.label ?? placeholder}
          </TriggerText>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ opacity: 0.5 }}
          >
            <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width, padding: 0 }}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <CommandItem
                  key={o.value}
                  value={o.label}
                  disabled={o.disabled}
                  onSelect={() => choose(o.value)}
                >
                  <Check data-visible={o.value === value}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </Check>
                  {o.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const TriggerText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  &[data-placeholder] {
    color: ${theme.color.mutedForeground};
  }
`;

const Check = styled.span`
  display: flex;
  opacity: 0;
  &[data-visible="true"] {
    opacity: 1;
  }
`;
