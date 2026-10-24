import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  calculateBMI as computeBMI,
  getBMICategory,
  getBMIDietStrategy,
  getIdealWeightRange,
  getRecommendedGoalForBMI,
  calculateBMIDietTargets,
  getSampleMealsForBMI,
} from "../utils/bmi";
import { generateDietPlan, getToken } from "../services/api";
import "./BMIForm.css";

const BMIForm = () => {
  const navigate = useNavigate();

  // Inputs
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("medium");
  const [goal, setGoal] = useState("muscle_gain");
  const [foodPreference, setFoodPreference] = useState("non-veg");

  // Output State
  const [bmiResult, setBmiResult] = useState(null);
  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false);
  const [dietSuccessMessage, setDietSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load initial data from user profile or previous BMI calculation
  useEffect(() => {
    const cachedBmi = localStorage.getItem("bmiData");
    if (cachedBmi) {
      try {
        const b = JSON.parse(cachedBmi);
        if (b.height) setHeight(String(b.height));
        if (b.weight) setWeight(String(b.weight));
        if (b.gender) setGender(b.gender);
        if (b.activityLevel) setActivityLevel(b.activityLevel);
        if (b.goal) setGoal(b.goal);
        if (b.foodPreference) setFoodPreference(b.foodPreference);
      } catch (e) {}
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const u = JSON.parse(storedUser);
          if (u.height) setHeight(String(u.height));
          if (u.weight) setWeight(String(u.weight));
          if (u.gender) setGender(String(u.gender).toLowerCase());
        } catch (e) {}
      }
    }
  }, []);

  // When height and weight change, auto-adjust goal recommendation if appropriate
  const handleWeightChange = (val) => {
    setWeight(val);
    if (height && val) {
      const liveBmi = computeBMI(height, val);
      if (liveBmi > 0) {
        const cat = getBMICategory(liveBmi);
        setGoal(getRecommendedGoalForBMI(cat));
      }
    }
  };

  const handleHeightChange = (val) => {
    setHeight(val);
    if (val && weight) {
      const liveBmi = computeBMI(val, weight);
      if (liveBmi > 0) {
        const cat = getBMICategory(liveBmi);
        setGoal(getRecommendedGoalForBMI(cat));
      }
    }
  };

  // BMI & Diet Plan Integration Calculation
  const handleCalculateBMI = (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    setDietSuccessMessage("");

    const numH = Number(height);
    const numW = Number(weight);

    if (!numH || !numW || numH <= 0 || numW <= 0) {
      setErrorMessage("Please enter valid positive numbers for height and weight.");
      return;
    }

    const bmi = computeBMI(numH, numW);
    const category = getBMICategory(bmi);
    const strategy = getBMIDietStrategy(category);
    const idealRange = getIdealWeightRange(numH);

    // Compute Weight Difference compared to healthy ideal range (18.5 - 24.9)
    let weightDiffText = "Within healthy optimal weight threshold";
    let weightDiffType = "optimal";
    if (numW < idealRange.min) {
      const diff = (idealRange.min - numW).toFixed(1);
      weightDiffText = `${diff} kg below optimal normal weight`;
      weightDiffType = "under";
    } else if (numW > idealRange.max) {
      const diff = (numW - idealRange.max).toFixed(1);
      weightDiffText = `${diff} kg above optimal normal weight`;
      weightDiffType = "over";
    }

    // Determine target goal: use selected goal or recommend
    const activeGoal = goal || getRecommendedGoalForBMI(category);

    // Calculate Nutritional Targets matching exact backend logic
    const targets = calculateBMIDietTargets({
      gender,
      weight: numW,
      height: numH,
      activityLevel,
      goal: activeGoal,
      bmi,
    });

    // Sample Meal Plan tailored specifically to this BMI & Preference
    const sampleMeals = getSampleMealsForBMI(category, foodPreference);

    const resultPayload = {
      bmi,
      category,
      strategy,
      idealRange,
      weightDiffText,
      weightDiffType,
      targets,
      sampleMeals,
      gender,
      height: numH,
      weight: numW,
      activityLevel,
      goal: activeGoal,
      foodPreference,
    };

    setBmiResult(resultPayload);

    // Persist to localStorage so Diet Plan page automatically reads it
    localStorage.setItem("bmiData", JSON.stringify(resultPayload));

    // Also update cached user if exists
    try {
      const cached = localStorage.getItem("user");
      if (cached) {
        const parsed = JSON.parse(cached);
        parsed.height = numH;
        parsed.weight = numW;
        parsed.goal = activeGoal;
        localStorage.setItem("user", JSON.stringify(parsed));
      }
    } catch (e) {}
  };

  // Generate Official Diet Plan directly from BMI Engine
  const handleApplyToDietPlan = async () => {
    if (!bmiResult) return;

    const token = getToken();
    if (!token) {
      // Save data and redirect to login or diet
      localStorage.setItem("bmiData", JSON.stringify(bmiResult));
      navigate("/diet");
      return;
    }

    setIsGeneratingDiet(true);
    setErrorMessage("");
    setDietSuccessMessage("");

    try {
      await generateDietPlan({
        gender: bmiResult.gender,
        weight: bmiResult.weight,
        height: bmiResult.height,
        activityLevel: bmiResult.activityLevel,
        goal: bmiResult.goal,
        foodPreference: bmiResult.foodPreference,
      });

      setDietSuccessMessage("✅ Diet Plan successfully generated and synchronized with your BMI!");
      
      // Auto-navigate to Diet page after brief confirmation
      setTimeout(() => {
        navigate("/diet");
      }, 1200);
    } catch (err) {
      console.error("Failed to generate diet plan from BMI:", err);
      // Still navigate so user can see it in Diet page
      setDietSuccessMessage("BMI saved! Redirecting to Diet section...");
      setTimeout(() => {
        navigate("/diet");
      }, 800);
    } finally {
      setIsGeneratingDiet(false);
    }
  };

  return (
    <div className="bmi-integrated-wrapper">
      {/* INPUT FORM PANEL */}
      <div className="bmi-form-box">
        <h3 className="form-header">
          BMI <span>& DIET ENGINE</span>
        </h3>
        <p className="bmi-form-subtitle">
          Calculate your BMI diagnostic and immediately generate an aligned nutrition & meal strategy.
        </p>

        {errorMessage && <div className="bmi-alert-error">{errorMessage}</div>}

        <form onSubmit={handleCalculateBMI}>
          <div className="bmi-inputs-row">
            <div className="form-group">
              <label className="form-label">Height (CM)</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g. 175"
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
                min="90"
                max="260"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Weight (KG)</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g. 72"
                value={weight}
                onChange={(e) => handleWeightChange(e.target.value)}
                min="25"
                max="300"
                required
              />
            </div>
          </div>

          <div className="bmi-inputs-row">
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Activity Level</label>
              <select
                className="form-input"
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                <option value="low">Sedentary (Little/no exercise)</option>
                <option value="medium">Moderate (Exercise 3-5 days/wk)</option>
                <option value="high">Intense (Daily training / athlete)</option>
              </select>
            </div>
          </div>

          <div className="bmi-inputs-row">
            <div className="form-group">
              <label className="form-label">Fitness Goal</label>
              <select
                className="form-input"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option value="muscle_gain">Muscle Gain (Hypertrophy)</option>
                <option value="weight_gain">Weight Gain (Caloric Surplus)</option>
                <option value="weight_loss">Weight Loss (Caloric Deficit)</option>
                <option value="fat_loss">Fat Loss & Definition</option>
                <option value="maintenance">Maintenance / Recomposition</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Diet Preference</label>
              <select
                className="form-input"
                value={foodPreference}
                onChange={(e) => setFoodPreference(e.target.value)}
              >
                <option value="veg">🌱 100% Pure Vegetarian</option>
                <option value="non-veg">🍗 Non-Vegetarian (Eggs, Meat, Fish)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Calculate BMI & Generate Diet Strategy ⚡
          </button>
        </form>
      </div>

      {/* INTEGRATED BMI & DIET PLAN RESULTS */}
      {bmiResult && (
        <div className="bmi-integrated-results">
          
          {/* 1. BMI METRIC & GAUGE BANNER */}
          <div className="bmi-metric-card">
            <div className="bmi-metric-top">
              <div>
                <span className="bmi-kicker">CLINICAL METRIC DIAGNOSTIC</span>
                <div className="bmi-score-display">
                  <span className="bmi-huge-number">{bmiResult.bmi}</span>
                  <div
                    className="bmi-category-badge"
                    style={{
                      borderColor: bmiResult.strategy.badgeColor,
                      color: bmiResult.strategy.badgeColor,
                      backgroundColor: `${bmiResult.strategy.badgeColor}18`,
                    }}
                  >
                    {bmiResult.category}
                  </div>
                </div>
              </div>

              {/* Ideal weight range box */}
              <div className="bmi-ideal-box">
                <span className="ideal-label">Optimal Normal Weight Range</span>
                <div className="ideal-val">
                  {bmiResult.idealRange.min} kg – {bmiResult.idealRange.max} kg
                </div>
                <div className={`ideal-status ${bmiResult.weightDiffType}`}>
                  {bmiResult.weightDiffType === "optimal"
                    ? "✨ Optimal healthy weight range"
                    : `⚠️ ${bmiResult.weightDiffText}`}
                </div>
              </div>
            </div>

            {/* Visual BMI Range Gauge */}
            <div className="bmi-gauge-container">
              <div className="bmi-gauge-track">
                <div
                  className={`gauge-segment underweight ${
                    bmiResult.category === "Underweight" ? "active" : ""
                  }`}
                >
                  &lt; 18.5 Under
                </div>
                <div
                  className={`gauge-segment normal ${
                    bmiResult.category === "Normal weight" ? "active" : ""
                  }`}
                >
                  18.5 - 24.9 Normal
                </div>
                <div
                  className={`gauge-segment overweight ${
                    bmiResult.category === "Overweight" ? "active" : ""
                  }`}
                >
                  25.0 - 29.9 Over
                </div>
                <div
                  className={`gauge-segment obese ${
                    bmiResult.category === "Obesity" ? "active" : ""
                  }`}
                >
                  ≥ 30.0 Obese
                </div>
              </div>
            </div>
          </div>

          {/* 2. BMI-DRIVEN DIET STRATEGY & TARGETS */}
          <div className="bmi-diet-blueprint-card">
            <div className="blueprint-header">
              <div className="blueprint-title-row">
                <span className="blueprint-badge">DIET PLAN INTEGRATION</span>
                <h4>🎯 {bmiResult.strategy.strategy}</h4>
              </div>
              <p className="blueprint-description">
                {bmiResult.strategy.description}
              </p>
            </div>

            {/* Target Macros derived from this BMI */}
            <div className="bmi-targets-grid">
              <div className="macro-card cal-card">
                <span className="macro-icon">🔥</span>
                <span className="macro-label">Daily Calories</span>
                <span className="macro-val">{bmiResult.targets.calories}</span>
                <span className="macro-unit">kcal / day</span>
                <span className="macro-note">
                  {bmiResult.strategy.calorieDelta > 0
                    ? `+${bmiResult.strategy.calorieDelta} kcal surplus`
                    : bmiResult.strategy.calorieDelta < 0
                    ? `${bmiResult.strategy.calorieDelta} kcal deficit`
                    : "Maintenance baseline"}
                </span>
              </div>

              <div className="macro-card protein-card">
                <span className="macro-icon">🥩</span>
                <span className="macro-label">Protein Target</span>
                <span className="macro-val">{bmiResult.targets.protein}g</span>
                <span className="macro-unit">per day</span>
                <span className="macro-note">
                  {(bmiResult.targets.protein / bmiResult.weight).toFixed(1)}g / kg bodyweight
                </span>
              </div>

              <div className="macro-card carbs-card">
                <span className="macro-icon">🍚</span>
                <span className="macro-label">Carbohydrates</span>
                <span className="macro-val">{bmiResult.targets.carbs}g</span>
                <span className="macro-unit">per day</span>
                <span className="macro-note">Energizing complex carbs</span>
              </div>

              <div className="macro-card fats-card">
                <span className="macro-icon">🥑</span>
                <span className="macro-label">Healthy Fats</span>
                <span className="macro-val">{bmiResult.targets.fats}g</span>
                <span className="macro-unit">per day</span>
                <span className="macro-note">Hormonal & joint support</span>
              </div>
            </div>

            {/* Actionable Nutrition Guidelines for this BMI */}
            <div className="bmi-guidelines-section">
              <h5>📋 Nutrition Guidelines Tailored to Your BMI:</h5>
              <ul className="guidelines-list">
                {bmiResult.strategy.recommendations?.map((rec, i) => (
                  <li key={i}>
                    <span className="bullet">✓</span> {rec}
                  </li>
                ))}
              </ul>

              {/* Priority Food Choices */}
              <div className="foods-priority-row">
                <div className="foods-col focus">
                  <h6>✅ Foods to Prioritize:</h6>
                  <div className="food-tags">
                    {bmiResult.strategy.focusFoods?.map((f, i) => (
                      <span key={i} className="food-tag focus-tag">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="foods-col limit">
                  <h6>⛔ Foods to Limit:</h6>
                  <div className="food-tags">
                    {bmiResult.strategy.limitFoods?.map((f, i) => (
                      <span key={i} className="food-tag limit-tag">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. SAMPLE MEALS LINKED TO THIS BMI */}
            <div className="sample-meals-section">
              <div className="sample-meals-header">
                <h5>🍽️ Recommended Meal Breakdown for Your BMI & Preference:</h5>
                <span className="meals-badge">
                  {foodPreference === "veg" ? "🌱 Vegetarian" : "🍗 Non-Vegetarian"}
                </span>
              </div>

              <div className="sample-meals-grid">
                {bmiResult.sampleMeals?.map((meal, index) => (
                  <div key={index} className="sample-meal-card">
                    <div className="meal-card-top">
                      <span className="meal-type-pill">{meal.mealType}</span>
                      <span className="meal-calories">{meal.calories} kcal</span>
                    </div>
                    <div className="meal-title">{meal.name}</div>
                    <div className="meal-meta">
                      <span className="meal-protein">💪 Protein: {meal.protein}</span>
                      <span className="meal-highlight">🎯 {meal.highlight}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. SEAMLESS SYNC & ACTIONS */}
            <div className="bmi-actions-panel">
              {dietSuccessMessage && (
                <div className="diet-sync-success">{dietSuccessMessage}</div>
              )}

              <div className="actions-buttons-row">
                <button
                  type="button"
                  className="apply-diet-btn"
                  onClick={handleApplyToDietPlan}
                  disabled={isGeneratingDiet}
                >
                  {isGeneratingDiet
                    ? "Synchronizing with Diet Plan..."
                    : "🥗 Apply to Full Diet Plan & View Meals"}
                </button>

                <button
                  type="button"
                  className="view-diet-page-btn"
                  onClick={() => navigate("/diet")}
                >
                  Go to Diet Page →
                </button>
              </div>

              <p className="actions-note">
                ⚡ Applying will automatically configure your personalized daily meal planner
                with these exact BMI calories and macronutrients.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMIForm;
