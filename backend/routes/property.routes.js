const express = require("express");
const protect = require("../middleware/auth.middleware");
const {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getProperties,
  getProperty,
} = require("../controllers/property.controller");
const router = express.Router();

router.route("/")
.post(protect, createProperty)
.get(getAllProperties);

router
  .route("/:id")
  .put(protect, updateProperty)
  .patch(protect, deleteProperty)
  .get(protect, getProperties);

router.route("/user/:id").get(protect, getProperty);

module.exports = router;
