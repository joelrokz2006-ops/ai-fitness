// client/src/components/BMIForm.jsx
import React, { useState } from 'react';
import './BMIForm.css';

const BMIForm = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiValue, setBmiValue] = useState(null);
  const [status, setStatus] = useState('');
  const [advice, setAdvice] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmiValue(bmi);

    // AI Classification Output Rules Engine Mapping
    if (bmi < 18.5) {
      setStatus('UNDERWEIGHT // DEFICIT');
      setAdvice('AI Recommendation: Increase complex caloric distribution profiles. Target mass building blocks.');
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setStatus('NORMAL // OPTIMAL');
      setAdvice('AI Recommendation: Lean retention profile active. Maintain progressive workload threshold velocity.');
    } else if (bmi >= 25 && bmi <= 29.9) {
      setStatus('OVERWEIGHT // CONDITIONING');
      setAdvice('AI Recommendation: Initiate aerobic oxidation intervals. Adjust carbohydrate ceiling parameters.');
    } else {
      setStatus('OBESE // INTENSE REDUCTION');
      setAdvice('AI Recommendation: Direct programmatic energy structural deficits. Track absolute movement sets.');
    }
  };

  return (
    <div className="bmi-form-box">
      <h3 className="form-header">BODY <span>DIAGNOSTICS</span></h3>
      <form onSubmit={calculateBMI}>
        <div className="form-group">
          <label className="form-label">Height (CM)</label>
          <input 
            type="number" 
            className="form-input" 
            placeholder="e.g. 175" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
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
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Run Engine Diagnostics</button>
      </form>

      {/* Dynamic Conditional Rendering Dashboard Modules Layer */}
      {bmiValue && (
        <div className="bmi-result-panel">
          <p className="result-val">{bmiValue}</p>
          <div className="result-status-badge">{status}</div>
          <p className="result-advice-msg">{advice}</p>
        </div>
      )}
    </div>
  );
};

export default BMIForm;