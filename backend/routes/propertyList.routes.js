const express = require("express");
const protect = require("../middleware/auth.middleware");
const {
    getAllPropertiesList,
    createList,
    addPropertyToList,
    removePropertyFromList,
    deletePropertyList,
} = require("../controllers/propertyList.controller");

const router = express.Router();

router.route("/")
.get(protect, getAllPropertiesList)
.post(protect, createList);

router.route("/delete/:id")
.delete(protect, deletePropertyList)

router.route("/add")
.post(protect, addPropertyToList)

router.route("/remove")
.post(protect, removePropertyFromList)

module.exports = router