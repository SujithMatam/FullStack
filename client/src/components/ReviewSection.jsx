import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { addReview } from '../services/api';
import './ReviewSection.css';

const ReviewSection = ({ blogId, initialReviews = [], isLocalOnly = false, onLocalReviewAdd, onAddReview }) => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync state if initialReviews prop changes (e.g. fetched from API)
  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || newReview.comment.trim() === '') {
      setError("Please provide a rating and a comment.");
      return;
    }

    try {
      setLoading(true);
      setError('');
      if (isLocalOnly) {
        // Local-only mode: store reviews in parent component state
        const localReview = {
          id: Date.now().toString(),
          rating: newReview.rating,
          comment: newReview.comment,
          userName: user ? `${user.firstName} ${user.lastName}` : 'Anonymous',
          createdAt: new Date().toISOString(),
        };
        setReviews([localReview, ...reviews]);
        if (onLocalReviewAdd) onLocalReviewAdd(localReview);
        setNewReview({ rating: 0, comment: '' });
      } else {
        const addedReview = onAddReview 
          ? await onAddReview(blogId, newReview)
          : await addReview(blogId, newReview);
        
        setReviews([addedReview, ...reviews]);
        setNewReview({ rating: 0, comment: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post review');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    return (
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
  };

  return (
    <div className="review-section">
      <h3 className="review-title">Reviews & Comments</h3>
      
      <div className="review-form-container">
        <h4>Leave a Review</h4>
        
        {!user ? (
           <div className="auth-prompt" style={{ textAlign: 'left' }}>
             <p>You must be logged in to post a review.</p>
             <div className="auth-links" style={{ justifyContent: 'flex-start' }}>
               <Link to="/login" className="btn-login-outline">Log In</Link>
               <Link to="/register" className="btn-register-filled">Register</Link>
             </div>
           </div>
        ) : (
          <form className="review-form" onSubmit={handleRatingSubmit}>
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
          <p className="no-reviews">No reviews yet. Be the first to comment!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id || review.id} className="review-card">
              <div className="review-header">
                <span className="review-author">{review.userName || review.user}</span>
                <span className="review-date">
                  {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : review.date}
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

export default ReviewSection;
