// hooks/useCart.ts
import { useState } from "react";
import { CartItem, MenuItem } from "../types/menu";
import { menuData } from "../data/menuData";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const getItemQuantity = (itemId: string) => {
    return cart.find((item) => item.id === itemId)?.quantity || 0;
  };

  const findMenuItem = (itemId: string): MenuItem | undefined => {
    for (const category of Object.values(menuData)) {
      const item = category.find((item) => item.id === itemId);
      if (item) return item;
    }
    return undefined;
  };

  const updateQuantity = (itemId: string, change: number) => {
    const menuItem = findMenuItem(itemId);
    if (!menuItem) return;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === itemId);
      const currentQuantity = existingItem?.quantity || 0;
      const newQuantity = currentQuantity + change;

      if (newQuantity <= 0) {
        return prev.filter((item) => item.id !== itemId);
      }

      if (existingItem) {
        return prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                quantity: newQuantity,
                totalPrice: newQuantity * item.price,
              }
            : item,
        );
      } else {
        return [
          ...prev,
          {
            ...menuItem,
            quantity: newQuantity,
            totalPrice: newQuantity * menuItem.price,
          },
        ];
      }
    });
  };

  const addItem = (itemId: string) => {
    updateQuantity(itemId, 1);
  };

  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    getItemQuantity,
    updateQuantity,
    addItem,
    getTotalCartPrice,
    clearCart,
  };
};
