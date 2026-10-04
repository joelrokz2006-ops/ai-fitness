import { useState } from "react";
import { generateDietPlan } from "../services/api";
import "./DietForm.css";

const DietForm = ({ onPlanGenerated }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "male",
    weight: "",
    height: "",
    activityLevel: "medium",
    goal: "muscle_gain",
    foodPreference: "non-veg",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const data = await generateDietPlan({
        ...formData,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
      });

      onPlanGenerated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="diet-form" onSubmit={handleSubmit}>
      <div className="diet-form-header">
        <h2>Create Your Diet Plan</h2>
        <p>Enter your details to generate a personalized plan.</p>
      </div>

      {error && (
        <div className="diet-error">
          <span>{error}</span>
          {/login|session|token|expired/i.test(error) && (
            <a href="/login" className="diet-form-login-link" style={{ marginLeft: "12px", color: "#60a5fa", textDecoration: "underline", fontWeight: "600" }}>
              Log In Again →
            </a>
          )}
        </div>
      )}

      <div className="diet-form-grid">
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            min="13"
            required
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
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
            min="1"
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
            min="1"
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
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>Goal</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          >
            <option value="muscle_gain">Muscle Gain</option>
            <option value="weight_loss">Weight Loss</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div className="form-group full-width">
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
        {loading ? "Generating Your Plan..." : "Generate My Diet Plan"}
      </button>
    </form>
  );
};

export default DietForm;