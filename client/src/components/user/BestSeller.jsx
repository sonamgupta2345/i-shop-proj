"use client"
import { useState } from "react";
import Products from "./Products";

export default function BestSeller() {
  const [activeTab, setActiveTab] = useState("BEST SELLER");

  const tabs = ["BEST SELLER", "NEW IN", "POPULAR"];

 
  return (
    <div className="px-6 py-6 bg-gray-100 rounded-xl">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        
        {/* Tabs */}
        <div className="flex gap-6 font-semibold">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "text-black border-b-2 border-teal-500"
                  : "text-gray-400"
              } pb-1`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-sm cursor-pointer">View All</span>
      </div>

      {/* Products */}
        <Products />
    </div>
  );
}