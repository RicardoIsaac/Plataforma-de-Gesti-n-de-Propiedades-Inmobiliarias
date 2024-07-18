const asyncHandler = require("express-async-handler");
const Property = require("../models/Property.model");

const getAllProperties = asyncHandler(async (req, res, next) => {
  try {
    const property = await Property.find({});
    return res.status(201).json({
      property,
    });
  } catch (error) {
    next(error);
  }
});

const createProperty = asyncHandler(async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      country,
      state,
      city,
      lat,
      lng,
      size,
      type,
      userId,
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !country ||
      !state ||
      !city ||
      !lat ||
      !lng ||
      !size ||
      !type ||
      !userId
    ) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }
    const newProperty = new Property({
      title,
      description,
      price,
      location: {
        country,
        state,
        city,
        coordinates: {
          lat,
          lng,
        },
      },
      size,
      type,
      user: userId,
    });
    const savedProperty = await newProperty.save();
    return res.status(201).json(savedProperty);
  } catch (error) {
    next(error);
  }
});

const updateProperty = asyncHandler(async (req, res, next) => {
  const {title,description,price,country,state,city,lat,lng,size,type,userId,} = req.body;
  const { id } = req.params;
  try {
    if (!title ||!description ||!price ||!country ||!state ||!city ||!lat ||!lng ||!size ||!type ||!userId) {
      res.status(400);
      throw new Error("Please fill in all required fields");
    }
    const property = await Property.findByIdAndUpdate(id, req.body, { new: true });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    next(error)
  }
});

const deleteProperty = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const property = await Property.findByIdAndUpdate(
      id,
      { status: 2 },
      { new: true }
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {}
});

const getProperties = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const properties = await Property.find({ user: userId });
    if (!properties || properties.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found for this user" });
    }
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
});
const getProperty = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

module.exports = {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getProperties,
  getProperty
};
