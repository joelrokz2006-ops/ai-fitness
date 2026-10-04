// client/src/pages/Profile.jsx
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  // Interactive User Form State Blocks Mapping
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: 'JOEL',
    age: '19',
    weight: '74',
    height: '178',
    goal: 'Lean Muscle Mass'
  });

  const handleInputChange = (e, field) => {
    setUserData({
      ...userData,
      [field]: e.target.value
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        
        {/* Core Profile Page Heading Layout */}
        <h2 className="profile-title">Athlete Profile</h2>
        <p className="profile-subtitle">Manage system core metrics and diagnostic parameters</p>

        <div className="profile-card-grid">
          
          {/* LEFT AVATAR CORE SUMMARY BLOCK VIEW MODULE */}
          <div className="profile-avatar-card">
            <div className="avatar-placeholder">
              {userData.username.charAt(0)}
            </div>
            <h3 style={{ fontFamily: "'Oswald'", margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {userData.username}
            </h3>
            <span className="profile-status-tag">Tier 1 Member</span>
            <p style={{ color: '#555', fontSize: '11px', margin: '15px 0 0 0', letterSpacing: '0.5px' }}>UUID: #9932-AX9</p>
          </div>

          {/* RIGHT DETAILED ACCOUNT ATTRIBUTES CONTAINER FORM LINK */}
          <div className="profile-details-card">
            
            {/* Row Item Name */}
            <div className="info-row">
              <span className="info-label">Identity Name</span>
              {isEditing ? (
                <input 
                  type="text" 
                  className="profile-input-field" 
                  value={userData.username} 
                  onChange={(e) => handleInputChange(e, 'username')} 
                />
              ) : (
                <span className="info-value">{userData.username}</span>
              )}
            </div>

            {/* Row Item Age */}
            <div className="info-row">
              <span className="info-label">Age Threshold</span>
              {isEditing ? (
                <input 
                  type="number" 
                  className="profile-input-field" 
                  value={userData.age} 
                  onChange={(e) => handleInputChange(e, 'age')} 
                />
              ) : (
                <span className="info-value">{userData.age} Years</span>
              )}
            </div>

            {/* Row Item Weight */}
            <div className="info-row">
              <span className="info-label">Body Weight Mass</span>
              {isEditing ? (
                <input 
                  type="number" 
                  className="profile-input-field" 
                  value={userData.weight} 
                  onChange={(e) => handleInputChange(e, 'weight')} 
                />
              ) : (
                <span className="info-value">{userData.weight} KG</span>
              )}
            </div>

            {/* Row Item Height */}
            <div className="info-row">
              <span className="info-label">Absolute Stature Height</span>
              {isEditing ? (
                <input 
                  type="number" 
                  className="profile-input-field" 
                  value={userData.height} 
                  onChange={(e) => handleInputChange(e, 'height')} 
                />
              ) : (
                <span className="info-value">{userData.height} CM</span>
              )}
            </div>

            {/* Row Item Goal Objectives */}
            <div className="info-row">
              <span className="info-label">AI Targeted Objective</span>
              {isEditing ? (
                <select 
                  className="profile-input-field" 
                  value={userData.goal} 
                  onChange={(e) => handleInputChange(e, 'goal')}
                  style={{ width: '175px' }}
                >
                  <option value="Lean Muscle Mass">Lean Muscle Mass</option>
                  <option value="Fat Oxidation Block">Fat Oxidation Block</option>
                  <option value="Absolute Powerlifting">Absolute Powerlifting</option>
                  <option value="Endurance Capacity">Endurance Capacity</option>
                </select>
              ) : (
                <span className="info-value highlight">{userData.goal}</span>
              )}
            </div>

            {/* Interactive Toggle Button Layout Controller */}
            <button 
              className={`profile-action-btn ${isEditing ? 'save-btn' : ''}`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Commit Changes' : 'Modify Parameters'}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;