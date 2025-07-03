"use client";

import React, { useState } from "react";
import { menuData } from "@/data/menuData";
import { useCart } from "@/hooks/useCart";
import TabHeader from "@/components/TabHeader";
import MenuList from "@/components/MenuList";
import CartSection from "../../components/CartSection";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addItem, updateQuantity } from "@/store/cartSlice";
import { MenuItem } from "@/types/menu";

// export default function CoffeeOrderPage() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("Hot");
//   const tabs = ["Hot", "Cold", "Sides"];

//   const { cart, getItemQuantity, updateQuantity, addItem, getTotalCartPrice } =
//     useCart();

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 overflow-hidden">
//       <TabHeader
//         tabs={tabs}
//         activeTab={activeTab}
//         onTabChange={handleTabChange}
//       />

//       <MenuList
//         items={menuData[activeTab]}
//         activeTab={activeTab}
//         cartLength={cart.length}
//         getItemQuantity={getItemQuantity}
//         onAddItem={addItem}
//         onUpdateQuantity={updateQuantity}
//       />

//       {cart.length > 0 && (
//         <div className="fixed bottom-4 left-4 right-4 z-40">
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => {
//               // Navigate to cart route
//               console.log("Navigate to cart");
//               router.push("/cart");
//             }}
//             className="w-full bg-[#54311B] hover:bg-[#3d2515] text-white py-4 rounded-lg font-medium shadow-lg transition-colors flex items-center justify-center gap-2"
//           >
//             <span>Go To Cart</span>
//             <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm">
//               {cart.length}
//             </span>
//           </motion.button>
//         </div>
//       )}

//       {/* <CartSection cart={cart} totalPrice={getTotalCartPrice()} /> */}
//     </div>
//   );
// }

export default function CoffeeOrderPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Hot");
  const tabs = ["Hot", "Cold", "Sides"];

  const dispatch = useAppDispatch();
  const { items: cart, totalItems } = useAppSelector((state) => state.cart);

  const getItemQuantity = (itemId: string) => {
    return cart.find((item) => item.id === itemId)?.quantity || 0;
  };

  const handleAddItem = (itemId: string) => {
    const menuItem = findMenuItem(itemId);
    if (menuItem) {
      dispatch(addItem(menuItem));
    }
  };

  const handleUpdateQuantity = (itemId: string, change: number) => {
    dispatch(updateQuantity({ id: itemId, change }));
  };

  const findMenuItem = (itemId: string): MenuItem | undefined => {
    for (const category of Object.values(menuData)) {
      const item = category.find((item) => item.id === itemId);
      if (item) return item;
    }
    return undefined;
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <TabHeader
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <MenuList
          items={menuData[activeTab]}
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
              // Navigate to cart route
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
