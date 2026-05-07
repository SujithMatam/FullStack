import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { submitContact } from '../services/api';
import '../index.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await submitContact(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <header className="hero" style={{ padding: '60px 20px' }}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Send us a message and we'll get back to you as soon as possible.</p>
      </header>

      <main className="container">
        <section className="contact-section" style={{ maxWidth: '800px', margin: '40px auto' }}>
          {success && (
            <div style={{ 
              backgroundColor: 'rgba(34, 197, 94, 0.1)', 
              color: '#22c55e', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '20px', 
              border: '1px solid #22c55e',
              textAlign: 'center'
            }}>
              Thank you! Your message has been saved successfully.
            </div>
          )}

          {error && (
            <div style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              color: '#ef4444', 
              padding: '15px', 
              borderRadius: '8px', 
              marginBottom: '20px', 
              border: '1px solid #ef4444',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Full Name *" 
                value={formData.name}
                onChange={handleChange}
                required 
                style={{ width: '100%' }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email Address *" 
                value={formData.email}
                onChange={handleChange}
                required 
                style={{ width: '100%' }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <textarea 
                name="message" 
                placeholder="How can we help you today? *" 
                value={formData.message}
                onChange={handleChange}
                required 
                rows="6"
                style={{ width: '100%' }}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn-register" 
              style={{ padding: '15px', fontSize: '16px', width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>

        <section style={{ margin: '60px 0', textAlign: 'center', color: '#9ca3af' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ color: '#f3f4f6', marginBottom: '10px' }}>📍 Location</h3>
              <p>Amritapuri, Vallikavu, Kerela</p>
            </div>
            <div>
              <h3 style={{ color: '#f3f4f6', marginBottom: '10px' }}>📧 Email</h3>
              <p>support@knowyourfood.com</p>
            </div>
            <div>
              <h3 style={{ color: '#f3f4f6', marginBottom: '10px' }}>📞 Phone</h3>
              <p>+91 6381538796</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
