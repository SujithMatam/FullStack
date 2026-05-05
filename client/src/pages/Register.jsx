import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message.text) setMessage({ type: '', text: '' });
  };

  // Password strength calculator
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '' };

    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score: 1, label: 'Weak', class: 'weak' };
    if (score <= 3) return { score: 2, label: 'Medium', class: 'medium' };
    return { score: 3, label: 'Strong', class: 'strong' };
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Client-side validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Please fill in all fields.' });
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      setLoading(false);
      return;
    }

    // Simulate API call — replace with actual JWT registration later
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage({ type: 'success', text: 'Account created successfully! Redirecting...' });
      setTimeout(() => navigate('/login'), 1500);
    } catch {
      setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Floating particles */}
      <div className="auth-particles">
        <span /><span /><span /><span />
        <span /><span /><span /><span />
      </div>

      <div className="auth-container">
        <div className="auth-card">
          {/* Brand Header */}
          <div className="auth-brand">
            <div className="auth-brand-icon">🍽️</div>
            <h1>Create Account</h1>
            <p>Join our food community today</p>
          </div>

          {/* Message */}
          {message.text && (
            <div className={`auth-message ${message.type}`} style={{ marginBottom: 16 }}>
              {message.type === 'error' ? '⚠' : '✓'} {message.text}
            </div>
          )}

          {/* Register Form */}
          <form className="auth-form" onSubmit={handleSubmit} id="register-form">
            <div className="auth-name-row">
              <div className="auth-input-group">
                <label htmlFor="register-first-name">First Name</label>
                <div className="auth-input-wrapper">
                  <input
                    id="register-first-name"
                    type="text"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    required
                  />
                  <span className="auth-input-icon">👤</span>
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="register-last-name">Last Name</label>
                <div className="auth-input-wrapper">
                  <input
                    id="register-last-name"
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                    required
                  />
                  <span className="auth-input-icon">👤</span>
                </div>
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="register-email">Email Address</label>
              <div className="auth-input-wrapper">
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="chef@restaurant.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
                <span className="auth-input-icon">✉</span>
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="register-password">Password</label>
              <div className="auth-input-wrapper">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <span className="auth-input-icon">🔒</span>
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
              {/* Password Strength Indicator */}
              {formData.password && (
                <>
                  <div className="password-strength">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`password-strength-bar ${
                          passwordStrength.score >= level ? `active ${passwordStrength.class}` : ''
                        }`}
                      />
                    ))}
                  </div>
                  <div className={`password-strength-text ${passwordStrength.class}`}>
                    {passwordStrength.label} password
                  </div>
                </>
              )}
            </div>

            <div className="auth-input-group">
              <label htmlFor="register-confirm-password">Confirm Password</label>
              <div className="auth-input-wrapper">
                <input
                  id="register-confirm-password"
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <span className="auth-input-icon">🔒</span>
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`auth-submit-btn ${loading ? 'loading' : ''}`}
              id="register-submit"
              disabled={loading}
            >
              <span>
                {loading ? <div className="auth-spinner" /> : 'Create Account'}
              </span>
            </button>

            <div className="auth-divider">
              <span>or sign up with</span>
            </div>

            <div className="auth-social-buttons">
              <button type="button" className="auth-social-btn" id="register-google">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button type="button" className="auth-social-btn" id="register-github">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}