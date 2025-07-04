import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  image: string;
  isVeg: boolean;
  isAvailable: boolean;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  totalPrice: number;
}

export interface TabItem {
  id: string;
  tabname: string;
  display_name: string;
}

interface CartState {
  products: CartItem[];
  cart: CartItem[];
  totalAmount: number;
  totalItems: number;
  tabs: TabItem[];
}

const initialState: CartState = {
  products: [],
  cart: [],
  totalAmount: 0,
  totalItems: 0,
  tabs: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<MenuItem[]>) => {
      state.products = action.payload.map((item) => ({
        ...item,
        quantity: 0,
        totalPrice: item.price,
      }));
    },

    setAllTabs: (state, action: PayloadAction<TabItem[]>) => {
      state.tabs = action.payload;
    },

    addItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload,
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        const foundItem = state.products.find(
          (item) => item.id === action.payload,
        ) as CartItem;
        state.cart.push({
          ...foundItem,
          quantity: 1,
          totalPrice: foundItem.price,
        });
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; change: number }>,
    ) => {
      const item = state.cart.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += action.payload.change;

        if (item.quantity <= 0) {
          state.cart = state.cart.filter((i) => i.id !== action.payload.id);
        } else {
          item.totalPrice = item.quantity * item.price;
        }
      }

      cartSlice.caseReducers.calculateTotals(state);
    },

    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },

    calculateTotals: (state) => {
      state.totalAmount = state.cart.reduce(
        (total, item) => total + item.totalPrice,
        0,
      );
      state.totalItems = state.cart.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setAllProducts,
  setAllTabs,
} = cartSlice.actions;
export default cartSlice.reducer;
