// client/src/components/ProgressCard.jsx

import React from "react";
import "./ProgressCard.css";
import "./Dashboard.jsx"

const ProgressCard = ({
  title = "Performance Metric",
  date = "LIVE",
  percentage = 0,
  valueLabel = "No Data",
}) => {
  // Validate percentage value
  const progress = Math.max(0, Math.min(Number(percentage) || 0, 100));

  // Status label based on percentage
  const getStatus = () => {
    if (progress >= 90) return "Excellent";
    if (progress >= 75) return "Very Good";
    if (progress >= 60) return "Good";
    if (progress >= 40) return "Average";
    return "Needs Improvement";
  };

  return (
    <div className="progress-card">

      {/* Decorative Glow */}
      <div className="progress-glow"></div>

      {/* Header */}
      <div className="progress-header">
        <h3 className="progress-title">{title}</h3>
        <span className="progress-date">{date}</span>
      </div>

      {/* Percentage */}
      <div className="progress-body">

        <div className="progress-percent">
          {progress}
          <span>%</span>
        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>

        </div>

      </div>

      {/* Footer */}
      <div className="progress-footer">

        <div className="progress-info">

          <span className="progress-label">
            {valueLabel}
          </span>

          <span className="progress-status">
            {getStatus()}
          </span>

        </div>

        <div className="progress-circle">

          <svg viewBox="0 0 36 36">

            <path
              className="circle-bg"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0-31.831"
            />

            <path
              className="circle-progress"
              strokeDasharray={`${progress},100`}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0-31.831"
            />

          </svg>

          <span>{progress}%</span>

        </div>

      </div>

    </div>
  );
};

export default ProgressCard;