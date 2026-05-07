import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewSection from '../components/ReviewSection';
import { AuthContext } from '../context/AuthContext';
import { getRestaurantById, getRestaurantReviews, addRestaurantReview, getBlogs } from '../services/api';
import { initialRestaurants } from '../mockData';
import './BlogDetailsPage.css'; // Reusing styling

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resData, reviewsData] = await Promise.all([
          getRestaurantById(id),
          getRestaurantReviews(id)
        ]);
        setRestaurant(resData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Failed to fetch restaurant details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Calculate average rating from reviews
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : restaurant?.rating || 0;

  if (loading) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Loading restaurant details...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Restaurant not found.</h2>
          <Link to="/restaurants" style={{ color: '#f97316' }}>Return to all restaurants</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="blog-details-main">
        {/* Hero Section */}
        <div className="blog-hero" style={{ backgroundImage: `url(${restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : '/placeholder-restaurant.jpg'})` }}>
          <div className="blog-hero-overlay">
            <div className="container">
              <h1 className="blog-hero-title">{restaurant.name}</h1>
              <div className="blog-meta">
                <span className="blog-author">📍 {restaurant.location}</span>
                <span className="separator">•</span>
                <span className="blog-date">🍽️ {restaurant.food}</span>
                <span className="separator">•</span>
                <span className="blog-restaurant">⭐ {avgRating}/5{reviews.length > 0 ? ` (${reviews.length} review${reviews.length > 1 ? 's' : ''})` : ''}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container blog-content-wrapper">
          <Link to="/restaurants" className="back-link">← Back to Restaurants</Link>
          
          <div className="blog-body">
            {restaurant.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {restaurant.googleMapLink && (
            <div style={{ margin: '40px 0', textAlign: 'center' }}>
              <a 
                href={restaurant.googleMapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-search"
                style={{ padding: '15px 30px', textDecoration: 'none', display: 'inline-block', fontSize: '18px' }}
              >
                View on Google Maps
              </a>
            </div>
          )}

          {/* Display Uploaded Images at the end */}
          {restaurant.images && restaurant.images.length > 0 && (
            <div className="restaurant-images-section" style={{ marginTop: '50px' }}>
              <h3 style={{ borderBottom: '2px solid #374151', paddingBottom: '10px', marginBottom: '20px' }}>Menu & Photos</h3>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {restaurant.images.map((imgUrl, idx) => (
                  <img key={idx} src={imgUrl} alt={`Restaurant ${idx}`} style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px', objectFit: 'cover' }} />
                ))}
              </div>
            </div>
          )}

          <hr className="divider" />

          {/* Reviews Section - Add Review Only */}
          <RestaurantReviewSection 
            restaurantId={id} 
            initialReviews={reviews}
            onReviewAdded={(newReview) => {
              setReviews(prev => [newReview, ...prev]);
            }}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// A specialized review section for DB-backed restaurants that calls the restaurant review API
const RestaurantReviewSection = ({ restaurantId, initialReviews = [], onReviewAdded }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || newReview.comment.trim() === '') {
      setError("Please provide a rating and a comment.");
      return;
    }

    try {
      setLoading(true);
      setError('');
      const addedReview = await addRestaurantReview(restaurantId, newReview);
      setReviews([addedReview, ...reviews]);
      if (onReviewAdded) onReviewAdded(addedReview);
      setNewReview({ rating: 0, comment: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post review');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating, interactive = false) => (
    <div className="stars-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (interactive ? (hoverRating || newReview.rating) : rating) ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={() => interactive && setNewReview({ ...newReview, rating: star })}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="review-section">
      <h3 className="review-title">Reviews & Comments ({reviews.length})</h3>
      
      <div className="review-form-container">
        <h4>Add a Review</h4>
        
        {!user ? (
          <div className="auth-prompt" style={{ textAlign: 'left' }}>
            <p>You must be logged in to post a review.</p>
            <div className="auth-links" style={{ justifyContent: 'flex-start' }}>
              <Link to="/login" className="btn-login-outline">Log In</Link>
              <Link to="/register" className="btn-register-filled">Register</Link>
            </div>
          </div>
        ) : (
          <form className="review-form" onSubmit={handleSubmit}>
            {error && <div className="error-message" style={{marginBottom: '10px'}}>{error}</div>}
            <div className="rating-input">
              <label>Rating:</label>
              {renderStars(newReview.rating, true)}
            </div>
            <textarea
              placeholder="Share your thoughts about this restaurant..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows="4"
              disabled={loading}
            ></textarea>
            <button type="submit" className="btn-submit-review" disabled={loading}>
              {loading ? 'Posting...' : 'Post Review'}
            </button>
          </form>
        )}
      </div>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review this restaurant!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id || review.id} className="review-card">
              <div className="review-header">
                <span className="review-author">{review.userName}</span>
                <span className="review-date">
                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ''}
                </span>
              </div>
              <div className="review-rating">
                {renderStars(review.rating)}
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;

