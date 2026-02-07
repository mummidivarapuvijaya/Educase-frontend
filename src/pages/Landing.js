import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">Welcome to PopX</h1>
        <p className="landing-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <div className="landing-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/signup')}
          >
            Create Account
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
      
      <BottomNav currentPage={1} totalPages={4} />
    </div>
  );
};

export default Landing;
