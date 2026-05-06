const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get restaurant by ID
// @route   GET /api/restaurants/:id
// @access  Public
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new restaurant
// @route   POST /api/restaurants
// @access  Private (or Public based on requirements, assuming Private)
const createRestaurant = async (req, res) => {
  try {
    const { name, description, location, googleMapLink, food, images } = req.body;

    const restaurant = new Restaurant({
      name,
      description,
      location,
      googleMapLink,
      food,
      images,
      rating: 0,
    });

    const createdRestaurant = await restaurant.save();
    res.status(201).json(createdRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get reviews for a restaurant
// @route   GET /api/restaurants/:id/reviews
// @access  Public
const getRestaurantReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.id }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a review to a restaurant
// @route   POST /api/restaurants/:id/reviews
// @access  Private
const addRestaurantReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const restaurantId = req.params.id;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const review = new Review({
      restaurantId,
      rating: Number(rating),
      comment,
      userName: req.user.firstName + ' ' + req.user.lastName,
      userId: req.user._id,
    });

    await review.save();

    // Update restaurant rating
    const reviews = await Review.find({ restaurantId });
    const numReviews = reviews.length;
    const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
    restaurant.rating = Number((totalRating / numReviews).toFixed(1));
    await restaurant.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  getRestaurantReviews,
  addRestaurantReview,
};
