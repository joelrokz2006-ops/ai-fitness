import React from "react";
import "./MacroGuide.css";

const MacroGuide = () => {
  return (
    <section className="macro-guide-section">
      <div className="macro-guide-header">
        <span className="macro-guide-badge">NUTRITION MASTERY</span>
        <h2>Understand Your Macros</h2>
        <p>
          Learn how Protein and Carbohydrates support your body, workout and
          fitness goals.
        </p>
      </div>

      <div className="macro-cards-container">
        {/* =========================================
            PROTEIN (P) SECTION
        ========================================= */}
        <div className="macro-card-box protein-box">
          <div className="macro-card-top">
            <div className="macro-letter-tag protein-tag">P</div>
            <div>
              <h3>P — Protein</h3>
              <span className="macro-subtag">The Muscle Builder & Repairer</span>
            </div>
          </div>

          <div className="macro-explanation">
            <p className="macro-intro">
              <strong>Protein</strong> is the primary building material your body uses
              to repair, maintain, and build lean muscle tissue.
            </p>
            <p>
              When you train or engage in physical activity, your muscle fibers
              undergo microscopic stress. Protein supplies the essential amino
              acids needed for rapid cellular recovery, immune support, and muscle
              maintenance during any fitness journey.
            </p>
          </div>

          <div className="macro-key-benefits">
            <h4>Why You Need Protein:</h4>
            <ul>
              <li>
                <span className="benefit-icon">🛡️</span>
                <strong>Muscle Repair:</strong> Accelerates recovery and heals micro-tears from training.
              </li>
              <li>
                <span className="benefit-icon">📈</span>
                <strong>Hypertrophy:</strong> Provides essential amino acids for sustainable muscle growth.
              </li>
              <li>
                <span className="benefit-icon">🍽️</span>
                <strong>Satiety & Metabolism:</strong> High thermic effect of food keeps you full longer.
              </li>
            </ul>
          </div>

          <div className="macro-food-examples">
            <h4>Common Protein-Rich Foods:</h4>
            <div className="food-pills-grid">
              <span className="food-pill">🥚 Eggs</span>
              <span className="food-pill">🍗 Chicken Breast</span>
              <span className="food-pill">🐟 Fish</span>
              <span className="food-pill">🥛 Milk</span>
              <span className="food-pill">🥣 Curd / Greek Yogurt</span>
              <span className="food-pill">🧀 Paneer</span>
              <span className="food-pill">🍲 Dal & Lentils</span>
              <span className="food-pill">🌱 Soy & Tofu</span>
              <span className="food-pill">🥤 Whey Protein</span>
            </div>
          </div>
        </div>

        {/* =========================================
            CARBOHYDRATE (C) SECTION
        ========================================= */}
        <div className="macro-card-box carbs-box">
          <div className="macro-card-top">
            <div className="macro-letter-tag carbs-tag">C</div>
            <div>
              <h3>C — Carbohydrates</h3>
              <span className="macro-subtag">The High-Performance Fuel</span>
            </div>
          </div>

          <div className="macro-explanation">
            <p className="macro-intro">
              <strong>Carbohydrates</strong> are one of the human body’s most
              efficient, preferred energy sources for physical and mental function.
            </p>
            <p>
              They provide the glycogen that fuels both everyday metabolic activities
              and demanding gym sessions. Consuming adequate carbohydrates before
              and after workouts preserves muscle glycogen, boosts power output,
              and speeds up systemic recovery.
            </p>
          </div>

          <div className="macro-key-benefits">
            <h4>Why You Need Carbohydrates:</h4>
            <ul>
              <li>
                <span className="benefit-icon">⚡</span>
                <strong>Energy Production:</strong> Breaks down into glucose for immediate muscular energy.
              </li>
              <li>
                <span className="benefit-icon">🏋️</span>
                <strong>Workout Fuel:</strong> Prevents premature fatigue during high-intensity lifts.
              </li>
              <li>
                <span className="benefit-icon">🌾</span>
                <strong>Quality vs Processed:</strong> Whole, complex carbs provide sustained energy & fiber.
              </li>
            </ul>
          </div>

          <div className="macro-food-examples">
            <h4>Common Quality Carbohydrate Foods:</h4>
            <div className="food-pills-grid">
              <span className="food-pill">🍚 Rice (Brown / White)</span>
              <span className="food-pill">🥣 Rolled Oats</span>
              <span className="food-pill">🌾 Whole Grains</span>
              <span className="food-pill">🥔 Potatoes</span>
              <span className="food-pill">🍠 Sweet Potatoes</span>
              <span className="food-pill">🍌 Fresh Fruits</span>
              <span className="food-pill">🥞 Idli & Dosa</span>
              <span className="food-pill">🫓 Whole Wheat Chapati</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          P vs C COMPARISON TABLE
      ========================================= */}
      <div className="macro-comparison-container">
        <h3>Macronutrient Comparison: P vs C</h3>
        <p className="comparison-subtitle">
          How Protein and Carbohydrates work together to power your fitness transformation.
        </p>

        <div className="macro-table-wrapper">
          <table className="macro-table">
            <thead>
              <tr>
                <th>Nutrient</th>
                <th>Primary Role in the Body</th>
                <th>Top Wholesome Examples</th>
                <th>Recommended Timing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong className="table-protein">P — Protein</strong>
                </td>
                <td>Muscle repair, tissue recovery & immune maintenance</td>
                <td>Eggs, chicken, fish, paneer, dal, whey</td>
                <td>Evenly spaced every 3–4 hours throughout the day</td>
              </tr>
              <tr>
                <td>
                  <strong className="table-carbs">C — Carbohydrates</strong>
                </td>
                <td>Explosive training energy, workout fuel & glycogen replenish</td>
                <td>Rice, oats, fruits, sweet potatoes, chapati</td>
                <td>1–2 hours before training & within post-workout window</td>
              </tr>
              <tr>
                <td>
                  <strong className="table-fats">Healthy Fats</strong>
                </td>
                <td>Hormone production, joint lubrication & long-term cellular health</td>
                <td>Almonds, walnuts, olive oil, chia seeds, avocado</td>
                <td>With meals away from pre-workout window</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MacroGuide;
