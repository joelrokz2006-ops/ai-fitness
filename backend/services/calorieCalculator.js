const {
  calculateBMI,
  getBMICategory,
  getBMIDietStrategy,
} = require("../utils/bmi");

/**
 * Calculate daily calories and macronutrients for Diet Planning
 *
 * IMPORTANT REQUIREMENT:
 * Age is NOT used in diet calculation. Diet planning does not depend on age.
 * The system considers:
 * - BMI & BMI Category
 * - Weight (kg)
 * - Height (cm)
 * - Gender (Male, Female, Transgender)
 * - Fitness Goal
 * - Activity Level
 */
const calculateCalories = ({
  gender = "male",
  weight,
  height,
  activityLevel = "medium",
  goal = "maintenance",
  bmi: explicitBMI,
}) => {
  const w = Number(weight) || 70;
  const h = Number(height) || 170;

  // 1. BMI calculation & category
  const bmi = explicitBMI ? Number(explicitBMI) : calculateBMI(h, w);
  const bmiCategory = getBMICategory(bmi);
  const bmiStrategy = getBMIDietStrategy(bmiCategory);

  // 2. Basal Metabolic Rate (BMR) without age
  // Standard adult metabolic baseline: 10 * weight + 6.25 * height + genderConstant
  let genderConstant = 5; // male baseline
  const gen = String(gender || "").toLowerCase();

  if (gen === "female") {
    genderConstant = -161;
  } else if (gen === "transgender" || gen === "other") {
    // Balanced metabolic average for non-binary / transgender individuals
    genderConstant = -78;
  }

  // Base BMR without age factor (using standard adult reference constant: -100)
  let bmr = 10 * w + 6.25 * h - 100 + genderConstant;
  bmr = Math.max(Math.round(bmr), 1200);

  // 3. Activity Multiplier
  const activityMultipliers = {
    low: 1.2,
    medium: 1.55,
    high: 1.725,
  };

  const multiplier = activityMultipliers[activityLevel] || 1.45;
  let calories = bmr * multiplier;

  // 4. Adjust calories based on goal
  const normalizedGoal = String(goal).toLowerCase();
  if (
    normalizedGoal === "weight_loss" ||
    normalizedGoal === "fat_loss" ||
    normalizedGoal === "weight loss" ||
    normalizedGoal === "fat loss"
  ) {
    calories -= 400;
  } else if (
    normalizedGoal === "weight_gain" ||
    normalizedGoal === "weight gain"
  ) {
    calories += 350;
  } else if (
    normalizedGoal === "muscle_gain" ||
    normalizedGoal === "muscle gain"
  ) {
    calories += 250;
  }

  // 5. Adapt calories according to BMI Category (BMI-based diet strategy)
  if (bmiCategory === "Underweight") {
    // Underweight users need additional caloric support, unless cutting
    if (!normalizedGoal.includes("loss")) {
      calories += bmiStrategy.calorieDelta || 250;
    }
  } else if (bmiCategory === "Obesity") {
    // Obesity: sustainable reduction without unsafe crash dieting
    calories = Math.max(calories - 200, bmr + 100);
  } else if (bmiCategory === "Overweight") {
    if (normalizedGoal.includes("loss")) {
      calories -= 100;
    }
  }

  // Safety floor: Ensure sustainable, safe caloric intake (never crash diet)
  calories = Math.max(Math.round(calories), 1400);

  // 6. Macronutrient calculation adapted to BMI strategy & weight
  const proteinFactor =
    bmiStrategy.proteinFactor || (normalizedGoal.includes("muscle") ? 2.0 : 1.8);
  const protein = Math.round(w * proteinFactor);

  const fats = Math.round((calories * 0.25) / 9);

  const proteinCalories = protein * 4;
  const fatCalories = fats * 9;

  const carbs = Math.max(
    Math.round((calories - proteinCalories - fatCalories) / 4),
    60
  );

  return {
    bmr: Math.round(bmr),
    calories,
    protein,
    carbs,
    fats,
    bmi,
    bmiCategory,
    bmiStrategy: bmiStrategy.strategy,
    strategyDescription: bmiStrategy.description,
    recommendations: bmiStrategy.recommendations,
  };
};

module.exports = calculateCalories;