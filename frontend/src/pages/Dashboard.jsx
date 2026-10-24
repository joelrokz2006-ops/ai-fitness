import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  getMyDietPlan,
  getMyPlanner,
  getProgress,
  toggleProgress,
  updateProgressWater,
} from "../services/api";
import { slugify } from "../data/exercise";
import "./Dashboard.css";

// Helper to get local date string YYYY-MM-DD
const getLocalDateString = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Dashboard() {
  const navigate = useNavigate();

  // User & Plans State
  const [user, setUser] = useState(null);
  const [plannerData, setPlannerData] = useState(null);
  const [dietPlanData, setDietPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null);
  const [updatingItem, setUpdatingItem] = useState(null);

  // Date & Calendar State
  const today = new Date();
  const dateKey = getLocalDateString(today);
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Trackers State (Persisted in Backend & mirrored in localStorage)
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [completedMeals, setCompletedMeals] = useState([]);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'workout' | 'nutrition'

  // Load User profile
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
  }, []);

  // Fetch Dashboard Plans and Today's authoritative backend progress
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setStatusMessage(null);

    let activeDiet = null;
    let activePlanner = null;

    // 1. Fetch Diet Plan
    try {
      const dietRes = await getMyDietPlan();
      if (dietRes && dietRes.dietPlan) {
        activeDiet = dietRes.dietPlan;
        setDietPlanData(activeDiet);
      } else {
        setDietPlanData(null);
      }
    } catch (err) {
      // 404 or missing plan is a standard empty state
      setDietPlanData(null);
    }

    // 2. Fetch Gym Planner
    try {
      const planner = await getMyPlanner();
      if (planner) {
        activePlanner = planner;
        setPlannerData(activePlanner);
      } else {
        setPlannerData(null);
      }
    } catch (err) {
      setPlannerData(null);
    }

    // 3. Fetch authoritative Daily Progress from Backend for today
    try {
      const progressData = await getProgress(
        dateKey,
        activeDiet?._id,
        activePlanner?._id
      );

      if (progressData) {
        setCompletedMeals(progressData.completedMeals || []);
        setCompletedExercises(progressData.completedExercises || []);
        setWaterGlasses(progressData.waterGlasses || 0);

        // Update local mirror
        localStorage.setItem(
          `daily_tracker_${dateKey}`,
          JSON.stringify({
            waterGlasses: progressData.waterGlasses || 0,
            completedExercises: progressData.completedExercises || [],
            completedMeals: progressData.completedMeals || [],
          })
        );
      } else {
        // Fallback to local storage if offline or not logged in
        const savedTrackers = localStorage.getItem(`daily_tracker_${dateKey}`);
        if (savedTrackers) {
          try {
            const parsed = JSON.parse(savedTrackers);
            setWaterGlasses(parsed.waterGlasses || 0);
            setCompletedExercises(parsed.completedExercises || []);
            setCompletedMeals(parsed.completedMeals || []);
          } catch (e) {}
        }
      }
    } catch (err) {
      console.warn("Could not fetch remote daily progress:", err.message);
    } finally {
      setLoading(false);
    }
  }, [dateKey]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // ==========================================
  // PROGRESS ACTIONS (WITH BACKEND PERSISTENCE)
  // ==========================================

  // Toggle Meal Completion
  const handleToggleMeal = async (mealIdentifier) => {
    if (updatingItem) return; // Prevent double submission
    setUpdatingItem(mealIdentifier);

    const isCurrentlyDone = completedMeals.includes(mealIdentifier);
    const nextDone = !isCurrentlyDone;

    // Optimistic UI update
    const nextMeals = nextDone
      ? [...completedMeals, mealIdentifier]
      : completedMeals.filter((m) => m !== mealIdentifier);
    setCompletedMeals(nextMeals);

    try {
      await toggleProgress({
        date: dateKey,
        type: "diet",
        itemId: mealIdentifier,
        completed: nextDone,
        planId: dietPlanData?._id,
      });

      // Update local storage mirror
      const savedTrackers = localStorage.getItem(`daily_tracker_${dateKey}`);
      const parsed = savedTrackers ? JSON.parse(savedTrackers) : {};
      localStorage.setItem(
        `daily_tracker_${dateKey}`,
        JSON.stringify({ ...parsed, completedMeals: nextMeals })
      );
    } catch (err) {
      // Revert on failure
      console.error("Meal completion sync error:", err);
      setCompletedMeals(completedMeals);
      setStatusMessage({
        type: "error",
        text: `Failed to save status for ${mealIdentifier}: ${err.message}`,
      });
    } finally {
      setUpdatingItem(null);
    }
  };

  // Toggle Exercise Completion
  const handleToggleExercise = async (exerciseName) => {
    if (updatingItem) return; // Prevent double submission
    setUpdatingItem(exerciseName);

    const isCurrentlyDone = completedExercises.includes(exerciseName);
    const nextDone = !isCurrentlyDone;

    // Optimistic UI update
    const nextExercises = nextDone
      ? [...completedExercises, exerciseName]
      : completedExercises.filter((e) => e !== exerciseName);
    setCompletedExercises(nextExercises);

    try {
      await toggleProgress({
        date: dateKey,
        type: "workout",
        itemId: exerciseName,
        completed: nextDone,
        planId: plannerData?._id,
      });

      // Update local storage mirror
      const savedTrackers = localStorage.getItem(`daily_tracker_${dateKey}`);
      const parsed = savedTrackers ? JSON.parse(savedTrackers) : {};
      localStorage.setItem(
        `daily_tracker_${dateKey}`,
        JSON.stringify({ ...parsed, completedExercises: nextExercises })
      );
    } catch (err) {
      // Revert on failure
      console.error("Exercise completion sync error:", err);
      setCompletedExercises(completedExercises);
      setStatusMessage({
        type: "error",
        text: `Failed to save status for ${exerciseName}: ${err.message}`,
      });
    } finally {
      setUpdatingItem(null);
    }
  };

  // Water Hydration Actions
  const handleWaterChange = async (delta) => {
    const nextGlasses = Math.max(0, waterGlasses + delta);
    setWaterGlasses(nextGlasses);

    try {
      await updateProgressWater({
        date: dateKey,
        waterGlasses: nextGlasses,
      });

      const savedTrackers = localStorage.getItem(`daily_tracker_${dateKey}`);
      const parsed = savedTrackers ? JSON.parse(savedTrackers) : {};
      localStorage.setItem(
        `daily_tracker_${dateKey}`,
        JSON.stringify({ ...parsed, waterGlasses: nextGlasses })
      );
    } catch (err) {
      console.warn("Water update error:", err);
    }
  };

  // ==========================================
  // RESOLVE TODAY'S WORKOUT PROTOCOL
  // ==========================================
  const todaysRoutine = plannerData?.exerciseRoutine?.find(
    (r) => r.day?.toLowerCase() === dayName.toLowerCase()
  );

  const todaysWorkoutTitle =
    todaysRoutine?.focus ||
    plannerData?.workoutPlan?.[dayName] ||
    "Rest & Recovery";

  const isRestDay =
    !todaysRoutine ||
    todaysRoutine.exercises?.length === 0 ||
    /rest/i.test(todaysRoutine.focus || "");

  const plannedExercises = todaysRoutine?.exercises || [];
  const totalExercises = plannedExercises.length;
  const completedExercisesCount = plannedExercises.filter((ex) =>
    completedExercises.includes(ex.name)
  ).length;

  const workoutPct =
    totalExercises > 0
      ? Math.round((completedExercisesCount / totalExercises) * 100)
      : null;

  // Toggle entire workout session
  const allExercisesCompleted =
    totalExercises > 0 && completedExercisesCount === totalExercises;

  const handleToggleEntireWorkout = async () => {
    if (totalExercises === 0 || updatingItem) return;

    const nextState = !allExercisesCompleted;
    setUpdatingItem("all_exercises");

    try {
      // Toggle each exercise in sequence
      for (const ex of plannedExercises) {
        await toggleProgress({
          date: dateKey,
          type: "workout",
          itemId: ex.name,
          completed: nextState,
          planId: plannerData?._id,
        });
      }

      const nextList = nextState
        ? Array.from(new Set([...completedExercises, ...plannedExercises.map((e) => e.name)]))
        : completedExercises.filter(
            (name) => !plannedExercises.some((e) => e.name === name)
          );

      setCompletedExercises(nextList);

      const savedTrackers = localStorage.getItem(`daily_tracker_${dateKey}`);
      const parsed = savedTrackers ? JSON.parse(savedTrackers) : {};
      localStorage.setItem(
        `daily_tracker_${dateKey}`,
        JSON.stringify({ ...parsed, completedExercises: nextList })
      );
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: `Error updating workout session: ${err.message}`,
      });
    } finally {
      setUpdatingItem(null);
    }
  };

  // ==========================================
  // RESOLVE TODAY'S DIET PLAN
  // ==========================================
  const plannedMeals = dietPlanData?.meals || [];
  const totalMeals = plannedMeals.length;

  const getMealIdentifier = (meal, idx) => meal.mealName || meal.mealType || `Meal ${idx + 1}`;

  const completedMealsCount = plannedMeals.filter((m, idx) =>
    completedMeals.includes(getMealIdentifier(m, idx))
  ).length;

  const dietPct =
    totalMeals > 0
      ? Math.round((completedMealsCount / totalMeals) * 100)
      : null;

  // ==========================================
  // NUTRITION TARGETS & MACROS
  // ==========================================
  const calorieGoal = Number(dietPlanData?.dailyTargets?.calories || 0);
  const proteinGoal = Number(dietPlanData?.dailyTargets?.protein || 0);
  const carbsGoal = Number(dietPlanData?.dailyTargets?.carbs || 0);
  const fatsGoal = Number(dietPlanData?.dailyTargets?.fats || 0);

  const waterTargetLiters =
    Number(String(plannerData?.waterIntake || "3").match(/\d+/)?.[0]) || 3.0;
  const waterConsumedLiters = ((waterGlasses * 250) / 1000).toFixed(2);
  const waterPercent = Math.min(
    Math.round((waterConsumedLiters / waterTargetLiters) * 100),
    100
  );

  // Macro distribution percentages
  const totalCalsEst = Math.max(calorieGoal, 1);
  const proteinPct = Math.min(100, Math.round(((proteinGoal * 4) / totalCalsEst) * 100)) || 0;
  const carbsPct = Math.min(100, Math.round(((carbsGoal * 4) / totalCalsEst) * 100)) || 0;
  const fatsPct = Math.min(100, Math.round(((fatsGoal * 9) / totalCalsEst) * 100)) || 0;

  // ==========================================
  // OVERALL PROGRESS (DYNAMIC & STRICTLY REAL)
  // ==========================================
  const totalPlannedItems =
    (dietPlanData ? totalMeals : 0) +
    (plannerData && !isRestDay ? totalExercises : 0);

  const totalCompletedItems =
    (dietPlanData ? completedMealsCount : 0) +
    (plannerData && !isRestDay ? completedExercisesCount : 0);

  const overallPct =
    totalPlannedItems > 0
      ? Math.round((totalCompletedItems / totalPlannedItems) * 100)
      : dietPlanData || plannerData
      ? 0
      : null;

  if (loading) {
    return (
      <div className="dashboard-loading-state">
        <div className="dashboard-spinner"></div>
        <h2>Loading Your Biometric Dashboard...</h2>
        <p>Syncing saved diet, gym schedule, and completion progress.</p>
      </div>
    );
  }

  return (
    <div className="daily-dashboard">
      {/* 1. STATUS ALERT BANNER (IF ANY) */}
      {statusMessage && (
        <div className={`dash-status-toast ${statusMessage.type}`}>
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)}>✕</button>
        </div>
      )}

      {/* 2. HERO GREETING & BIOMETRIC HEADER */}
      <header className="dashboard-header-block">
        <div className="header-greeting">
          <div className="eyebrow-tag">
            <span className="live-dot"></span> BIOMETRIC COMMAND CENTER
          </div>
          <h1>
            Welcome back, <span>{user?.name || "Athlete"}</span> 💪
          </h1>
          <p className="header-date">
            📅 {dayName}, {fullDate} • Track your personalized nutrition & workout directives
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
                  strokeDasharray={`${overallPct || 0}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="score-text">
                {overallPct !== null ? `${overallPct}%` : "—"}
              </span>
            </div>
            <div className="score-meta">
              <h4>Overall Daily Progress</h4>
              <p>
                {totalPlannedItems > 0
                  ? `${totalCompletedItems} of ${totalPlannedItems} planned items completed`
                  : "No active plans yet"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 3. TODAY'S PROGRESS SUMMARY SECTION (MD SECTION 3 & 6) */}
      <section className="todays-progress-banner">
        <div className="progress-banner-header">
          <div>
            <span className="tag-pill tag-purple">TODAY'S PROGRESS SUMMARY</span>
            <h2>Daily Execution Dashboard</h2>
          </div>
          <div className="banner-actions">
            <button className="action-pill-btn" onClick={() => navigate("/diet")}>
              🥗 View Full Diet Plan
            </button>
            <button className="action-pill-btn" onClick={() => navigate("/ai-planner")}>
              📋 Open Gym Planner
            </button>
          </div>
        </div>

        <div className="progress-summary-cards-grid">
          {/* DIET PROGRESS CARD */}
          <div className="progress-summary-card">
            <div className="progress-card-top">
              <span className="card-lbl">🥗 DIET PROGRESS</span>
              <strong className="card-stat">
                {dietPct !== null ? `${dietPct}%` : "—"}
              </strong>
            </div>
            <div className="summary-bar-track">
              <div
                className="summary-bar-fill coral"
                style={{ width: `${dietPct || 0}%` }}
              ></div>
            </div>
            <p className="summary-desc">
              {dietPlanData
                ? `${completedMealsCount} of ${totalMeals} meals completed`
                : "No diet plan saved yet"}
            </p>
          </div>

          {/* WORKOUT PROGRESS CARD */}
          <div className="progress-summary-card">
            <div className="progress-card-top">
              <span className="card-lbl">🏋️ WORKOUT PROGRESS</span>
              <strong className="card-stat">
                {workoutPct !== null ? `${workoutPct}%` : isRestDay && plannerData ? "Rest Day" : "—"}
              </strong>
            </div>
            <div className="summary-bar-track">
              <div
                className="summary-bar-fill emerald"
                style={{ width: `${workoutPct || 0}%` }}
              ></div>
            </div>
            <p className="summary-desc">
              {plannerData
                ? isRestDay
                  ? "Scheduled Rest Day — Active Recovery"
                  : `${completedExercisesCount} of ${totalExercises} exercises completed`
                : "No gym plan saved yet"}
            </p>
          </div>

          {/* OVERALL PROGRESS CARD */}
          <div className="progress-summary-card">
            <div className="progress-card-top">
              <span className="card-lbl">⚡ OVERALL PROGRESS</span>
              <strong className="card-stat">
                {overallPct !== null ? `${overallPct}%` : "—"}
              </strong>
            </div>
            <div className="summary-bar-track">
              <div
                className="summary-bar-fill indigo"
                style={{ width: `${overallPct || 0}%` }}
              ></div>
            </div>
            <p className="summary-desc">
              {totalPlannedItems > 0
                ? `${totalCompletedItems} of ${totalPlannedItems} total planned items completed`
                : "Create a plan to start tracking"}
            </p>
          </div>
        </div>
      </section>

      {/* 4. TOP METRIC KPI CARDS */}
      <section className="kpi-grid">
        <div className="kpi-card energy-kpi" onClick={() => navigate("/diet")}>
          <div className="kpi-top">
            <span className="kpi-icon">🔥</span>
            <span className="kpi-label">Calories Target</span>
          </div>
          <h2>
            {calorieGoal > 0 ? calorieGoal.toLocaleString() : "—"} <span>kcal</span>
          </h2>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill coral" style={{ width: calorieGoal > 0 ? "85%" : "0%" }}></div>
          </div>
          <span className="kpi-footer">
            {dietPlanData ? dietPlanData.planName : "Generate Diet Plan →"}
          </span>
        </div>

        <div className="kpi-card protein-kpi" onClick={() => navigate("/diet")}>
          <div className="kpi-top">
            <span className="kpi-icon">🥩</span>
            <span className="kpi-label">Protein Target</span>
          </div>
          <h2>
            {proteinGoal > 0 ? proteinGoal : "—"} <span>grams</span>
          </h2>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill indigo" style={{ width: proteinGoal > 0 ? "80%" : "0%" }}></div>
          </div>
          <span className="kpi-footer">
            {dietPlanData ? `${proteinPct}% of Daily Energy` : "Set in Diet Plan →"}
          </span>
        </div>

        <div className="kpi-card hydration-kpi">
          <div className="kpi-top">
            <span className="kpi-icon">💧</span>
            <span className="kpi-label">Hydration</span>
          </div>
          <h2>
            {waterConsumedLiters} <span>/ {waterTargetLiters} L</span>
          </h2>
          <div className="kpi-bar-track">
            <div className="kpi-bar-fill cyan" style={{ width: `${waterPercent}%` }}></div>
          </div>
          <span className="kpi-footer">
            {waterGlasses} Glasses Logged ({waterPercent}%)
          </span>
        </div>

        <div
          className="kpi-card training-kpi"
          onClick={() => (plannerData ? setActiveTab("workout") : navigate("/ai-planner"))}
        >
          <div className="kpi-top">
            <span className="kpi-icon">🏋️</span>
            <span className="kpi-label">Today's Training</span>
          </div>
          <h2>{plannerData ? todaysWorkoutTitle : "No Workout"}</h2>
          <div className="kpi-bar-track">
            <div
              className="kpi-bar-fill emerald"
              style={{
                width: isRestDay ? "100%" : `${workoutPct || 0}%`,
              }}
            ></div>
          </div>
          <span className="kpi-footer">
            {plannerData
              ? isRestDay
                ? "Active Rest Day"
                : `${totalExercises} Planned Exercises`
              : "Generate Workout Plan →"}
          </span>
        </div>
      </section>

      {/* 5. NAVIGATION TAB SWITCHER */}
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
          🏋️ Today's Workout ({plannerData ? (isRestDay ? "Rest Day" : `${totalExercises} Exercises`) : "Not Set"})
        </button>
        <button
          className={`dash-tab ${activeTab === "nutrition" ? "active" : ""}`}
          onClick={() => setActiveTab("nutrition")}
        >
          🥗 Full Diet Plan ({dietPlanData ? `${totalMeals} Meals` : "Not Set"})
        </button>
      </div>

      {/* 6. MAIN CONTENT PANELS */}
      <div className="dashboard-content-grid">
        
        {/* LEFT COLUMN: WORKOUT PROTOCOL (CONNECTED TO EXERCISES) */}
        {(activeTab === "overview" || activeTab === "workout") && (
          <div className="dash-card workout-focus-panel">
            <div className="card-top-bar">
              <div>
                <span className="tag-pill tag-purple">LIVE WORKOUT MODULE</span>
                <h2>🏋️ Today's Workout — {todaysWorkoutTitle}</h2>
              </div>
              <div className="header-btn-row">
                <button
                  className="action-link-btn"
                  onClick={() => navigate("/exercises")}
                >
                  Browse Exercises →
                </button>
                <button
                  className="action-link-btn"
                  onClick={() => navigate("/ai-planner")}
                >
                  Open Gym Planner →
                </button>
              </div>
            </div>

            {/* IF NO WORKOUT PLAN GENERATED YET: CLEAR EMPTY STATE */}
            {!plannerData ? (
              <div className="dash-empty-state">
                <div className="empty-icon">🏋️‍♂️</div>
                <h3>You haven't created a workout plan yet.</h3>
                <p>
                  Create your workout plan to see your daily exercise routines, sets, reps, and completion tracking right here on your Dashboard.
                </p>
                <button
                  className="primary-action-btn"
                  onClick={() => navigate("/ai-planner")}
                >
                  Create Workout Plan →
                </button>
              </div>
            ) : isRestDay ? (
              /* REST DAY CARD */
              <div className="rest-day-card">
                <div className="rest-day-icon">🧘‍♂️</div>
                <div className="rest-day-info">
                  <h3>Today is a Scheduled Rest Day</h3>
                  <p>
                    Rest and recovery are vital for muscle protein synthesis and injury prevention. Focus on adequate hydration, mobility, and hitting your diet targets today.
                  </p>
                </div>
                <button
                  className="secondary-action-btn"
                  onClick={() => navigate("/exercises")}
                >
                  Explore Light Stretching Guides →
                </button>
              </div>
            ) : (
              /* ACTIVE WORKOUT PROTOCOL */
              <>
                <div className="routine-overview-banner">
                  <div className="routine-stat">
                    <span className="routine-lbl">FOCUS / SPLIT</span>
                    <strong>{todaysRoutine.focus}</strong>
                  </div>
                  <div className="routine-stat">
                    <span className="routine-lbl">SESSION TIME</span>
                    <strong>{plannerData.workoutDuration || "60-75 Minutes"}</strong>
                  </div>
                  <div className="routine-stat">
                    <span className="routine-lbl">REST BETWEEN SETS</span>
                    <strong>{plannerData.restBetweenSets || "60-90 Seconds"}</strong>
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
                  <h3>Planned Exercises ({totalExercises})</h3>
                  <span className="completed-counter">
                    {completedExercisesCount} of {totalExercises} Completed
                  </span>
                </div>

                <div className="exercise-items-list">
                  {plannedExercises.map((ex, idx) => {
                    const isDone = completedExercises.includes(ex.name);
                    const exerciseSlug = ex.slug || slugify(ex.name);

                    return (
                      <div
                        key={idx}
                        className={`exercise-row-item ${isDone ? "completed" : "pending"}`}
                      >
                        {/* Status Checkbox Button */}
                        <button
                          type="button"
                          className="exercise-check-box"
                          onClick={() => handleToggleExercise(ex.name)}
                          disabled={updatingItem === ex.name}
                          aria-label={`Mark ${ex.name} as ${isDone ? "pending" : "completed"}`}
                        >
                          {isDone ? <span className="check-mark">✓</span> : null}
                        </button>

                        <div className="exercise-icon-wrap">🏋️</div>

                        <div className="exercise-info-col">
                          <div className="exercise-title-row">
                            <h4 className="exercise-title">{ex.name}</h4>
                            <span
                              className={`status-pill ${
                                isDone ? "status-completed" : "status-pending"
                              }`}
                            >
                              {isDone ? "✓ Completed" : "⏳ Pending"}
                            </span>
                          </div>

                          <div className="exercise-meta">
                            <strong>{ex.sets} sets</strong> × <strong>{ex.reps} reps</strong>
                            {ex.target && (
                              <span> • <em>Target: {ex.target}</em></span>
                            )}
                          </div>

                          {/* Exercise Detail Link */}
                          <div className="exercise-guide-link">
                            <Link
                              to={`/exercises/${exerciseSlug}`}
                              className="link-inline-btn"
                            >
                              View Exercise Guide & Video →
                            </Link>
                          </div>
                        </div>

                        {/* Interactive Status Toggle Action */}
                        <button
                          type="button"
                          className={`exercise-action-btn ${isDone ? "btn-undo" : "btn-complete"}`}
                          onClick={() => handleToggleExercise(ex.name)}
                          disabled={updatingItem === ex.name}
                        >
                          {updatingItem === ex.name
                            ? "..."
                            : isDone
                            ? "Undo"
                            : "Mark Done"}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Workout Session Actions Footer */}
                <div className="workout-actions-footer">
                  <button
                    className={`full-workout-btn ${allExercisesCompleted ? "done" : ""}`}
                    onClick={handleToggleEntireWorkout}
                    disabled={updatingItem === "all_exercises"}
                  >
                    {updatingItem === "all_exercises"
                      ? "Updating Routine..."
                      : allExercisesCompleted
                      ? "✓ All Exercises Completed! (Click to Mark Pending)"
                      : "Mark Entire Session as Completed"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* RIGHT COLUMN: FULL SAVED DIET PLAN (MD SECTION 3, 4, 10) */}
        {(activeTab === "overview" || activeTab === "nutrition") && (
          <div className="dash-card nutrition-focus-panel">
            <div className="card-top-bar">
              <div>
                <span className="tag-pill tag-coral">DAILY NUTRITION PROTOCOL</span>
                <h2>🍽 Full Saved Diet Plan</h2>
              </div>
              <button
                className="action-link-btn"
                onClick={() => navigate("/diet")}
              >
                Open Diet Planner →
              </button>
            </div>

            {/* IF NO DIET PLAN GENERATED YET: CLEAR EMPTY STATE */}
            {!dietPlanData ? (
              <div className="dash-empty-state">
                <div className="empty-icon">🥗</div>
                <h3>You haven't created a diet plan yet.</h3>
                <p>
                  Create your diet plan to see all daily meals, food items, macro targets, and completion tracking right on your Dashboard.
                </p>
                <button
                  className="primary-action-btn"
                  onClick={() => navigate("/diet")}
                >
                  Create Diet Plan →
                </button>
              </div>
            ) : (
              <>
                {/* MACRONUTRIENT DISTRIBUTION BARS */}
                <div className="macro-breakdown-box">
                  <div className="macro-breakdown-header">
                    <h4>Daily Target Budget: {calorieGoal.toLocaleString()} kcal</h4>
                    <span>{dietPlanData.planName}</span>
                  </div>

                  <div className="macro-bar-row">
                    <div className="macro-header-row">
                      <span className="macro-name">🍗 Protein (Repair & Growth)</span>
                      <strong className="macro-val">
                        {proteinGoal}g ({proteinPct}%)
                      </strong>
                    </div>
                    <div className="macro-track">
                      <div
                        className="macro-fill fill-protein"
                        style={{ width: `${proteinPct}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="macro-bar-row">
                    <div className="macro-header-row">
                      <span className="macro-name">🍚 Carbohydrates (Energy & Fuel)</span>
                      <strong className="macro-val">
                        {carbsGoal}g ({carbsPct}%)
                      </strong>
                    </div>
                    <div className="macro-track">
                      <div
                        className="macro-fill fill-carbs"
                        style={{ width: `${carbsPct}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="macro-bar-row">
                    <div className="macro-header-row">
                      <span className="macro-name">🥑 Healthy Fats (Hormone Health)</span>
                      <strong className="macro-val">
                        {fatsGoal}g ({fatsPct}%)
                      </strong>
                    </div>
                    <div className="macro-track">
                      <div
                        className="macro-fill fill-fats"
                        style={{ width: `${fatsPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* MEALS CHECKLIST (FULL SAVED DIET PLAN WITH ALL FOODS & PORTIONS) */}
                <div className="meals-section-header">
                  <h3>All Scheduled Meals ({totalMeals})</h3>
                  <span className="completed-counter">
                    {completedMealsCount} of {totalMeals} Completed
                  </span>
                </div>

                <div className="meals-full-list">
                  {plannedMeals.map((meal, idx) => {
                    const mealIdentifier = getMealIdentifier(meal, idx);
                    const isEaten = completedMeals.includes(mealIdentifier);

                    return (
                      <div
                        key={idx}
                        className={`meal-card-item ${isEaten ? "completed" : "pending"}`}
                      >
                        {/* Meal Header & Status Controls */}
                        <div className="meal-card-top">
                          <div className="meal-title-group">
                            <span className="meal-type-pill">
                              {meal.mealName || meal.mealType}
                            </span>
                            {meal.recommendedTime && (
                              <span className="meal-time-tag">
                                ⏰ {meal.recommendedTime}
                              </span>
                            )}
                          </div>

                          <div className="meal-status-wrap">
                            <span
                              className={`status-pill ${
                                isEaten ? "status-completed" : "status-pending"
                              }`}
                            >
                              {isEaten ? "✓ Completed" : "⏳ Pending"}
                            </span>
                            <button
                              type="button"
                              className={`meal-toggle-btn ${
                                isEaten ? "btn-undo" : "btn-complete"
                              }`}
                              onClick={() => handleToggleMeal(mealIdentifier)}
                              disabled={updatingItem === mealIdentifier}
                              aria-label={`Mark ${mealIdentifier} as ${
                                isEaten ? "pending" : "completed"
                              }`}
                            >
                              {updatingItem === mealIdentifier
                                ? "..."
                                : isEaten
                                ? "Undo"
                                : "Mark Completed"}
                            </button>
                          </div>
                        </div>

                        {/* Meal Nutrition Summary */}
                        <div className="meal-macros-chips">
                          <span>🔥 {Math.round(meal.totalCalories || 0)} kcal</span>
                          <span>🥩 {Math.round(meal.totalProtein || 0)}g P</span>
                          <span>🍚 {Math.round(meal.totalCarbs || 0)}g C</span>
                          <span>🥑 {Math.round(meal.totalFats || 0)}g F</span>
                        </div>

                        {/* FULL FOOD ITEMS LIST INSIDE THIS MEAL */}
                        {meal.foods && meal.foods.length > 0 && (
                          <div className="meal-foods-box">
                            <div className="foods-box-heading">Food Items & Portions:</div>
                            <div className="foods-chips-grid">
                              {meal.foods.map((food, fIdx) => (
                                <div key={fIdx} className="food-item-badge">
                                  <span className="food-item-icon">
                                    {food.icon || "🥗"}
                                  </span>
                                  <div className="food-item-info">
                                    <strong>{food.name}</strong>
                                    <span>
                                      {food.portion ||
                                        (food.quantity
                                          ? `${food.quantity} ${food.unit || "g"}`
                                          : "")}
                                      {food.calories
                                        ? ` • ${Math.round(food.calories)} kcal`
                                        : ""}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

      </div>

      {/* 7. BOTTOM ROW: HYDRATION STATION & AI DIRECTIVE */}
      <div className="dashboard-bottom-grid">
        
        {/* HYDRATION WIDGET */}
        <div className="dash-card hydration-widget">
          <div className="widget-header">
            <div>
              <span className="tag-pill tag-cyan">WATER INTAKE</span>
              <h3>💧 Hydration Station</h3>
            </div>
            <span className="liters-counter">
              {waterConsumedLiters} / {waterTargetLiters} L
            </span>
          </div>

          <div className="water-wave-container">
            <div
              className="water-level-fill"
              style={{ height: `${Math.max(waterPercent, 8)}%` }}
            ></div>
            <div className="water-center-label">
              <strong>{waterPercent}%</strong>
              <span>Target Met</span>
            </div>
          </div>

          <div className="water-controls">
            <button
              className="water-btn sub-btn"
              onClick={() => handleWaterChange(-1)}
              disabled={waterGlasses === 0}
              aria-label="Subtract one glass of water"
            >
              - 250ml
            </button>
            <span className="glasses-count">{waterGlasses} Glasses</span>
            <button
              className="water-btn add-btn"
              onClick={() => handleWaterChange(1)}
              aria-label="Add one glass of water"
            >
              + 250ml Glass
            </button>
          </div>
        </div>

        {/* AI FITNESS COACH DIRECTIVE */}
        <div className="dash-card ai-advisor-widget">
          <div className="ai-coach-top">
            <div className="coach-avatar">🤖</div>
            <div>
              <span className="tag-pill tag-coral">AI SMART COACH</span>
              <h3>Today's Biometric Directive</h3>
            </div>
          </div>

          <p className="ai-directive-text">
            For <strong>{dayName}</strong>, your scheduled focus is{" "}
            <strong>{todaysWorkoutTitle}</strong>.{" "}
            {isRestDay
              ? "Focus today on resting muscle tissue, light mobility, and staying on track with your meals."
              : `Execute your planned ${totalExercises} exercises with progressive overload and mindful form.`}{" "}
            Aim to hit your <strong>{proteinGoal > 0 ? `${proteinGoal}g protein` : "daily protein"}</strong>{" "}
            and maintain hydration to fuel optimal recovery.
          </p>

          <div className="coach-quick-links">
            <button className="coach-link" onClick={() => navigate("/anatomy")}>
              🧬 Inspect Muscle Mechanics
            </button>
            <button className="coach-link" onClick={() => navigate("/ai-planner")}>
              📋 Adjust Gym Routine
            </button>
            <button className="coach-link" onClick={() => navigate("/diet")}>
              🥗 Adjust Diet Plan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;