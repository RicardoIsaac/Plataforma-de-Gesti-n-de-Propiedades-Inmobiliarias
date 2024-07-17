const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../functions/generateToken");

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("Email already exists");
    }
    const phoneExist = await User.findOne({ phone });
    if (phoneExist) {
      res.status(400);
      throw new Error("phone already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
    if (user) {
      const { _id, name, email } = user;
      res.status(201).json({
        _id,
        name,
        email,
        token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
});

const logIn = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || email == "") {
      res.status(400);
      throw new Error("Please add an email");
    }
    if (!password || password == "") {
      res.status(400);
      throw new Error("Please add a password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User dont exist");
    }
    const passwordCorrect = await bcrypt.compare(password, user.password);
    const token = generateToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
    if (user && passwordCorrect) {
      const { _id, name, email } = user;
      res.status(200).json({
        _id,
        name,
        email,
        token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password");
    }
  } catch (error) {
    next(error);
  }
});

const logOut = asyncHandler(async (req, res, next) => {
    try {
        res.cookie("token", "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true,
          });
          return res.status(200).json({ message: "Successfully logged out" });  
    } catch (error) {
        next(error);
    }
});

module.exports ={
    registerUser,
    logIn,
    logOut
}
