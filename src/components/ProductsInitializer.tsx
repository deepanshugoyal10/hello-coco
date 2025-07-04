// components/ProductsInitializer.tsx
"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setAllProducts, setAllTabs } from "@/store/cartSlice";
import { fetchProducts, fetchTabs } from "@/helpers/api";

export default function ProductsInitializer() {
  const dispatch = useAppDispatch();

  const fetchProductsFromApi = async () => {
    const products = await fetchProducts();
    const tabs = await fetchTabs();
    dispatch(setAllProducts(products.products));
    dispatch(setAllTabs(tabs.tabs));
  };

  useEffect(() => {
    fetchProductsFromApi();
  }, []);

  return null; // This component only sets up Redux, doesn't render anything
}
