import React, { useState } from 'react';
import './ReviewSection.css';

const ReviewSection = ({ initialReviews = [] }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '', user: 'Guest User' });
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || newReview.comment.trim() === '') {
      alert("Please provide a rating and a comment.");
      return;
    }

    const reviewToAdd = {
      id: Date.now().toString(),
      user: newReview.user,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ rating: 0, comment: '', user: 'Guest User' });
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
        <form className="review-form" onSubmit={handleRatingSubmit}>
          <div className="rating-input">
            <label>Rating:</label>
            {renderStars(newReview.rating, true)}
          </div>
          <textarea
            placeholder="Share your thoughts about this post or restaurant..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            rows="4"
          ></textarea>
          <button type="submit" className="btn-submit-review">Post Review</button>
        </form>
      </div>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to comment!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <span className="review-author">{review.user}</span>
                <span className="review-date">{review.date}</span>
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
