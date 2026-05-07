import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewSection from '../components/ReviewSection';
import { initialRestaurants } from '../mockData';
import './BlogDetailsPage.css';

const InitialRestaurantDetailsPage = () => {
  const { id } = useParams();
  const restaurant = initialRestaurants.find(r => r.id === id);
  const [reviews, setReviews] = useState([]);

  // Calculate average rating from reviews
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : restaurant?.rating || 0;

  if (!restaurant) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Restaurant not found.</h2>
          <Link to="/" style={{ color: '#f97316' }}>Return to Home</Link>
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
          <Link to="/" className="back-link">← Back to Home</Link>
          
          <div className="blog-body">
            {restaurant.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <hr className="divider" />

          {/* Reviews Section - Add Review Only */}
          <ReviewSection 
            blogId={`initial-restaurant-${restaurant.id}`} 
            initialReviews={reviews}
            isLocalOnly={true}
            onLocalReviewAdd={(review) => {
              setReviews(prev => [review, ...prev]);
            }}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InitialRestaurantDetailsPage;
