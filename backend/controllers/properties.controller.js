const asyncHandler = require("express-async-handler");

const getProperties = asyncHandler(async (req, res, next) => {
    res.status(201).json({
      message: "getProperties"
      });
})

module.exports={
    getProperties
}