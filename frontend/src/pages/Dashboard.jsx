import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyDietPlan } from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // User & Plan State
  const [user, setUser] = useState(null);
  const [plannerData, setPlannerData] = useState(null);
  const [dietPlanData, setDietPlanData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Interactive Daily Trackers State (Persisted in localStorage by date)
  const today = new Date();
  const dateKey = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [waterGlasses, setWaterGlasses] = useState(0); // in ml: glasses * 250ml
  const [workoutDone, setWorkoutDone] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [completedMeals, setCompletedMeals] = useState([]);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'workout' | 'nutrition'

  // Weekly Workout Schedule Default Mapping
  const defaultWeeklySplits = {
    Monday: { focus: "Chest & Triceps", category: "Chest", secondary: "Arms", duration: "55 Min", intensity: "High", calories: "420 kcal" },
    Tuesday: { focus: "Back & Biceps", category: "Back", secondary: "Arms", duration: "60 Min", intensity: "High", calories: "450 kcal" },
    Wednesday: { focus: "Legs & Calves", category: "Legs", secondary: "Legs", duration: "65 Min", intensity: "Extreme", calories: "520 kcal" },
    Thursday: { focus: "Shoulders & Traps", category: "Shoulders", secondary: "Back", duration: "50 Min", intensity: "Medium", calories: "380 kcal" },
    Friday: { focus: "Core & Abdominals", category: "Abs", secondary: "Abs", duration: "45 Min", intensity: "Medium", calories: "320 kcal" },
    Saturday: { focus: "Full Body Hypertrophy", category: "Chest", secondary: "Legs", duration: "60 Min", intensity: "High", calories: "480 kcal" },
    Sunday: { focus: "Active Recovery & Mobility", category: "Abs", secondary: "Home workout", duration: "30 Min", intensity: "Low", calories: "180 kcal" },
  };

  // Recommended Exercises per category
  const categoryExercises = {
    Chest: [
      { name: "Barbell Bench Press", sets: "4 Sets", reps: "8-10 Reps", target: "Middle Chest", icon: "🏋️‍♂️" },
      { name: "Incline Dumbbell Press", sets: "3 Sets", reps: "10-12 Reps", target: "Upper Chest", icon: "💪" },
      { name: "Cable Crossover / Fly", sets: "3 Sets", reps: "15 Reps", target: "Chest Stretch", icon: "⚡" },
      { name: "Dips / Push-ups", sets: "3 Sets", reps: "12-15 Reps", target: "Lower Chest", icon: "🔥" }
    ],
    Back: [
      { name: "Pull Ups", sets: "4 Sets", reps: "Failure", target: "Lats & Upper Back", icon: "🧗" },
      { name: "Lat Pulldown", sets: "4 Sets", reps: "10-12 Reps", target: "Back Width", icon: "🏋️‍♂️" },
      { name: "Seated Cable Row", sets: "3 Sets", reps: "12 Reps", target: "Mid Back", icon: "⚡" },
      { name: "Deadlift / Hyperextension", sets: "4 Sets", reps: "8-10 Reps", target: "Lower Back", icon: "🔥" }
    ],
    Legs: [
      { name: "Barbell Squats", sets: "4 Sets", reps: "8-10 Reps", target: "Quads & Glutes", icon: "🦵" },
      { name: "Leg Press", sets: "4 Sets", reps: "12 Reps", target: "Quadriceps", icon: "🏋️‍♂️" },
      { name: "Sumo Deadlift / Lunges", sets: "3 Sets", reps: "12 Reps", target: "Hamstrings", icon: "🔥" },
      { name: "Standing Calf Raises", sets: "4 Sets", reps: "15-20 Reps", target: "Calves", icon: "⚡" }
    ],
    Shoulders: [
      { name: "Overhead Barbell Press", sets: "4 Sets", reps: "8-10 Reps", target: "Anterior Delts", icon: "🏋️‍♂️" },
      { name: "Dumbbell Lateral Raise", sets: "4 Sets", reps: "12-15 Reps", target: "Side Deltoids", icon: "💪" },
      { name: "Cable Face Pull", sets: "3 Sets", reps: "15 Reps", target: "Rear Deltoids", icon: "⚡" },
      { name: "Dumbbell Shrugs", sets: "4 Sets", reps: "15 Reps", target: "Upper Traps", icon: "🔥" }
    ],
    Arms: [
      { name: "Dumbbell Bicep Curl", sets: "4 Sets", reps: "10-12 Reps", target: "Biceps Brachii", icon: "💪" },
      { name: "Rope Tricep Pushdown", sets: "4 Sets", reps: "12-15 Reps", target: "Tricep Head", icon: "⚡" },
      { name: "Hammer Curls", sets: "3 Sets", reps: "12 Reps", target: "Brachialis", icon: "🏋️‍♂️" },
      { name: "Overhead Tricep Extension", sets: "3 Sets", reps: "12 Reps", target: "Tricep Stretch", icon: "🔥" }
    ],
    Abs: [
      { name: "Hanging Knee Raises", sets: "4 Sets", reps: "15 Reps", target: "Lower Abs", icon: "⚡" },
      { name: "Cable Crunches", sets: "3 Sets", reps: "15 Reps", target: "Upper Abs", icon: "🔥" },
      { name: "Russian Twists", sets: "3 Sets", reps: "20 Reps", target: "Obliques", icon: "🔄" },
      { name: "Plank Hold", sets: "3 Sets", reps: "60 Seconds", target: "Core Stability", icon: "⏱️" }
    ]
  };

  useEffect(() => {
    // 1. Load User
    const storedUser = localStorage.getItem("user");
    let currentUserId = "6a4f325f87cee48babb5be6e";
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        if (parsed.id || parsed._id) {
          currentUserId = parsed.id || parsed._id;
        }
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }

    // 2. Load Stored Daily Trackers
    const savedTrackers = localStorage.getItem(`daily_tracker_${dateKey}`);
    if (savedTrackers) {
      try {
        const parsedTracker = JSON.parse(savedTrackers);
        setWaterGlasses(parsedTracker.waterGlasses || 0);
        setWorkoutDone(parsedTracker.workoutDone || false);
        setCompletedExercises(parsedTracker.completedExercises || []);
        setCompletedMeals(parsedTracker.completedMeals || []);
      } catch (e) {
        console.error("Error parsing daily tracker:", e);
      }
    }

    // 3. Fetch Data in Parallel (Planner + Diet)
    const fetchDashboardData = async () => {
      // First check locally cached planner
      const localPlanner = localStorage.getItem("userPlanner");
      if (localPlanner) {
        try {
          setPlannerData(JSON.parse(localPlanner));
        } catch (e) {
          console.error("Error reading local planner:", e);
        }
      }

      try {
        // Fetch Planner from API
        try {
          const plannerRes = await fetch(`/api/planner/${currentUserId}`);
          const plannerJson = await plannerRes.json();
          if (plannerJson.success && plannerJson.data) {
            setPlannerData(plannerJson.data);
            localStorage.setItem("userPlanner", JSON.stringify(plannerJson.data));
          }
        } catch (err) {
          console.warn("Could not fetch remote planner, using cached/default split.");
        }

        // Fetch Diet
        try {
          const dietRes = await getMyDietPlan();
          if (dietRes && dietRes.dietPlan) {
            setDietPlanData(dietRes.dietPlan);
          }
        } catch (err) {
          console.warn("No diet plan generated yet or using defaults.");
        }
      } catch (error) {
        console.error("Dashboard data load error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [dateKey]);

  // Save Trackers on State Change
  const saveTrackers = (newWater, newWorkout, newExercises, newMeals) => {
    localStorage.setItem(
      `daily_tracker_${dateKey}`,
      JSON.stringify({
        waterGlasses: newWater !== undefined ? newWater : waterGlasses,
        workoutDone: newWorkout !== undefined ? newWorkout : workoutDone,
        completedExercises: newExercises !== undefined ? newExercises : completedExercises,
        completedMeals: newMeals !== undefined ? newMeals : completedMeals,
      })
    );
  };

  // Water Actions
  const handleWaterAdd = () => {
    const next = waterGlasses + 1;
    setWaterGlasses(next);
    saveTrackers(next, undefined, undefined, undefined);
  };

  const handleWaterSub = () => {
    if (waterGlasses > 0) {
      const next = waterGlasses - 1;
      setWaterGlasses(next);
      saveTrackers(next, undefined, undefined, undefined);
    }
  };

  // Toggle Exercise Item Completion
  const toggleExercise = (name) => {
    const next = completedExercises.includes(name)
      ? completedExercises.filter((n) => n !== name)
      : [...completedExercises, name];
    setCompletedExercises(next);
    const allDone = next.length >= (todaysRoutine.exercises?.length || 4);
    setWorkoutDone(allDone);
    saveTrackers(undefined, allDone, next, undefined);
  };

  // Toggle Meal Completion
  const toggleMeal = (mealType) => {
    const next = completedMeals.includes(mealType)
      ? completedMeals.filter((m) => m !== mealType)
      : [...completedMeals, mealType];
    setCompletedMeals(next);
    saveTrackers(undefined, undefined, undefined, next);
  };

  // Computed Values
  const defaultSplit = defaultWeeklySplits[dayName] || defaultWeeklySplits.Monday;
  const todaysWorkoutTitle = plannerData?.workoutPlan?.[dayName] || defaultSplit.focus;
  const currentCategory = defaultSplit.category;
  const exercisesForToday = categoryExercises[currentCategory] || categoryExercises.Chest;

  const todaysRoutine = {
    title: todaysWorkoutTitle,
    category: currentCategory,
    duration: plannerData?.workoutDuration || defaultSplit.duration,
    intensity: defaultSplit.intensity,
    caloriesEst: defaultSplit.calories,
    exercises: exercisesForToday
  };

  // Nutrition Targets - seamlessly connect with Diet Plan or Gym Planner
  const calorieGoal = Number(
    dietPlanData?.dailyTargets?.calories ||
    plannerData?.dietRoutine?.dailyTargets?.calories ||
    plannerData?.dailyCalories ||
    2400
  );
  const proteinGoal = Number(
    dietPlanData?.dailyTargets?.protein ||
    plannerData?.dietRoutine?.dailyTargets?.protein ||
    plannerData?.protein?.replace?.("g", "") ||
    160
  );
  const carbsGoal = Number(
    dietPlanData?.dailyTargets?.carbs ||
    plannerData?.dietRoutine?.dailyTargets?.carbs ||
    plannerData?.carbs?.replace?.("g", "") ||
    240
  );
  const fatsGoal = Number(
    dietPlanData?.dailyTargets?.fats ||
    plannerData?.dietRoutine?.dailyTargets?.fats ||
    plannerData?.fats?.replace?.("g", "") ||
    65
  );

  const waterTargetLiters = Number(String(plannerData?.waterGoal || "3").match(/\d+/)?.[0]) || 3.0;
  const waterConsumedLiters = ((waterGlasses * 250) / 1000).toFixed(2);
  const waterPercent = Math.min(Math.round((waterConsumedLiters / waterTargetLiters) * 100), 100);

  // Macro percentages for visual distribution bars
  const totalCalsEst = Math.max(calorieGoal, 1);
  const proteinPct = Math.min(100, Math.round(((proteinGoal * 4) / totalCalsEst) * 100)) || 30;
  const carbsPct = Math.min(100, Math.round(((carbsGoal * 4) / totalCalsEst) * 100)) || 45;
  const fatsPct = Math.min(100, Math.round(((fatsGoal * 9) / totalCalsEst) * 100)) || 25;

  // Meal list from DietPlan if available, or Gym Planner dietRoutine, or fallback template
  let mealsList = [];
  if (dietPlanData?.meals?.length > 0) {
    mealsList = dietPlanData.meals.map((m, idx) => {
      const foodNames = m.foods?.map((f) => f.name).filter(Boolean).join(", ");
      return {
        id: `diet_meal_${idx}`,
        type: m.mealName || m.mealType || `Meal ${idx + 1}`,
        name: foodNames || m.mealName || m.mealType,
        calories: Math.round(m.totalCalories || 0),
        protein: Math.round(m.totalProtein || 0),
        carbs: Math.round(m.totalCarbs || 0),
        fats: Math.round(m.totalFats || 0)
      };
    });
  } else if (plannerData?.dietRoutine?.meals?.length > 0) {
    mealsList = plannerData.dietRoutine.meals.map((m, idx) => ({
      id: `planner_meal_${idx}`,
      type: m.name || `Meal ${idx + 1}`,
      name: Array.isArray(m.items) ? m.items.join(", ") : m.name,
      calories: Math.round(m.calories || 0),
      protein: Math.round(m.protein || 0),
      carbs: Math.round(m.carbs || 0),
      fats: Math.round(m.fats || 0)
    }));
  } else {
    mealsList = [
      { id: "default_0", type: "Breakfast", name: "Oatmeal with Whey Protein & Berries", calories: 520, protein: 38, carbs: 65, fats: 12 },
      { id: "default_1", type: "Lunch", name: "Grilled Chicken Breast with Brown Rice & Broccoli", calories: 680, protein: 52, carbs: 75, fats: 16 },
      { id: "default_2", type: "Snacks", name: "Greek Yogurt with Almonds & Banana", calories: 340, protein: 24, carbs: 36, fats: 11 },
      { id: "default_3", type: "Dinner", name: "Salmon Fillet with Quinoa & Steamed Asparagus", calories: 610, protein: 46, carbs: 48, fats: 20 },
    ];
  }

  // Daily Score Calculation
  const exerciseScore = (completedExercises.length / Math.max(todaysRoutine.exercises.length, 1)) * 40;
  const mealScore = (completedMeals.length / Math.max(mealsList.length, 1)) * 40;
  const hydrationScore = (Math.min(waterPercent, 100) / 100) * 20;
  const overallDailyScore = Math.round(exerciseScore + mealScore + hydrationScore);

  if (loading) {
    return (
      <div className="dashboard-loading-state">
        <div className="dashboard-spinner"></div>
        <h2>Initializing Biometric Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="daily-dashboard">
      {/* 1. HERO GREETING & STATUS BANNER */}
      <header className="dashboard-header-block">
        <div className="header-greeting">
          <div className="eyebrow-tag">
            <span className="live-dot"></span> BIOMETRIC COMMAND CENTER
          </div>
          <h1>
            Welcome back, <span>{user?.name || "Athlete"}</span> 💪
          </h1>
          <p className="header-date">
            📅 {dayName}, {fullDate} • Goal: <strong>{plannerData?.goal || "Muscle Growth & Strength"}</strong>
          </p>
        </div>

        <div className="header-quick-stats">
          <div className="daily-score-card">
            <div className="score-ring">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path
                  className="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="circle"
                  strokeDasharray={`${overallDailyScore}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="score-text">{overallDailyScore}%</span>
            </div>
            <div className="score-meta">
              <h4>Daily Completion</h4>
              <p>{workoutDone ? "Workout Logged" : `${completedExercises.length}/${todaysRoutine.exercises.length} Exercises`}</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. TOP METRIC KPI CARDS */}
      <section className="kpi-grid">
        <div className="kpi-card energy-kpi" onClick={() => navigate("/diet")}>
          <div className="kpi-top">
            <span className="kpi-icon">🔥</span>
            <span className="kpi-label">Calories Goal</span>
          </div>
          <h2>{calorieGoal.toLocaleString()} <span>kcal</span></h2>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill coral" style={{ width: "80%" }}></div>
          </div>
          <span className="kpi-footer">Target Energy Budget</span>
        </div>

        <div className="kpi-card protein-kpi" onClick={() => navigate("/diet")}>
          <div className="kpi-top">
            <span className="kpi-icon">🥩</span>
            <span className="kpi-label">Protein Target</span>
          </div>
          <h2>{proteinGoal} <span>grams</span></h2>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill indigo" style={{ width: "75%" }}></div>
          </div>
          <span className="kpi-footer">Hypertrophy Baseline</span>
        </div>

        <div className="kpi-card hydration-kpi">
          <div className="kpi-top">
            <span className="kpi-icon">💧</span>
            <span className="kpi-label">Hydration</span>
          </div>
          <h2>{waterConsumedLiters} <span>/ {waterTargetLiters} L</span></h2>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill cyan" style={{ width: `${waterPercent}%` }}></div>
          </div>
          <span className="kpi-footer">{waterGlasses} Glasses Logged ({waterPercent}%)</span>
        </div>

        <div className="kpi-card training-kpi" onClick={() => navigate("/exercises")}>
          <div className="kpi-top">
            <span className="kpi-icon">🏋️</span>
            <span className="kpi-label">Training Protocol</span>
          </div>
          <h2>{todaysRoutine.category}</h2>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill emerald" style={{ width: workoutDone ? "100%" : `${(completedExercises.length / todaysRoutine.exercises.length) * 100}%` }}></div>
          </div>
          <span className="kpi-footer">{todaysRoutine.duration} • {todaysRoutine.intensity} Intensity</span>
        </div>
      </section>

      {/* 3. NAVIGATION TAB SWITCHER */}
      <div className="dashboard-tabs">
        <button
          className={`dash-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          📊 Daily Overview
        </button>
        <button
          className={`dash-tab ${activeTab === "workout" ? "active" : ""}`}
          onClick={() => setActiveTab("workout")}
        >
          🏋️ Today's Workout ({todaysRoutine.category})
        </button>
        <button
          className={`dash-tab ${activeTab === "nutrition" ? "active" : ""}`}
          onClick={() => setActiveTab("nutrition")}
        >
          🥗 Nutrition & Meals ({mealsList.length} Meals)
        </button>
      </div>

      {/* 4. MAIN CONTENT PANELS */}
      <div className="dashboard-content-grid">
        
        {/* LEFT COLUMN: WORKOUT PROTOCOL (CONNECTED TO EXERCISES & ANATOMY) */}
        {(activeTab === "overview" || activeTab === "workout") && (
          <div className="dash-card workout-focus-panel">
            <div className="card-top-bar">
              <div>
                <span className="tag-pill tag-purple">LIVE WORKOUT MODULE</span>
                <h2>🏋️ {todaysRoutine.title}</h2>
              </div>
              <button
                className="action-link-btn"
                onClick={() => navigate("/exercises", { state: { targetMuscle: todaysRoutine.category } })}
              >
                Browse All Exercises →
              </button>
            </div>

            <div className="routine-overview-banner">
              <div className="routine-stat">
                <span className="routine-lbl">TARGET SPLIT</span>
                <strong>{todaysRoutine.category}</strong>
              </div>
              <div className="routine-stat">
                <span className="routine-lbl">SESSION TIME</span>
                <strong>{todaysRoutine.duration}</strong>
              </div>
              <div className="routine-stat">
                <span className="routine-lbl">CALORIE BURN</span>
                <strong>{todaysRoutine.caloriesEst}</strong>
              </div>
              <div className="routine-stat">
                <span className="routine-lbl">ANATOMY SCAN</span>
                <button
                  className="mini-scan-btn"
                  onClick={() => navigate("/anatomy")}
                >
                  Scan Muscle 🧬
                </button>
              </div>
            </div>

            {/* INTERACTIVE EXERCISE CHECKLIST */}
            <div className="exercise-checklist-header">
              <h3>Target Exercises Routine</h3>
              <span className="completed-counter">
                {completedExercises.length} of {todaysRoutine.exercises.length} Complete
              </span>
            </div>

            <div className="exercise-items-list">
              {todaysRoutine.exercises.map((ex, idx) => {
                const isDone = completedExercises.includes(ex.name);
                return (
                  <div
                    key={idx}
                    className={`exercise-row-item ${isDone ? "completed" : ""}`}
                    onClick={() => toggleExercise(ex.name)}
                  >
                    <div className="exercise-check-box">
                      <span className="check-mark">{isDone ? "✓" : ""}</span>
                    </div>

                    <div className="exercise-icon-wrap">{ex.icon}</div>

                    <div className="exercise-info-col">
                      <h4 className="exercise-title">{ex.name}</h4>
                      <span className="exercise-meta">
                        {ex.sets} • {ex.reps} • <em>{ex.target}</em>
                      </span>
                    </div>

                    <div className="exercise-status-badge">
                      {isDone ? "COMPLETED" : "START"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="workout-actions-footer">
              <button
                className={`full-workout-btn ${workoutDone ? "done" : ""}`}
                onClick={() => {
                  const newDone = !workoutDone;
                  setWorkoutDone(newDone);
                  if (newDone) {
                    setCompletedExercises(todaysRoutine.exercises.map((e) => e.name));
                  } else {
                    setCompletedExercises([]);
                  }
                  saveTrackers(undefined, newDone, newDone ? todaysRoutine.exercises.map((e) => e.name) : [], undefined);
                }}
              >
                {workoutDone ? "✓ Workout Completed for Today!" : "Mark Entire Session as Completed"}
              </button>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: NUTRITION & MACROS (CONNECTED TO DIET) */}
        {(activeTab === "overview" || activeTab === "nutrition") && (
          <div className="dash-card nutrition-focus-panel">
            <div className="card-top-bar">
              <div>
                <span className="tag-pill tag-coral">DAILY NUTRITION PROTOCOL</span>
                <h2>🍽 Macro Distribution</h2>
              </div>
              <button className="action-link-btn" onClick={() => navigate("/diet")}>
                Open Diet Planner →
              </button>
            </div>

            {/* MACRONUTRIENT BARS */}
            <div className="macro-breakdown-box">
              <div className="macro-bar-row">
                <div className="macro-header-row">
                  <span className="macro-name">🍗 Protein (Growth & Repair)</span>
                  <strong className="macro-val">{proteinGoal}g ({proteinPct}%)</strong>
                </div>
                <div className="macro-track">
                  <div className="macro-fill fill-protein" style={{ width: `${proteinPct}%` }}></div>
                </div>
              </div>

              <div className="macro-bar-row">
                <div className="macro-header-row">
                  <span className="macro-name">🍚 Carbohydrates (Fuel & Energy)</span>
                  <strong className="macro-val">{carbsGoal}g ({carbsPct}%)</strong>
                </div>
                <div className="macro-track">
                  <div className="macro-fill fill-carbs" style={{ width: `${carbsPct}%` }}></div>
                </div>
              </div>

              <div className="macro-bar-row">
                <div className="macro-header-row">
                  <span className="macro-name">🥑 Healthy Fats (Hormone Balance)</span>
                  <strong className="macro-val">{fatsGoal}g ({fatsPct}%)</strong>
                </div>
                <div className="macro-track">
                  <div className="macro-fill fill-fats" style={{ width: `${fatsPct}%` }}></div>
                </div>
              </div>
            </div>

            {/* MEALS CHECKLIST */}
            <div className="meals-section-header">
              <h3>Today's Meal Timeline</h3>
              <span className="completed-counter">
                {completedMeals.length} of {mealsList.length} Logged
              </span>
            </div>

            <div className="meals-list-grid">
              {mealsList.map((meal, idx) => {
                const mealKey = meal.id || meal.type || `meal_${idx}`;
                const isEaten = completedMeals.includes(mealKey) || completedMeals.includes(meal.type);
                return (
                  <div
                    key={mealKey}
                    className={`meal-card-item ${isEaten ? "eaten" : ""}`}
                    onClick={() => toggleMeal(mealKey)}
                  >
                    <div className="meal-card-top">
                      <span className="meal-type-pill">{meal.type}</span>
                      <span className="meal-check-indicator">{isEaten ? "✓ Eaten" : "+ Log"}</span>
                    </div>
                    <h4 className="meal-name-txt">{meal.name}</h4>
                    <div className="meal-macros-chips">
                      <span>🔥 {meal.calories} kcal</span>
                      <span>🥩 {meal.protein}g P</span>
                      <span>🍚 {meal.carbs}g C</span>
                      <span>🥑 {meal.fats}g F</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* 5. BOTTOM ROW: WATER TRACKER & AI INTELLIGENCE */}
      <div className="dashboard-bottom-grid">
        
        {/* HYDRATION WIDGET */}
        <div className="dash-card hydration-widget">
          <div className="widget-header">
            <div>
              <span className="tag-pill tag-cyan">WATER INTAKE</span>
              <h3>💧 Hydration Station</h3>
            </div>
            <span className="liters-counter">{waterConsumedLiters} / {waterTargetLiters} L</span>
          </div>

          <div className="water-wave-container">
            <div className="water-level-fill" style={{ height: `${Math.max(waterPercent, 8)}%` }}></div>
            <div className="water-center-label">
              <strong>{waterPercent}%</strong>
              <span>Target Met</span>
            </div>
          </div>

          <div className="water-controls">
            <button className="water-btn sub-btn" onClick={handleWaterSub} disabled={waterGlasses === 0}>
              - 250ml
            </button>
            <span className="glasses-count">{waterGlasses} Glasses</span>
            <button className="water-btn add-btn" onClick={handleWaterAdd}>
              + 250ml Glass
            </button>
          </div>
        </div>

        {/* AI FITNESS COACH ADVISOR */}
        <div className="dash-card ai-advisor-widget">
          <div className="ai-coach-top">
            <div className="coach-avatar">🤖</div>
            <div>
              <span className="tag-pill tag-coral">AI SMART COACH</span>
              <h3>Today's Biometric Directive</h3>
            </div>
          </div>

          <p className="ai-directive-text">
            For <strong>{dayName}</strong>, your primary mechanical focus is <strong>{todaysRoutine.title}</strong>. 
            Aim to maintain progressive overload on your compound lifts while hitting your <strong>{proteinGoal}g protein</strong> target. 
            Stay consistent with hydration to optimize muscle glycogen synthesis.
          </p>

          <div className="coach-quick-links">
            <button className="coach-link" onClick={() => navigate("/anatomy")}>
              🧬 Inspect Muscle Mechanics
            </button>
            <button className="coach-link" onClick={() => navigate("/ai-planner")}>
              📋 Re-generate Routine
            </button>
            <button className="coach-link" onClick={() => navigate("/bmi")}>
              ⚖️ Check Body Composition
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;