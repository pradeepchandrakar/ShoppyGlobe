const Cart = require("../models/Cart");
const Product = require("../models/Product"); // Ensure product exists before adding

// ✅ Add To Cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // ✅ Check if product exists
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
            // ✅ If product exists, update quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // ✅ Otherwise, add new item
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });

    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ message: "Error adding to cart" });
    }
};

// ✅ Update Cart (Change Quantity)
exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (itemIndex > -1) {
            if (quantity > 0) {
                cart.items[itemIndex].quantity = quantity; // ✅ Update quantity
            } else {
                cart.items.splice(itemIndex, 1); // ✅ Remove if quantity is 0
            }
            await cart.save();
            return res.status(200).json({ message: "Cart updated successfully", cart });
        }

        res.status(404).json({ message: "Product not found in cart" });

    } catch (error) {
        console.error("Error in updateCart:", error);
        res.status(500).json({ message: "Error updating cart" });
    }
};

// ✅ Remove From Cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params; // Extract from URL

        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        if (cart.items.length === initialLength) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        await cart.save();
        res.status(200).json({ message: "Product removed from cart", cart });

    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ message: "Error removing from cart" });
    }
};





