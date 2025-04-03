const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        console.log("🔑 Auth Header:", authHeader); // ✅ Debug Log

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("⛔ No token provided!");
            return res.status(401).json({ message: "Access Denied! No Token Provided." });
        }

        const token = authHeader.split(" ")[1]; // ✅ Extract token
        console.log("🔍 Extracted Token:", token);

        // ✅ Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        // ✅ Find the user (excluding password)
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            console.log("⛔ User not found for this token!");
            return res.status(401).json({ message: "User not found. Please log in again." });
        }

        req.user = user; // ✅ Attach user to request
        next(); // Proceed to next middleware

    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);

        if (error.name === "TokenExpiredError") {
            console.log("⏳ Token Expired!");
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }

        console.log("⛔ Invalid Token!");
        return res.status(401).json({ message: "Invalid token. Please log in again." });
    }
};

module.exports = verifyToken;




