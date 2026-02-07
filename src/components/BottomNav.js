import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = ({ currentPage, totalPages = 4 }) => {
  const navigate = useNavigate();

  const getPageRoute = (page) => {
    const routes = ['/', '/login', '/signup', '/profile'];
    return routes[page - 1] || '/';
  };

  const handleHome = () => {
    navigate('/');
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      navigate(getPageRoute(prevPage));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      navigate(getPageRoute(nextPage));
    }
  };

  return (
    <div className="bottom-nav">
      <div className="nav-icon" onClick={handleHome}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="nav-arrow" onClick={handlePrevious}>
        &lt;
      </div>
      <div className="nav-page">{currentPage} of {totalPages}</div>
      <div className="nav-arrow" onClick={handleNext}>
        &gt;
      </div>
    </div>
  );
};

export default BottomNav;
