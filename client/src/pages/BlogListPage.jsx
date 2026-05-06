import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../services/api';
import { Link } from 'react-router-dom';
import './BlogListPage.css';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />
      
      <main className="blog-list-main">
        <div className="container">
          <div className="blog-list-header">
            <h1 className="section-title">Explore Our Food Blogs</h1>
            <p className="blog-list-subtitle">Discover new recipes, restaurant reviews, and culinary adventures.</p>
          </div>

          <div className="blog-grid">
            {blogs.map(blog => (
              <BlogCard key={blog._id || blog.id} blog={{...blog, id: blog._id || blog.id}} />
            ))}
            
            {/* Create Blog Card */}
            <Link to="/blogs/create" className="create-blog-card" style={{ textDecoration: 'none' }}>
              <div className="create-blog-card-inner">
                <span className="plus-icon">+</span>
                <h3>Create a New Blog Post</h3>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogListPage;
