import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"; 
import { setCart } from "./cartSlice"; // ✅ Cart import kiya

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // ✅ Save in LocalStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      // ✅ Remove from LocalStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", credentials);

    dispatch(login(response.data)); // ✅ Redux me user set karein
    dispatch(fetchCart()); // ✅ Cart fetch karne ka function call karein
  } catch (error) {
    console.error("Login error:", error.response?.data?.message || error.message);
  }
};

// ✅ Cart fetch karne ka function
export const fetchCart = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  if (!token) return;

  try {
    const response = await axios.get("http://localhost:5000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setCart(response.data.cart.items)); // ✅ Redux state update karein
  } catch (error) {
    console.error("Cart fetch error:", error.response?.data?.message || error.message);
  }
};

export default authSlice.reducer;
















