// components/MenuItemCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "@/store/cartSlice";

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAddItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, change: number) => void;
}

export default function MenuItemCard({
  item,
  quantity,
  onAddItem,
  onUpdateQuantity,
}: MenuItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Product Image */}
          <div className="w-25 h-30 border border-green-700 flex self-center"></div>

          {/* Product Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-800 text-lg">
                  {item.name}
                </h3>
                {item.isVeg && (
                  <div className="w-4 h-4 border border-green-700 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-1">{item.calories} Kcal</p>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {item.description}
            </p>

            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-gray-800">₹ {item.price}</p>

              {quantity > 0 ? (
                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-1 py-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-8 h-8 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg transition-colors"
                  >
                    -
                  </motion.button>
                  <span className="text-gray-800 font-semibold min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-8 h-8 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAddItem(item.id)}
                  className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg transition-colors"
                >
                  Add Item
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
