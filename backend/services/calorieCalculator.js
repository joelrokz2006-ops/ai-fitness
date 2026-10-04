const calculateCalories = ({
  age,
  gender,
  weight,
  height,
  activityLevel,
  goal,
}) => {
  let bmr;

  // BMR Calculation
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Activity Multiplier
  const activityMultipliers = {
    low: 1.2,
    medium: 1.55,
    high: 1.725,
  };

  const multiplier = activityMultipliers[activityLevel] || 1.2;

  let calories = bmr * multiplier;

  // Adjust calories based on goal
  if (goal === "weight_loss") {
    calories -= 400;
  }

  if (goal === "weight_gain") {
    calories += 300;
  }

  if (goal === "muscle_gain") {
    calories += 250;
  }

  calories = Math.round(calories);

  // Macronutrients
  const protein = Math.round(weight * 2);

  const fats = Math.round((calories * 0.25) / 9);

  const proteinCalories = protein * 4;
  const fatCalories = fats * 9;

  const carbs = Math.round(
    (calories - proteinCalories - fatCalories) / 4
  );

  return {
    bmr: Math.round(bmr),
    calories,
    protein,
    carbs,
    fats,
  };
};

module.exports = calculateCalories;