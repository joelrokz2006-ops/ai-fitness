import React, { useState, useEffect } from "react";
import "./AIPlanner.css";
import { jsPDF } from "jspdf";

function AIPlanner() {
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

  // Load cached plan on mount if available
  useEffect(() => {
    const cachedPlan = localStorage.getItem("userPlanner");
    if (cachedPlan) {
      try {
        const parsed = JSON.parse(cachedPlan);

        // Older cached plans have no clear exercise / diet routine
        // Remove them so the user always gets the complete plan
        if (parsed && (!parsed.exerciseRoutine || !parsed.dietRoutine)) {
          localStorage.removeItem("userPlanner");
          return;
        }

        setPlan(parsed);
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

    if (Number(age) < 18) {
      setAgeError(
        "Sorry, Gym Planner is only for users above 17 years old (18+)."
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
          headers: {
            "Content-Type": "application/json",
          },

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
    // CLEAR DIET ROUTINE
    // =========================

    if (plan.dietRoutine) {
      checkPageBreak(20);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("Diet Routine", 14, y);

      y += 7;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const targets = plan.dietRoutine.dailyTargets;

      if (targets) {
        const targetText = `Daily: ${targets.calories} kcal | Protein: ${targets.protein}g | Carbs: ${targets.carbs}g | Fats: ${targets.fats}g | Water: ${targets.water}`;

        const splitTargets = doc.splitTextToSize(targetText, 180);

        doc.text(splitTargets, 14, y);

        y += splitTargets.length * 6 + 3;
      }

      plan.dietRoutine.meals?.forEach((meal) => {
        checkPageBreak(20);

        doc.setFont("helvetica", "bold");

        doc.text(`${meal.name} (${meal.time})`, 14, y);

        y += 6;

        doc.setFont("helvetica", "normal");

        const macros = `${meal.calories} kcal | P ${meal.protein}g | C ${meal.carbs}g | F ${meal.fats}g`;

        doc.text(macros, 14, y);

        y += 6;

        meal.items?.forEach((item) => {
          checkPageBreak();

          const text = doc.splitTextToSize(`   - ${item}`, 180);

          doc.text(text, 14, y);

          y += text.length * 5;
        });

        y += 3;
      });

      if (plan.dietRoutine.rules?.length > 0) {
        checkPageBreak(15);

        doc.setFont("helvetica", "bold");

        doc.text("Diet Rules", 14, y);

        y += 6;

        doc.setFont("helvetica", "normal");

        plan.dietRoutine.rules.forEach((rule) => {
          checkPageBreak();

          const text = doc.splitTextToSize(`   - ${rule}`, 180);

          doc.text(text, 14, y);

          y += text.length * 5;
        });
      }

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

                  {Object.entries(plan.workoutPlan).map(
                    ([day, workout]) => (

                      <p key={day}>
                        <strong>{day}:</strong> {workout}
                      </p>

                    )
                  )}

                </div>

              )}

              <hr />

              {/* CLEAR EXERCISE ROUTINE */}

              <h3>💪 Exercise Routine (Sets + Reps)</h3>

              {plan.exerciseRoutine?.length > 0 ? (

                <div className="exercise-routine">

                  {plan.exerciseRoutine.map((workoutDay) => (

                    <div
                      className="exercise-day"
                      key={workoutDay.day}
                    >

                      <div className="exercise-day-head">

                        <strong>{workoutDay.day}</strong>

                        <span>{workoutDay.focus}</span>

                      </div>

                      <ul>

                        {workoutDay.exercises?.map(
                          (exercise, index) => (

                            <li key={index}>

                              <span className="exercise-name">
                                {exercise.name}
                              </span>

                              <span className="exercise-sets">
                                {exercise.sets} × {exercise.reps}
                              </span>

                            </li>

                          )
                        )}

                      </ul>

                    </div>

                  ))}

                </div>

              ) : (

                <p className="missing-note">
                  No exercise routine found. Generate your plan again.
                </p>

              )}

              <hr />

              {/* CLEAR DIET ROUTINE */}

              <h3>🥗 Diet Routine</h3>

              {plan.dietRoutine ? (

                <div className="diet-routine">

                  <div className="macro-grid">

                    <div className="macro-card">

                      <span>Calories</span>

                      <strong>
                        {plan.dietRoutine.dailyTargets?.calories} kcal
                      </strong>

                    </div>

                    <div className="macro-card">

                      <span>Protein</span>

                      <strong>
                        {plan.dietRoutine.dailyTargets?.protein} g
                      </strong>

                    </div>

                    <div className="macro-card">

                      <span>Carbs</span>

                      <strong>
                        {plan.dietRoutine.dailyTargets?.carbs} g
                      </strong>

                    </div>

                    <div className="macro-card">

                      <span>Fats</span>

                      <strong>
                        {plan.dietRoutine.dailyTargets?.fats} g
                      </strong>

                    </div>

                    <div className="macro-card">

                      <span>Water</span>

                      <strong>
                        {plan.dietRoutine.dailyTargets?.water}
                      </strong>

                    </div>

                  </div>

                  <div className="meal-list">

                    {plan.dietRoutine.meals?.map((meal) => (

                      <div className="meal-card" key={meal.name}>

                        <div className="meal-card-head">

                          <strong>{meal.name}</strong>

                          <span>{meal.time}</span>

                        </div>

                        <p className="meal-macros">
                          {meal.calories} kcal &nbsp;•&nbsp; P{" "}
                          {meal.protein}g &nbsp;•&nbsp; C{" "}
                          {meal.carbs}g &nbsp;•&nbsp; F {meal.fats}g
                        </p>

                        <ul>

                          {meal.items?.map((item, index) => (

                            <li key={index}>{item}</li>

                          ))}

                        </ul>

                      </div>

                    ))}

                  </div>

                  {plan.dietRoutine.rules?.length > 0 && (

                    <div className="diet-rules">

                      <h4>Diet Rules</h4>

                      <ul>

                        {plan.dietRoutine.rules.map(
                          (rule, index) => (

                            <li key={index}>{rule}</li>

                          )
                        )}

                      </ul>

                    </div>

                  )}

                </div>

              ) : (

                <p className="missing-note">
                  No diet routine found. Generate your plan again.
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