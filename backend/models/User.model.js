const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a email"],
      unique: true,
      trim: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a Password"],
      minLength: [6, "Password must be up to 6 characters"],
      // maxLength:[23, "Password must not be more than 23 characters"],
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "master"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
