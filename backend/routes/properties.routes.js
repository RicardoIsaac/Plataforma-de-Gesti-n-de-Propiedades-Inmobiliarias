const express = require('express');
const protect = require("../middleware/auth.middleware");
const { getProperties } = require('../controllers/properties.controller');
const router = express.Router();


router.get("/", protect, getProperties)

module.exports = router;