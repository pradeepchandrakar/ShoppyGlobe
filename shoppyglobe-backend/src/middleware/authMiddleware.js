const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("🔑 Auth Header:", authHeader); // ✅ Debugging Log

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("⛔ No token provided!");
      return res.status(401).json({ message: "Access Denied! No Token Provided." });
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1];
    console.log("🔍 Extracted Token:", token); // ✅ Debugging Log

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded); // ✅ Debugging Log

    // ✅ Find user and attach it to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("⛔ User not found for this token!");
      return res.status(401).json({ message: "User not found. Please log in again." });
    }

    req.user = user; // Attach user to req
    next(); // Continue to the next middleware
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message);

    if (error.name === "TokenExpiredError") {
      console.log("⏳ Token Expired!");
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }

    console.log("⛔ Invalid Token!");
    res.status(401).json({ message: "Invalid token. Please log in again." });
  }
};

module.exports = protect;



