require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db.js");

const productRoutes = require("./src/routes/productRoutes.js");
const cartRoutes = require("./src/routes/cartRoutes.js");
const authRoutes = require("./src/routes/authRoutes.js");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));