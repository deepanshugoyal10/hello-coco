import { useAppSelector } from "@/hooks/redux";
import React from "react";

interface TabHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabHeader({ activeTab, onTabChange }: TabHeaderProps) {
  const tabs = useAppSelector((state) => state.cart.tabs);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.tabname}
              onClick={() => onTabChange(tab.tabname)}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                activeTab === tab.tabname
                  ? "bg-[#54311B] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.display_name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
