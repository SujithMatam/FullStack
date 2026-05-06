const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
