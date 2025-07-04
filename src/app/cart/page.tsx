"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateQuantity, removeItem, clearCart } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { cart, totalAmount, totalItems } = useAppSelector(
    (state) => state.cart,
  );
  const router = useRouter();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const handlePlaceOrder = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentSelect = (method: string) => {
    console.log(`Payment method selected: ${method}`);
    // Here you can handle the payment logic
    setShowPaymentOptions(false);
    // Clear cart after successful payment
    dispatch(clearCart());
  };

  const handleUpdateQuantity = (itemId: string, change: number) => {
    dispatch(updateQuantity({ id: itemId, change }));
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeItem(itemId));
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some delicious items to get started!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Navigate back to order page
              router.push("/order");
            }}
            className="bg-[#54311B] hover:bg-[#3d2515] text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Menu
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 transition-all duration-300 ${
          showPaymentOptions ? "blur-sm" : ""
        }`}
      >
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Navigate back to order page
                router.push("/order");
              }}
              className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              ←
            </motion.button>
            <h1 className="text-xl font-bold text-gray-800">
              Your Cart ({totalItems})
            </h1>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div
        className={`pt-20 pb-6 transition-all duration-300 ${
          showPaymentOptions ? "blur-sm" : ""
        }`}
      >
        <div className="px-4 py-3">
          <div
            className={`max-h-96 overflow-y-auto space-y-3 ${
              cart.length > 2 ? "cart-scroll" : ""
            }`}
          >
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded opacity-70"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      {item.isVeg && (
                        <div className="w-4 h-4 border border-green-700 flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      ₹{item.price} x {item.quantity}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-1 py-1 w-fit">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm transition-colors"
                      >
                        -
                      </motion.button>
                      <span className="text-gray-800 font-semibold min-w-[1.5rem] text-center text-sm">
                        {item.quantity}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm transition-colors"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-800 text-lg mb-2">
                    ₹{item.totalPrice.toFixed(2)}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </motion.button>
                </div>
              </div>
            ))}
          </div>

          {/* Total and Place Order Button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-gray-700">
                Total ({totalItems} items)
              </p>
              <p className="text-2xl font-bold text-[#54311B]">
                ₹{totalAmount.toFixed(2)}
              </p>
            </div>

            {/* Place Order Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              className="w-full bg-[#54311B] hover:bg-[#3d2515] text-white py-4 rounded-lg font-medium transition-colors"
            >
              Place Order
            </motion.button>
          </div>
        </div>
      </div>

      {/* Payment Options Modal */}
      {showPaymentOptions && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Choose Payment Method
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Total: ₹{totalAmount.toFixed(2)}
            </p>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePaymentSelect("counter")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                💰 Pay at Counter
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePaymentSelect("upi")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                📱 Pay with UPI
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowPaymentOptions(false)}
              className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors"
            >
              Cancel
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
