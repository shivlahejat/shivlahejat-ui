"use client";

import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";

export default function DatePickerDemo() {
  return (
    <>
      <DatePicker aria-label="Due date" />
      <DateRangePicker
        aria-label="Trip dates"
        defaultValue={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 18) }}
      />
    </>
  );
}
