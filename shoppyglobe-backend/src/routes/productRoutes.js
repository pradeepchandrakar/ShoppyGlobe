const express = require("express");
const { getProducts, getProductById, createProduct } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware"); // Import authentication
const router = express.Router();

// 🛍️ Fetch all products (Public)
router.get("/", getProducts);

// 🔍 Get product details by ID (Public)
router.get("/:id", getProductById);

// ➕ Create a new product (Protected - Only for logged-in users)
router.post("/", authMiddleware, createProduct);

module.exports = router;


