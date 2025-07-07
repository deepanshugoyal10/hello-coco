// utils/fetchProducts.ts
import { CreateOrder, FetchOrders, OrderStatus } from "@/types/database.types";
import { supabase } from "@supa";
import { data } from "framer-motion/client";

export async function fetchProducts() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_available", true)
      .order("id");

    if (error) throw error;

    return {
      success: true,
      products: data,
      count: data.length,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch products",
      products: [],
      count: 0,
    };
  }
}

export async function fetchTabs() {
  try {
    const { data, error } = await supabase.from("tab_data").select("*");

    if (error) throw error;

    return {
      success: true,
      tabs: data,
      count: data.length,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch tabs",
      tabs: [],
      count: 0,
    };
  }
}

export async function createOrder(order: CreateOrder) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .insert(order)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      order: data,
      error: error,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to create order",
    };
  }
}

export async function fetchOrders() {
  try {
    const { data, error } = await supabase.from("orders").select("*");
    if (error) throw error;
    return {
      success: true,
      orders: data as FetchOrders[],
      count: data.length,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch orders",
      orders: [],
      count: 0,
    };
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("order_id", orderId)
      .select()
      .single();
    if (error) throw error;
    return { success: true, order: data, error: null };
  } catch (error) {
    return {
      success: false,
      data: [],
      error: "Failed to update order status",
    };
  }
}
