import React from 'react';
import BMIForm from '../components/BMIForm';
import './BMI.css';

const BMI = () => {
  return (
    <div className="bmi-page-container">
      <div className="bmi-page-header">
        <h2>BMI & DIET INTEGRATION ENGINE</h2>
        <p>
          Calculate your clinical body mass index diagnostic and seamlessly generate an aligned,
          individualized nutrition strategy, daily caloric targets, and meal recommendations.
        </p>
      </div>
      
      {/* Target Module Form Panel Render */}
      <BMIForm />
    </div>
  );
};

export default BMI;
