const Blog = require('../models/Blog');
const Review = require('../models/Review');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private
const createBlog = async (req, res) => {
  try {
    const { title, image, shortDescription, content, restaurant } = req.body;

    const blog = new Blog({
      title,
      image,
      shortDescription,
      content,
      restaurant,
      authorName: req.user.firstName + ' ' + req.user.lastName,
      authorId: req.user._id,
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get reviews for a blog
// @route   GET /api/blogs/:id/reviews
// @access  Public
const getReviewsByBlogId = async (req, res) => {
  try {
    const reviews = await Review.find({ blogId: req.params.id }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a review
// @route   POST /api/blogs/:id/reviews
// @access  Private
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const blogId = req.params.id;

    // Check if blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const review = new Review({
      blogId,
      rating,
      comment,
      userName: req.user.firstName + ' ' + req.user.lastName,
      userId: req.user._id,
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  getReviewsByBlogId,
  addReview,
};
