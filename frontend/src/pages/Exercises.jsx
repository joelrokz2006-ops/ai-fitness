// client/src/pages/Exercises.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Exercises.css';


const Exercises = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Listens to incoming router states from the Anatomy scanner or Dashboard
  useEffect(() => {
    if (location.state && location.state.targetMuscle) {
      const target = location.state.targetMuscle.toLowerCase().trim();
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
        'home workout': 'Home workout'
      };

      const matched = muscleMap[target] || 'All';
      setActiveTab(matched);
    }
  }, [location.state]);

  const exercisesData = [
    // === CHEST ===
    {
      id: 'c1',
      category: 'Chest',
      name: 'Bench Press',
      sets: '4 Sets',
      reps: '8-12 Reps',
      target: 'Middle Chest',
      intensity: 'High',
      video: 'bench presst.mp4',
      steps: ['Lie flat on the bench with your feet flat on the floor.', 'Grip the bar slightly wider than shoulder-width.', 'Lower the bar slowly to your mid-chest.', 'Push the bar back up explosively while keeping your shoulders pinned back.']
    },
    {
      id: 'c2',
      category: 'Chest',
      name: 'Incline Dumbbell Press',
      sets: '4 Sets',
      reps: '10-12 Reps',
      target: 'Upper Chest',
      intensity: 'High',
      video: 'upper chest.mp4',
      steps: ['Set an incline bench to around 30-45 degrees.', 'Raise the dumbbells above your chest with palms facing forward.', 'Lower the weights slowly until they are in line with your upper chest.', 'Press them back up to the starting position.']
    },
    {
      id: 'c3',
      category: 'Chest',
      name: 'Chest Fly',
      sets: '3 Sets',
      reps: '12-15 Reps',
      target: 'Chest Stretch',
      intensity: 'Medium',
      video: 'flys chest.mp4',
      steps: ['Lie flat on a bench holding dumbbells above you with palms facing each other.', 'With a slight bend in your elbows, open your arms wide in an arc.', 'Feel the stretch in your chest at the bottom.', 'Squeeze your chest muscles to bring the weights back up.']
    },
    {
      id: 'c4',
      category: 'Chest',
      name: 'Cable Crossover',
      sets: '3 Sets',
      reps: '15 Reps',
      target: 'Chest Shape',
      intensity: 'Medium',
      video: 'chest cable fly.mp4',
      steps: ['Set the cables to the high position and grab both handles.', 'Step forward slightly and lean your torso into a slight angle.', 'Bring your hands together in a downward arc in front of your waist.', 'Slowly return to the start position under control.']
    },
    {
      id: 'c5',
      category: 'Chest',
      name: 'Dumbell Pull Over',
      sets: '3 Sets',
      reps: 'Failure',
      target: 'Chest',
      intensity: 'High',
      video: 'chest tri.mp4',
      steps: ['Grip the dip bars and lift your body up.', 'Lean your torso forward slightly to shift focus onto your lower chest.', 'Lower yourself down until your elbows are at a 90-degree angle.', 'Drive yourself up to the starting position without locking out your elbows.']
    },
    {
      id: 'c6',
      category: 'Chest',
      name: 'Dips ',
      sets: '3 Sets',
      reps: '10-12 Reps',
      target: 'Lower Chest',
      intensity: 'High',
      video: 'dips chest.mp4',
      steps: ['Secure your legs under the pads of a decline bench and lie back.', 'Grip the barbell and unrack it directly over your lower chest.', 'Lower the bar smoothly until it touches your lower sternum.', 'Press the weight straight up to complete the rep.']
    },

    // === BACK ===
    {
      id: 'b1',
      category: 'Back',
      name: 'Pull Ups',
      sets: '4 Sets',
      reps: 'Failure',
      target: 'Lats',
      intensity: 'High',
      video: 'pull ups.mp4',
      steps: ['Grip the pull-up bar with hands wider than shoulder-width apart.', 'Hang fully, then pull your chest up towards the bar by driving your elbows down.', 'Squeeze your lats at the peak of the movement.', 'Lower yourself down slowly to full extension.']
    },
    {
      id: 'b2',
      category: 'Back',
      name: 'Lat Pulldown',
      sets: '4 Sets',
      reps: '12 Reps',
      target: 'Back Width',
      intensity: 'Medium',
      video: 'lat  pull down.mp4',
      steps: ['Sit at a pulldown station and adjust the knee pad.', 'Pull the bar down toward your upper chest while leaning back very slightly.', 'Focus on pulling with your elbows rather than your hands.', 'Slowly let the bar return to the top position.']
    },
    {
      id: 'b4',
      category: 'Back',
      name: 'Deadlift',
      sets: '5 Sets',
      reps: '5 Reps',
      target: 'Full Back',
      intensity: 'Extreme',
      video: 'deadlift.mp4',
      steps: ['Stand with feet hip-width apart, shins close to the barbell.', 'Bend down with a flat spine to grip the bar.', 'Drive through your legs to lift the weight while keeping the bar close to your shins.', 'Lock out your hips and knees at the top before reversing the motion safely.']
    },
    {
      id: 'b5',
      category: 'Back',
      name: 'Seated Cable Row',
      sets: '3 Sets',
      reps: '12 Reps',
      target: 'Mid Back',
      intensity: 'Medium',
      video: 'cable row.mp4',
      steps: ['Sit with your feet supported on the platform and hands gripping the handle attachment.', 'Pull the handle back toward your lower ribs while keeping your spine straight.', 'Squeeze your shoulder blades together.', 'Extend your arms back fully without slouching forward.']
    },
    {
      id: 'b6',
      category: 'Back',
      name: 'Hyperextensions',
      sets: '3 Sets',
      reps: '15 Reps',
      target: 'Lower Back',
      intensity: 'Low',
      video: 'extention.mp4',
      steps: ['Position your hips securely on the extension bench pad.', 'Lower your upper body slowly by hinging at the waist.', 'Engage your lower back and glutes to raise your torso back inline with your legs.', 'Avoid hyperextending or arching your spine past a straight line.']
    },

    // === SHOULDERS ===
    {
      id: 's1',
      category: 'Shoulders',
      name: 'Overhead Barbell Press',
      sets: '4 Sets',
      reps: '8-10 Reps',
      target: 'Anterior Deltoid',
      intensity: 'High',
      video: 'shoulder press.mp4',
      steps: ['Rest the barbell on your front shoulders with hands just outside shoulder-width.', 'Brace your core and press the bar straight overhead.', 'Tilt your head slightly back as the bar passes, then bring it forward once locked out.', 'Lower the bar back down to your upper chest safely.']
    },
    {
      id: 's2',
      category: 'Shoulders',
      name: 'front delt & upper traps',
      sets: '4 Sets',
      reps: '15 Reps',
      target: 'Lateral Deltoid',
      intensity: 'Medium',
      video: 'lat row show.mp4',
      steps: ['Stand straight holding dumbbells at your sides.', 'Raise your arms out to the sides with a tiny, soft bend in your elbows.', 'Lift until your arms are parallel to the floor, leading with your pinkies.', 'Slowly lower them back down without resting at the bottom.']
    },
    {
      id: 's3',
      category: 'Shoulders',
      name: 'cable face pull',
      sets: '3 Sets',
      reps: '15 Reps',
      target: 'Posterior Deltoid',
      intensity: 'Medium',
      video: 'face shoulder.mp4',
      steps: ['Hinge forward at the waist keeping your spine straight and knees unlocked.', 'Let dumbbells hang down below your chest.', 'Raise your arms outwards to your sides using your rear shoulders.', 'Lower the weights back down slowly, resisting gravity.']
    },
    {
      id: 's4',
      category: 'Shoulders',
      name: 'Dumbbell Front Raise',
      sets: '3 Sets',
      reps: '12 Reps',
      target: 'Front Deltoid',
      intensity: 'Low',
      video: 'dumbell raise.mp4',
      steps: ['Stand straight with dumbbells resting on the front of your thighs.', 'Raise one arm directly in front of you until it reaches eye level.', 'Lower it under control, then immediately repeat the step on the other arm.']
    },
    {
      id: 's5',
      category: 'Shoulders',
      name: 'Arnold Press',
      sets: '3 Sets',
      reps: '10-12 Reps',
      target: 'Full Shoulder',
      intensity: 'High',
      video: 'dumbell press.mp4',
      steps: ['Hold dumbbells at upper chest level with your palms facing your chest.', 'As you press the weights overhead, rotate your wrists outwards.', 'At the peak, your palms should face completely forward.', 'Rotate your palms back inside as you lower the weights back down.']
    },
    {
      id: 's6',
      category: 'Shoulders',
      name: 'Dumbbell Shrugs',
      sets: '4 Sets',
      reps: '12-15 Reps',
      target: 'Upper Traps',
      intensity: 'Medium',
      video: 'traps.mp4',
      steps: ['Stand with heavy dumbbells resting directly at your sides.', 'Elevate your shoulders up toward your ears as high as possible without rolling them.', 'Squeeze the trap muscles at the peak for a full second.', 'Lower your shoulders back down slowly.']
    },

    // === ARMS ===
    {
      id: 'a1',
      category: 'Arms',
      name: 'dumbell Bicep Curl',
      sets: '4 Sets',
      reps: '10-12 Reps',
      target: 'Bicep Brachii',
      intensity: 'Medium',
      video: 'bicep2.mp4',
      steps: ['Stand straight holding a barbell with an underhand grip.', 'Keep your elbows tucked into your sides.', 'Curl the bar upward toward your shoulders by flexing your biceps.', 'Lower the bar slowly back down to full arm extension.']
    },
    {
      id: 'a2',
      category: 'Arms',
      name: ' rope Tricep Pushdowns',
      sets: '4 Sets',
      reps: '12-15 Reps',
      target: 'Tricep Triceps',
      intensity: 'Medium',
      video: 'tricep3.mp4',
      steps: ['Face a cable machine and grip the rope attachment firmly.', 'Pin your elbows firmly against the sides of your torso.', 'Extend your arms straight downward, flaring the rope out at the bottom.', 'Return slowly back to the starting angle under control.']
    },
    {
      id: 'a3',
      category: 'Arms',
      name: 'knee biceps',
      sets: '3 Sets',
      reps: '12 Reps',
      target: 'Brachialis Thickness',
      intensity: 'Medium',
      video: 'bicep3.mp4',
      steps: ['Stand up straight holding dumbbells with your palms facing each other (neutral grip).', 'Curl the weights upwards without twisting your wrists.', 'Squeeze your outer arms at the top.', 'Lower the dumbbells slowly back down.']
    },
    {
      id: 'a4',
      category: 'Arms',
      name: 'kick back',
      sets: '3 Sets',
      reps: '10-12 Reps',
      target: 'Tricep Long Head',
      intensity: 'High',
      video: 'tricep2.mp4',
      steps: ['Lie flat on a bench holding an EZ bar over your chest.', 'Hinge only at your elbows to lower the bar toward your forehead.', 'Keep your upper arm locked vertically throughout.', 'Use your triceps to press the bar back up to the ceiling.']
    },
    {
      id: 'a5',
      category: 'Arms',
      name: 'Incline Dumbbell Curl',
      sets: '3 Sets',
      reps: '12 Reps',
      target: 'Bicep Long Head',
      intensity: 'Medium',
      video: 'bicep1.mp4',
      steps: ['Sit back on an incline bench allowing your arms to hang completely straight down.', 'Keep your elbows pulled back.', 'Curl the weights upward while turning your palms to face the ceiling.', 'Lower the weight slowly to feel a deep stretch at the bottom.']
    },
    {
      id: 'a6',
      category: 'Arms',
      name: 'Overhead Tricep Extension',
      sets: '3 Sets',
      reps: '12-15 Reps',
      target: 'Tricep Stretch',
      intensity: 'Medium',
      video: 'triep1.mp4',
      steps: ['Sit or stand, holding a single heavy dumbbell overhead with both hands forming a diamond grip.', 'Lower the weight down behind your neck by bending your elbows.', 'Keep your elbows tucked inward near your head.', 'Press the weight straight back up to full extension.']
    },

    // === LEGS ===
    {
      id: 'l1',
      category: 'Legs',
      name: 'Squat',
      sets: '5 Sets',
      reps: '8 Reps',
      target: 'Leg Strength',
      intensity: 'High',
      video: 'leg2.mp4',
      steps: ['Rest the barbell on your upper back traps and set your feet shoulder-width apart.', 'Sit down into a deep squat by bending your hips and knees.', 'Keep your back flat and drive your knees outward.', 'Push through your heels explosively to stand back up.']
    },
    {
      id: 'l2',
      category: 'Legs',
      name: 'Leg Press',
      sets: '4 Sets',
      reps: '12 Reps',
      target: 'Quads Focus',
      intensity: 'High',
      video: 'leg3.mp4',
      steps: ['Sit comfortably in the leg press machine and place your feet mid-width on the sled.', 'Lower the heavy sled slowly down until your knees reach a 90-degree angle.', 'Press the platform back up forcefully using your quads.', 'Do not lock out your knees at the top.']
    },
    {
      id: 'l3',
      category: 'Legs',
      name: 'squad in different variation',
      sets: '3 Sets',
      reps: '20 Steps',
      target: 'Leg Balance',
      intensity: 'Medium',
      video: 'leg1.mp4',
      steps: ['Take a large controlled step forward with one leg.', 'Lower your hips until your back knee is just an inch off the floor.', 'Ensure your front knee does not slide past your toes.', 'Drive through your front heel to step forward into the next step.']
    },
    {
      id: 'l4',
      category: 'Legs',
      name: 'sumo squad',
      sets: '4 Sets',
      reps: '10 Reps',
      target: 'Hamstrings & Glutes',
      intensity: 'High',
      video: 'leg4.mp4',
      steps: ['Stand straight holding a barbell at your thighs.', 'Push your hips far back while keeping your spine neutral and legs nearly straight.', 'Lower the bar down along your shins until you feel a deep hamstring stretch.', 'Drive your hips forward to snap back to the start position.']
    },
    {
      id: 'l5',
      category: 'Legs',
      name: 'Leg Extensions',
      sets: '3 Sets',
      reps: '15 Reps',
      target: 'Isolated Quads',
      intensity: 'Low',
      video: 'leg5.mp4',
      steps: ['Sit back in the extension machine with the roller pad resting on your lower shins.', 'Grip the seat handles and extend your legs fully until straight.', 'Squeeze your quadriceps hard at the peak for a second.', 'Lower your legs slowly back down under complete resistance.']
    },
    {
      id: 'l6',
      category: 'Legs',
      name: 'dead lift',
      sets: '4 Sets',
      reps: '20 Reps',
      target: 'Calf Muscles',
      intensity: 'Low',
      video: 'deadlift.mp4',
      steps: ['Sit in the machine and place the knee pad comfortably across your lower thighs.', 'Place the balls of your feet on the lower platform edge.', 'Drop your heels down as far as possible for a full stretch.', 'Drive up through your toes to contract your calf muscles completely.']
    },

    // === ABS ===
    {
      id: 'ab1',
      category: 'Abs',
      name: 'Hanging Knee Raises',
      sets: '4 Sets',
      reps: '15 Reps',
      target: 'Lower Abs',
      intensity: 'High',
      video: 'abs1.mp4',
      steps: ['Hang completely straight from a pull-up bar.', 'Keep your torso steady to prevent excessive body swinging.', 'Raise your knees up toward your chest by rolling your pelvis upward.', 'Lower your legs slowly back down to return to a full hang.']
    },
    {
      id: 'ab2',
      category: 'Abs',
      name: 'Ab Wheel Rollout',
      sets: '3 Sets',
      reps: '10 Reps',
      target: 'Core Shield',
      intensity: 'Extreme',
      video: 'abs2.mp4',
      steps: ['Kneel on a soft pad and place the wheel on the floor directly beneath your chest.', 'Roll the wheel out forward, extending your body into a straight alignment.', 'Keep your lower core tightly braced without sagging your lower back.', 'Pull yourself back to the knees position using your abs.']
    },
    {
      id: 'ab3',
      category: 'Abs',
      name: 'Cable Crunches',
      sets: '3 Sets',
      reps: '15 Reps',
      target: 'Upper Abs',
      intensity: 'Medium',
      video: 'abs3.mp4',
      steps: ['Kneel below a cable pulley holding the rope attachment next to your ears.', 'Flex your hips slightly and drop your head down.', 'Crunch downward, bringing your elbows towards your thighs by flexing your spine.', 'Slowly return back up to the top stretching position.']
    },
    {
      id: 'ab4',
      category: 'Abs',
      name: 'Russian Twists',
      sets: '3 Sets',
      reps: '20 Reps',
      target: 'Obliques',
      intensity: 'Low',
      video: 'abs4.mp4',
      steps: ['Sit on the floor with knees bent, tilting your torso back into a V-shape.', 'Lift your feet off the floor slightly to balance.', 'Twist your shoulders completely from side to side, tapping the weight or your hands on the ground.', 'Keep your core engaged throughout.']
    },
    {
      id: 'ab5',
      category: 'Abs',
      name: 'Plank Hold',
      sets: '3 Sets',
      reps: '60 Seconds',
      target: 'Transverse Core',
      intensity: 'Medium',
      video: 'abs5.mp4',
      steps: ['Support your body weight entirely on your forearms and toes.', 'Keep your torso perfectly straight like a tabletop.', 'Squeeze your glutes, quads, and abdominal wall tightly.', 'Hold this static layout cleanly without letting your hips drop down.']
    },
    {
      id: 'ab6',
      category: 'Abs',
      name: 'Bicycle Crunches',
      sets: '3 Sets',
      reps: '20 Reps',
      target: 'Complete Core',
      intensity: 'Medium',
      video: 'abs6.mp4',
      steps: ['Lie flat on your back and place your fingers gently behind your head.', 'Lift your shoulder blades off the floor.', 'Alternate driving your elbow across toward the opposite knee while extending the other leg straight out.', 'Repeat smoothly back and forth.']
    },
    // === HOME WORKOUT ===
{
  id: 'h1',
  category: 'Home Workout',
  name: 'Push Ups',
  sets: '4 Sets',
  reps: '15 Reps',
  target: 'Chest & Triceps',
  intensity: 'Medium',
  video: 'pushups.mp4',
  steps: [
    'Place your hands slightly wider than shoulder width.',
    'Keep your body straight from head to heels.',
    'Lower your chest close to the floor.',
    'Push yourself back up.'
  ]
},
{
  id: 'h2',
  category: 'Home Workout',
  name: 'Bodyweight Squats',
  sets: '4 Sets',
  reps: '20 Reps',
  target: 'Legs',
  intensity: 'Medium',
  video: 'bodyweight squat.mp4',
  steps: [
    'Stand with feet shoulder-width apart.',
    'Lower your hips until thighs are parallel.',
    'Keep your chest up.',
    'Return to standing position.'
  ]
},
{
  id: 'h3',
  category: 'Home Workout',
  name: 'Mountain Climbers',
  sets: '3 Sets',
  reps: '30 Seconds',
  target: 'Core',
  intensity: 'High',
  video: 'mountain climber.mp4',
  steps: [
    'Start in a plank position.',
    'Drive one knee toward your chest.',
    'Switch legs quickly.',
    'Maintain a straight back.'
  ]
},
{
  id: 'h4',
  category: 'Home Workout',
  name: 'Plank',
  sets: '3 Sets',
  reps: '60 Seconds',
  target: 'Core',
  intensity: 'Medium',
  video: 'plank.mp4',
  steps: [
    'Rest on your forearms.',
    'Keep your body straight.',
    'Tighten your abs.',
    'Hold the position.'
  ]
},
{
  id: 'h5',
  category: 'Home Workout',
  name: 'Jumping Jacks',
  sets: '3 Sets',
  reps: '40 Reps',
  target: 'Full Body',
  intensity: 'Medium',
  video: 'jumping jack.mp4',
  steps: [
    'Stand with feet together.',
    'Jump while spreading legs.',
    'Raise arms overhead.',
    'Return to starting position.'
  ]
},
{
  id: 'h6',
  category: 'Home Workout',
  name: 'Burpees',
  sets: '3 Sets',
  reps: '15 Reps',
  target: 'Full Body',
  intensity: 'High',
  video: 'burpees.mp4',
  steps: [
    'Squat down and place hands on the floor.',
    'Jump your feet back into a plank.',
    'Perform a push-up.',
    'Jump back up and reach overhead.'
  ]
},
{
  id: 'h7',
  category: 'Home Workout',
  name: 'Lunges',
  sets: '3 Sets',
  reps: '15 Reps Each Leg',
  target: 'Legs & Glutes',
  intensity: 'Medium',
  video: 'lunges.mp4',
  steps: [
    'Step one foot forward.',
    'Lower until both knees reach 90 degrees.',
    'Push back to the starting position.',
    'Repeat with the opposite leg.'
  ]
},
{
  id: 'h8',
  category: 'Home Workout',
  name: 'High Knees',
  sets: '3 Sets',
  reps: '30 Seconds',
  target: 'Cardio',
  intensity: 'High',
  video: 'high knees.mp4',
  steps: [
    'Run in place.',
    'Lift your knees above your waist.',
    'Pump your arms.',
    'Maintain a fast pace.'
  ]
}
  ];

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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;