const mongoose = require("mongoose");

const propertyListSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listName: {
      type: String,
      required: true,
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PropertyList = mongoose.model("PropertyList", propertyListSchema);

module.exports = PropertyList;
