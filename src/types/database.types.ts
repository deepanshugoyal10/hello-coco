export interface Customer {
  id: string;
  phone: string;
  name?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_phone: string;
  status: "preparing" | "ready" | "expired";
  items: OrderItem[];
  total_amount: number;
  estimated_ready_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OTPVerification {
  phone: string;
  otp_hash: string;
  expires_at: string;
  attempts: number;
  created_at: string;
}

export type PaymentMethod = "counter" | "upi";

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
