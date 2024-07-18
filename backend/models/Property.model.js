const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      coordinates: {
        lat: {
          type: Number,
          required: true,
        },
        lng: {
          type: Number,
          required: true,
        },
      },
    },
    size: {
      type: Number,
      required: true,
    },
    status:{
        type: Number,
        enum: [1, 2, 3],
        default: 1
    },
    type: {
      type: String,
      enum: ['house', 'apartment', 'commercial'],
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
