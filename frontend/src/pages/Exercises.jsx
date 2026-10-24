// client/src/pages/Exercises.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import exercisesData from '../data/exercise';
import './Exercises.css';

const Exercises = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Listens to incoming router states or URL query parameters (e.g. /exercises?muscle=chest)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryMuscle = searchParams.get('muscle') || searchParams.get('category');
    const rawTarget = queryMuscle || (location.state && location.state.targetMuscle) || '';

    if (rawTarget) {
      const target = rawTarget.toLowerCase().trim();
      const muscleMap = {
        chest: 'Chest',
        pecs: 'Chest',
        back: 'Back',
        lats: 'Back',
        traps: 'Back',
        shoulders: 'Shoulders',
        deltoids: 'Shoulders',
        arms: 'Arms',
        biceps: 'Arms',
        triceps: 'Arms',
        forearms: 'Arms',
        legs: 'Legs',
        quads: 'Legs',
        thighs: 'Legs',
        calves: 'Legs',
        glutes: 'Legs',
        hamstrings: 'Legs',
        abs: 'Abs',
        core: 'Abs',
        obliques: 'Abs',
        'home workout': 'Home workout',
        home: 'Home workout',
        cardio: 'Home workout',
      };

      const matched = muscleMap[target] || 'All';
      setActiveTab(matched);
    }
  }, [location.search, location.state]);

  // Unified exercise data source of truth imported from ../data/exercise

  const categories = ['All', 'Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Abs','Home workout'];

  const filteredExercises = activeTab === 'All'
    ? exercisesData
    : exercisesData.filter(ex => ex.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="exercise-page">
      <div className="exercise-hero">
        <h1>TARGETED TRAINING MODULES</h1>
        <p>Select a movement profile below to access dynamic target diagnostic models and structured execution protocols.</p>
      </div>

      <div className="filter-tab-bar">
        {categories.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="exercise-grid">
        {filteredExercises.map(exercise => (
          <div key={exercise.id} className="pro-exercise-card" onClick={() => setSelectedExercise(exercise)}>
            <div className="card-image-wrapper">
             {exercise.video.endsWith(".mp4") ? (
              <video className="exercise-card-img" controls muted>
                <source src={`/videos/${exercise.video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                title={exercise.name}
                src={exercise.video}
                className="exercise-card-img"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
              />
            )}
              <div className="card-img-overlay">
                <span>View Steps ⚡</span>
              </div>
            </div>
            
            <div className="card-body-content">
              <div className="card-top-header">
                <span className="target-badge">{exercise.target}</span>
                <span className={`intensity-badge ${exercise.intensity.toLowerCase()}`}>{exercise.intensity}</span>
              </div>
              <h3 className="exercise-name">{exercise.name}</h3>
              
              <div className="metrics-row">
                <div className="sub-metric">
                  <span className="label">Sets</span>
                  <span className="value">{exercise.sets}</span>
                </div>
                <div className="sub-metric">
                  <span className="label">Target Reps</span>
                  <span className="value">{exercise.reps}</span>
                </div>
              </div>

              <div className="execution-preview">
                <h4>Execution Guide Preview:</h4>
                <p>{exercise.steps[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedExercise && (
        <div className="modal-overlay-bg" onClick={() => setSelectedExercise(null)}>
          <div className="modal-container-box" onClick={e => e.stopPropagation()}>
            <button className="close-icon-btn" onClick={() => setSelectedExercise(null)}>×</button>
            
            <div className="modal-split-grid">
              <div className="modal-media-panel">
                {selectedExercise.video.endsWith(".mp4") ? (
                  <video className="modal-display-img" controls>
                    <source src={`/videos/${selectedExercise.video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <iframe
                    title={selectedExercise.name}
                    src={selectedExercise.video}
                    className="modal-display-img"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ border: "none", minHeight: "300px" }}
                  />
                )}
                <div className="live-status-badge">Target Profile View</div>
              </div>

              <div className="modal-details-panel">
                <span className="modal-category-tag">{selectedExercise.target} Module</span>
                <h2>{selectedExercise.name}</h2>
                
                <div className="modal-quick-stats">
                  <div><strong>VOLUME TARGET:</strong> {selectedExercise.sets}</div>
                  <div><strong>REP RANGE:</strong> {selectedExercise.reps}</div>
                  <div><strong>INTENSITY PROFILE:</strong> {selectedExercise.intensity.toUpperCase()}</div>
                </div>

                <div className="interactive-steps-box">
                  <h3>Execution Procedure System:</h3>
                  <ul className="execution-steps-list">
                    {selectedExercise.steps.map((step, idx) => (
                      <li key={idx} className="execution-step-item">
                        <div className="step-counter-node">{idx + 1}</div>
                        <p className="step-instruction-payload">{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <button
                    type="button"
                    style={{
                      background: 'linear-gradient(135deg, #00f0ff, #0072ff)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#060b18',
                      fontWeight: '700',
                      padding: '12px 20px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                    onClick={() =>
                      navigate(
                        `/exercises/${selectedExercise.slug || selectedExercise.id}`
                      )
                    }
                  >
                    📖 Open Dedicated Movement Detail Page →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;