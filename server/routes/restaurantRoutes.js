const express = require('express');
const router = express.Router();
const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  getRestaurantReviews,
  addRestaurantReview,
} = require('../controllers/restaurantController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getRestaurants).post(protect, createRestaurant);
router.route('/:id').get(getRestaurantById);
router.route('/:id/reviews').get(getRestaurantReviews).post(protect, addRestaurantReview);

module.exports = router;
