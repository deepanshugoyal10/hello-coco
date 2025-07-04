// utils/fetchProducts.ts
import { supabase } from "../../lib/supabase";

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
