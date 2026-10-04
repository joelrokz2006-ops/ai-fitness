const DietPlan = require("../models/DietPlan");
const calculateCalories = require("../services/calorieCalculator");
const generateDietPlan = require("../services/dietGenerator");
const { formatGoal } = require("../utils/helpers");

// ========================================
// GENERATE PERSONALIZED DIET PLAN
// ========================================

const generatePlan = async (req, res) => {
  try {
    const {
      age,
      gender,
      weight,
      height,
      activityLevel,
      goal,
      foodPreference,
    } = req.body;

    // =========================
    // VALIDATION
    // =========================

    if (
      !age ||
      !gender ||
      !weight ||
      !height ||
      !activityLevel ||
      !goal ||
      !foodPreference
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required details",
      });
    }

    // =========================
    // CALCULATE CALORIES & MACROS
    // =========================

    const calculation = calculateCalories({
      age,
      gender,
      weight,
      height,
      activityLevel,
      goal,
    });

    // =========================
    // GENERATE MEALS
    // =========================

    const meals = await generateDietPlan({
      goal,
      foodPreference,
      dailyTargets: {
        calories: calculation.calories,
        protein: calculation.protein,
        carbs: calculation.carbs,
        fats: calculation.fats,
      },
    });
    // =========================
// CALCULATE GENERATED TOTALS
// =========================

const generatedTotals = meals.reduce(
  (total, meal) => {
    total.calories += meal.totalCalories;
    total.protein += meal.totalProtein;
    total.carbs += meal.totalCarbs;
    total.fats += meal.totalFats;

    return total;
  },
  {
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  }
);

generatedTotals.protein = Number(
  generatedTotals.protein.toFixed(1)
);

generatedTotals.carbs = Number(
  generatedTotals.carbs.toFixed(1)
);

generatedTotals.fats = Number(
  generatedTotals.fats.toFixed(1)
);

    // =========================
    // CREATE DIET PLAN
    // =========================

    const userId = req.user?.id || req.user?._id;
    const dietPlan = await DietPlan.create({
      user: userId,

      planName: `${formatGoal(goal)} Diet Plan`,

      goal,

      foodPreference,

      userDetails: {
        age,
        gender,
        weight,
        height,
        activityLevel,
      },

      dailyTargets: {
        calories: calculation.calories,
        protein: calculation.protein,
        carbs: calculation.carbs,
        fats: calculation.fats,
      },

      meals,

      recommendations: [
        "Drink enough water throughout the day",
        "Follow the meal portions consistently",
        "Track your progress every week",
      ],

      generatedBy: "system",
    });

    // =========================
    // RESPONSE
    // =========================

    res.status(201).json({
      success: true,
      message: "Personalized diet plan generated successfully",

  targets: {
    calories: calculation.calories,
    protein: calculation.protein,
    carbs: calculation.carbs,
    fats: calculation.fats,
  },

  generatedTotals,

  calculation: {
    bmr: calculation.bmr,
  },

  dietPlan,
});
  } catch (error) {
    console.error("Diet Plan Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate diet plan",
      error: error.message,
    });
  }
};
// ========================================
// GET LATEST SAVED DIET PLAN
// ========================================

const getMyPlan = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const dietPlan = await DietPlan.findOne({
      user: userId,
    })
  .sort({ createdAt: -1 })
  .populate("meals.foods.food");

    if (!dietPlan) {
      return res.status(404).json({
        success: false,
        message: "No diet plan found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Diet plan retrieved successfully",
      dietPlan,
    });
  } catch (error) {
    console.error("Get Diet Plan Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve diet plan",
      error: error.message,
    });
  }
};

module.exports = {
  generatePlan,
   getMyPlan,
};