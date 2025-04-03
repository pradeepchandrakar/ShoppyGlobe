const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false, // 🔒 Password will not be returned in queries
    },
    role: {
      type: String,
      enum: ["user", "admin"], // 🔒 Ensures only valid roles
      default: "user",
    },
  },
  { timestamps: true } // ✅ Automatically adds createdAt & updatedAt
);

module.exports = mongoose.model("User", UserSchema);

