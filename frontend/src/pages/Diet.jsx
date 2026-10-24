import { useEffect, useState } from "react";

import DietForm from "../components/DietForm";
import DietPlanCard from "../components/DietPlanCard";
import MealCard from "../components/MealCard";
import BMISummaryCard from "../components/BMISummaryCard";
import MacroGuide from "../components/MacroGuide";

import { getMyDietPlan } from "../services/api";
import { calculateBMI, getBMICategory } from "../utils/bmi";

import "./Diet.css";

const Diet = () => {
  const [planData, setPlanData] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [error, setError] = useState("");
  const [bmiMetrics, setBmiMetrics] = useState({
    bmi: null,
    category: "",
    height: null,
    weight: null,
  });

  // ========================================
  // LOAD USER PROFILE / BMI DATA FOR BMI PRE-DISPLAY
  // ========================================

  useEffect(() => {
    // 1. Check if user computed BMI on the BMI page
    const cachedBmi = localStorage.getItem("bmiData");
    if (cachedBmi) {
      try {
        const b = JSON.parse(cachedBmi);
        if (b.bmi && b.height && b.weight) {
          setBmiMetrics({
            bmi: b.bmi,
            category: b.category || getBMICategory(b.bmi),
            height: b.height,
            weight: b.weight,
          });
          return;
        }
      } catch (e) {}
    }

    // 2. Fallback to stored user profile
    const cachedUser = localStorage.getItem("user");
    if (cachedUser) {
      try {
        const u = JSON.parse(cachedUser);
        if (u.height && u.weight) {
          const calculated = calculateBMI(u.height, u.weight);
          setBmiMetrics({
            bmi: calculated,
            category: getBMICategory(calculated),
            height: u.height,
            weight: u.weight,
          });
        }
      } catch (e) {}
    }
  }, []);

  // ========================================
  // LOAD SAVED DIET PLAN
  // ========================================

  useEffect(() => {
    const loadDietPlan = async () => {
      try {
        const data = await getMyDietPlan();

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

        // Extract or compute BMI from dietPlan userDetails
        let planBmi = dietPlan?.userDetails?.bmi;
        let planCat = dietPlan?.userDetails?.bmiCategory;
        const planHeight = dietPlan?.userDetails?.height;
        const planWeight = dietPlan?.userDetails?.weight;

        if ((!planBmi || planBmi <= 0) && planHeight && planWeight) {
          planBmi = calculateBMI(planHeight, planWeight);
          planCat = getBMICategory(planBmi);
        }

        if (planBmi && planBmi > 0) {
          setBmiMetrics({
            bmi: planBmi,
            category: planCat || getBMICategory(planBmi),
            height: planHeight,
            weight: planWeight,
          });
        }

        // Baseline BMR calculation without age dependency
        let bmr = 0;
        if (planWeight && planHeight) {
          const gender = dietPlan.userDetails?.gender || "male";
          const gConst =
            gender === "female" ? -161 : gender === "transgender" ? -78 : 5;
          bmr = Math.round(10 * planWeight + 6.25 * planHeight - 100 + gConst);
        }

        setPlanData({
          dietPlan,
          targets: dietPlan?.dailyTargets,
          generatedTotals,
          calculation: {
            bmr,
            bmi: planBmi,
            bmiCategory: planCat,
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

    if (data?.dietPlan?.userDetails) {
      const { height, weight, bmi, bmiCategory } = data.dietPlan.userDetails;
      const finalBmi = bmi || calculateBMI(height, weight);
      setBmiMetrics({
        bmi: finalBmi,
        category: bmiCategory || getBMICategory(finalBmi),
        height,
        weight,
      });
    } else if (data?.bmi) {
      setBmiMetrics({
        bmi: data.bmi,
        category: data.bmiCategory,
        height: data.dietPlan?.userDetails?.height,
        weight: data.dietPlan?.userDetails?.weight,
      });
    }
  };

  return (
    <div className="diet-page">
      <div className="diet-container">

        {/* PAGE HEADER */}
        <div className="diet-page-header">
          <span className="diet-badge">AI FITNESS & NUTRITION</span>

          <h1>Your Personalized Diet Plan</h1>

          <p>
            Individualized meal recommendations calculated using your body
            metrics, BMI diagnostics, and fitness goals.
          </p>
        </div>

        {/* TOP BMI SUMMARY CARD (CHANGE 1 & 6) */}
        {bmiMetrics.bmi && bmiMetrics.bmi > 0 && (
          <BMISummaryCard
            bmi={bmiMetrics.bmi}
            category={bmiMetrics.category}
            height={bmiMetrics.height}
            weight={bmiMetrics.weight}
          />
        )}

        {/* DIET FORM (Age completely removed, Transgender enabled) */}
        <DietForm onPlanGenerated={handlePlanGenerated} />

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
                  Follow these meals based on your personalized BMI-adjusted
                  nutrition target.
                </p>
              </div>

              <div className="meals-grid">
                {planData.dietPlan?.meals?.map((meal, index) => (
                  <MealCard key={meal._id || index} meal={meal} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* NEW P & C NUTRITION EDUCATION SECTION (CHANGE 2) */}
        <MacroGuide />

      </div>
    </div>
  );
};

export default Diet;