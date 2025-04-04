const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ✅ Get User Cart with Full Product Details
exports.getCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
  
      if (!cart || cart.items.length === 0) {
        return res.status(200).json({ message: "Cart is empty", cart: { items: [] } });
      }
  
      // 🧠 Enrich each item with product info
      const enrichedItems = await Promise.all(
        cart.items.map(async (item) => {
          const product = await Product.findById(item.productId).select("title price discount thumbnail");
          return {
            ...item.toObject(),
            product: product ? product.toObject() : null,
          };
        })
      );
  
      res.status(200).json({ cart: { items: enrichedItems } });
    } catch (error) {
      console.error("Error in getCart:", error);
      res.status(500).json({ message: "Error fetching cart" });
    }
  };


// ✅ Add To Cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // ✅ Ensure product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId: req.user.id });

        // ✅ If no cart, create a new one
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        // ✅ Check if product already exists in cart
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity; // ✅ Update quantity
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });

    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ message: "Error adding to cart" });
    }
};

// ✅ Update Cart Quantity
exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity; // ✅ Update quantity
            await cart.save();
            return res.status(200).json({ message: "Cart updated", cart });
        } else {
            return res.status(404).json({ message: "Product not in cart" });
        }
    } catch (error) {
        console.error("Error in updateCart:", error);
        res.status(500).json({ message: "Error updating cart" });
    }
};

// ✅ Remove Item from Cart (FIXED)
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params; // ⬅️ FIXED: id ko productId se replace kiya
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // ✅ Remove product from items array
        const updatedItems = cart.items.filter(item => item.productId.toString() !== productId);
        
        if (updatedItems.length === cart.items.length) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        cart.items = updatedItems;
        await cart.save();

        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ message: "Error removing item from cart" });
    }
};









