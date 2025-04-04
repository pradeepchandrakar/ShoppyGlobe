// src/hooks/useAddToCart.js
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useAddToCart = () => {
  const dispatch = useDispatch();
  const reduxToken = useSelector((state) => state.auth.token);
  const [token, setToken] = useState(reduxToken);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) setToken(localToken);
  }, [reduxToken]);

  const addToCartHandler = useCallback(async (productId) => {
    if (!token) {
      alert("Please log in to add items to cart.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(setCart(res.data.cart.items));
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err.message);
      alert("Failed to add to cart.");
    }
  }, [token, dispatch]);

  return { addToCart: addToCartHandler };
};

export default useAddToCart;
