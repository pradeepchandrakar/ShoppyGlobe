const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController"); 
const authMiddleware = require("../middleware/authMiddleware"); // Protect routes

// 🛒 Get user cart
router.get("/", authMiddleware, cartController.getCart);

// 🛒 Add a product to the cart
router.post("/add", authMiddleware, cartController.addToCart);

// 🛒 Update cart quantity
router.put("/update", authMiddleware, cartController.updateCart);

// 🛒 Remove item from cart (FIXED ✅)
router.delete("/remove/:productId", authMiddleware, cartController.removeFromCart);

module.exports = router;







