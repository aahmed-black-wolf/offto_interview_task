"use client";

import { useState } from "react";
import { DateRangePicker, DateValue, RangeValue } from "@nextui-org/react";
import { formatDate } from "@/utils/formatDate";

export function Datepicker({
  title,
  selectedRangeUI,
  rangeUiHandler,
}: {
  title: string;
  selectedRangeUI: RangeValue<DateValue | null>;
  rangeUiHandler: (range: RangeValue<DateValue>) => void;
}) {
  const [selectedRange, setSelectedRange] = useState<{
    in: string | null;
    out: string | null;
  }>({
    in: null,
    out: null,
  });

  const handleChange = (range: RangeValue<DateValue> | null) => {
    if (range) {
      const { start, end } = range;

      const startDate = `${start.month}-${start.day}-${start.year}`;
      const endDate = `${end.month}-${end.day}-${end.year}`;

      setSelectedRange({
        in: formatDate(new Date(startDate)),
        out: formatDate(new Date(endDate)),
      });

      // update UI date for both check-in & check-out
      rangeUiHandler(range);
    }
  };

  return (
    <div className="w-full">
      <DateRangePicker
        label={title}
        visibleMonths={2}
        onChange={handleChange}
        value={selectedRangeUI as RangeValue<DateValue>}
      />

      {/* used for sending the selected value in formData */}
      <input type="hidden" name="check-in" defaultValue={selectedRange.in!} />
      <input type="hidden" name="check-out" defaultValue={selectedRange.out!} />
    </div>
  );
}
