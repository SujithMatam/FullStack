import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createBlog } from '../services/api';
import './CreateBlog.css';

const CreateBlog = ({ onBlogCreated }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    shortDescription: '',
    content: '',
    restaurant: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !formData.image || !formData.shortDescription || !formData.content) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const newBlog = await createBlog(formData);
      onBlogCreated(newBlog);
      setFormData({
        title: '',
        image: '',
        shortDescription: '',
        content: '',
        restaurant: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="create-blog-container auth-prompt">
        <h3>Want to share your own food experience?</h3>
        <p>You need to be logged in to create a blog post.</p>
        <div className="auth-links">
          <Link to="/login" className="btn-login-outline">Log In</Link>
          <Link to="/register" className="btn-register-filled">Register</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="create-blog-container">
      <h3>Create a New Blog Post</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="create-blog-form">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., The Best Burger in Town"
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL *</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="e.g., https://images.unsplash.com/photo-..."
            required
          />
        </div>
        <div className="form-group">
          <label>Short Description *</label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="A brief summary of your post"
            required
          />
        </div>
        <div className="form-group">
          <label>Restaurant Tag (Optional)</label>
          <input
            type="text"
            name="restaurant"
            value={formData.restaurant}
            onChange={handleChange}
            placeholder="e.g., Joe's Burgers"
          />
        </div>
        <div className="form-group">
          <label>Full Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="8"
            placeholder="Write your full blog post here... (Use double newlines for paragraphs)"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn-submit-blog" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
