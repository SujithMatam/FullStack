import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { getRestaurantById, getBlogs } from '../services/api';
import { initialRestaurants } from '../mockData';
import './BlogDetailsPage.css'; // Reusing styling

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  
  const [restaurant, setRestaurant] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Check if it's one of the initial restaurants first
        const staticRes = initialRestaurants.find(r => r.id === id);
        
        const blogsData = await getBlogs();
        setRelatedBlogs(blogsData.filter(blog => blog.restaurant === (staticRes ? staticRes.name : '')));

        if (staticRes) {
          setRestaurant(staticRes);
          // If it's static, we still want to filter blogs by name
          const filtered = blogsData.filter(blog => blog.restaurant === staticRes.name);
          setRelatedBlogs(filtered);
        } else {
          // If not static, fetch from API
          const resData = await getRestaurantById(id);
          setRestaurant(resData);
          const filtered = blogsData.filter(blog => blog.restaurant === resData.name);
          setRelatedBlogs(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch restaurant details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
                <span className="blog-restaurant">⭐ {restaurant.rating || 0}/5</span>
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

          {/* Reviews Section */}
          <section className="reviews-section">
            <h3>Reviews & Blogs ({relatedBlogs.length})</h3>
            
            <div className="add-review" style={{ textAlign: 'center', padding: '20px' }}>
              <p>Want to write a review? Create a blog post about your experience!</p>
              <Link to="/blogs/create" className="btn-register" style={{ display: 'inline-block', padding: '10px 20px', textDecoration: 'none', marginTop: '10px' }}>
                Create a Blog Post
              </Link>
            </div>

            <div className="reviews-list">
              {relatedBlogs.length === 0 ? (
                <p className="no-reviews">No reviews yet. Be the first to write a blog about {restaurant.name}!</p>
              ) : (
                relatedBlogs.map(blog => (
                  <div key={blog._id} className="review-card">
                    <div className="review-header">
                      <span className="review-user">{blog.authorName}</span>
                    </div>
                    <span className="review-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <p className="review-comment">
                      <strong>{blog.title}</strong><br />
                      {blog.shortDescription}
                    </p>
                    <Link to={`/blogs/${blog._id}`} style={{ color: '#f97316', fontSize: '14px' }}>Read Full Blog</Link>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantDetailsPage;
