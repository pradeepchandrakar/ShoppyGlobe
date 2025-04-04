const mongoose = require("mongoose");


const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true, // ✅ Ensure productId is always provided
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: [1, "Quantity must be at least 1"], // ✅ Ensures quantity is always 1 or more
        },
      },
    ],
  },
  { timestamps: true } // ✅ Automatically add createdAt & updatedAt timestamps
);

module.exports = mongoose.model("Cart", CartSchema);

