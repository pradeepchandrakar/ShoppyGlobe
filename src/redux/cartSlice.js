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
      state.items = action.payload.map((item) => ({
        ...item,
        product: item.product || {}, // Ensure product is preserved
      }));
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
          productId: incoming.productId,
          quantity: incoming.quantity || 1,
          product: incoming.product || {}, // Ensure full product data
        });
      }
    },

    // ✅ Update entire cart with updated quantities
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











