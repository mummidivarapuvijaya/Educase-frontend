import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      // Clear any invalid data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      // Validate user data has required fields
      if (!parsedUser.email || !parsedUser.id) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      setUser(parsedUser);
    } catch (err) {
      // Clear invalid data on parse error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Account Settings</h1>
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <div className="avatar-circle">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="camera-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 19.5V6.5C2 5.67157 2.67157 5 3.5 5H7.5L9.5 3H14.5L16.5 5H20.5C21.3284 5 22 5.67157 22 6.5V19.5C22 20.3284 21.3284 21 20.5 21H3.5C2.67157 21 2 20.3284 2 19.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{user.fullName || 'User'}</h2>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
        <div className="profile-divider"></div>
        <div className="profile-bio">
          <p>
            Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
          </p>
        </div>
      </div>
      <BottomNav currentPage={4} totalPages={4} />
    </div>
  );
};

export default Profile;
