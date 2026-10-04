import React from "react";
import "./DietPlanCard.css";

const DietPlanCard = ({ planData }) => {
  if (!planData) return null;

  const { dietPlan, targets, generatedTotals, calculation } = planData;

  const totalCalories = targets?.calories || 2000;
  const proteinCals = (targets?.protein || 0) * 4;
  const carbsCals = (targets?.carbs || 0) * 4;
  const fatsCals = (targets?.fats || 0) * 9;

  const proteinPct = Math.round((proteinCals / totalCalories) * 100) || 30;
  const carbsPct = Math.round((carbsCals / totalCalories) * 100) || 45;
  const fatsPct = Math.max(0, 100 - proteinPct - carbsPct) || 25;

  const isVeg = dietPlan?.foodPreference === "veg" || dietPlan?.planName?.toLowerCase().includes("veg");

  return (
    <div className="diet-plan-card">
      <div className="diet-plan-header">
        <div>
          <div className="diet-tags-row">
            <span className="diet-badge-pill">DIET BLUEPRINT</span>
            <span className={`diet-pref-pill ${isVeg ? "veg" : "non-veg"}`}>
              {isVeg ? "🌱 100% Vegetarian" : "🍗 Non-Vegetarian"}
            </span>
          </div>
          <h2>{dietPlan?.planName || "Personalized Fitness Nutrition"}</h2>
          <p>Calculated metabolic and macronutrient distribution tailored to your body metrics.</p>
        </div>

        <span className="diet-goal-badge">
          🎯 {dietPlan?.goal?.replace(/_/g, " ").toUpperCase() || "FITNESS TARGET"}
        </span>
      </div>

      {/* Calories & BMR KPI Row */}
      <div className="calorie-summary-box">
        <div className="calorie-main">
          <span className="calorie-sub">TOTAL DAILY ENERGY EXPENDITURE (TDEE)</span>
          <div className="calorie-number">
            <strong>{targets?.calories || 0}</strong>
            <span>kcal / day</span>
          </div>
        </div>

        {calculation?.bmr > 0 && (
          <div className="bmr-chip">
            <span>Base Metabolic Rate</span>
            <strong>{calculation.bmr} kcal</strong>
          </div>
        )}
      </div>

      {/* Macro Ratio Distribution Progress Bar */}
      <div className="macro-ratio-section">
        <div className="macro-ratio-bar">
          <div className="ratio-segment protein" style={{ width: `${proteinPct}%` }} title={`Protein: ${proteinPct}%`}></div>
          <div className="ratio-segment carbs" style={{ width: `${carbsPct}%` }} title={`Carbs: ${carbsPct}%`}></div>
          <div className="ratio-segment fats" style={{ width: `${fatsPct}%` }} title={`Fats: ${fatsPct}%`}></div>
        </div>
        <div className="macro-ratio-legend">
          <span><span className="dot dot-protein"></span> Protein ({proteinPct}%)</span>
          <span><span className="dot dot-carbs"></span> Carbs ({carbsPct}%)</span>
          <span><span className="dot dot-fats"></span> Fats ({fatsPct}%)</span>
        </div>
      </div>

      {/* Target Macros Grid */}
      <div className="macro-grid">
        <div className="macro-card protein-card">
          <span className="macro-label">🥩 Protein Target</span>
          <strong>{targets?.protein || 0} g</strong>
          <small>{proteinCals} kcal</small>
        </div>

        <div className="macro-card carbs-card">
          <span className="macro-label">🍚 Carbs Target</span>
          <strong>{targets?.carbs || 0} g</strong>
          <small>{carbsCals} kcal</small>
        </div>

        <div className="macro-card fats-card">
          <span className="macro-label">🥑 Healthy Fats</span>
          <strong>{targets?.fats || 0} g</strong>
          <small>{fatsCals} kcal</small>
        </div>
      </div>

      {/* Generated Meal Totals Summary */}
      {generatedTotals && (
        <div className="generated-summary">
          <div className="generated-header">
            <h4>Generated Meal Sum</h4>
            <span className="badge-match">✓ Balanced across 4 meals</span>
          </div>

          <div className="generated-grid">
            <div className="gen-item">
              <span>Calories</span>
              <strong>{Math.round(generatedTotals.calories || 0)} kcal</strong>
            </div>

            <div className="gen-item">
              <span>Protein</span>
              <strong>{generatedTotals.protein || 0} g</strong>
            </div>

            <div className="gen-item">
              <span>Carbs</span>
              <strong>{generatedTotals.carbs || 0} g</strong>
            </div>

            <div className="gen-item">
              <span>Fats</span>
              <strong>{generatedTotals.fats || 0} g</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlanCard;