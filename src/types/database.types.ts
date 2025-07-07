export type PaymentMethod = "counter" | "upi";
export type OrderStatus = "payment_pending" | "preparing" | "ready" | "expired";

export interface CreateOrder {
  customer_phone: string;
  order_items: CreateOrderItem[];
  total_amount: number;
  payment_method: PaymentMethod;
}

export interface CreateOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface FetchOrders {
  created_at: string;
  customer_phone: string;
  estimated_ready_at?: string;
  order_id: string;
  payment_method: PaymentMethod;
  status: OrderStatus;
  order_items: CreateOrderItem[];
  total_amount: number;
  updated_at: string;
}
