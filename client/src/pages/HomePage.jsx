import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { saveSearchHistory, getRestaurants } from '../services/api';
import { initialRestaurants } from '../mockData';
import '../index.css';


const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [displayList, setDisplayList] = useState(initialRestaurants);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();
        setAllRestaurants(data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setDisplayList(initialRestaurants);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    const filtered = allRestaurants.filter(res => 
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.food.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayList(filtered);

    // Save search history if user is logged in
    if (user && searchTerm.trim()) {
      try {
        await saveSearchHistory(searchTerm);
      } catch (error) {
        console.error('Failed to save search history', error);
      }
    }
  };

  return (
    <div className="page-wrapper">
      
      {/* Navbar Component */}
      <Navbar />

      {/* 2. Hero Section */}
      <header className="hero">
        <h1>Discover the Best Food Near You</h1>
        <p>Explore honest reviews, ratings, and menus from top-rated restaurants in your city.</p>
        <form className="search-box" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search by name, location, or cuisine..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn-search">Search</button>
        </form>
      </header>

      {/* Search Results Section */}
      {isSearching && (
        <main className="container" style={{ marginTop: '20px' }}>
          <h2 className="section-title" style={{ borderBottomColor: '#3b82f6' }}>Search Results</h2>
          
          <div className="restaurant-list">
            {displayList.length === 0 ? (
              <div style={{background: 'rgba(31, 41, 55, 0.95)', border: '1px solid #374151', padding: '40px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.6)'}}>
                <h2 style={{color: '#f97316'}}>Not available.</h2>
                <p style={{color: '#d1d5db'}}>We couldn't find anything matching your search. Try a different location or cuisine!</p>
                <button className="btn-search" style={{marginTop: '15px'}} onClick={() => {setDisplayList(initialRestaurants); setSearchTerm(''); setIsSearching(false);}}>Clear Search</button>
              </div>
            ) : (
              displayList.map((res) => (
                <div key={res._id || res.id} className="restaurant-list-card">
                  <img src={res.images && res.images.length > 0 ? res.images[0] : res.image} alt={res.name} className="card-image" />
                  <div className="card-info">
                    <h3>{res.name}</h3>
                    <span className="rating">★ {res.rating || 0} out of 5</span>
                    <div className="tags">📍 {res.location || res.loc} &nbsp; | &nbsp; 🍽️ {res.food}</div>
                    <p className="description">{res.description}</p>
                    <button 
                      className="btn-register" 
                      style={{width: '220px', padding: '12px'}}
                      onClick={() => navigate(`/restaurants/${res._id || res.id}`)}
                    >
                      Read Full Reviews
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      )}

      {/* 3. Main Content - Restaurant List */}
      <main className="container" id="restaurants">
        <h2 className="section-title">Top Rated Restaurants</h2>
        
        <div className="restaurant-list">
          {initialRestaurants.map((res) => (
            <div key={res.id} className="restaurant-list-card">
              <img src={res.images[0]} alt={res.name} className="card-image" />
              <div className="card-info">
                <h3>{res.name}</h3>
                <span className="rating">★ {res.rating} out of 5</span>
                <div className="tags">📍 {res.location} &nbsp; | &nbsp; 🍽️ {res.food}</div>
                <p className="description">{res.description}</p>
                <button 
                  className="btn-register" 
                  style={{width: '220px', padding: '12px'}}
                  onClick={() => navigate(`/restaurants/initial/${res.id}`)}
                >
                  Read Full Reviews
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. Contact Us Section */}
      <section className="contact-section" id="contact">
        <h2>Get In Touch</h2>
        <p style={{textAlign: 'center', color: '#9ca3af'}}>Have a restaurant suggestion or facing an issue? Send us a message!</p>
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent."); }}>
          <input type="text" placeholder="Your Full Name" required />
          <input type="email" placeholder="Your Email Address" required />
          <textarea placeholder="How can we help you today?" required></textarea>
          <button type="submit" className="btn-register" style={{padding: '15px', fontSize: '16px'}}>Send Message</button>
        </form>
      </section>

      {/* Footer Component */}
      <Footer />

    </div>
  );
};

export default HomePage;