// components/MenuList.tsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import MenuItemCard from "./MenuItemCard";
import { useAppSelector } from "@/hooks/redux";

interface MenuListProps {
  activeTab: string;
  cartLength: number;
  getItemQuantity: (itemId: string) => number;
  onAddItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, change: number) => void;
}

export default function MenuList({
  activeTab,
  cartLength,
  getItemQuantity,
  onAddItem,
  onUpdateQuantity,
}: MenuListProps) {
  const items = useAppSelector((state) => state.cart.items);

  console.log("activeTab:", activeTab);
  const memoItems = useMemo(() => {
    return items.filter((item) => item.category === activeTab);
  }, [items, activeTab]);

  return (
    <div className="h-full overflow-y-auto no-scrollbar px-4 py-6 pt-20 pb-24">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {memoItems?.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            quantity={getItemQuantity(item.id)}
            onAddItem={onAddItem}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </motion.div>
    </div>
  );
}
