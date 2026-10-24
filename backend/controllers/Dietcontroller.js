const DietPlan = require("../models/DietPlan");
const calculateCalories = require("../services/calorieCalculator");
const generateDietPlan = require("../services/dietGenerator");
const { formatGoal } = require("../utils/helpers");
const {
  calculateBMI,
  getBMICategory,
  getBMIDietStrategy,
} = require("../utils/bmi");

// ========================================
// GENERATE PERSONALIZED DIET PLAN
// ========================================

const generatePlan = async (req, res) => {
  try {
    const {
      gender,
      weight,
      height,
      activityLevel,
      goal,
      foodPreference,
    } = req.body;

    // =========================
    // VALIDATION (AGE IS NOT USED IN DIET)
    // =========================

    if (
      !gender ||
      !weight ||
      !height ||
      !activityLevel ||
      !goal ||
      !foodPreference
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required details (gender, weight, height, activityLevel, goal, foodPreference)",
      });
    }

    const numWeight = Number(weight);
    const numHeight = Number(height);

    if (isNaN(numWeight) || numWeight <= 0 || isNaN(numHeight) || numHeight <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid positive numbers for height and weight.",
      });
    }

    // =========================
    // CALCULATE BMI & CATEGORY
    // =========================

    const bmi = calculateBMI(numHeight, numWeight);
    const bmiCategory = getBMICategory(bmi);
    const bmiStrategy = getBMIDietStrategy(bmiCategory);

    // =========================
    // CALCULATE CALORIES & MACROS (BMI-DRIVEN, AGE-FREE)
    // =========================

    const calculation = calculateCalories({
      gender,
      weight: numWeight,
      height: numHeight,
      activityLevel,
      goal,
      bmi,
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
    );

    generatedTotals.calories = Math.round(generatedTotals.calories);
    generatedTotals.protein = Number(generatedTotals.protein.toFixed(1));
    generatedTotals.carbs = Number(generatedTotals.carbs.toFixed(1));
    generatedTotals.fats = Number(generatedTotals.fats.toFixed(1));

    // =========================
    // CREATE DIET PLAN
    // =========================

    const userId = req.user?.id || req.user?._id;

    // Archive any previous active diet plan so only the newest plan remains active
    await DietPlan.updateMany({ user: userId, status: "active" }, { status: "archived" });

    const dietPlan = await DietPlan.create({
      user: userId,

      planName: `${formatGoal(goal)} Diet Plan`,

      goal,

      foodPreference,

      status: "active",

      userDetails: {
        gender,
        weight: numWeight,
        height: numHeight,
        activityLevel,
        bmi,
        bmiCategory,
        bmiStrategy: bmiStrategy.strategy,
      },

      dailyTargets: {
        calories: calculation.calories,
        protein: calculation.protein,
        carbs: calculation.carbs,
        fats: calculation.fats,
      },

      meals,

      recommendations: [
        `BMI: ${bmi} (${bmiCategory}) — Strategy: ${bmiStrategy.strategy}`,
        bmiStrategy.description,
        ...(bmiStrategy.recommendations || []),
        "Drink 3-4 liters of water daily to support hydration and metabolic efficiency.",
        "Fitness-oriented recommendation. If you have any medical condition, please consult a qualified healthcare professional.",
      ],

      generatedBy: "system",
    });

    // =========================
    // RESPONSE
    // =========================

    res.status(201).json({
      success: true,
      message: "Personalized diet plan generated successfully",

      bmi,
      bmiCategory,
      bmiStrategy: bmiStrategy.strategy,

      targets: {
        calories: calculation.calories,
        protein: calculation.protein,
        carbs: calculation.carbs,
        fats: calculation.fats,
      },

      generatedTotals,

      calculation: {
        bmr: calculation.bmr,
        bmi,
        bmiCategory,
        bmiStrategy: bmiStrategy.strategy,
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
    let dietPlan = await DietPlan.findOne({
      user: userId,
      status: "active",
    })
      .sort({ createdAt: -1 })
      .populate("meals.foods.food");

    if (!dietPlan) {
      dietPlan = await DietPlan.findOne({
        user: userId,
      })
        .sort({ createdAt: -1 })
        .populate("meals.foods.food");
    }

    if (!dietPlan) {
      return res.status(404).json({
        success: false,
        message: "No diet plan found",
      });
    }

    // Ensure BMI and category are calculated if missing
    let bmi = dietPlan.userDetails?.bmi;
    let bmiCategory = dietPlan.userDetails?.bmiCategory;

    if (!bmi && dietPlan.userDetails?.height && dietPlan.userDetails?.weight) {
      bmi = calculateBMI(
        dietPlan.userDetails.height,
        dietPlan.userDetails.weight
      );
      bmiCategory = getBMICategory(bmi);
    }

    res.status(200).json({
      success: true,
      message: "Diet plan retrieved successfully",
      bmi,
      bmiCategory,
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