import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Anatomy.css';

const Anatomy = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('front'); // 'front' | 'back'
  const [selectedMuscle, setSelectedMuscle] = useState('Chest');
  const [selectedSide, setSelectedSide] = useState('left');

  const muscleData = {
    // --- FRONT (ANTERIOR) MUSCLES ---
    Chest: {
      scientific: 'Pectoralis Major & Minor',
      view: 'front',
      category: 'Chest',
      region: 'Upper Body',
      role: 'Push / Adduction',
      info: 'The pectoralis muscles drive pressing movements, horizontal flexion, and adduction of the arms across the torso. Crucial for upper body pushing power.',
      exercises: ['Bench Press', 'Incline Dumbbell Press', 'Chest Fly', 'Cable Crossover', 'Dips', 'Push Ups']
    },
    Shoulders: {
      scientific: 'Deltoid Complex (Anterior & Lateral)',
      view: 'front',
      category: 'Shoulders',
      region: 'Upper Body',
      role: 'Push / Overhead',
      info: 'Deltoids stabilize and mobilize the shoulder joint across multiple planes. The anterior and lateral heads power overhead pressing and arm raises.',
      exercises: ['Overhead Barbell Press', 'Arnold Press', 'Dumbbell Front Raise', 'Lateral Raises']
    },
    Biceps: {
      scientific: 'Biceps Brachii & Brachialis',
      view: 'front',
      category: 'Arms',
      region: 'Upper Body',
      role: 'Pull / Flexion',
      info: 'Responsible for elbow flexion and forearm supination. Primary pulling muscles engaged during curls, chin-ups, and carrying tasks.',
      exercises: ['Dumbbell Bicep Curl', 'Incline Dumbbell Curl', 'Hammer Curls']
    },
    Forearms: {
      scientific: 'Brachioradialis & Wrist Flexors',
      view: 'front',
      category: 'Arms',
      region: 'Upper Body',
      role: 'Grip / Stability',
      info: 'Powers grip strength, wrist articulation, and forearm stability. Fundamental for supporting heavy compound lifts.',
      exercises: ['Wrist Curls', 'Farmer Walks', 'Reverse Barbell Curls']
    },
    Abs: {
      scientific: 'Rectus Abdominis',
      view: 'front',
      category: 'Abs',
      region: 'Core',
      role: 'Stabilize / Flexion',
      info: 'The anterior abdominal wall stabilizes the lumbar spine, generates intra-abdominal pressure, and controls torso flexion.',
      exercises: ['Hanging Knee Raises', 'Ab Wheel Rollout', 'Cable Crunches', 'Plank Hold', 'Bicycle Crunches']
    },
    Obliques: {
      scientific: 'Internal & External Obliques',
      view: 'front',
      category: 'Abs',
      region: 'Core',
      role: 'Rotation / Anti-Rotation',
      info: 'Flank the abdominal core, facilitating torso rotation, lateral flexion, and rotational anti-flexion stability.',
      exercises: ['Russian Twists', 'Side Planks', 'Woodchoppers']
    },
    Quads: {
      scientific: 'Quadriceps Femoris',
      view: 'front',
      category: 'Legs',
      region: 'Lower Body',
      role: 'Push / Knee Extension',
      info: 'Four massive muscle bellies responsible for knee extension, deceleration, squatting, and foundational lower body drive.',
      exercises: ['Barbell Squat', 'Leg Press', 'Leg Extensions', 'Walking Lunges', 'Bodyweight Squats']
    },
    Calves: {
      scientific: 'Gastrocnemius & Soleus',
      view: 'both',
      category: 'Legs',
      region: 'Lower Body',
      role: 'Plantarflexion / Spring',
      info: 'Powers ankle extension, jumping, running acceleration, and lower limb shock absorption.',
      exercises: ['Standing Calf Raises', 'Seated Calf Raises', 'Jump Rope']
    },

    // --- BACK (POSTERIOR) MUSCLES ---
    Traps: {
      scientific: 'Trapezius (Upper, Mid & Lower)',
      view: 'back',
      category: 'Shoulders',
      region: 'Upper Body',
      role: 'Scapular Retraction / Shrug',
      info: 'Diamond-shaped dorsal muscle that controls scapular elevation, upward rotation, and upper spine posture.',
      exercises: ['Dumbbell Shrugs', 'Barbell Shrugs', 'Face Pulls', 'Rack Pulls']
    },
    RearDelts: {
      scientific: 'Posterior Deltoid',
      view: 'back',
      category: 'Shoulders',
      region: 'Upper Body',
      role: 'Horizontal Abduction',
      info: 'Positioned on the rear shoulder cap, pulling the humerus backwards and maintaining balanced posture against chest dominance.',
      exercises: ['Cable Face Pull', 'Rear Delt Fly', 'Band Pull-Aparts']
    },
    Triceps: {
      scientific: 'Triceps Brachii (Long, Lateral & Medial Heads)',
      view: 'back',
      category: 'Arms',
      region: 'Upper Body',
      role: 'Push / Elbow Extension',
      info: 'Comprises two-thirds of upper arm mass. Extends the elbow and locks out all heavy pushing and overhead movements.',
      exercises: ['Rope Tricep Pushdowns', 'Skull Crushers', 'Overhead Tricep Extension', 'Dips']
    },
    Lats: {
      scientific: 'Latissimus Dorsi',
      view: 'back',
      category: 'Back',
      region: 'Upper Body',
      role: 'Pull / Scapular Depression',
      info: 'The widest muscle in the human body, providing the classic V-taper. Powers shoulder adduction, extension, and vertical/horizontal pulling.',
      exercises: ['Pull Ups', 'Lat Pulldown', 'Seated Cable Row', 'Barbell Rows']
    },
    LowerBack: {
      scientific: 'Erector Spinae',
      view: 'back',
      category: 'Back',
      region: 'Core & Posterior',
      role: 'Hinge / Spinal Extension',
      info: 'Runs along the vertebral column to maintain posture, resist lumbar flexion, and anchor heavy deadlifts and squats.',
      exercises: ['Deadlift', 'Hyperextensions', 'Good Mornings']
    },
    Glutes: {
      scientific: 'Gluteus Maximus & Medius',
      view: 'back',
      category: 'Legs',
      region: 'Lower Body',
      role: 'Hinge / Hip Extension',
      info: 'The strongest muscle complex in the body. Drives hip extension, pelvis stabilization, and explosive athletic propulsion.',
      exercises: ['Barbell Hip Thrust', 'Sumo Squat', 'Romanian Deadlift', 'Bulgarian Split Squats']
    },
    Hamstrings: {
      scientific: 'Biceps Femoris & Semitendinosus',
      view: 'back',
      category: 'Legs',
      region: 'Lower Body',
      role: 'Pull / Knee Flexion & Hip Hinge',
      info: 'Posterior thigh muscle group responsible for bending the knee, sprinting deceleration, and posterior chain power.',
      exercises: ['Romanian Deadlift', 'Lying Hamstring Curls', 'Nordic Curls']
    }
  };

  // Centroid points for target lock ping on 320x580 canvas (left half coordinate, mirrored on right side)
  const targetPoints = {
    front: {
      Shoulders: { x: 110, y: 112 },
      Chest: { x: 138, y: 122 },
      Biceps: { x: 98, y: 168 },
      Forearms: { x: 88, y: 228 },
      Abs: { x: 160, y: 196 },
      Obliques: { x: 134, y: 216 },
      Quads: { x: 136, y: 345 },
      Calves: { x: 132, y: 450 }
    },
    back: {
      Traps: { x: 148, y: 92 },
      RearDelts: { x: 108, y: 112 },
      Triceps: { x: 96, y: 168 },
      Lats: { x: 134, y: 168 },
      LowerBack: { x: 160, y: 228 },
      Glutes: { x: 136, y: 284 },
      Hamstrings: { x: 136, y: 360 },
      Calves: { x: 132, y: 460 }
    }
  };

  const frontMuscles = ['Chest', 'Shoulders', 'Biceps', 'Forearms', 'Abs', 'Obliques', 'Quads', 'Calves'];
  const backMuscles = ['Traps', 'RearDelts', 'Triceps', 'Lats', 'LowerBack', 'Glutes', 'Hamstrings', 'Calves'];

  const currentMuscleList = viewMode === 'front' ? frontMuscles : backMuscles;

  const handleMuscleClick = (key, side = 'left') => {
    setSelectedMuscle(key);
    setSelectedSide(side);
  };

  const handleViewSwitch = (mode) => {
    setViewMode(mode);
    if (mode === 'front') {
      if (!frontMuscles.includes(selectedMuscle)) setSelectedMuscle('Chest');
    } else {
      if (!backMuscles.includes(selectedMuscle)) setSelectedMuscle('Lats');
    }
  };

  const navigateToExercises = (category) => {
    navigate('/exercises', { state: { targetMuscle: category } });
  };

  const hotspotProps = (key, side) => ({
    className: `hotspot ${selectedMuscle === key ? 'active' : ''}`,
    onClick: () => handleMuscleClick(key, side),
    tabIndex: 0,
    role: 'button',
    'aria-label': `${key} — ${muscleData[key]?.scientific || key}`,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleMuscleClick(key, side);
      }
    }
  });

  const activePointsMap = targetPoints[viewMode] || {};
  const basePt = activePointsMap[selectedMuscle];
  const pt = basePt
    ? selectedSide === 'right' && basePt.x !== 160
      ? { x: 320 - basePt.x, y: basePt.y }
      : basePt
    : null;

  const activeMuscleInfo = muscleData[selectedMuscle] || muscleData.Chest;

  return (
    <div className="anatomy-page">
      <header className="anatomy-header">
        <button className="back-btn" onClick={() => navigate('/')}>← Home</button>
        <span className="anatomy-eyebrow">Interactive Biomechanics</span>
        <h1>Interactive Anatomy Scanner</h1>
        <p>Switch between Anterior (Front) and Posterior (Back) views. Select any muscle group to inspect its biomechanical role and access target workouts.</p>
      </header>

      <div className="anatomy-content">
        {/* LEFT COLUMN: VISUALIZER */}
        <div className="anatomy-visualizer">
          {/* VIEW SWITCHER TABS */}
          <div className="view-toggle-container">
            <button
              className={`view-toggle-btn ${viewMode === 'front' ? 'active' : ''}`}
              onClick={() => handleViewSwitch('front')}
            >
              <span className="toggle-icon">◈</span> Anterior (Front)
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'back' ? 'active' : ''}`}
              onClick={() => handleViewSwitch('back')}
            >
              <span className="toggle-icon">◈</span> Posterior (Back)
            </button>
          </div>

          <div className="anatomy-vector-container">
            <svg
              viewBox="0 0 320 580"
              className="muscle-svg"
              role="img"
              aria-label={`${viewMode === 'front' ? 'Front' : 'Back'} view anatomical diagram`}
            >
              <defs>
                <radialGradient id="anatomySheen" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="rgba(255, 107, 74, 0.25)" />
                  <stop offset="50%" stopColor="rgba(124, 123, 255, 0.08)" />
                  <stop offset="100%" stopColor="rgba(11, 11, 24, 0)" />
                </radialGradient>
                <linearGradient id="bodyBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e1b2e" />
                  <stop offset="100%" stopColor="#12111d" />
                </linearGradient>
              </defs>

              {/* Ambient Glow */}
              <circle cx="160" cy="270" r="190" fill="url(#anatomySheen)" pointerEvents="none" />

              {/* =========================================================================
                  FRONT (ANTERIOR) BODY VIEW
                  ========================================================================= */}
              {viewMode === 'front' && (
                <g className="front-body-group">
                  {/* Head & Neck */}
                  <circle cx="160" cy="34" r="21" className="body-base" />
                  <path d="M150,48 L150,66 C150,72 156,76 160,76 C164,76 170,72 170,66 L170,48 Z" className="body-base" />

                  {/* LEFT HALF (User's Left) */}
                  <g>
                    {/* Traps Collar */}
                    <path d="M152,62 C142,65 130,76 124,96 C132,98 142,97 150,91 C152,82 152,70 152,62 Z" className="body-base" />

                    {/* Shoulder / Deltoids */}
                    <path d="M120,90 C106,88 95,98 94,115 C93,131 104,144 118,145 C127,140 130,126 130,112 C130,100 126,93 120,90 Z" {...hotspotProps('Shoulders', 'left')}>
                      <title>Shoulders (Anterior/Lateral Deltoid)</title>
                    </path>
                    <path d="M117,94 C112,107 108,124 110,140" className="muscle-line" />

                    {/* Chest / Pectorals */}
                    <path d="M160,88 C144,86 128,94 122,110 C118,122 120,136 130,144 C142,150 153,148 160,142 C158,126 158,102 160,88 Z" {...hotspotProps('Chest', 'left')}>
                      <title>Chest (Pectoralis Major)</title>
                    </path>
                    <path d="M158,94 C148,93 138,97 128,104" className="highlight-line" />
                    <path d="M160,140 C151,141 141,142 132,143" className="muscle-line" />

                    {/* Biceps */}
                    <path d="M114,146 C102,142 92,152 90,168 C88,183 94,196 104,200 C113,197 116,182 116,166 C116,155 116,149 114,146 Z" {...hotspotProps('Biceps', 'left')}>
                      <title>Biceps (Biceps Brachii)</title>
                    </path>
                    <path d="M96,154 C100,157 104,166 104,178" className="muscle-line" />

                    {/* Forearms */}
                    <path d="M102,198 C94,204 84,216 84,232 C84,248 90,256 100,258 C108,254 112,242 112,226 C112,214 108,204 102,198 Z" {...hotspotProps('Forearms', 'left')}>
                      <title>Forearms (Brachioradialis / Flexors)</title>
                    </path>
                    <path d="M88,214 C94,217 99,222 102,228" className="highlight-line" />
                    <path d="M100,258 C94,262 92,268 93,274 C94,281 99,284 105,284 C111,284 115,279 114,274 C113,268 108,262 105,259 Z" className="body-base" />

                    {/* Obliques */}
                    <path d="M133,178 C124,186 118,202 116,222 C114,237 120,248 130,250 C133,242 134,224 133,196 Z" {...hotspotProps('Obliques', 'left')}>
                      <title>Obliques</title>
                    </path>
                    <path d="M128,194 L123,238" className="muscle-line" />

                    {/* Hip / Pelvis */}
                    <path d="M133,246 C124,254 122,266 124,280 C130,286 142,288 152,286 C153,274 152,258 147,249 C142,245 137,244 133,246 Z" className="body-base" />

                    {/* Quads / Front Thigh */}
                    <path d="M152,284 C138,283 124,293 118,310 C110,336 108,366 116,390 C122,402 130,406 142,405 C150,400 154,376 154,348 C154,320 154,296 152,284 Z" {...hotspotProps('Quads', 'left')}>
                      <title>Quads (Quadriceps Femoris)</title>
                    </path>
                    <path d="M150,302 C144,324 135,354 126,394" className="muscle-line" />
                    <path d="M122,318 C125,340 130,364 134,386" className="highlight-line" />

                    {/* Knee */}
                    <ellipse cx="131" cy="414" rx="12" ry="7" className="body-base" />

                    {/* Calves / Shins */}
                    <path d="M124,420 C114,424 108,444 110,470 C112,492 120,504 132,506 C142,500 146,484 144,460 C143,438 136,423 124,420 Z" {...hotspotProps('Calves', 'left')}>
                      <title>Calves (Tibialis & Gastrocnemius)</title>
                    </path>
                    <path d="M116,436 C115,454 116,472 120,488" className="muscle-line" />

                    {/* Feet */}
                    <ellipse cx="128" cy="530" rx="18" ry="8" className="body-base" />
                  </g>

                  {/* RIGHT HALF (Mirrored from Left) */}
                  <g transform="translate(320,0) scale(-1,1)">
                    <path d="M152,62 C142,65 130,76 124,96 C132,98 142,97 150,91 C152,82 152,70 152,62 Z" className="body-base" />

                    <path d="M120,90 C106,88 95,98 94,115 C93,131 104,144 118,145 C127,140 130,126 130,112 C130,100 126,93 120,90 Z" {...hotspotProps('Shoulders', 'right')}>
                      <title>Shoulders (Deltoid)</title>
                    </path>
                    <path d="M117,94 C112,107 108,124 110,140" className="muscle-line" />

                    <path d="M160,88 C144,86 128,94 122,110 C118,122 120,136 130,144 C142,150 153,148 160,142 C158,126 158,102 160,88 Z" {...hotspotProps('Chest', 'right')}>
                      <title>Chest (Pectoralis Major)</title>
                    </path>
                    <path d="M158,94 C148,93 138,97 128,104" className="highlight-line" />
                    <path d="M160,140 C151,141 141,142 132,143" className="muscle-line" />

                    <path d="M114,146 C102,142 92,152 90,168 C88,183 94,196 104,200 C113,197 116,182 116,166 C116,155 116,149 114,146 Z" {...hotspotProps('Biceps', 'right')}>
                      <title>Biceps</title>
                    </path>
                    <path d="M96,154 C100,157 104,166 104,178" className="muscle-line" />

                    <path d="M102,198 C94,204 84,216 84,232 C84,248 90,256 100,258 C108,254 112,242 112,226 C112,214 108,204 102,198 Z" {...hotspotProps('Forearms', 'right')}>
                      <title>Forearms</title>
                    </path>
                    <path d="M88,214 C94,217 99,222 102,228" className="highlight-line" />
                    <path d="M100,258 C94,262 92,268 93,274 C94,281 99,284 105,284 C111,284 115,279 114,274 C113,268 108,262 105,259 Z" className="body-base" />

                    <path d="M133,178 C124,186 118,202 116,222 C114,237 120,248 130,250 C133,242 134,224 133,196 Z" {...hotspotProps('Obliques', 'right')}>
                      <title>Obliques</title>
                    </path>
                    <path d="M128,194 L123,238" className="muscle-line" />

                    <path d="M133,246 C124,254 122,266 124,280 C130,286 142,288 152,286 C153,274 152,258 147,249 C142,245 137,244 133,246 Z" className="body-base" />

                    <path d="M152,284 C138,283 124,293 118,310 C110,336 108,366 116,390 C122,402 130,406 142,405 C150,400 154,376 154,348 C154,320 154,296 152,284 Z" {...hotspotProps('Quads', 'right')}>
                      <title>Quads</title>
                    </path>
                    <path d="M150,302 C144,324 135,354 126,394" className="muscle-line" />
                    <path d="M122,318 C125,340 130,364 134,386" className="highlight-line" />

                    <ellipse cx="131" cy="414" rx="12" ry="7" className="body-base" />

                    <path d="M124,420 C114,424 108,444 110,470 C112,492 120,504 132,506 C142,500 146,484 144,460 C143,438 136,423 124,420 Z" {...hotspotProps('Calves', 'right')}>
                      <title>Calves</title>
                    </path>
                    <path d="M116,436 C115,454 116,472 120,488" className="muscle-line" />

                    <ellipse cx="128" cy="530" rx="18" ry="8" className="body-base" />
                  </g>

                  {/* Rectus Abdominis (Center) */}
                  <path d="M160,150 C142,150 134,160 133,174 L133,230 C136,242 148,248 160,248 C172,248 184,242 187,230 L187,174 C186,160 178,150 160,150 Z" {...hotspotProps('Abs', 'left')}>
                    <title>Abs (Rectus Abdominis)</title>
                  </path>
                  <g className="grid-lines" aria-hidden="true">
                    <line x1="160" y1="154" x2="160" y2="244" />
                    <line x1="135" y1="172" x2="185" y2="172" />
                    <line x1="134" y1="192" x2="186" y2="192" />
                    <line x1="135" y1="212" x2="185" y2="212" />
                  </g>

                  <text x="160" y="124" className="svg-label" textAnchor="middle">CHEST</text>
                  <text x="160" y="202" className="svg-label" textAnchor="middle">ABS</text>
                  <text x="160" y="348" className="svg-label" textAnchor="middle">QUADS</text>
                </g>
              )}

              {/* =========================================================================
                  BACK (POSTERIOR) BODY VIEW
                  ========================================================================= */}
              {viewMode === 'back' && (
                <g className="back-body-group">
                  {/* Head & Neck Posterior */}
                  <circle cx="160" cy="34" r="21" className="body-base" />
                  <path d="M148,46 L148,64 C148,70 154,74 160,74 C166,74 172,70 172,64 L172,46 Z" className="body-base" />

                  {/* LEFT HALF BACK (User's Left) */}
                  <g>
                    {/* Trapezius */}
                    <path d="M160,62 C150,62 136,72 126,92 C134,102 146,116 160,132 C160,110 160,82 160,62 Z" {...hotspotProps('Traps', 'left')}>
                      <title>Traps (Trapezius)</title>
                    </path>
                    <path d="M148,82 C142,94 138,106 136,114" className="highlight-line" />

                    {/* Rear Shoulders (Posterior Deltoid) */}
                    <path d="M124,94 C110,92 98,102 96,118 C95,130 102,142 114,146 C122,142 126,130 126,116 C126,104 125,98 124,94 Z" {...hotspotProps('RearDelts', 'left')}>
                      <title>Rear Deltoids (Posterior Deltoid)</title>
                    </path>
                    <path d="M112,102 C108,114 106,128 108,138" className="muscle-line" />

                    {/* Triceps */}
                    <path d="M112,146 C100,142 90,152 88,168 C86,184 92,198 102,202 C110,198 114,184 114,168 C114,156 114,150 112,146 Z" {...hotspotProps('Triceps', 'left')}>
                      <title>Triceps (Triceps Brachii)</title>
                    </path>
                    <path d="M94,158 C98,162 102,172 102,186" className="muscle-line" />
                    <path d="M102,152 L98,184" className="highlight-line" />

                    {/* Forearms (Posterior) */}
                    <path d="M100,200 C92,206 82,218 82,234 C82,250 88,258 98,260 C106,256 110,244 110,228 C110,216 106,206 100,200 Z" className="body-base" />
                    <path d="M98,260 C92,264 90,270 91,276 C92,283 97,286 103,286 C109,286 113,281 112,276 Z" className="body-base" />

                    {/* Lats (Latissimus Dorsi) */}
                    <path d="M160,132 C146,120 132,112 124,124 C116,138 114,166 118,196 C124,206 138,208 160,208 Z" {...hotspotProps('Lats', 'left')}>
                      <title>Lats (Latissimus Dorsi)</title>
                    </path>
                    <path d="M124,142 C128,160 138,182 152,198" className="muscle-line" />

                    {/* Lower Back (Erector Spinae) */}
                    <path d="M160,208 C144,208 132,214 130,230 C128,244 134,254 160,256 Z" {...hotspotProps('LowerBack', 'left')}>
                      <title>Lower Back (Erector Spinae)</title>
                    </path>
                    <path d="M148,216 L144,248" className="muscle-line" />

                    {/* Glutes */}
                    <path d="M160,256 C140,254 122,262 118,284 C114,306 124,324 148,326 C156,326 160,314 160,296 Z" {...hotspotProps('Glutes', 'left')}>
                      <title>Glutes (Gluteus Maximus)</title>
                    </path>
                    <path d="M126,276 C134,296 146,312 156,318" className="highlight-line" />

                    {/* Hamstrings */}
                    <path d="M154,326 C140,326 124,336 118,354 C110,378 112,400 122,410 C132,410 144,396 150,372 C154,352 154,336 154,326 Z" {...hotspotProps('Hamstrings', 'left')}>
                      <title>Hamstrings (Biceps Femoris)</title>
                    </path>
                    <path d="M136,336 C134,358 130,382 126,402" className="muscle-line" />

                    {/* Knee joint back */}
                    <ellipse cx="131" cy="416" rx="11" ry="6" className="body-base" />

                    {/* Calves Posterior */}
                    <path d="M124,422 C112,428 106,448 108,474 C110,496 120,508 132,508 C144,504 148,486 146,462 C144,440 136,424 124,422 Z" {...hotspotProps('Calves', 'left')}>
                      <title>Calves (Gastrocnemius & Soleus)</title>
                    </path>
                    <path d="M120,436 C118,458 120,480 126,496" className="muscle-line" />

                    {/* Feet posterior */}
                    <ellipse cx="128" cy="530" rx="16" ry="8" className="body-base" />
                  </g>

                  {/* RIGHT HALF BACK (Mirrored from Left) */}
                  <g transform="translate(320,0) scale(-1,1)">
                    <path d="M160,62 C150,62 136,72 126,92 C134,102 146,116 160,132 C160,110 160,82 160,62 Z" {...hotspotProps('Traps', 'right')}>
                      <title>Traps</title>
                    </path>
                    <path d="M148,82 C142,94 138,106 136,114" className="highlight-line" />

                    <path d="M124,94 C110,92 98,102 96,118 C95,130 102,142 114,146 C122,142 126,130 126,116 C126,104 125,98 124,94 Z" {...hotspotProps('RearDelts', 'right')}>
                      <title>Rear Deltoids</title>
                    </path>
                    <path d="M112,102 C108,114 106,128 108,138" className="muscle-line" />

                    <path d="M112,146 C100,142 90,152 88,168 C86,184 92,198 102,202 C110,198 114,184 114,168 C114,156 114,150 112,146 Z" {...hotspotProps('Triceps', 'right')}>
                      <title>Triceps</title>
                    </path>
                    <path d="M94,158 C98,162 102,172 102,186" className="muscle-line" />
                    <path d="M102,152 L98,184" className="highlight-line" />

                    <path d="M100,200 C92,206 82,218 82,234 C82,250 88,258 98,260 C106,256 110,244 110,228 C110,216 106,206 100,200 Z" className="body-base" />
                    <path d="M98,260 C92,264 90,270 91,276 C92,283 97,286 103,286 C109,286 113,281 112,276 Z" className="body-base" />

                    <path d="M160,132 C146,120 132,112 124,124 C116,138 114,166 118,196 C124,206 138,208 160,208 Z" {...hotspotProps('Lats', 'right')}>
                      <title>Lats</title>
                    </path>
                    <path d="M124,142 C128,160 138,182 152,198" className="muscle-line" />

                    <path d="M160,208 C144,208 132,214 130,230 C128,244 134,254 160,256 Z" {...hotspotProps('LowerBack', 'right')}>
                      <title>Lower Back</title>
                    </path>
                    <path d="M148,216 L144,248" className="muscle-line" />

                    <path d="M160,256 C140,254 122,262 118,284 C114,306 124,324 148,326 C156,326 160,314 160,296 Z" {...hotspotProps('Glutes', 'right')}>
                      <title>Glutes</title>
                    </path>
                    <path d="M126,276 C134,296 146,312 156,318" className="highlight-line" />

                    <path d="M154,326 C140,326 124,336 118,354 C110,378 112,400 122,410 C132,410 144,396 150,372 C154,352 154,336 154,326 Z" {...hotspotProps('Hamstrings', 'right')}>
                      <title>Hamstrings</title>
                    </path>
                    <path d="M136,336 C134,358 130,382 126,402" className="muscle-line" />

                    <ellipse cx="131" cy="416" rx="11" ry="6" className="body-base" />

                    <path d="M124,422 C112,428 106,448 108,474 C110,496 120,508 132,508 C144,504 148,486 146,462 C144,440 136,424 124,422 Z" {...hotspotProps('Calves', 'right')}>
                      <title>Calves</title>
                    </path>
                    <path d="M120,436 C118,458 120,480 126,496" className="muscle-line" />

                    <ellipse cx="128" cy="530" rx="16" ry="8" className="body-base" />
                  </g>

                  <text x="160" y="165" className="svg-label" textAnchor="middle">LATS</text>
                  <text x="160" y="286" className="svg-label" textAnchor="middle">GLUTES</text>
                  <text x="160" y="366" className="svg-label" textAnchor="middle">HAMSTRINGS</text>
                </g>
              )}

              {/* RADAR TARGET-LOCK RING */}
              {pt && (
                <g className="target-lock" style={{ transform: `translate(${pt.x}px, ${pt.y}px)` }}>
                  <circle className="ping-ring" r="8" />
                  <circle className="ping-dot" r="3.5" />
                </g>
              )}
            </svg>
          </div>

          {/* MUSCLE CHIPS SELECTOR */}
          <div className="jump-to">
            <span className="jump-to-label">Select Muscle ({viewMode === 'front' ? 'Anterior' : 'Posterior'})</span>
            <div className="chip-row">
              {currentMuscleList.map((key) => (
                <button
                  key={key}
                  className={`chip ${selectedMuscle === key ? 'active' : ''}`}
                  onClick={() => handleMuscleClick(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MUSCLE DETAIL & WORKOUT INTEL */}
        <div className="anatomy-panel">
          {activeMuscleInfo ? (
            <div className="muscle-details-card" key={selectedMuscle}>
              <div className="card-top-badge">
                <span className="anatomy-tag">Target Locked</span>
                <span className="anatomy-view-badge">{viewMode.toUpperCase()} VIEW</span>
              </div>

              <h2>{selectedMuscle}</h2>
              <span className="scientific-name">{activeMuscleInfo.scientific}</span>

              <div className="stat-grid">
                <div className="stat-block">
                  <span className="stat-label">Category</span>
                  <span className="stat-value">{activeMuscleInfo.category}</span>
                </div>
                <div className="stat-block">
                  <span className="stat-label">Region</span>
                  <span className="stat-value">{activeMuscleInfo.region}</span>
                </div>
                <div className="stat-block">
                  <span className="stat-label">Role</span>
                  <span className="stat-value">{activeMuscleInfo.role}</span>
                </div>
              </div>

              <div className="biomechanics-box">
                <h4>Biomechanical Function</h4>
                <p className="description">{activeMuscleInfo.info}</p>
              </div>

              {activeMuscleInfo.exercises && (
                <div className="exercise-preview-section">
                  <h4>Target Exercises</h4>
                  <div className="exercise-badges">
                    {activeMuscleInfo.exercises.map((exName, idx) => (
                      <span key={idx} className="ex-badge">{exName}</span>
                    ))}
                  </div>
                </div>
              )}

              <button
                className="isolate-btn"
                onClick={() => navigateToExercises(activeMuscleInfo.category)}
              >
                <span>View All {activeMuscleInfo.category} Exercises</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          ) : (
            <div className="instruction-card">
              <div className="pulse-indicator"></div>
              <h3>Scan Body</h3>
              <p>Select any anatomical sector on the 2D visualizer to lock onto muscle mechanics and access tailored workouts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Anatomy;