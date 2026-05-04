import React, { useState } from 'react';

// Simplified data list for your blog
const initialRestaurants = [
  { id: 1, name: "The Curry House", rating: 4.5, loc: "Downtown", food: "Indian" },
  { id: 2, name: "Burger Point", rating: 4.0, loc: "Main Street", food: "Fast Food" },
  { id: 3, name: "Pasta Paradise", rating: 4.8, loc: "East side", food: "Italian" },
  { id: 4, name: "Sushi World", rating: 4.2, loc: "West side", food: "Japanese" },
];

const HomePage = () => {
  // State variables to store what the user types
  const [searchTerm, setSearchTerm] = useState('');
  const [displayList, setDisplayList] = useState(initialRestaurants);

  // Function to filter the list when searching
  const handleSearch = () => {
    const filtered = initialRestaurants.filter(res => 
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.loc.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayList(filtered);
  };

  return (
    <div>
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="logo">Know Your Food</div>
        <div className="nav-links">
          <button className="btn-login">Login</button>
          <button className="btn-register">Register</button>
        </div>
      </nav>

      {/* Hero / Search Section */}
      <header className="hero">
        <h1>Discover the Best Food Near You</h1>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search by name or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-search" onClick={handleSearch}>Search</button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container">
        <h2>Top Rated Restaurants</h2>
        <div className="restaurant-grid">
          {displayList.map((res) => (
            <div key={res.id} className="restaurant-card">
              <h3>{res.name}</h3>
              <p className="rating">Rating: {res.rating} ★</p>
              <p className="details">Location: {res.loc}</p>
              <p className="details">Cuisine: {res.food}</p>
              <button 
                className="btn-register" 
                style={{width: '100%', marginTop: '10px'}}
                onClick={() => alert("Review section coming soon!")}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
        {displayList.length === 0 && <p>No restaurants found. Try a different search!</p>}
      </main>
    </div>
  );
};

export default HomePage;
