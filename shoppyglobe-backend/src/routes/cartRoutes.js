const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController"); 
const authMiddleware = require("../middleware/authMiddleware"); // Protect routes

// 🛒 Add a product to the cart (Protected)
router.post("/add", authMiddleware, cartController.addToCart);

// 🛒 Update cart quantity (Protected)
router.put("/update", authMiddleware, cartController.updateCart);

// 🛒 Remove item from cart (Fixed Route)
router.delete("/remove/:id", authMiddleware, cartController.removeFromCart);

module.exports = router;





