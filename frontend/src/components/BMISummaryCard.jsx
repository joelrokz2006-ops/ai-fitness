import React from "react";
import { Link } from "react-router-dom";
import { getBMICategory, getBMIDietStrategy } from "../utils/bmi";
import "./BMISummaryCard.css";

const BMISummaryCard = ({ bmi, height, weight, category: propCategory }) => {
  const numericBMI = Number(bmi) || 0;
  if (!numericBMI || numericBMI <= 0) return null;

  const category = propCategory || getBMICategory(numericBMI);
  const strategy = getBMIDietStrategy(category);

  return (
    <div className="bmi-summary-card">
      <div className="bmi-summary-content">
        <div className="bmi-left-block">
          <span className="bmi-summary-label">YOUR METRIC DIAGNOSTIC</span>
          <div className="bmi-val-row">
            <span className="bmi-val-number">{numericBMI.toFixed(2)}</span>
            <div className="bmi-cat-pill" style={{ borderColor: strategy.badgeColor, color: strategy.badgeColor }}>
              {category}
            </div>
          </div>
          {(height || weight) && (
            <div className="bmi-metrics-row">
              {height && <span>Height: <strong>{height} cm</strong></span>}
              {height && weight && <span className="metrics-sep">•</span>}
              {weight && <span>Weight: <strong>{weight} kg</strong></span>}
            </div>
          )}
        </div>

        <div className="bmi-right-block">
          <div className="bmi-strategy-title">
            🎯 <strong>{strategy.strategy}</strong>
          </div>
          <p className="bmi-strategy-text">
            Your diet plan is being adjusted based on your BMI ({numericBMI}) and fitness goal. {strategy.description}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
            <div className="bmi-medical-note" style={{ margin: 0 }}>
              ℹ️ Fitness-oriented recommendation. Users with medical conditions should consult a qualified health professional.
            </div>
            <Link
              to="/bmi"
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: "#00f0ff",
                textDecoration: "none",
                background: "rgba(0, 240, 255, 0.12)",
                border: "1px solid rgba(0, 240, 255, 0.35)",
                padding: "4px 12px",
                borderRadius: "20px",
                whiteSpace: "nowrap"
              }}
            >
              Update BMI in Metric Engine ⚙️
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMISummaryCard;
