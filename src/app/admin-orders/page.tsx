"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchOrders, updateOrderStatus } from "@/helpers/api";
import { FetchOrders, OrderStatus } from "@/types/database.types";
import { Loader2 } from "lucide-react";
import clsx from "clsx";
import { useToast } from "@/components/ToastProvider";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<FetchOrders[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<FetchOrders | null>(null);
  const [openRecipeIndex, setOpenRecipeIndex] = useState<number | null>(null);
  const [updateStatusLoader, setUpdateStatusLoader] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchOrdersFromApi();
  }, []);

  const fetchOrdersFromApi = async () => {
    const { orders } = await fetchOrders();
    setOrders(orders);
  };

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    if (updateStatusLoader) return;
    setUpdateStatusLoader(true);
    const { success, order, error } = await updateOrderStatus(
      orderId,
      newStatus,
    );
    if (success) {
      setSelectedOrder(order);
      showToast(
        `Order updated successfully to ${order.status}`,
        "success",
        "top-center",
      );
    } else {
      showToast(error || "Failed to update order.", "error", "top-center");
    }
    setUpdateStatusLoader(false);
  };

  const statusColors: Record<string, string> = {
    payment_pending: "bg-red-500 text-yellow-100",
    preparing: "bg-yellow-300 text-yellow-900",
    ready: "bg-blue-300 text-blue-900",
    expired: "bg-green-300 text-green-900",
  };

  const statusArray = useMemo(() => {
    const allStatus = [
      { label: "Preparing", value: "preparing" },
      { label: "Ready", value: "ready" },
      { label: "Expired", value: "expired" },
    ];
    return allStatus.filter((status) => status.value !== selectedOrder?.status);
  }, [selectedOrder?.status]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 border-r bg-gray-50 p-5 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Orders</h2>
        <ul className="space-y-2">
          {orders.map((order) => (
            <button
              key={order.order_id}
              onClick={() => {
                setSelectedOrder(order);
                setOpenRecipeIndex(null); // reset accordion
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-200 transition ${
                selectedOrder?.order_id === order.order_id
                  ? "bg-gray-300 font-semibold"
                  : ""
              }`}
            >
              #{order.order_id}
            </button>
          ))}
        </ul>
      </div>

      {/* Main Panel */}
      <div className="flex-1 p-8 overflow-y-auto">
        {!selectedOrder ? (
          <p className="text-gray-500">👈 Select an Order to view details</p>
        ) : (
          <motion.div
            key={selectedOrder.order_id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Order #{selectedOrder.order_id}
              </h2>

              <span
                className={`px-3 py-1 ml-4 rounded-full text-sm font-medium ${
                  statusColors[selectedOrder.status] ||
                  "bg-gray-200 text-gray-800"
                }`}
              >
                {selectedOrder.status === "payment_pending"
                  ? "PAYMENT PENDING"
                  : selectedOrder.status.toUpperCase()}
              </span>
            </div>

            <div className="flex gap-4">
              {updateStatusLoader && (
                <span className="ml-2">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </span>
              )}
              {statusArray.map((status) => (
                <button
                  key={status.value}
                  onClick={() =>
                    updateStatus(
                      selectedOrder.order_id,
                      status.value as OrderStatus,
                    )
                  }
                  disabled={updateStatusLoader}
                  className={clsx(
                    "px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition",
                    updateStatusLoader && "opacity-50 cursor-not-allowed",
                  )}
                >
                  {status.label}
                </button>
              ))}
            </div>

            {/* Items with Recipes (Accordion) */}
            <div className="space-y-6">
              {selectedOrder.order_items?.map((item, i: number) => {
                const isOpen = openRecipeIndex === i;

                return (
                  <div
                    key={i}
                    className="p-4 border rounded-lg shadow-sm bg-white"
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setOpenRecipeIndex(isOpen ? null : i)}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg flex items-center justify-center">
                          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded opacity-70"></div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.name}
                          </h3>
                          <p className="text-sm font-medium text-gray-700 mt-1">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            Item Price: ₹{item.price}
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            Item Total: ₹{item.totalPrice}
                          </p>
                        </div>
                      </div>
                      <span className="text-md text-blue-600">
                        {isOpen ? "Hide Recipe" : "Show Recipe"}
                      </span>
                    </div>

                    {/* <AnimatePresence>
                      {isOpen && item.recipe && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4 bg-gray-50 p-3 rounded-md border text-sm text-gray-700"
                        >
                          <h4 className="font-semibold mb-1">Recipe:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {item.recipe.map((step: string, index: number) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence> */}
                  </div>
                );
              })}
            </div>

            <div className="text-lg font-semibold text-gray-700">
              Total: ₹{selectedOrder.total_amount}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
