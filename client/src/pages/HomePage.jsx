import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { saveSearchHistory, getRestaurants } from '../services/api';
import '../index.css';

const initialRestaurants = [
  { 
    id: 1, 
    name: "The Grand Curry House", 
    rating: 4.8, 
    loc: "Downtown City Center", 
    food: "Authentic Indian",
    image: "/grandcurryhouse.png", 
    description: "Experience the ultimate authentic taste of India right in the heart of the city. Our master chefs use traditional, centuries-old recipes passed down through generations, utilizing only the freshest hand-ground spices and organic ingredients. Whether you crave a fiery, spicy vindaloo that tingles your tastebuds or a rich, creamy butter chicken that melts in your mouth, our extensive menu has something to satisfy every single palate. Enjoy our warm, inviting, and culturally rich ambiance which makes it the perfect setting for family dinners, business lunches, or romantic dates. Come join us today for a mesmerizing culinary journey you won't easily forget."
  },
  { 
    id: 2, 
    name: "Oceanic Seafood Grill", 
    rating: 4.5, 
    loc: "Westside Pier", 
    food: "Fresh Seafood",
    image: "/oceanic.png", 
    description: "Located right on the edge of the beautiful Westside Pier, Oceanic Seafood Grill offers breathtaking sunset views alongside the freshest catches of the day. We pride ourselves on our sustainable fishing partnerships, ensuring that every plate of grilled salmon, garlic butter prawns, and crispy calamari is both ethical and delicious. Our signature oyster bar is renowned across the city, featuring seasonal selections paired perfectly with our house-made zesty mignonettes. The interior features a relaxing, nautical theme that transports you straight to a luxurious cruise experience. Reserve a table on our open-air deck to enjoy the cool ocean breeze while you dine in absolute paradise."
  },
  { 
    id: 3, 
    name: "Skyline Continental Cafe", 
    rating: 4.6, 
    loc: "Uptown Financial District", 
    food: "Continental & European",
    image: "/skyline.png", 
    description: "Elevate your dining experience at the Skyline Continental Cafe, situated on the top floor of the Uptown high-rise with panoramic views of the entire metropolitan area. We bring the finest European dining traditions straight to your table, offering a sophisticated menu that ranges from classic French escargot to hearty Italian truffle risottos. Our world-class sommeliers are always on hand to help you pair your meal with the perfect vintage from our award-winning, floor-to-ceiling glass wine cellar. During the day, sunlight floods the dining room making it ideal for high-stakes business meetings, while nightfall transforms the space into an intimately lit, romantic heaven. Dress to impress and prepare for top-tier hospitality."
  },
  { 
    id: 4, 
    name: "The Rustic Urban Oven", 
    rating: 4.2, 
    loc: "Creative Arts District", 
    food: "Wood-fired Pizza & Bakery",
    image: "/rustic.png", 
    description: "Step away from the hustle and bustle and step into the warm, comforting embrace of The Rustic Urban Oven. Famous for our traditional, Neapolitan-style wood-fired pizzas, you can literally smell the beautiful aroma of baking dough and melting mozzarella from a block away. We source our tomatoes straight from local organic farms to create a perfectly balanced, tangy marinara sauce that perfectly complements our 48-hour fermented sourdough crusts. Beyond pizza, our bakery counter is loaded daily with freshly baked artisan breads, decadent chocolate lava cakes, and flaky morning pastries. Grab a slice, sit by the exposed brick fireplace, and enjoy the cozy, vintage atmosphere."
  },
];

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
                      onClick={() => {
                        if (res._id) {
                          navigate(`/restaurants/${res._id}`);
                        } else {
                          alert(`Loading full menu and reviews for ${res.name}...`);
                        }
                      }}
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
              <img src={res.image} alt={res.name} className="card-image" />
              <div className="card-info">
                <h3>{res.name}</h3>
                <span className="rating">★ {res.rating} out of 5</span>
                <div className="tags">📍 {res.loc} &nbsp; | &nbsp; 🍽️ {res.food}</div>
                <p className="description">{res.description}</p>
                <button 
                  className="btn-register" 
                  style={{width: '220px', padding: '12px'}}
                  onClick={() => alert(`Loading full menu and reviews for ${res.name}...`)}
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