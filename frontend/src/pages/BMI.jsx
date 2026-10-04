// client/src/pages/BMI.jsx
import React from 'react';
import BMIForm from '../components/BMIForm';
import './BMI.css';

const BMI = () => {
  return (
    <div className="bmi-page-container">
      <div className="bmi-page-header">
        <h2>METRIC ENGINE ANALYSIS</h2>
        <p>Evaluate lean threshold ratios using structured algorithm inputs</p>
      </div>
      
      {/* Target Module Form Panel Render */}
      <BMIForm />
    </div>
  );
};

export default BMI;