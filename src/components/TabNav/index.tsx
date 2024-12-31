"use client";

import { AirplaneTakeoff, Bed, Island } from "@/icons";
import { Tabs, Tab } from "@nextui-org/react";
import { useTranslations } from "next-intl";

export const TabNav = () => {
  const t = useTranslations("Booking");

  return (
    <Tabs
      aria-label="Options"
      color="secondary"
      selectedKey="hotel"
      className="flex flex-row items-center
        absolute top-[-35px] left-[50%] transform -translate-x-1/2 w-fit"
    >
      <Tab
        key="flight"
        title={
          <div className="flex flex-row gap-2">
            <AirplaneTakeoff size={15} className="mt-1" />
            {t("flight")}
          </div>
        }
        className="bg-white w-[140px] text-center py-3 mx-3 h-fit shadow-sm"
      ></Tab>
      <Tab
        key="hotel"
        title={
          <div className="flex flex-row gap-2">
            <Bed size={15} className="mt-1" />
            {t("hotel")}
          </div>
        }
        className="bg-white w-[140px] text-center py-4 mx-3 h-fit shadow-sm"
      ></Tab>
      <Tab
        key="package"
        title={
          <div className="relative flex flex-row gap-2">
            <Island size={15} className="mt-1" />
            {t("package")}
            {/* "Soon" label */}
            <div
              className="absolute top-0 right-0 w-[150px] bg-primary text-white text-xs font-bold 
              px-2 py-1 transform rotate-45 translate-x-[95px] translate-y-[-8px]"
            >
              Soon
            </div>
          </div>
        }
        className="bg-white w-[140px] text-center py-3 mx-3 h-fit shadow-sm overflow-hidden"
        isDisabled
      ></Tab>
    </Tabs>
  );
};
