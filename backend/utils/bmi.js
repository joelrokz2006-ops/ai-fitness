/**
 * Centralized BMI Calculation & Categorization Utility
 * Used across backend services and controllers to ensure 100% consistent results.
 */

const calculateBMI = (heightCm, weightKg) => {
  const h = Number(heightCm);
  const w = Number(weightKg);

  if (!h || !w || h <= 0 || w <= 0) {
    return 0;
  }

  const heightM = h / 100;
  const bmi = w / (heightM * heightM);
  return Number(bmi.toFixed(2));
};

const getBMICategory = (bmi) => {
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

const getBMIDietStrategy = (category) => {
  switch (category) {
    case "Underweight":
      return {
        strategy: "Nutrient-Dense Caloric Surplus",
        description:
          "Focus on nutrient-dense foods, adequate calories, quality protein, complex carbohydrates, and healthy fats to support healthy weight gain.",
        recommendations: [
          "Consume calorie- and nutrient-dense whole foods like nuts, seeds, and oats",
          "Ensure adequate protein intake with every meal for tissue synthesis",
          "Incorporate complex carbohydrates and healthy fats without skipping meals",
          "Eat consistent, frequent meals throughout the day"
        ],
        calorieDelta: 300,
        proteinFactor: 2.0,
      };

    case "Normal weight":
      return {
        strategy: "Balanced Body Recomposition & Performance",
        description:
          "Focus on balanced nutrition, adequate protein, balanced carbohydrates, and healthy fats tailored to your training goal.",
        recommendations: [
          "Maintain balanced macronutrient distribution matching workout expenditure",
          "Prioritize high-quality protein sources for muscle maintenance",
          "Time complex carbohydrates around intense training sessions",
          "Hydrate consistently with 3-4 liters of water daily"
        ],
        calorieDelta: 0,
        proteinFactor: 1.8,
      };

    case "Overweight":
      return {
        strategy: "Sustainable Moderate Calorie Control",
        description:
          "Focus on sustainable calorie control, high-protein foods, high-fiber intake, and lower-calorie nutrient-dense options.",
        recommendations: [
          "Create a moderate, sustainable calorie deficit without crash dieting",
          "Prioritize high-protein and high-fiber foods to maximize satiety",
          "Replace refined sugars and processed snacks with whole fruit and vegetables",
          "Keep portion sizes controlled while preserving lean mass"
        ],
        calorieDelta: -350,
        proteinFactor: 2.0,
      };

    case "Obesity":
      return {
        strategy: "Sustainable Healthy Calorie Deficit",
        description:
          "Focus on sustainable calorie reduction, high-protein meals, high-fiber foods, and controlled portions without extreme restrictions.",
        recommendations: [
          "Target a safe, sustainable daily calorie deficit (avoid severe crash diets)",
          "Emphasize lean proteins and bulky fibrous vegetables to stay full",
          "Avoid sugary beverages and liquid calories completely",
          "Consult a qualified healthcare professional if managing medical conditions"
        ],
        calorieDelta: -500,
        proteinFactor: 2.0,
      };

    default:
      return {
        strategy: "Balanced Fitness Nutrition",
        description: "Maintain balanced nutrition aligned with your fitness objectives.",
        recommendations: [
          "Eat balanced meals with adequate protein, carbs, and fats",
          "Stay hydrated and maintain consistent sleep"
        ],
        calorieDelta: 0,
        proteinFactor: 1.8,
      };
  }
};

module.exports = {
  calculateBMI,
  getBMICategory,
  getBMIDietStrategy,
};
