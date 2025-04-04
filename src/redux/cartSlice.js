import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Set entire cart (e.g., after fetch or login)
    setCart: (state, action) => {
      console.log("Cart Updated:", action.payload); // Debug log
      state.items = action.payload || [];
    },

    // ✅ Add item or increase quantity if it exists
    addToCart: (state, action) => {
      const incoming = action.payload;
      const existing = state.items.find(
        (item) => item.productId === incoming.productId
      );

      if (existing) {
        existing.quantity += incoming.quantity || 1;
      } else {
        state.items.push({
          ...incoming,
          quantity: incoming.quantity || 1,
          product: incoming.product || {}, // Fallback product
        });
      }
    },

    // ✅ Update entire cart with updated quantities (and preserve product data)
    updateCart: (state, action) => {
      state.items = action.payload.items.map((newItem) => {
        const existing = state.items.find(
          (item) => item.productId === newItem.productId
        );

        return {
          ...newItem,
          product: newItem.product || existing?.product || {},
        };
      });
    },

    // ✅ Remove item by productId
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

export const { setCart, addToCart, updateCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;










