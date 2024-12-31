"use client";

import { useState } from "react";
import { Datepicker } from "./datepicker";
import { DateValue, RangeValue } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const DatePickers = () => {
  const t = useTranslations("Booking");

  const [selectedRangeUI, setSelectedRangeUI] = useState<
    RangeValue<DateValue | null>
  >({
    start: null,
    end: null,
  });

  const rangeUiHandler = (range: RangeValue<DateValue>) => {
    setSelectedRangeUI(range);
  };

  return (
    <>
      <Datepicker
        title={t("check in")}
        selectedRangeUI={selectedRangeUI}
        rangeUiHandler={rangeUiHandler}
      />
      <Datepicker
        title={t("check out")}
        selectedRangeUI={selectedRangeUI}
        rangeUiHandler={rangeUiHandler}
      />
    </>
  );
};

export default DatePickers;
