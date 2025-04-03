const Product = require("../models/Product");

// ✅ Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// ✅ Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product details", error: error.message });
  }
};

// ✅ Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, thumbnail, rating } = req.body;

    // ✅ Input validation
    if (!name || !price || !stock || !thumbnail || !rating) {
      return res.status(400).json({ message: "Missing required fields: name, price, stock, thumbnail, rating" });
    }

    // ✅ Ensure price and rating are numbers
    if (isNaN(price) || isNaN(rating)) {
      return res.status(400).json({ message: "Price and Rating must be valid numbers" });
    }

    const product = new Product({ name, price, description, stock, thumbnail, rating });
    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};


