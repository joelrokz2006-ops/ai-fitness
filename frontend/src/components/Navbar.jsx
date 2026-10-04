import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, clearAuthSession } from '../services/api';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Validate active non-expired session
  const token = getToken();
  const isLoggedIn = !!token;

  // 🚪 LOGOUT FUNCTION
  const handleLogout = () => {
    // Clear all auth tokens, user info, and planner cache
    clearAuthSession();
    localStorage.removeItem('userPlanner');
    
    console.log("User logged out safely.");
    
    // Redirect to login
    navigate('/login');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        AI <span>FITNESS</span>
      </div>
      
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/exercises">Exercises</Link>
        <Link to="/anatomy">Anatomy</Link>
        <Link to="/diet">Diet</Link>
        <Link to="/bmi">BMI</Link>
        <Link to="/ai-trainer">AI Trainer</Link>
        <Link to="/ai-planner">Gym Planner</Link>
         <Link to="/profile">Profile</Link>
        
        {/* 🛠️ கண்டிஷன்: லாகின் செய்திருந்தால் மட்டும் LOGOUT பட்டன் காட்டும், இல்லையென்றால் LOGIN பட்டன் காட்டும் */}
        {isLoggedIn ? (
          <button className="logout-nav-btn" onClick={handleLogout}>
            Logout 🚪
          </button>
        ) : (
          <Link to="/login" className="login-nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;