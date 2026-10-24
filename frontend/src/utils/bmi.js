/**
 * Centralized BMI Calculation & Categorization Utility (Frontend)
 * Mirrors the exact backend logic to guarantee 100% calculation consistency.
 */

export const calculateBMI = (heightCm, weightKg) => {
  const h = Number(heightCm);
  const w = Number(weightKg);

  if (!h || !w || h <= 0 || w <= 0) {
    return 0;
  }

  const heightM = h / 100;
  const bmi = w / (heightM * heightM);
  return Number(bmi.toFixed(2));
};

export const getBMICategory = (bmi) => {
  const val = Number(bmi);

  if (!val || val <= 0) {
    return "Unknown";
  }

  if (val < 18.5) {
    return "Underweight";
  } else if (val <= 24.9) {
    return "Normal weight";
  } else if (val <= 29.9) {
    return "Overweight";
  } else {
    return "Obesity";
  }
};

export const getBMIDietStrategy = (category) => {
  switch (category) {
    case "Underweight":
      return {
        strategy: "Nutrient-Dense Caloric Surplus",
        description:
          "Focus on nutrient-dense foods, adequate calories, quality protein, complex carbohydrates, and healthy fats to support healthy weight gain.",
        badgeColor: "#38bdf8",
        calorieDelta: 300,
        proteinFactor: 2.0,
        recommendations: [
          "Consume calorie- and nutrient-dense whole foods like nuts, seeds, and oats",
          "Ensure adequate protein intake with every meal for lean tissue synthesis",
          "Incorporate complex carbohydrates and healthy fats without skipping meals",
          "Eat consistent, frequent meals throughout the day (4-5 meals)"
        ],
        focusFoods: ["Peanut Butter", "Oats & Dry Fruits", "Whole Eggs / Paneer", "Brown Rice & Sweet Potatoes", "Greek Yogurt"],
        limitFoods: ["Empty-calorie junk food", "Sugary sodas", "Skipping breakfast/meals"]
      };

    case "Normal weight":
      return {
        strategy: "Balanced Body Recomposition & Performance",
        description:
          "Focus on balanced nutrition, adequate protein, balanced carbohydrates, and healthy fats tailored to your training goal.",
        badgeColor: "#22c55e",
        calorieDelta: 0,
        proteinFactor: 1.8,
        recommendations: [
          "Maintain balanced macronutrient distribution matching workout expenditure",
          "Prioritize high-quality protein sources for muscle maintenance and recovery",
          "Time complex carbohydrates around intense training sessions",
          "Hydrate consistently with 3-4 liters of water daily"
        ],
        focusFoods: ["Chicken Breast / Soya Chunks", "Eggs / Tofu", "Quinoa / Brown Rice", "Green Leafy Vegetables", "Nuts & Olive Oil"],
        limitFoods: ["Deep-fried fast food", "Excessive refined sugar", "Ultra-processed snacks"]
      };

    case "Overweight":
      return {
        strategy: "Sustainable Moderate Calorie Control",
        description:
          "Focus on sustainable calorie control, high-protein foods, high-fiber intake, and lower-calorie nutrient-dense options.",
        badgeColor: "#f59e0b",
        calorieDelta: -350,
        proteinFactor: 2.0,
        recommendations: [
          "Create a moderate, sustainable calorie deficit without crash dieting",
          "Prioritize high-protein and high-fiber foods to maximize satiety",
          "Replace refined sugars and processed snacks with whole fruit and vegetables",
          "Keep portion sizes controlled while preserving lean mass"
        ],
        focusFoods: ["Egg Whites / Sprouted Moong", "Grilled Chicken / Tofu", "Cruciferous Vegetables (Broccoli, Spinach)", "Lentil Soups (Dal)", "Apples & Berries"],
        limitFoods: ["Sugary beverages & fruit juices", "Fried foods & pastries", "Refined white flour (Maida)", "Late-night heavy snacking"]
      };

    case "Obesity":
      return {
        strategy: "Sustainable Healthy Calorie Deficit",
        description:
          "Focus on sustainable calorie reduction, high-protein meals, high-fiber foods, and controlled portions without extreme restrictions.",
        badgeColor: "#ef4444",
        calorieDelta: -500,
        proteinFactor: 2.0,
        recommendations: [
          "Target a safe, sustainable daily calorie deficit (avoid severe crash diets)",
          "Emphasize lean proteins and bulky fibrous vegetables to stay full longer",
          "Avoid sugary beverages and liquid calories completely",
          "Maintain a steady hydration schedule and consult a healthcare professional if needed"
        ],
        focusFoods: ["Fresh Salads & Clear Soups", "Steamed Soya / Grilled Fish / Tofu", "Whole Pulses & Dal", "Cucumber, Celery & Green Veggies", "Water & Green Tea"],
        limitFoods: ["Sweetened drinks & energy drinks", "Creamy sauces & mayonnaise", "Deep-fried snacks & sweets", "Processed meats"]
      };

    default:
      return {
        strategy: "Balanced Fitness Nutrition",
        description: "Maintain balanced nutrition aligned with your fitness objectives.",
        badgeColor: "#00f0ff",
        calorieDelta: 0,
        proteinFactor: 1.8,
        recommendations: [
          "Eat balanced meals with adequate protein, carbs, and fats",
          "Stay hydrated with 3-4L water daily and maintain consistent sleep"
        ],
        focusFoods: ["Whole Grains", "Lean Protein Sources", "Seasonal Vegetables", "Fresh Fruit"],
        limitFoods: ["Processed junk food", "High sugar items"]
      };
  }
};

