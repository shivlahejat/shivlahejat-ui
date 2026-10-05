"use client";

import type { ComponentProps } from "react";
import { DayPicker } from "react-day-picker";
import { styled } from "shivlahejat";
import { theme, focusRing } from "./theme";

/*
 * react-day-picker renders plain elements with `rdp-*` class names.
 * We style those from one wrapper, so there's no CSS file to import.
 */
const Root = styled.div`
  width: fit-content;
  padding: 12px;
  font-size: 14px;
  --cell: 32px;

  & .rdp-root {
    position: relative;
  }
  & .rdp-months {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  & .rdp-month {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  & .rdp-nav {
    position: absolute;
    inset: 0 0 auto 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--cell);
    pointer-events: none;
  }
  & .rdp-button_previous,
  & .rdp-button_next {
    display: grid;
    place-items: center;
    width: var(--cell);
    height: var(--cell);
    padding: 0;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: ${theme.radius.md};
    cursor: pointer;
    pointer-events: auto;
    ${focusRing}
    &:hover {
      background: ${theme.color.accent};
    }
    &:disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
  & .rdp-chevron {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  & .rdp-month_caption {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--cell);
    padding: 0 var(--cell);
  }
  & .rdp-caption_label {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
    user-select: none;
  }
  & .rdp-dropdowns {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
  }
  & .rdp-dropdown_root {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0 6px;
    border: 1px solid ${theme.color.input};
    border-radius: ${theme.radius.md};
    &:has(:focus-visible) {
      border-color: ${theme.color.ring};
    }
  }
  & .rdp-dropdown {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
  }
  & .rdp-month_grid {
    border-collapse: collapse;
  }
  & .rdp-weekday {
    width: var(--cell);
    padding-bottom: 6px;
    font-size: 12px;
    font-weight: 400;
    color: ${theme.color.mutedForeground};
  }
  & .rdp-week_number {
    font-size: 12px;
    color: ${theme.color.mutedForeground};
  }
  & .rdp-day {
    position: relative;
    width: var(--cell);
    height: var(--cell);
    padding: 0;
    text-align: center;
  }
  & .rdp-day_button {
    display: grid;
    place-items: center;
    width: var(--cell);
    height: var(--cell);
    padding: 0;
    font: inherit;
    color: inherit;
    background: transparent;
    border: 0;
    border-radius: ${theme.radius.md};
    cursor: pointer;
    ${focusRing}
    &:hover {
      background: ${theme.color.accent};
    }
  }
  & .rdp-today .rdp-day_button {
    background: ${theme.color.accent};
    color: ${theme.color.accentForeground};
  }
  & .rdp-outside {
    color: ${theme.color.mutedForeground};
  }
  & .rdp-disabled {
    opacity: 0.5;
  }
  & .rdp-disabled .rdp-day_button {
    pointer-events: none;
  }
  & .rdp-hidden {
    visibility: hidden;
  }
  & .rdp-selected .rdp-day_button {
    background: ${theme.color.primary};
    color: ${theme.color.primaryForeground};
  }
  /* Ranges: a muted band between two solid ends. */
  & .rdp-range_middle {
    background: ${theme.color.accent};
  }
  & .rdp-range_middle .rdp-day_button {
    background: transparent;
    color: ${theme.color.accentForeground};
    border-radius: 0;
  }
  & .rdp-range_start {
    background: linear-gradient(to right, transparent 50%, ${theme.color.accent} 50%);
  }
  & .rdp-range_end {
    background: linear-gradient(to left, transparent 50%, ${theme.color.accent} 50%);
  }
  & .rdp-range_start.rdp-range_end {
    background: none;
  }
`;

export type CalendarProps = ComponentProps<typeof DayPicker>;

/** Date picker grid. Pass mode="single" | "multiple" | "range" plus selected / onSelect. */
export function Calendar({ showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <Root>
      <DayPicker showOutsideDays={showOutsideDays} {...props} />
    </Root>
  );
}
