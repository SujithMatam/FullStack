import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer-content">
        <div className="footer-col">
          <Link to="/" className="footer-logo">Know Your Food</Link>
          <p>
            Your ultimate guide to discovering the best dining experiences.
            Read honest reviews, explore menus, and find your next favorite
            meal with us.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home Page</Link></li>
            <li><a href="/#restaurants">All Restaurants</a></li>
            <li><a href="/#top-rated">Top Rated</a></li>
            <li><a href="/#new">New Additions</a></li>
            <li><a href="/#admin">Admin Portal</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#guidelines">Review Guidelines</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Stay Updated</h4>
          <p>Subscribe to our newsletter for the latest restaurant openings and exclusive offers!</p>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert('Subscribed successfully!');
            }}
          >
            <input type="email" placeholder="Email address" required />
            <button type="submit">Subscribe</button>
          </form>
          <div className="footer-contact-info">
            <p>📍 Amrita School of Computing</p>
            <p>📧 support@knowyourfood.com</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Know Your Food Blog. All rights reserved.</p>
        <p>Designed and developed for B.Tech CSE.</p>
      </div>
    </footer>
  );
};

export default Footer;