export const getIdealWeightRange = (heightCm) => {
  const h = Number(heightCm);
  if (!h || h <= 0) return { min: 0, max: 0 };
  const heightM = h / 100;
  const heightSq = heightM * heightM;
  return {
    min: Number((18.5 * heightSq).toFixed(1)),
    max: Number((24.9 * heightSq).toFixed(1)),
  };
};

export const getRecommendedGoalForBMI = (category) => {
  switch (category) {
    case "Underweight":
      return "weight_gain";
    case "Overweight":
      return "fat_loss";
    case "Obesity":
      return "weight_loss";
    case "Normal weight":
    default:
      return "muscle_gain";
  }
};

/**
 * Client-side calculation mirroring backend calorieCalculator.js
 * Provides instantaneous feedback to the user on the BMI page
 */
export const calculateBMIDietTargets = ({
  gender = "male",
  weight,
  height,
  activityLevel = "medium",
  goal = "maintenance",
  bmi: explicitBMI,
}) => {
  const w = Number(weight) || 70;
  const h = Number(height) || 170;

  const bmi = explicitBMI ? Number(explicitBMI) : calculateBMI(h, w);
  const bmiCategory = getBMICategory(bmi);
  const bmiStrategy = getBMIDietStrategy(bmiCategory);

  let genderConstant = 5;
  const gen = String(gender || "").toLowerCase();
  if (gen === "female") {
    genderConstant = -161;
  } else if (gen === "transgender" || gen === "other") {
    genderConstant = -78;
  }

  let bmr = 10 * w + 6.25 * h - 100 + genderConstant;
  bmr = Math.max(Math.round(bmr), 1200);

  const activityMultipliers = {
    low: 1.2,
    medium: 1.55,
    high: 1.725,
  };
  const multiplier = activityMultipliers[activityLevel] || 1.45;
  let calories = bmr * multiplier;

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

  if (bmiCategory === "Underweight") {
    if (!normalizedGoal.includes("loss")) {
      calories += bmiStrategy.calorieDelta || 250;
    }
  } else if (bmiCategory === "Obesity") {
    calories = Math.max(calories - 200, bmr + 100);
  } else if (bmiCategory === "Overweight") {
    if (normalizedGoal.includes("loss")) {
      calories -= 100;
    }
  }

  calories = Math.max(Math.round(calories), 1400);

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

/**
 * Curated sample meal blueprint linked directly to the BMI category
 */
export const getSampleMealsForBMI = (category, foodPreference = "non-veg") => {
  const isVeg = foodPreference === "veg";

  if (category === "Underweight") {
    return [
      {
        mealType: "Breakfast",
        name: isVeg ? "Oatmeal with Peanut Butter, Banana & Almonds" : "Whole Boiled Eggs (3) with Peanut Butter Toast & Banana",
        calories: 520,
        protein: isVeg ? "18g" : "28g",
        highlight: "Calorie-dense complex carbs + healthy fats for healthy surplus"
      },
      {
        mealType: "Lunch",
        name: isVeg ? "Paneer Bhurji with Brown Rice, Dal Tadka & Salad" : "Grilled Chicken Breast with Jeera Rice & Moong Dal",
        calories: 680,
        protein: isVeg ? "32g" : "45g",
        highlight: "High biological value protein + sustained energizing carbohydrates"
      },
      {
        mealType: "Evening Snack",
        name: isVeg ? "Mixed Dry Fruits (Walnuts, Almonds), Dates & Greek Yogurt" : "Protein Shake with Banana, Oats & Handful of Almonds",
        calories: 380,
        protein: "22g",
        highlight: "Fast-absorbing recovery nutrients between main meals"
      },
      {
        mealType: "Dinner",
        name: isVeg ? "Tofu Curry with 3 Multigrain Rotis & Steamed Veggies" : "Grilled Fish Fillet with 3 Phulkas & Mixed Veg Salad",
        calories: 550,
        protein: isVeg ? "28g" : "38g",
        highlight: "Nutrient-rich dinner to maintain nocturnal muscle protein synthesis"
      }
    ];
  }

  if (category === "Overweight" || category === "Obesity") {
    return [
      {
        mealType: "Breakfast",
        name: isVeg ? "Sprouted Moong Salad with Lemon & Cucumber" : "Egg White Omelette (4 whites) with Spinach & Tomato",
        calories: 320,
        protein: isVeg ? "16g" : "24g",
        highlight: "High satiety, high fiber, low caloric density to jumpstart fat loss"
      },
      {
        mealType: "Lunch",
        name: isVeg ? "Soya Chunks Curry with 1 Roti & Large Cucumber Salad" : "Grilled Herb Chicken Breast with Steamed Broccoli & 1 Roti",
        calories: 450,
        protein: isVeg ? "30g" : "42g",
        highlight: "Maximum lean protein with bulky greens to stay fully satisfied"
      },
      {
        mealType: "Evening Snack",
        name: "Roasted Chana (Bengal Gram) with Hot Green Tea (No Sugar)",
        calories: 160,
        protein: "9g",
        highlight: "Zero refined sugars, curbs evening cravings effectively"
      },
      {
        mealType: "Dinner",
        name: isVeg ? "Yellow Moong Dal Soup with Sauteed Tofu & Zucchini" : "Steamed Fish / Chicken Soup with Sautéed Bell Peppers & Spinach",
        calories: 380,
        protein: isVeg ? "25g" : "35g",
        highlight: "Light night-time meal optimizing fat metabolism during sleep"
      }
    ];
  }

  // Normal weight / Default
  return [
    {
      mealType: "Breakfast",
      name: isVeg ? "Rolled Oats with Milk, Chia Seeds & Berries" : "Scrambled Eggs (2 whole + 2 whites) with Multigrain Toast",
      calories: 420,
      protein: isVeg ? "20g" : "26g",
      highlight: "Balanced macro kickstart for sustained daytime cognitive and athletic performance"
    },
    {
      mealType: "Lunch",
      name: isVeg ? "Paneer Curry with Brown Rice, Dal & Mixed Green Salad" : "Grilled Chicken Breast with Brown Rice & Stir-Fried Veggies",
      calories: 580,
      protein: isVeg ? "28g" : "40g",
      highlight: "Optimal 40/30/30 macro distribution supporting lean muscle recomposition"
    },
    {
      mealType: "Evening Snack",
      name: isVeg ? "Roasted Makhana with Handful of Walnuts" : "Boiled Egg (1) with Roasted Makhana & Green Tea",
      calories: 220,
      protein: "10g",
      highlight: "Antioxidant-rich clean energy before workouts or evening activity"
    },
    {
      mealType: "Dinner",
      name: isVeg ? "Soya Paneer Stir Fry with 2 Multigrain Rotis & Curd" : "Baked Salmon / Grilled Chicken with 2 Rotis & Salad Bowl",
      calories: 490,
      protein: isVeg ? "26g" : "36g",
      highlight: "Clean complete proteins to support overnight muscular repair"
    }
  ];
};
