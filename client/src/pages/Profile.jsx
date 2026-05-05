import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile } from '../services/api';
import './Profile.css';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfileData(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-loading">Loading your profile...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              {profileData?.firstName.charAt(0)}{profileData?.lastName.charAt(0)}
            </div>
            <div className="profile-info">
              <h1>{profileData?.firstName} {profileData?.lastName}</h1>
              <p> {profileData?.email}</p>
            </div>
          </div>

          <div className="profile-content">
            <div className="profile-section">
              <h2>Your Recent Searches</h2>
              {profileData?.searchHistory && profileData.searchHistory.length > 0 ? (
                <div className="search-history-list">
                  {profileData.searchHistory.map((search, index) => (
                    <div key={index} className="search-history-item">
                      <div className="search-icon">🔍</div>
                      <div className="search-details">
                        <span className="search-query">"{search.query}"</span>
                        <span className="search-date">
                          {new Date(search.searchedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>You haven't searched for any restaurants yet.</p>
                  <button className="btn-explore" onClick={() => navigate('/')}>
                    Explore Restaurants
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
