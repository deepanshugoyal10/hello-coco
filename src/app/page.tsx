"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Item = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const items: Item[] = [
  { id: 1, name: "Coffee", price: 3, image: "/coffee.png" },
  { id: 2, name: "Fries", price: 2, image: "/fries.png" },
  { id: 3, name: "Burger", price: 5, image: "/burger.png" },
];

export default function OrderPage() {
  const [cart, setCart] = useState<Record<number, number>>({});

  const addToCart = (id: number) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

  const removeFromCart = (id: number) =>
    setCart((prev) => {
      const quantity = prev[id];
      if (!quantity) return prev;

      if (quantity === 1) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: quantity - 1 };
    });

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#f9f6f3] p-6 flex flex-col font-sans">
      <h1 className="text-4xl font-bold text-[#3e2723] text-center tracking-wide mb-8">
        ☕ Coffee Cart
      </h1>
      <div className="flex flex-col gap-6">
        {items.map((item) => {
          const quantity = cart[item.id] ?? 0;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-5">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={72}
                  className="rounded-xl object-cover"
                  priority
                />
                <div>
                  <h2 className="text-xl font-semibold text-[#3e2723]">
                    {item.name}
                  </h2>
                  <p className="text-[#5d4037] font-medium">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {quantity === 0 ? (
                <button
                  onClick={() => addToCart(item.id)}
                  className="bg-[#6d4c41] hover:bg-[#5d4037] text-white px-5 py-2 rounded-full font-semibold shadow-sm transition-colors select-none"
                >
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-[#d7ccc8] hover:bg-[#c2b3ae] text-[#3e2723] rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl"
                  >
                    -
                  </button>
                  <span className="text-[#3e2723] font-bold">{quantity}</span>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="bg-[#6d4c41] hover:bg-[#5d4037] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-5 left-5 right-5 bg-[#3e2723] text-white text-center py-4 font-bold text-xl rounded-3xl shadow-lg cursor-pointer select-none"
          >
            <Link href="/payment" className="block">
              Place Order ({totalItems} item{totalItems > 1 ? "s" : ""}) →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
