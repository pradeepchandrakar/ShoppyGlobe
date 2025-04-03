const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"], // ✅ No negative prices
    },
    description: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"], // ✅ No negative stock values
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"], // ✅ Rating validation
      max: [5, "Rating cannot be more than 5"], // ✅ Ensures rating is between 0-5
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail image is required"], // ✅ Prevent missing images
    },
  },
  { timestamps: true } // ✅ Automatically adds createdAt & updatedAt timestamps
);

module.exports = mongoose.model("Product", ProductSchema);

