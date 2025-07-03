"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  isVeg: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
  totalPrice: number;
}

export default function CartPage() {
  // You'll need to get cart data from your cart hook/context
  // For now, using placeholder data - replace with actual cart data
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const router = useRouter();
  const getTotalCartPrice = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handlePlaceOrder = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentSelect = (method: string) => {
    console.log(`Payment method selected: ${method}`);
    // Here you can handle the payment logic
    setShowPaymentOptions(false);
    // You might want to clear cart or navigate to success page
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
              router.back();
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
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                // Navigate back to order page
                router.back();
              }}
              className="text-gray-600 hover:text-gray-800 text-xl"
            >
              ←
            </motion.button>
            <h1 className="text-xl font-bold text-gray-800">Your Cart</h1>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="pt-20 pb-6">
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
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    ₹{item.totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total and Place Order Button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-gray-700">Total</p>
              <p className="text-2xl font-bold text-[#54311B]">
                ₹{getTotalCartPrice().toFixed(2)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Choose Payment Method
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Total: ₹{getTotalCartPrice().toFixed(2)}
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
