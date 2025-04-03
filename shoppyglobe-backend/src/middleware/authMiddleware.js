const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // ✅ Token ko safely extract karna
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied! No Token Provided." });
        }

        const token = authHeader.split(" ")[1]; // Extract token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // ✅ User info attach to request
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ message: "Invalid or Expired Token" });
    }
};

