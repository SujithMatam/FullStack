import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <div className="blog-card-image-wrapper">
        <img src={blog.image} alt={blog.title} className="blog-card-image" />
      </div>
      <div className="blog-card-content">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-excerpt">{blog.shortDescription}</p>
        <div className="blog-card-footer">
          <Link to={`/blogs/${blog.id}`} className="read-more-btn">
            Read More <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
