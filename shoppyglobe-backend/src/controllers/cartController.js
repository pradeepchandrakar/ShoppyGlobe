const Cart = require("../models/Cart");
const Product = require("../models/Product");

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

// ✅ Remove Item from Cart
exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== id);
        await cart.save();

        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ message: "Error removing item from cart" });
    }
};







