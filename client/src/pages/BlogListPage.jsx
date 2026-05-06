import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { mockBlogs } from '../mockData';
import './BlogListPage.css';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // In the future, this will be an API call to the backend
    // For now, we use the mock data
    setBlogs(mockBlogs);
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
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogListPage;
