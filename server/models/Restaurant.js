const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    googleMapLink: {
      type: String,
    },
    food: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
