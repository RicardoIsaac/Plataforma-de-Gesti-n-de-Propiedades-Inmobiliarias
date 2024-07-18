const asyncHandler = require("express-async-handler");
const PropertyList = require("../models/PropertyList.model");
const Property = require("../models/Property.model");

const getAllPropertiesList = asyncHandler(async (req, res, next) => {
    try {
      const propertyList = await PropertyList.find({});
      return res.status(201).json({
        propertyList,
      });
    } catch (error) {
      next(error);
    }
  });

const createList = asyncHandler(async (req, res, next) => {
    try {
        const {userId, listName} = req.body
        if (!userId ||!listName){
            res.status(400);
            throw new Error("Please fill in all required fields");
        }
        const newList = await new PropertyList({
            ...req.body
        }).save();
        return res.status(201).json(newList);
    } catch (error) {
        next(error);
    }
})

const addPropertyToList = asyncHandler(async (req, res, next) => {
    const { listID, propertyId } = req.body;
    try {
      const property = await Property.findById(propertyId);
      if (!property || property.status !== 1) {
        res.status(400);
        throw new Error("Property not found or not active");
      }
      const list = await PropertyList.findById(listID);
      if (!list) {
        res.status(400);
        throw new Error("Property list not found");
      }
      list.properties.push(propertyId);
      await list.save();
      res.status(200).json({ message: "Property added to list", list });
    } catch (error) {
      next(error);
    }
  });

  const removePropertyFromList = asyncHandler(async (req, res, next) => {
    const { listID, propertyId } = req.body;
    try {
      const list = await PropertyList.findById(listID);
      if (!list) {
        res.status(400);
        throw new Error("Property list not found");
      }
      const propertyIndex = list.properties.indexOf(propertyId);
      if (propertyIndex === -1) {
        res.status(400);
        throw new Error("Property not found in the list");
      }
      list.properties.splice(propertyIndex, 1);
      await list.save();
      res.status(200).json({ message: "Property removed from list", list });
    } catch (error) {
      next(error);
    }
  });

  const deletePropertyList = asyncHandler(async (req, res, next) => {
    const { listID } = req.params;
  
    try {
      const list = await PropertyList.findByIdAndDelete(listID);
      if (!list) {
        return res.status(404).json({ message: 'Property list not found' });
      }
      res.status(200).json({ message: 'Property list deleted successfully' });
    } catch (error) {
      next(error);
    }
  });

  module.exports = {
    getAllPropertiesList,
    createList,
    addPropertyToList,
    removePropertyFromList,
    deletePropertyList
  }