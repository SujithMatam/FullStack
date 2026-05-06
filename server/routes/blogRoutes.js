const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  createBlog,
  getReviewsByBlogId,
  addReview,
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, createBlog);
router.route('/:id').get(getBlogById);
router.route('/:id/reviews').get(getReviewsByBlogId).post(protect, addReview);

module.exports = router;
