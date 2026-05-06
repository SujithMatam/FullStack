import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar" id="main-navbar">
      <Link to="/" className="logo" id="navbar-logo">
        Know Your Food
      </Link>

      <ul className="nav-menu" id="nav-menu">
        <li>
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/blogs"
            className={`nav-link ${location.pathname.startsWith('/blogs') ? 'active' : ''}`}
          >
            Blogs
          </Link>
        </li>
        <li>
          <a href="/#restaurants" className="nav-link">
            Restaurants
          </a>
        </li>
        <li>
          <a href="/#contact" className="nav-link">
            Contact
          </a>
        </li>
      </ul>

      <div className="nav-auth" id="nav-auth-buttons">
        {user ? (
          <>
            <Link to="/profile" className="btn-username" id="nav-profile-btn">
              <span className="user-icon">👤</span>
              {user.firstName}
            </Link>
            <button onClick={handleLogout} className="btn-logout" id="nav-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-login" id="nav-login-btn">
              Login
            </Link>
            <Link to="/register" className="btn-register" id="nav-register-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
