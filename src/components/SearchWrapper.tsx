"use client";

import { JSX, useState } from "react";
import TabButton from "./TabButton";
import FlightSearchContent from "./FlightSearchContent";
import HotelSearchContent from "./HotelSearchContent";
import PackagesSearchContent from "./PackagesSearchContent";
import { Plane, Building, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Tab {
  name: string;
  label: string;
  icon: JSX.Element;
}

export default function SearchWrapper() {
  const [activeTab, setActiveTab] = useState<string>('hotel');
  const t = useTranslations('search.tabs');

  const tabs: Tab[] = [
    { name: 'flight', label: t('flight'), icon: <Plane size={16} /> },
    { name: 'hotel', label: t('hotel'), icon: <Building size={16} /> },
    { name: 'packages', label: t('packages'), icon: <Gift size={16} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'flight':
        return <FlightSearchContent />;
      case 'hotel':
        return <HotelSearchContent />;
      case 'packages':
        return <PackagesSearchContent />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 md:mt-20 container px-4 md:px-0">
      <div className="relative w-full">
        <div className="flex justify-center flex-col md:flex-row md:absolute gap-1 md:gap-2a md:left-1/2 md:transform md:-translate-x-1/2 md:top-[-1.8rem] z-10">
          {tabs.map((tab) => (
            <TabButton
              key={tab.name}
              isActive={activeTab === tab.name}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon}
              {tab.label}
            </TabButton>
          ))}
        </div>
      </div>

      <div
        className="w-full min-h-[400px] md:min-h-[500px] mt-4 md:mt-[-1px] border py-8 md:py-20 my-8 md:my-20 border-gray-200 bg-white rounded-xl shadow-sm relative"
      >
        {renderContent()}
      </div>
    </div>
  );
}