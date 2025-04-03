const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

const router = express.Router();

// ✅ Signup Route
router.post("/signup", registerUser);

// ✅ Login Route
router.post("/login", loginUser);

// 🔹 ✅ Logout Route (Add this!)
router.post("/logout", logoutUser);

module.exports = router;



