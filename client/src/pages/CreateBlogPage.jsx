import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createBlog, uploadImage, getRestaurants } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './CreateBlogPage.css';

const CreateBlogPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    content: '',
    restaurant: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error('Failed to fetch restaurants', err);
      }
    };
    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !imageFile || !formData.shortDescription || !formData.content) {
      setError('Please fill in all required fields and select an image.');
      setLoading(false);
      return;
    }

    try {
      // 1. Upload Image
      const imageUrl = await uploadImage(imageFile);

      // 2. Create Blog with the returned image URL
      const blogDataToSubmit = {
        ...formData,
        image: imageUrl
      };
      
      const newBlog = await createBlog(blogDataToSubmit);
      
      // Redirect to the newly created blog
      navigate(`/blogs/${newBlog._id}`);
      
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Failed to create blog');
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="container create-page-main">
          <div className="auth-prompt-card">
            <h3>Want to share your own food experience?</h3>
            <p>You need to be logged in to create a blog post.</p>
            <div className="auth-links">
              <Link to="/login" className="btn-login-outline">Log In</Link>
              <Link to="/register" className="btn-register-filled">Register</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="container create-page-main">
        <div className="create-blog-wrapper">
          <div className="create-header">
            <h2>Create a New Blog Post</h2>
            <Link to="/blogs" className="back-link">← Back to Blogs</Link>
          </div>

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
            
            <div className="form-group file-upload-group">
              <label>Upload Image *</label>
              <div 
                className={`image-upload-area ${imagePreview ? 'has-image' : ''}`} 
                onClick={() => fileInputRef.current.click()}
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">📷</span>
                    <span>Click to browse from your laptop</span>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
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
              <select
                name="restaurant"
                value={formData.restaurant}
                onChange={handleChange}
                style={{
                  backgroundColor: '#374151',
                  color: '#f3f4f6',
                  padding: '12px 15px',
                  border: '2px solid #4b5563',
                  borderRadius: '8px',
                  fontSize: '16px',
                  width: '100%'
                }}
              >
                <option value="">Select a restaurant...</option>
                {restaurants.map((res) => (
                  <option key={res._id} value={res.name}>{res.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Full Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="10"
                placeholder="Write your full blog post here... (Use double newlines for paragraphs)"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-submit-blog" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Blog'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateBlogPage;
