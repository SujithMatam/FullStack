import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { getRestaurants, createRestaurant, uploadImage } from '../services/api';
import '../index.css';

const RestaurantListPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Create form state
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    googleMapLink: '',
    food: '',
    rating: 0,
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!user) {
      setFormError('You must be logged in to create a restaurant.');
      return;
    }

    if (!agreedToTerms) {
      setFormError('You must agree to the terms and conditions.');
      return;
    }

    if (!formData.name || !formData.description || !formData.location || !formData.food) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setFormLoading(true);

    try {
      let imageUrls = [];
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const uploadedUrl = await uploadImage(file);
          imageUrls.push(uploadedUrl);
        }
      }

      const newRestaurant = await createRestaurant({
        ...formData,
        images: imageUrls,
      });

      // Clear form
      setFormData({ name: '', description: '', location: '', googleMapLink: '', food: '', rating: 0 });
      setImageFiles([]);
      setImagePreviews([]);
      setAgreedToTerms(false);
      
      // Refresh list
      await fetchRestaurants();
      
      alert('Restaurant created successfully!');

    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.message || err.message || 'Failed to create restaurant');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <header className="hero" style={{ padding: '60px 20px', borderBottom: 'none' }}>
        <h1>Restaurants in Kerala</h1>
        <p>Explore all the amazing dining spots across the state.</p>
      </header>

      <main className="container" style={{ marginTop: '0' }}>
        {loading ? (
          <h2 style={{ textAlign: 'center', color: '#f3f4f6' }}>Loading restaurants...</h2>
        ) : (
          <div className="restaurant-list">
            {restaurants.length === 0 ? (
              <h2 style={{ textAlign: 'center', color: '#f97316' }}>No restaurants available.</h2>
            ) : (
              restaurants.map((res) => (
                <div key={res._id} className="restaurant-list-card">
                  <img src={res.images && res.images.length > 0 ? res.images[0] : '/placeholder-restaurant.jpg'} alt={res.name} className="card-image" />
                  <div className="card-info">
                    <h3>{res.name}</h3>
                    <span className="rating">★ {res.rating || 0} out of 5</span>
                    <div className="tags">📍 {res.location} &nbsp; | &nbsp; 🍽️ {res.food}</div>
                    <p className="description">{res.description}</p>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button 
                        className="btn-register" 
                        style={{ padding: '10px 20px' }}
                        onClick={() => navigate(`/restaurants/${res._id}`)}
                      >
                        View Details
                      </button>
                      {res.googleMapLink && (
                        <a 
                          href={res.googleMapLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn-search"
                          style={{ padding: '10px 20px', textDecoration: 'none', display: 'inline-block' }}
                        >
                          Google Maps
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Create Restaurant Section */}
        <section className="contact-section" style={{ marginTop: '80px', maxWidth: '800px' }}>
          <h2>Add a New Restaurant</h2>
          <p style={{textAlign: 'center', color: '#9ca3af', marginBottom: '30px'}}>
            Know a great place in Kerala? Add it to our list!
          </p>
          
          {formError && <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #ef4444' }}>{formError}</div>}

          <form className="contact-form" onSubmit={handleCreateRestaurant}>
            <input 
              type="text" 
              name="name" 
              placeholder="Restaurant Name *" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            
            <input 
              type="text" 
              name="food" 
              placeholder="Cuisine Type (e.g. South Indian, Seafood) *" 
              value={formData.food} 
              onChange={handleChange} 
              required 
            />
            
            <input 
              type="text" 
              name="location" 
              placeholder="Location (e.g. Kochi, Kerala) *" 
              value={formData.location} 
              onChange={handleChange} 
              required 
            />
            
            <input 
              type="url" 
              name="googleMapLink" 
              placeholder="Google Maps Link (Optional)" 
              value={formData.googleMapLink} 
              onChange={handleChange} 
            />

            <div className="rating-input" style={{ margin: '15px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <label style={{ color: '#f3f4f6' }}>Initial Rating:</label>
              <div className="stars-container">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= (formData.rating) ? 'filled' : ''} interactive`}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    style={{ fontSize: '24px', cursor: 'pointer', color: star <= formData.rating ? '#f97316' : '#374151' }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <textarea 
              name="description" 
              placeholder="Restaurant Description *" 
              value={formData.description} 
              onChange={handleChange} 
              required
              rows="4"
            ></textarea>

            <div style={{ margin: '10px 0' }}>
              <label style={{ display: 'block', marginBottom: '10px', color: '#f3f4f6' }}>Upload Menu / Image:</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                ref={fileInputRef}
                multiple
                style={{ backgroundColor: 'transparent', border: 'none', padding: '0' }}
              />
              {imagePreviews.length > 0 && (
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {imagePreviews.map((preview, idx) => (
                    <img key={idx} src={preview} alt={`Preview ${idx}`} style={{ maxWidth: '100px', borderRadius: '8px' }} />
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '15px 0' }}>
              <input 
                type="checkbox" 
                id="terms" 
                checked={agreedToTerms} 
                onChange={(e) => setAgreedToTerms(e.target.checked)} 
                style={{ width: 'auto', margin: '0' }}
              />
              <label htmlFor="terms" style={{ color: '#d1d5db', fontSize: '14px' }}>
                I agree to the terms and conditions and confirm this information is accurate.
              </label>
            </div>

            <button type="submit" className="btn-register" style={{padding: '15px', fontSize: '16px'}} disabled={formLoading}>
              {formLoading ? 'Adding...' : 'Create Restaurant'}
            </button>
          </form>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default RestaurantListPage;
