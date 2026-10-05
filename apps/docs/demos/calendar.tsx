"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { theme } from "@/components/ui/theme";

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 5));
  return (
    <div style={{ border: `1px solid ${theme.color.border}`, borderRadius: theme.radius.lg }}>
      <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 9, 1)} />
    </div>
  );
}
