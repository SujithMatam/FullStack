import React, { useState } from 'react';

const initialRestaurants = [
  { 
    id: 1, 
    name: "The Grand Curry House", 
    rating: 4.8, 
    loc: "Downtown City Center", 
    food: "Authentic Indian",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop", 
    description: "Experience the ultimate authentic taste of India right in the heart of the city. Our master chefs use traditional, centuries-old recipes passed down through generations, utilizing only the freshest hand-ground spices and organic ingredients. Whether you crave a fiery, spicy vindaloo that tingles your tastebuds or a rich, creamy butter chicken that melts in your mouth, our extensive menu has something to satisfy every single palate. Enjoy our warm, inviting, and culturally rich ambiance which makes it the perfect setting for family dinners, business lunches, or romantic dates. Come join us today for a mesmerizing culinary journey you won't easily forget."
  },
  { 
    id: 2, 
    name: "Oceanic Seafood Grill", 
    rating: 4.5, 
    loc: "Westside Pier", 
    food: "Fresh Seafood",
    image: "https://images.unsplash.com/photo-1615141982883-c7da0e698d0c?q=80&w=600&auto=format&fit=crop", 
    description: "Located right on the edge of the beautiful Westside Pier, Oceanic Seafood Grill offers breathtaking sunset views alongside the freshest catches of the day. We pride ourselves on our sustainable fishing partnerships, ensuring that every plate of grilled salmon, garlic butter prawns, and crispy calamari is both ethical and delicious. Our signature oyster bar is renowned across the city, featuring seasonal selections paired perfectly with our house-made zesty mignonettes. The interior features a relaxing, nautical theme that transports you straight to a luxurious cruise experience. Reserve a table on our open-air deck to enjoy the cool ocean breeze while you dine in absolute paradise."
  },
  { 
    id: 3, 
    name: "Skyline Continental Cafe", 
    rating: 4.6, 
    loc: "Uptown Financial District", 
    food: "Continental & European",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=600&auto=format&fit=crop", 
    description: "Elevate your dining experience at the Skyline Continental Cafe, situated on the top floor of the Uptown high-rise with panoramic views of the entire metropolitan area. We bring the finest European dining traditions straight to your table, offering a sophisticated menu that ranges from classic French escargot to hearty Italian truffle risottos. Our world-class sommeliers are always on hand to help you pair your meal with the perfect vintage from our award-winning, floor-to-ceiling glass wine cellar. During the day, sunlight floods the dining room making it ideal for high-stakes business meetings, while nightfall transforms the space into an intimately lit, romantic heaven. Dress to impress and prepare for top-tier hospitality."
  },
  { 
    id: 4, 
    name: "The Rustic Urban Oven", 
    rating: 4.2, 
    loc: "Creative Arts District", 
    food: "Wood-fired Pizza & Bakery",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop", 
    description: "Step away from the hustle and bustle and step into the warm, comforting embrace of The Rustic Urban Oven. Famous for our traditional, Neapolitan-style wood-fired pizzas, you can literally smell the beautiful aroma of baking dough and melting mozzarella from a block away. We source our tomatoes straight from local organic farms to create a perfectly balanced, tangy marinara sauce that perfectly complements our 48-hour fermented sourdough crusts. Beyond pizza, our bakery counter is loaded daily with freshly baked artisan breads, decadent chocolate lava cakes, and flaky morning pastries. Grab a slice, sit by the exposed brick fireplace, and enjoy the cozy, vintage atmosphere."
  },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayList, setDisplayList] = useState(initialRestaurants);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = initialRestaurants.filter(res => 
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.loc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.food.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayList(filtered);
  };

  return (
    <div className="page-wrapper">
      
      {/* 1. Navbar */}
      <nav className="navbar">
        <div className="logo">Know Your Food</div>
        <div className="nav-links">
          <button className="btn-login">Login</button>
          <button className="btn-register">Register</button>
        </div>
      </nav>

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

      {/* 3. Main Content - Restaurant List */}
      <main className="container">
        <h2 className="section-title">Top Rated Restaurants</h2>
        
        <div className="restaurant-list">
          {displayList.map((res) => (
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
        
        {displayList.length === 0 && (
          <div style={{background: 'white', padding: '40px', borderRadius: '10px', textAlign: 'center', marginTop: '20px'}}>
            <h2 style={{color: '#ea580c'}}>No restaurants found.</h2>
            <p>We couldn't find anything matching your search. Try a different location or cuisine!</p>
            <button className="btn-search" style={{marginTop: '15px'}} onClick={() => setDisplayList(initialRestaurants)}>View All Restaurants</button>
          </div>
        )}
      </main>

      {/* 4. Contact Us Section */}
      <section className="contact-section">
        <h2>Get In Touch</h2>
        <p style={{textAlign: 'center', color: '#6b7280'}}>Have a restaurant suggestion or facing an issue? Send us a message!</p>
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent."); }}>
          <input type="text" placeholder="Your Full Name" required />
          <input type="email" placeholder="Your Email Address" required />
          <textarea placeholder="How can we help you today?" required></textarea>
          <button type="submit" className="btn-register" style={{padding: '15px', fontSize: '16px'}}>Send Message</button>
        </form>
      </section>

      {/* 5. Professional Multi-Column Footer */}
      <footer className="footer">
        <div className="footer-content">
          
          {/* Column 1: Brand & About */}
          <div className="footer-col">
            <h2 className="logo" style={{color: '#ea580c', borderBottom: 'none', marginBottom: '15px', fontSize: '28px'}}>Know Your Food</h2>
            <p>Your ultimate guide to discovering the best dining experiences. Read honest reviews, explore menus, and find your next favorite meal with us.</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home Page</a></li>
              <li><a href="#restaurants">All Restaurants</a></li>
              <li><a href="#top-rated">Top Rated</a></li>
              <li><a href="#new">New Additions</a></li>
              <li><a href="#admin">Admin Portal</a></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
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

          {/* Column 4: Contact & Newsletter */}
          <div className="footer-col">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest restaurant openings and exclusive offers!</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); }}>
              <input type="email" placeholder="Email address" required />
              <button type="submit">Subscribe</button>
            </form>
            <div style={{marginTop: '20px', color: '#9ca3af'}}>
              <p>📍 Amrita School of Computing</p>
              <p>📧 support@knowyourfood.com</p>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 Know Your Food Blog. All rights reserved.</p>
          <p>Designed and developed for B.Tech CSE.</p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
