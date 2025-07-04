"use client";

import React, { useState } from "react";
import TabHeader from "@/components/TabHeader";
import MenuList from "@/components/MenuList";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addItem, updateQuantity } from "@/store/cartSlice";

export default function CoffeeOrderPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("hot");

  const dispatch = useAppDispatch();
  const { cart, totalItems } = useAppSelector((state) => state.cart);

  const getItemQuantity = (itemId: string) => {
    return cart.find((item) => item.id === itemId)?.quantity || 0;
  };

  const handleUpdateQuantity = (itemId: string, change: number) => {
    dispatch(updateQuantity({ id: itemId, change }));
  };

  const handleAddItem = (itemId: string) => {
    dispatch(addItem(itemId));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <TabHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <MenuList
          activeTab={activeTab}
          getItemQuantity={getItemQuantity}
          onAddItem={handleAddItem}
          onUpdateQuantity={handleUpdateQuantity}
          cartLength={cart.length}
        />

        {/* Go To Cart Button */}
      </div>
      {totalItems > 0 && (
        <div className="fixed bottom-0 pl-2 pr-2 pb-20 w-full z-40 bg-white h-10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              router.push("/cart");
            }}
            className="w-full bg-[#54311B] hover:bg-[#3d2515] text-white py-4 rounded-lg font-medium shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Go To Cart</span>
            <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm">
              {totalItems}
            </span>
          </motion.button>
        </div>
      )}
    </>
  );
}
