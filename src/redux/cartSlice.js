import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload); // ✅ Add new item to cart
    },
    updateCart: (state, action) => {
      state.items = action.payload.items;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
    },
  },
});

export const { setCart, addToCart, updateCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;






