require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db.js");

const productRoutes = require("./src/routes/productRoutes.js");
const cartRoutes = require("./src/routes/cartRoutes.js");
const authRoutes = require("./src/routes/authRoutes.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Debug: Log every request
app.use((req, res, next) => {
  console.log(`📌 ${req.method} ${req.url} - Body:`, req.body);
  next();
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
