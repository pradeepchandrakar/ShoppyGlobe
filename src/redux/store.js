import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice"; 

const store = configureStore({
  reducer: {
    cart: cartReducer,  
    auth: authReducer,  
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Ignore serializability checks for non-serializable values
    }),
});

export default store;


