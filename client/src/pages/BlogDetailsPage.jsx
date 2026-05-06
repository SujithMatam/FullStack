import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewSection from '../components/ReviewSection';
import { getBlogById, getReviews } from '../services/api';
import './BlogDetailsPage.css';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchBlogAndReviews = async () => {
      try {
        const blogData = await getBlogById(id);
        setBlog(blogData);
        
        const reviewsData = await getReviews(id);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Failed to fetch blog details", error);
      }
    };
    fetchBlogAndReviews();
  }, [id]);

  if (!blog) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>Blog not found.</h2>
          <Link to="/blogs" style={{ color: '#f97316' }}>Return to all blogs</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="blog-details-main">
        {/* Hero Image Section */}
        <div className="blog-hero" style={{ backgroundImage: `url(${blog.image})` }}>
          <div className="blog-hero-overlay">
            <div className="container">
              <h1 className="blog-hero-title">{blog.title}</h1>
              <div className="blog-meta">
                <span className="separator">•</span>
                <span className="blog-author">By {blog.authorName}</span>
                <span className="blog-date">{blog.date}</span>
                {blog.restaurant && (
                  <>
                    <span className="separator">•</span>
                    <span className="blog-restaurant">🍽️ {blog.restaurant}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Main Content Area */}
          <div className="blog-content-wrapper">
            <div className="blog-content">
              {/* Split content by newlines to render paragraphs */}
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Review Section */}
          <ReviewSection blogId={id} initialReviews={reviews} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetailsPage;
