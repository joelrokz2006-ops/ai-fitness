// client/src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); 
  const isLoggedIn = !!token; 

  const handleProtectedNavigation = (path) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      alert("Please login first to access this feature!");
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      
      {/* 1. HERO SECTION */}
      <div className="hero-section">
        <div className="glow-effect-orb"></div>
        <div className="badge-container">
          <span className="premium-badge-text">⚡ FITNESS ERA</span>
        </div>
        <h1 className="hero-title">
          NO MORE<br />
          <span className="hero-accent">EXCUSES.</span>
        </h1>
        <p className="hero-subtitle">
         YOU DON'T GET WHAT YOU WISH FOR,YOU GET WHAT YOU WORK FOR.
        </p>
        <div className="hero-cta-group">
          <button className="cta-button primary" onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}>
            {isLoggedIn ? '💪 Go to Dashboard' : '🔥 Get Started Free'}
          </button>
          <button className="cta-button secondary" onClick={() => handleProtectedNavigation('/dashboard')}>
            📊 Analytics Dashboard
          </button>
        </div>
      </div>

      {/* 2. REAL HUMAN PROFILE ROTATING BIOMETRIC ANATOMY DIAGNOSTICS */}
      <div className="home-section-wrapper">
        <h2 className="section-title">
          <span>Anatomy Diagnostics</span>
          Target Specific Muscle Groups
        </h2>
        
        <div className="muscle-viewer-container">
          <div className="anatomy-box-hud">
            {/* Radar Scan Laser Line */}
            <div className="hud-scanner-line"></div>
            
            <div className="anatomy-3d-stage">
              <div className="anatomy-spin-engine">
                
                {/* CYBERNETIC HUMAN BODY BLUEPRINT SCHEMA */}
                <div className="human-body-blueprint">
                  
                  {/* Human Vector Body SVG Outline */}
                  <svg className="human-vector-silhouette" viewBox="0 0 100 220">
                    {/* Head */}
                    <circle cx="50" cy="25" r="12" />
                    {/* Neck */}
                    <path d="M46 37 h8 v10 h-8 z" />
                    {/* Torso / Chest */}
                    <path d="M30 47 h40 l-6 55 h-28 z" />
                    {/* Spine / Waist */}
                    <path d="M36 102 h28 v12 h-28 z" />
                    {/* Hips */}
                    <path d="M33 114 h34 l-4 20 h-26 z" />
                    {/* Left Arm */}
                    <path d="M28 49 l-10 32 l-4 25 c-1,3 -4,1 -3,-2 l5,-26 l10,-30 z" />
                    {/* Right Arm */}
                    <path d="M72 49 l10 32 l4 25 c1,3 4,1 3,-2 l-5,-26 l-10,-30 z" />
                    {/* Left Leg */}
                    <path d="M35 134 l-3 45 l-2 35 c0,2 -3,2 -3,0 l3,-37 l4,-43 z" />
                    {/* Right Leg */}
                    <path d="M65 134 l3 45 l2 35 c0,2 3,2 3,0 l-3,-37 l-4,-43 z" />
                  </svg>
                  
                  {/* INTERACTIVE BIOMETRIC HUD TARGET NODES OVERLAY */}
                  <div className="muscle-node-3d head" onClick={() => handleProtectedNavigation('/anatomy')} data-label="HEAD">
                    <span className="node-radar-dot"></span>
                  </div>
                  <div className="muscle-node-3d shoulder-l" onClick={() => handleProtectedNavigation('/anatomy')} data-label="DELT">
                    <span className="node-radar-dot"></span>
                  </div>
                  <div className="muscle-node-3d shoulder-r" onClick={() => handleProtectedNavigation('/anatomy')} data-label="DELT">
                    <span className="node-radar-dot"></span>
                  </div>
                  <div className="muscle-node-3d chest" onClick={() => handleProtectedNavigation('/anatomy')} data-label="CHEST">
                    <span className="node-radar-dot"></span>
                  </div>
                  <div className="muscle-node-3d bicep-l" onClick={() => handleProtectedNavigation('/anatomy')} data-label="ARM">
                    <span className="node-radar-dot"></span>
                  </div>
                  <div className="muscle-node-3d bicep-r" onClick={() => handleProtectedNavigation('/anatomy')} data-label="ARM">
                    <span className="node-radar-dot"></span>
                  </div>
                  <div className="muscle-node-3d abs" onClick={() => handleProtectedNavigation('/anatomy')} data-label="ABS">
                    <span className="node-radar-dot"></span>
                  </div>
                  <div className="muscle-node-3d quads-l" onClick={() => handleProtectedNavigation('/anatomy')} data-label="QUAD">
                    <span className="node-radar-dot"></span>
                  </div>
                  <div className="muscle-node-3d quads-r" onClick={() => handleProtectedNavigation('/anatomy')} data-label="QUAD">
                    <span className="node-radar-dot"></span>
                  </div>
                  <div className="muscle-node-3d calves-l" onClick={() => handleProtectedNavigation('/anatomy')} data-label="CALF">
                    <span className="node-radar-dot"></span>
                  </div>
                  <div className="muscle-node-3d calves-r" onClick={() => handleProtectedNavigation('/anatomy')} data-label="CALF">
                    <span className="node-radar-dot"></span>
                  </div>

                </div>
              </div>
            </div>
          </div>
          
          <div className="anatomy-info">
            <h3>Biometric Muscle Engine</h3>
            <p>
              Our AI Intelligent System scans the original human body anatomy. 
              Simply click on the specific muscle group you want to strengthen 
              to receive your personalized, target-oriented workout program.
            </p>
            <div className="legend-grid">
              <span className="badge">⚡ Muscle Hypertrophy</span>
              <span className="badge">🧬 Targeted AI Mapping</span>
              <span className="badge">🔥 Overload Mechanics</span>
            </div>
            <button className="explore-anatomy-btn" onClick={() => handleProtectedNavigation('/anatomy')}>
              See Full Anatomy Model →
            </button>
          </div>
        </div>
      </div>

      {/* 3. QUICK ACCESS MODULES */}
      <div className="home-section-wrapper">
        <h2 className="section-title">
          <span>Explore Modules</span>
          What are you looking for?
        </h2>
        
        <div className="grid-layout">
          <div className="option-card" onClick={() => handleProtectedNavigation('/exercises')}>
            <div className="icon-box-wrapper">🏋️‍♂️</div>
            <h3 className="card-heading">Daily Workouts</h3>
            <p className="card-desc">Access curated workout routines from beginner modules to advanced progressive overload programs.</p>
          </div>
          
          <div className="option-card" onClick={() => handleProtectedNavigation('/nutrition')}>
            <div className="icon-box-wrapper">🥗</div>
            <h3 className="card-heading">Diet & Nutrition</h3>
            <p className="card-desc">Tailored clean calorie splits and meal structures engineered for muscle retention and mass gains.</p>
          </div>

          <div className="option-card" onClick={() => handleProtectedNavigation('/dashboard')}>
            <div className="icon-box-wrapper">📊</div>
            <h3 className="card-heading">Track Progress</h3>
            <p className="card-desc">Log your performance data, monitor body mass index, and capture consistency metrics dynamically.</p>
          </div>

          <div className="option-card" onClick={() => handleProtectedNavigation('/profile')}>
            <div className="icon-box-wrapper">👤</div>
            <h3 className="card-heading">My Profile</h3>
            <p className="card-desc">Manage your custom preferences, structural diagnostic updates, and credential setup profiles.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;