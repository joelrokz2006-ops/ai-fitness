import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AIPlanner.css";
import { jsPDF } from "jspdf";
import { getExerciseBySlug, slugify } from "../data/exercise";
import { getAuthHeaders } from "../services/api";

const extractMuscleGroups = (text) => {
  if (!text) return [];
  const tokens = String(text)
    .replace(/\b(day|routine|workout|circuit|hiit|core|full body|upper body|lower body|strength|cardio|light cardio|walking|rest)\b/gi, "")
    .split(/[+&,/]| and /i)
    .map((s) => s.trim())
    .filter(Boolean);

  const knownList = [
    { key: "chest", label: "Chest" },
    { key: "back", label: "Back" },
    { key: "shoulder", label: "Shoulders" },
    { key: "tricep", label: "Triceps" },
    { key: "bicep", label: "Biceps" },
    { key: "arm", label: "Arms" },
    { key: "leg", label: "Legs" },
    { key: "ab", label: "Abs" },
  ];

  const results = [];
  tokens.forEach((t) => {
    const lower = t.toLowerCase();
    for (const item of knownList) {
      if (lower.includes(item.key)) {
        if (!results.includes(item.label)) {
          results.push(item.label);
        }
        break;
      }
    }
  });

  return results;
};

function AIPlanner() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    level: "Beginner",
    goal: "Muscle Gain",
  });

  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [ageError, setAgeError] = useState("");

  // Load user profile and cached plan on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      try {
        const u = JSON.parse(cachedUser);
        setFormData((prev) => ({
          ...prev,
          age: u.age ? String(u.age) : prev.age,
          gender: u.gender || prev.gender,
          height: u.height ? String(u.height) : prev.height,
          weight: u.weight ? String(u.weight) : prev.weight,
          goal: u.goal || prev.goal,
        }));
      } catch (e) {}
    }

    const cachedPlan = localStorage.getItem("userPlanner");
    if (cachedPlan) {
      try {
        const parsed = JSON.parse(cachedPlan);
        if (parsed && parsed.exerciseRoutine) {
          setPlan(parsed);
        }
      } catch (e) {
        console.error("Error reading cached planner:", e);
      }
    }
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "age") {
      setAgeError("");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // =========================
  // GENERATE PLAN
  // =========================

  const generatePlan = async (e) => {
    e.preventDefault();

    const { age, gender, height, weight, level, goal } = formData;

    if (!age || !gender || !height || !weight || !level || !goal) {
      alert("Please fill all fields.");
      return;
    }

    // =========================
    // AGE RESTRICTION
    // Only users above 17 (18+) can use the Gym Planner
    // =========================

    if (Number(age) < 18 || Number(age) > 80) {
      setAgeError(
        "Sorry, Gym Planner is only for users between 18 and 80 years old."
      );
      return;
    }

    setAgeError("");

    setLoading(true);

    // Get current logged-in user ID
    let currentUserId = "6a4f325f87cee48babb5be6e";
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.id || parsed._id) {
          currentUserId = parsed.id || parsed._id;
        }
      } catch (e) {}
    }

    try {
      const response = await fetch(
        "/api/planner",
        {
          method: "POST",
          headers: getAuthHeaders(),

          body: JSON.stringify({
            userId: currentUserId,

            age,
            gender,
            height,
            weight,

            goal,

            experience: level,

            workoutDays: 5,

            activityLevel: "Moderately Active",

            equipment: "Gym",

            medicalConditions: "",

            injuries: "",

            sleepHours: 7,

            waterIntake: 3,

            targetWeight: weight,
          }),
        }
      );

      const data = await response.json();

      console.log("Planner Response:", data);

      if (data.success) {
        setPlan(data.data);
        localStorage.setItem("userPlanner", JSON.stringify(data.data));

        alert("Gym Planner created successfully!");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);

      alert("Database Save Error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DOWNLOAD PDF
  // =========================

  const downloadPDF = () => {
    if (!plan) return;

    const doc = new jsPDF();

    let y = 15;

    const pageHeight = doc.internal.pageSize.height;

    // Page Break Helper
    const checkPageBreak = (increment = 10) => {
      if (y + increment >= pageHeight - 15) {
        doc.addPage();
        y = 15;
      }
    };

    // =========================
    // TITLE
    // =========================

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);

    doc.text("GYM PLANNER REPORT", 14, y);

    y += 12;

    // =========================
    // USER DETAILS
    // =========================

    doc.setFontSize(12);

    doc.text("Your Details", 14, y);

    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const details = [
      `Age: ${plan.age}`,
      `Gender: ${plan.gender}`,
      `Height: ${plan.height} cm`,
      `Weight: ${plan.weight} kg`,
      `Goal: ${plan.goal}`,
      `Experience: ${plan.experience}`,
      `Workout Days: ${plan.workoutDays}`,
      `Activity Level: ${plan.activityLevel}`,
      `Equipment: ${plan.equipment}`,
    ];

    details.forEach((item) => {
      checkPageBreak();

      doc.text(item, 14, y);

      y += 6;
    });

    y += 5;

    // =========================
    // WORKOUT PLAN
    // =========================

    if (plan.workoutPlan) {
      checkPageBreak(15);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("Workout Plan", 14, y);

      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      Object.entries(plan.workoutPlan).forEach(([day, value]) => {
        checkPageBreak();

        const text = `${day}: ${value}`;

        const splitText = doc.splitTextToSize(text, 180);

        doc.text(splitText, 14, y);

        y += splitText.length * 6;
      });

      y += 5;
    }

    // =========================
    // CLEAR EXERCISE ROUTINE
    // =========================

    if (plan.exerciseRoutine?.length > 0) {
      checkPageBreak(20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("Exercise Routine (Sets + Reps)", 14, y);

      y += 7;

      plan.exerciseRoutine.forEach((workoutDay) => {
        checkPageBreak(14);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);

        doc.text(
          `${workoutDay.day} - ${workoutDay.focus}`,
          14,
          y
        );

        y += 6;

        doc.setFont("helvetica", "normal");

        workoutDay.exercises?.forEach((exercise) => {
          checkPageBreak();

          const text = `   ${exercise.name} : ${exercise.sets} x ${exercise.reps}`;

          const splitText = doc.splitTextToSize(text, 180);

          doc.text(splitText, 14, y);

          y += splitText.length * 5;
        });

        y += 3;
      });

      y += 5;
    }

    // =========================
    // GOAL GUIDE
    // =========================

    if (plan.goalGuide) {
      checkPageBreak(20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text(plan.goalGuide.title || "Goal Guide", 14, y);

      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      if (plan.goalGuide.description) {
        const description = doc.splitTextToSize(
          plan.goalGuide.description,
          180
        );

        doc.text(description, 14, y);

        y += description.length * 6 + 5;
      }

      if (plan.goalGuide.tips) {
        plan.goalGuide.tips.forEach((tip) => {
          checkPageBreak();

          const text = `- ${tip}`;

          const splitText = doc.splitTextToSize(text, 180);

          doc.text(splitText, 14, y);

          y += splitText.length * 6;
        });
      }

      y += 5;
    }

    // =========================
    // WORKOUT DETAILS
    // =========================

    checkPageBreak(20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);

    doc.text("Workout Details", 14, y);

    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const workoutDetails = [
      `Workout Duration: ${plan.workoutDuration}`,
      `Rest Between Sets: ${plan.restBetweenSets}`,
      `Daily Steps: ${plan.dailySteps}`,
      `Cardio Minutes: ${plan.cardioMinutes}`,
    ];

    workoutDetails.forEach((item) => {
      checkPageBreak();

      doc.text(item, 14, y);

      y += 6;
    });

    y += 5;

    // =========================
    // FITNESS TIPS
    // =========================

    if (plan.fitnessTips?.length > 0) {
      checkPageBreak(15);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("Fitness Tips", 14, y);

      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      plan.fitnessTips.forEach((tip) => {
        checkPageBreak();

        const text = `- ${tip}`;

        const splitText = doc.splitTextToSize(text, 180);

        doc.text(splitText, 14, y);

        y += splitText.length * 6;
      });

      y += 5;
    }

    // =========================
    // WARM UP
    // =========================

    if (plan.warmUp) {
      checkPageBreak(10);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("Warm Up", 14, y);

      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const text = doc.splitTextToSize(plan.warmUp, 180);

      doc.text(text, 14, y);

      y += text.length * 6 + 5;
    }

    // =========================
    // COOL DOWN
    // =========================

    if (plan.coolDown) {
      checkPageBreak(10);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("Cool Down", 14, y);

      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const text = doc.splitTextToSize(plan.coolDown, 180);

      doc.text(text, 14, y);

      y += text.length * 6 + 5;
    }

    // =========================
    // WEEKLY CHALLENGE
    // =========================

    if (plan.weeklyChallenge) {
      checkPageBreak(10);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("Weekly Challenge", 14, y);

      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const text = doc.splitTextToSize(
        plan.weeklyChallenge,
        180
      );

      doc.text(text, 14, y);

      y += text.length * 6 + 5;
    }

    // =========================
    // MOTIVATION
    // =========================

    if (plan.motivation) {
      checkPageBreak(10);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("Motivation", 14, y);

      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const text = doc.splitTextToSize(plan.motivation, 180);

      doc.text(text, 14, y);
    }

    // =========================
    // SAVE PDF
    // =========================

    doc.save("Gym_Planner_Report.pdf");
  };

  return (
    <div className="planner-page">
      <div className="planner-title">
        <h1>🏋️ FITNESS PLANNER</h1>

        <p>
          Enter your details and generate your personalized workout plan.
        </p>
      </div>

      <div className="planner-container">

        {/* ================= FORM ================= */}

        <div className="planner-form">

          <h2>Your Details</h2>

          <form onSubmit={generatePlan}>

            <div className="input-group">

              <label>Age (18+ only)</label>

              <input
                type="number"
                name="age"
                min={18}
                placeholder="Must be above 17"
                value={formData.age}
                onChange={handleChange}
              />

              {ageError && (
                <span className="age-error">{ageError}</span>
              )}

            </div>

            <div className="input-group">

              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >

                <option value="">
                  Select Gender
                </option>

                <option>Male</option>

                <option>Female</option>

                <option>Transgender</option>

              </select>

            </div>

            <div className="input-group">

              <label>Height (cm)</label>

              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Weight (kg)</label>

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Fitness Level</label>

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
              >

                <option>Beginner</option>

                <option>Intermediate</option>

                <option>Professional</option>

              </select>

            </div>

            <div className="input-group">

              <label>Goal</label>

              <select
                name="goal"
                value={formData.goal}
                onChange={handleChange}
              >

                <option>Muscle Gain</option>

                <option>Weight Gain</option>

                <option>Weight Loss</option>

                <option>Fat Loss</option>

                <option>Strength</option>

                <option>General Fitness</option>

              </select>

            </div>

            <button
              className="generate-btn"
              disabled={loading}
            >
              {loading
                ? "Generating..."
                : "Generate Workout Plan"}
            </button>

          </form>

        </div>

        {/* ================= RESULT ================= */}

        <div className="planner-result">

          <h2>Your Fitness Plan</h2>

          {plan ? (

            <div className="planner-data">

              {/* DOWNLOAD PDF */}

              <button className="pdf-btn" onClick={downloadPDF}>
                📥 Download PDF
              </button>

              {/* USER DETAILS */}

              <p>
                <strong>Age:</strong> {plan.age}
              </p>

              <p>
                <strong>Gender:</strong> {plan.gender}
              </p>

              <p>
                <strong>Height:</strong> {plan.height} cm
              </p>

              <p>
                <strong>Weight:</strong> {plan.weight} kg
              </p>

              <p>
                <strong>Goal:</strong> {plan.goal}
              </p>

              <p>
                <strong>Experience:</strong> {plan.experience}
              </p>

              <hr />

              {/* WORKOUT PLAN */}

              <h3>🏋️ Workout Plan</h3>

              {plan.workoutPlan && (

                <div className="workout-plan">

                  {Object.entries(plan.workoutPlan).map(([day, workout]) => {
                    const muscles = extractMuscleGroups(workout);
                    return (
                      <div key={day} className="workout-plan-row">
                        <div>
                          <strong>{day}:</strong> <span>{workout}</span>
                        </div>
                        {muscles.length > 0 && (
                          <div className="workout-row-tags">
                            {muscles.map((m) => (
                              <button
                                key={m}
                                type="button"
                                className="mini-muscle-tag"
                                onClick={() =>
                                  navigate(
                                    `/exercises?muscle=${encodeURIComponent(
                                      m.toLowerCase()
                                    )}`
                                  )
                                }
                                title={`View ${m} Exercises in Exercises Library`}
                              >
                                {m} ↗
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}

                </div>

              )}

              <hr />

              {/* CLEAR EXERCISE ROUTINE (CONNECTS TO EXERCISES & VIDEOS) */}

              <h3>💪 Exercise Routine (Sets + Reps)</h3>

              {plan.exerciseRoutine?.length > 0 ? (

                <div className="exercise-routine">

                  {plan.exerciseRoutine.map((workoutDay) => {
                    const dayMuscles = extractMuscleGroups(workoutDay.focus);
                    const hasExercises = workoutDay.exercises?.length > 0;

                    return (
                      <div className="exercise-day" key={workoutDay.day}>

                        <div className="exercise-day-head">

                          <div>
                            <strong>{workoutDay.day}</strong>
                            <span style={{ marginLeft: "10px", color: "#aab2c0" }}>
                              {workoutDay.focus}
                            </span>
                          </div>

                          {dayMuscles.length > 0 && (
                            <div className="planner-muscle-group-links">
                              {dayMuscles.map((m) => (
                                <button
                                  key={m}
                                  type="button"
                                  className="planner-muscle-link-btn"
                                  onClick={() =>
                                    navigate(
                                      `/exercises?muscle=${encodeURIComponent(
                                        m.toLowerCase()
                                      )}`
                                    )
                                  }
                                  title={`Explore ${m} Exercises in Library`}
                                >
                                  {m} Exercises ↗
                                </button>
                              ))}
                            </div>
                          )}

                        </div>

                        {hasExercises ? (
                          <div className="planner-exercises-list">

                            {workoutDay.exercises.map((exercise, index) => {
                              const resolved = getExerciseBySlug(
                                exercise.slug || exercise.name
                              );
                              const exerciseSlug =
                                resolved?.slug || slugify(exercise.name);
                              const exerciseMuscle =
                                exercise.muscle ||
                                resolved?.category ||
                                resolved?.target ||
                                workoutDay.focus;

                              return (
                                <div
                                  className="planner-exercise-card"
                                  key={index}
                                  onClick={() =>
                                    navigate(`/exercises/${exerciseSlug}`)
                                  }
                                  style={{ cursor: "pointer" }}
                                  title={`Open ${exercise.name} in Exercise Details & Video`}
                                >

                                  <div className="planner-exercise-top">
                                    <div>
                                      <h4 className="planner-exercise-title">
                                        {exercise.name}{" "}
                                        <span className="open-detail-arrow">
                                          ↗
                                        </span>
                                      </h4>
                                      <button
                                        type="button"
                                        className="planner-exercise-muscle"
                                        style={{
                                          background: "none",
                                          border: "none",
                                          padding: 0,
                                          cursor: "pointer",
                                          textAlign: "left",
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          navigate(
                                            `/exercises?muscle=${encodeURIComponent(
                                              (
                                                resolved?.category ||
                                                exerciseMuscle
                                              ).toLowerCase()
                                            )}`
                                          );
                                        }}
                                        title={`Filter exercises by ${exerciseMuscle}`}
                                      >
                                        {exerciseMuscle} ↗
                                      </button>
                                    </div>
                                    <span className="planner-exercise-badge">
                                      {exercise.sets} Sets × {exercise.reps}
                                    </span>
                                  </div>

                                  <p className="planner-exercise-cue">
                                    {exercise.instructions ||
                                      exercise.description ||
                                      resolved?.description ||
                                      "Maintain strict form, controlled tempo, and steady breathing throughout sets."}
                                  </p>

                                  <div className="planner-card-actions">
                                    <button
                                      type="button"
                                      className="open-exercise-detail-btn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/exercises/${exerciseSlug}`);
                                      }}
                                    >
                                      ▶ Watch Exercise & Video
                                    </button>
                                  </div>

                                </div>
                              );
                            })}

                          </div>
                        ) : (
                          <div className="planner-rest-day-box">
                            😴 Active recovery & rest day. Hydrate, stretch, and allow muscle tissues to recuperate.
                          </div>
                        )}

                      </div>
                    );
                  })}

                </div>

              ) : (

                <p className="missing-note">
                  No exercise routine found. Generate your plan again.
                </p>

              )}

              <hr />

              {/* GOAL GUIDE */}

              {plan.goalGuide && (

                <div className="goal-guide">

                  <h3>
                    🔥 {plan.goalGuide.title}
                  </h3>

                  <p>
                    {plan.goalGuide.description}
                  </p>

                  <ul>

                    {plan.goalGuide.tips?.map(
                      (tip, index) => (

                        <li key={index}>
                          {tip}
                        </li>

                      )
                    )}

                  </ul>

                </div>

              )}

              <hr />

              {/* WORKOUT DETAILS */}

              <h3>⏱ Workout Details</h3>

              <p>
                <strong>Workout Duration:</strong>{" "}
                {plan.workoutDuration}
              </p>

              <p>
                <strong>Rest Between Sets:</strong>{" "}
                {plan.restBetweenSets}
              </p>

              <p>
                <strong>Daily Steps:</strong>{" "}
                {plan.dailySteps}
              </p>

              <p>
                <strong>Cardio Minutes:</strong>{" "}
                {plan.cardioMinutes}
              </p>

              <hr />

              {/* FITNESS TIPS */}

              <h3>💡 Fitness Tips</h3>

              <ul>

                {plan.fitnessTips?.map(
                  (tip, index) => (

                    <li key={index}>
                      {tip}
                    </li>

                  )
                )}

              </ul>

              <hr />

              {/* WARM UP */}

              <h3>🔥 Warm Up</h3>

              <p>
                {plan.warmUp}
              </p>

              {/* COOL DOWN */}

              <h3>🧘 Cool Down</h3>

              <p>
                {plan.coolDown}
              </p>

              <hr />

              {/* WEEKLY CHALLENGE */}

              <h3>🏆 Weekly Challenge</h3>

              <p>
                {plan.weeklyChallenge}
              </p>

              <hr />

              {/* MOTIVATION */}

              <h3>💬 Motivation</h3>

              <p>
                {plan.motivation}
              </p>

            </div>

          ) : (

            <div className="empty-state">

              <h3>No Planner Data</h3>

              <p>
                Fill your details and click
                <strong> Generate Workout Plan</strong>.
              </p>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default AIPlanner;