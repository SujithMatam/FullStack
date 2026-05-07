import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewSection from '../components/ReviewSection';
import './BlogDetailsPage.css';

const initialRestaurants = [
  { 
    id: 1, 
    name: "The Grand Curry House", 
    rating: 4.8, 
    loc: "Downtown City Center", 
    food: "Authentic Indian",
    image: "/grandcurryhouse.png", 
    description: "Experience the ultimate authentic taste of India right in the heart of the city. Our master chefs use traditional, centuries-old recipes passed down through generations, utilizing only the freshest hand-ground spices and organic ingredients. Whether you crave a fiery, spicy vindaloo that tingles your tastebuds or a rich, creamy butter chicken that melts in your mouth, our extensive menu has something to satisfy every single palate. Enjoy our warm, inviting, and culturally rich ambiance which makes it the perfect setting for family dinners, business lunches, or romantic dates. Come join us today for a mesmerizing culinary journey you won't easily forget."
  },
  { 
    id: 2, 
    name: "Oceanic Seafood Grill", 
    rating: 4.5, 
    loc: "Westside Pier", 
    food: "Fresh Seafood",
    image: "/oceanic.png", 
    description: "Located right on the edge of the beautiful Westside Pier, Oceanic Seafood Grill offers breathtaking sunset views alongside the freshest catches of the day. We pride ourselves on our sustainable fishing partnerships, ensuring that every plate of grilled salmon, garlic butter prawns, and crispy calamari is both ethical and delicious. Our signature oyster bar is renowned across the city, featuring seasonal selections paired perfectly with our house-made zesty mignonettes. The interior features a relaxing, nautical theme that transports you straight to a luxurious cruise experience. Reserve a table on our open-air deck to enjoy the cool ocean breeze while you dine in absolute paradise."
  },
  { 
    id: 3, 
    name: "Skyline Continental Cafe", 
    rating: 4.6, 
    loc: "Uptown Financial District", 
    food: "Continental & European",
    image: "/skyline.png", 
    description: "Elevate your dining experience at the Skyline Continental Cafe, situated on the top floor of the Uptown high-rise with panoramic views of the entire metropolitan area. We bring the finest European dining traditions straight to your table, offering a sophisticated menu that ranges from classic French escargot to hearty Italian truffle risottos. Our world-class sommeliers are always on hand to help you pair your meal with the perfect vintage from our award-winning, floor-to-ceiling glass wine cellar. During the day, sunlight floods the dining room making it ideal for high-stakes business meetings, while nightfall transforms the space into an intimately lit, romantic heaven. Dress to impress and prepare for top-tier hospitality."
  },
  { 
    id: 4, 
    name: "The Rustic Urban Oven", 
    rating: 4.2, 
    loc: "Creative Arts District", 
    food: "Wood-fired Pizza & Bakery",
    image: "/rustic.png", 
    description: "Step away from the hustle and bustle and step into the warm, comforting embrace of The Rustic Urban Oven. Famous for our traditional, Neapolitan-style wood-fired pizzas, you can literally smell the beautiful aroma of baking dough and melting mozzarella from a block away. We source our tomatoes straight from local organic farms to create a perfectly balanced, tangy marinara sauce that perfectly complements our 48-hour fermented sourdough crusts. Beyond pizza, our bakery counter is loaded daily with freshly baked artisan breads, decadent chocolate lava cakes, and flaky morning pastries. Grab a slice, sit by the exposed brick fireplace, and enjoy the cozy, vintage atmosphere."
  },
];

const InitialRestaurantDetailsPage = () => {
  const { id } = useParams();
  const restaurant = initialRestaurants.find(r => r.id === Number(id));
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
        <div className="blog-hero" style={{ backgroundImage: `url(${restaurant.image})` }}>
          <div className="blog-hero-overlay">
            <div className="container">
              <h1 className="blog-hero-title">{restaurant.name}</h1>
              <div className="blog-meta">
                <span className="blog-author">📍 {restaurant.loc}</span>
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
            <p>{restaurant.description}</p>
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
