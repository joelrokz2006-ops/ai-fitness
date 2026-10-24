import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../services/api';
import { calculateBMI, getBMICategory } from '../utils/bmi';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [userData, setUserData] = useState({
    username: 'Athlete',
    gender: 'Male',
    age: '24',
    weight: '70',
    height: '175',
    goal: 'Lean Muscle Mass'
  });

  useEffect(() => {
    // 1. Initial read from localStorage
    const cached = localStorage.getItem("user");
    if (cached) {
      try {
        const u = JSON.parse(cached);
        setUserData((prev) => ({
          ...prev,
          username: u.name || prev.username,
          gender: u.gender || prev.gender,
          age: u.age ? String(u.age) : prev.age,
          weight: u.weight ? String(u.weight) : prev.weight,
          height: u.height ? String(u.height) : prev.height,
          goal: u.goal || prev.goal,
        }));
      } catch (e) {}
    }

    // 2. Fresh fetch from backend API
    const loadProfile = async () => {
      const live = await getUserProfile();
      if (live) {
        setUserData({
          username: live.name || 'Athlete',
          gender: live.gender || 'Male',
          age: live.age ? String(live.age) : '24',
          weight: live.weight ? String(live.weight) : '70',
          height: live.height ? String(live.height) : '175',
          goal: live.goal || 'Lean Muscle Mass',
        });
      }
    };

    loadProfile();
  }, []);

  const handleInputChange = (e, field) => {
    setUserData({
      ...userData,
      [field]: e.target.value
    });
  };

  const handleSaveToggle = async () => {
    if (!isEditing) {
      setIsEditing(true);
      setFeedback("");
      return;
    }

    // Saving changes
    setLoading(true);
    setFeedback("");
    try {
      await updateUserProfile({
        name: userData.username,
        gender: userData.gender,
        age: userData.age,
        weight: userData.weight,
        height: userData.height,
        goal: userData.goal,
      });
      setIsEditing(false);
      setFeedback("✓ Profile successfully synchronized.");
      setTimeout(() => setFeedback(""), 3500);
    } catch (err) {
      setFeedback(`❌ ${err.message || 'Failed to save changes'}`);
    } finally {
      setLoading(false);
    }
  };

  const currentBMI = calculateBMI(userData.height, userData.weight);
  const currentCategory = getBMICategory(currentBMI);

  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        
        {/* Core Profile Page Heading Layout */}
        <h2 className="profile-title">Athlete Profile</h2>
        <p className="profile-subtitle">Manage system core metrics and diagnostic parameters</p>

        {feedback && (
          <div style={{
            margin: "0 auto 20px auto",
            maxWidth: "700px",
            padding: "12px 18px",
            borderRadius: "8px",
            background: feedback.startsWith("✓") ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
            border: feedback.startsWith("✓") ? "1px solid #22c55e" : "1px solid #ef4444",
            color: feedback.startsWith("✓") ? "#4ade80" : "#fca5a5",
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center"
          }}>
            {feedback}
          </div>
        )}

        <div className="profile-card-grid">
          
          {/* LEFT AVATAR CORE SUMMARY BLOCK VIEW MODULE */}
          <div className="profile-avatar-card">
            <div className="avatar-placeholder">
              {userData.username ? userData.username.charAt(0).toUpperCase() : 'A'}
            </div>
            <h3 style={{ fontFamily: "'Oswald'", margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {userData.username}
            </h3>
            <span className="profile-status-tag">Verified Athlete</span>

            {/* Calculated BMI Badge */}
            <div style={{
              marginTop: "20px",
              padding: "12px",
              background: "rgba(0, 240, 255, 0.08)",
              border: "1px solid rgba(0, 240, 255, 0.25)",
              borderRadius: "10px",
              textAlign: "center"
            }}>
              <span style={{ fontSize: "11px", color: "#9ca3af", letterSpacing: "1px", textTransform: "uppercase" }}>Calculated BMI</span>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "#00f0ff", margin: "4px 0" }}>{currentBMI}</div>
              <span style={{ fontSize: "12px", color: "#38bdf8", fontWeight: "600" }}>{currentCategory}</span>
            </div>

            <p style={{ color: '#555', fontSize: '11px', margin: '15px 0 0 0', letterSpacing: '0.5px' }}>
              Gender: <strong>{userData.gender}</strong>
            </p>
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

            {/* Row Item Gender (Male, Female, Transgender) */}
            <div className="info-row">
              <span className="info-label">Gender Identity</span>
              {isEditing ? (
                <select 
                  className="profile-input-field"
                  value={userData.gender}
                  onChange={(e) => handleInputChange(e, 'gender')}
                  style={{ width: '175px' }}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                </select>
              ) : (
                <span className="info-value highlight">{userData.gender}</span>
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
              onClick={handleSaveToggle}
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditing ? 'Commit Changes' : 'Modify Parameters'}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;