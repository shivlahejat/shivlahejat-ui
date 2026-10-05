"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { styled } from "shivlahejat";
import { theme } from "./theme";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";

export type { DateRange };

const calendarIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const Placeholder = styled.span`
  color: ${theme.color.mutedForeground};
`;

const defaultFormat = (d: Date) => d.toLocaleDateString(undefined, { dateStyle: "medium" });

type DatePickerProps = {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** How the chosen date is shown on the button. Defaults to the user's locale. */
  formatDate?: (date: Date) => string;
  disabled?: boolean;
  "aria-label"?: string;
};

/** A Button that opens a Calendar in a Popover. */
export function DatePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  formatDate = defaultFormat,
  disabled,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [inner, setInner] = useState<Date | undefined>(defaultValue);
  const value = valueProp ?? inner;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          aria-label={props["aria-label"]}
          style={{ width: 240, justifyContent: "flex-start", fontWeight: 400 }}
        >
          {calendarIcon}
          {value ? formatDate(value) : <Placeholder>{placeholder}</Placeholder>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: "auto", padding: 0 }}>
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          onSelect={(d) => {
            setInner(d);
            onValueChange?.(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

type DateRangePickerProps = {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  formatDate?: (date: Date) => string;
  numberOfMonths?: number;
  disabled?: boolean;
  "aria-label"?: string;
};

/** Pick a start and end date across two months. */
export function DateRangePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  formatDate = defaultFormat,
  numberOfMonths = 2,
  disabled,
  ...props
}: DateRangePickerProps) {
  const [inner, setInner] = useState<DateRange | undefined>(defaultValue);
  const value = valueProp ?? inner;
  const label = value?.from
    ? value.to
      ? `${formatDate(value.from)} – ${formatDate(value.to)}`
      : formatDate(value.from)
    : null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          aria-label={props["aria-label"]}
          style={{ width: 300, justifyContent: "flex-start", fontWeight: 400 }}
        >
          {calendarIcon}
          {label ?? <Placeholder>{placeholder}</Placeholder>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" style={{ width: "auto", padding: 0 }}>
        <Calendar
          mode="range"
          selected={value}
          defaultMonth={value?.from}
          numberOfMonths={numberOfMonths}
          onSelect={(r) => {
            setInner(r);
            onValueChange?.(r);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
