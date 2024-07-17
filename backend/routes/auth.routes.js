const express = require('express');
//const protect = require("../middleware/auth.middleware")
const router = express.Router();

const {registerUser, logIn, logOut} = require("../controllers/auth.controller")

router.post("/register", registerUser)
router.post("/login", logIn)
router.post("/logout", logOut)

module.exports = router;