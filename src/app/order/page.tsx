"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  isVeg: boolean;
}

const menuData: Record<string, MenuItem[]> = {
  Cold: [
    {
      id: "1",
      name: "Date Cortado",
      description:
        "Double shot blonde espresso, paired with date flavoured sauc..",
      price: 383.25,
      calories: 168,
      image: "/api/placeholder/80/80",
      isVeg: true,
    },
    {
      id: "2",
      name: "Churro Frappuccino",
      description:
        "Signature Starbucks Frappuccino paired with flavours of chu..",
      price: 519.75,
      calories: 368,
      image: "/api/placeholder/80/80",
      isVeg: true,
    },
    {
      id: "3",
      name: "Churro Latte",
      description:
        "Signature Starbucks Latte paired with flavours of churro wi..",
      price: 430.5,
      calories: 243,
      image: "/api/placeholder/80/80",
      isVeg: true,
    },
  ],
  Hot: [
    {
      id: "4",
      name: "Americano",
      description: "Rich espresso with hot water for a bold, smooth taste",
      price: 295.0,
      calories: 15,
      image: "/api/placeholder/80/80",
      isVeg: true,
    },
    {
      id: "5",
      name: "Cappuccino",
      description: "Espresso with steamed milk and a layer of foam",
      price: 340.0,
      calories: 120,
      image: "/api/placeholder/80/80",
      isVeg: true,
    },
    {
      id: "6",
      name: "Flat White",
      description: "Double shot espresso with steamed milk",
      price: 385.0,
      calories: 155,
      image: "/api/placeholder/80/80",
      isVeg: true,
    },
  ],
  Sides: [
    {
      id: "7",
      name: "Croissant",
      description: "Buttery, flaky pastry perfect with your coffee",
      price: 180.0,
      calories: 280,
      image: "/api/placeholder/80/80",
      isVeg: true,
    },
    {
      id: "8",
      name: "Blueberry Muffin",
      description: "Fresh blueberries in a moist, tender muffin",
      price: 220.0,
      calories: 320,
      image: "/api/placeholder/80/80",
      isVeg: true,
    },
  ],
  Mercha: [
    {
      id: "9",
      name: "Coffee Mug",
      description: "Premium ceramic mug with brand logo",
      price: 850.0,
      calories: 0,
      image: "/api/placeholder/80/80",
      isVeg: true,
    },
    {
      id: "10",
      name: "Tumbler",
      description: "Insulated stainless steel tumbler",
      price: 1200.0,
      calories: 0,
      image: "/api/placeholder/80/80",
      isVeg: true,
    },
  ],
};

export default function CoffeeOrderPage() {
  const [activeTab, setActiveTab] = useState("Hot");
  const tabs = ["Hot", "Cold", "Sides"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Tabs */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#54311B] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {menuData[activeTab]?.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Product Image */}

                  <div className="w-25 h-30  border border-green-700 flex self-center"></div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {item.name}
                        </h3>
                        {item.isVeg && (
                          <div className="w-4 h-4  border border-green-700 flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm mb-1">
                      {item.calories} Kcal
                    </p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-gray-800">
                        ₹ {item.price}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg transition-colors"
                      >
                        Add Item
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
