import { useState, useEffect } from "react";
import { generateDietPlan } from "../services/api";
import { calculateBMI, getBMICategory, getBMIDietStrategy } from "../utils/bmi";
import "./DietForm.css";

const DietForm = ({ onPlanGenerated }) => {
  const [formData, setFormData] = useState({
    gender: "male",
    weight: "",
    height: "",
    activityLevel: "medium",
    goal: "muscle_gain",
    foodPreference: "non-veg",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [integratedBmi, setIntegratedBmi] = useState(null);

  // Pre-fill from stored BMI diagnostic or profile data if available
  useEffect(() => {
    // 1. Check if user computed BMI on the BMI page
    const cachedBmi = localStorage.getItem("bmiData");
    if (cachedBmi) {
      try {
        const b = JSON.parse(cachedBmi);
        if (b.height && b.weight) {
          setFormData((prev) => ({
            ...prev,
            gender: b.gender || prev.gender,
            weight: String(b.weight),
            height: String(b.height),
            goal: b.goal || prev.goal,
            foodPreference: b.foodPreference || prev.foodPreference,
            activityLevel: b.activityLevel || prev.activityLevel,
          }));
          setIntegratedBmi({
            bmi: b.bmi,
            category: b.category,
          });
          return;
        }
      } catch (e) {}
    }

    // 2. Fallback to stored user profile
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        setFormData((prev) => ({
          ...prev,
          gender: u.gender ? String(u.gender).toLowerCase() : prev.gender,
          weight: u.weight ? String(u.weight) : prev.weight,
          height: u.height ? String(u.height) : prev.height,
          goal: u.goal
            ? String(u.goal).toLowerCase().replace(/\s+/g, "_")
            : prev.goal,
        }));
      } catch (e) {}
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      // NOTE: Age is NOT included in diet request payload
      const data = await generateDietPlan({
        gender: formData.gender,
        weight: Number(formData.weight),
        height: Number(formData.height),
        activityLevel: formData.activityLevel,
        goal: formData.goal,
        foodPreference: formData.foodPreference,
      });

      onPlanGenerated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Live BMI feedback based on entered height and weight
  const liveBMI =
    formData.height && formData.weight
      ? calculateBMI(formData.height, formData.weight)
      : null;
  const liveCategory = liveBMI ? getBMICategory(liveBMI) : null;
  const liveStrategy = liveCategory ? getBMIDietStrategy(liveCategory) : null;

  return (
    <form className="diet-form" onSubmit={handleSubmit}>
      <div className="diet-form-header">
        <h2>Create Your Diet Plan</h2>
        <p>Enter your body metrics to generate an individualized BMI-adapted nutrition plan.</p>
      </div>

      {/* Live BMI Banner */}
      {liveBMI && liveBMI > 0 && (
        <div
          style={{
            margin: "0 0 20px 0",
            padding: "12px 18px",
            background: "rgba(0, 240, 255, 0.08)",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <span style={{ fontSize: "11px", color: "#9ca3af", letterSpacing: "1px", textTransform: "uppercase" }}>
              Live BMI Diagnostic
            </span>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "#00f0ff" }}>
              {liveBMI} — <span style={{ color: "#38bdf8", fontWeight: "600" }}>{liveCategory}</span>
            </div>
          </div>
          <div style={{ fontSize: "12px", color: "#cbd5e1", maxWidth: "420px" }}>
            🎯 <strong>{liveStrategy?.strategy}:</strong> {liveStrategy?.description}
          </div>
        </div>
      )}

      {error && (
        <div className="diet-error">
          <span>{error}</span>
          {/login|session|token|expired/i.test(error) && (
            <a
              href="/login"
              className="diet-form-login-link"
              style={{
                marginLeft: "12px",
                color: "#60a5fa",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              Log In Again →
            </a>
          )}
        </div>
      )}

      <div className="diet-form-grid">
        {/* Gender Selection including Transgender */}
        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
          </select>
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Example: 70"
            min="20"
            max="300"
            required
          />
        </div>

        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Example: 175"
            min="80"
            max="260"
            required
          />
        </div>

        <div className="form-group">
          <label>Activity Level</label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
          >
            <option value="low">Low (Sedentary / Light activity)</option>
            <option value="medium">Medium (Moderate training 3-5 days/wk)</option>
            <option value="high">High (Intense daily training / athlete)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fitness Goal</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          >
            <option value="muscle_gain">Muscle Gain</option>
            <option value="weight_gain">Weight Gain</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="fat_loss">Fat Loss</option>
            <option value="maintenance">Maintenance / General Fitness</option>
          </select>
        </div>

        <div className="form-group">
          <label>Food Preference</label>
          <select
            name="foodPreference"
            value={formData.foodPreference}
            onChange={handleChange}
          >
            <option value="veg">🌱 100% Pure Vegetarian</option>
            <option value="non-veg">🍗 Non-Vegetarian (Eggs, Chicken, Fish)</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="generate-diet-btn"
        disabled={loading}
      >
        {loading ? "Generating Personalized Plan..." : "Generate My Diet Plan"}
      </button>
    </form>
  );
};

export default DietForm;