import { useEffect, useState } from "react";

import DietForm from "../components/DietForm";
import DietPlanCard from "../components/DietPlanCard";
import MealCard from "../components/MealCard";

import { getMyDietPlan } from "../services/api";

import "./Diet.css";

const Diet = () => {
  const [planData, setPlanData] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // LOAD SAVED DIET PLAN
  // ========================================

  useEffect(() => {
    const loadDietPlan = async () => {
      try {
        const data = await getMyDietPlan();

        /*
          GET /my-plan response gives:

          {
            success: true,
            dietPlan: {...}
          }

          But DietPlanCard expects:
          {
            dietPlan,
            targets,
            generatedTotals,
            calculation
          }
        */

        const dietPlan = data.dietPlan;
        if (!dietPlan) {
          setLoadingPlan(false);
          return;
        }

        const generatedTotals =
          dietPlan?.meals?.reduce(
            (total, meal) => {
              total.calories += meal.totalCalories || 0;
              total.protein += meal.totalProtein || 0;
              total.carbs += meal.totalCarbs || 0;
              total.fats += meal.totalFats || 0;

              return total;
            },
            {
              calories: 0,
              protein: 0,
              carbs: 0,
              fats: 0,
            }
          ) || null;

        if (generatedTotals) {
          generatedTotals.calories = Math.round(generatedTotals.calories);
          generatedTotals.protein = Number(generatedTotals.protein.toFixed(1));
          generatedTotals.carbs = Number(generatedTotals.carbs.toFixed(1));
          generatedTotals.fats = Number(generatedTotals.fats.toFixed(1));
        }

        // Calculate BMR from stored user details if available
        let bmr = 0;
        if (dietPlan?.userDetails) {
          const { age, gender, weight, height } = dietPlan.userDetails;
          if (weight && height && age) {
            bmr = Math.round(
              gender === "female"
                ? 10 * weight + 6.25 * height - 5 * age - 161
                : 10 * weight + 6.25 * height - 5 * age + 5
            );
          }
        }

        setPlanData({
          dietPlan,
          targets: dietPlan?.dailyTargets,
          generatedTotals,
          calculation: {
            bmr,
          },
        });
      } catch (err) {
        // 404 means user has not generated a plan yet
        if (!err?.message?.includes("No diet plan found")) {
          setError(err?.message || "Failed to load diet plan");
        }
      } finally {
        setLoadingPlan(false);
      }
    };

    loadDietPlan();
  }, []);

  // ========================================
  // AFTER NEW PLAN IS GENERATED
  // ========================================

  const handlePlanGenerated = (data) => {
    setPlanData(data);
    setError("");
  };

  return (
    <div className="diet-page">
      <div className="diet-container">

        {/* PAGE HEADER */}
        <div className="diet-page-header">
          <span className="diet-badge">AI FITNESS</span>

          <h1>Your Personalized Diet Plan</h1>

          <p>
            Enter your details and get a personalized daily
            nutrition and meal plan.
          </p>
        </div>

        {/* DIET FORM */}
        <DietForm
          onPlanGenerated={handlePlanGenerated}
        />

        {/* ERROR */}
        {error && (
          <div className="diet-page-error">
            <span>{error}</span>
            {/login|session|token|expired/i.test(error) && (
              <a href="/login" className="diet-error-relogin-btn">
                Log In Again →
              </a>
            )}
          </div>
        )}

        {/* LOADING */}
        {loadingPlan && (
          <div className="diet-loading">
            Loading your diet plan...
          </div>
        )}

        {/* DIET PLAN SUMMARY */}
        {!loadingPlan && planData && (
          <>
            <DietPlanCard planData={planData} />

            {/* MEALS */}
            <div className="meals-section">
              <div className="meals-header">
                <h2>Your Daily Meals</h2>

                <p>
                  Follow these meals based on your personalized
                  nutrition target.
                </p>
              </div>

              <div className="meals-grid">
                {planData.dietPlan?.meals?.map(
                  (meal, index) => (
                    <MealCard
                      key={meal._id || index}
                      meal={meal}
                    />
                  )
                )}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Diet;