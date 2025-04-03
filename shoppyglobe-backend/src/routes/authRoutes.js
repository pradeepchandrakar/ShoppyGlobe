const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// ✅ Change "/register" to "/signup"
router.post("/signup", registerUser);  // 🔹 Updated Route

// ✅ Login User
router.post("/login", loginUser);

module.exports = router;


