// backend/services/dietGenerator.js
const Diet = require("../models/Diet");

/**
 * GENERATE PERSONALIZED DIET PLAN
 * Creates a structured 4-meal plan (Breakfast, Lunch, Evening Snack, Dinner)
 * with precise calories, protein, carbs, and fats matching daily targets.
 */
const generateDietPlan = async ({
  goal = "muscle_gain",
  foodPreference = "veg",
  dailyTargets = { calories: 2400, protein: 140, carbs: 280, fats: 65 },
}) => {
  // Fetch active foods from database
  const allFoods = await Diet.find({ isActive: true });

  if (!allFoods || allFoods.length === 0) {
    throw new Error("No foods found in the database. Please ensure food database is seeded.");
  }

  // 1. Separate foods by preference
  // If vegetarian: only veg items. If non-vegetarian: non-veg proteins + healthy veg carbs/fruits/veggies
  const isVeg = foodPreference === "veg";

  const availableFoods = allFoods.filter((food) => {
    if (isVeg) {
      return food.foodType === "veg";
    }
    // For non-veg, all foods are permissible
    return true;
  });

  // Food categories helper
  const getFoodsByCategory = (category, mealType, nonVegOnly = false) => {
    return availableFoods.filter((f) => {
      const matchCat = f.category === category;
      const matchMeal = !mealType || f.mealTypes.includes(mealType);
      if (nonVegOnly) {
        return matchCat && matchMeal && f.foodType === "non-veg";
      }
      return matchCat && matchMeal;
    });
  };

  // Helper to safely pick a food
  const pickFood = (foodList, fallbackCategory) => {
    if (foodList && foodList.length > 0) {
      return foodList[Math.floor(Math.random() * foodList.length)];
    }
    const fallbackList = availableFoods.filter((f) => f.category === fallbackCategory);
    return fallbackList[0] || availableFoods[0];
  };

  // 2. Meal Calorie Allocations (Sum = 100%)
  const mealRatios = {
    breakfast: 0.25,
    lunch: 0.35,
    evening_snack: 0.15,
    dinner: 0.25,
  };

  // 3. Helper to format portion size
  const formatPortion = (food, quantity) => {
    const rawUnit = food.servingSize || "100g";
    const numMatch = rawUnit.match(/^(\d+)\s*(.*)$/);
    if (numMatch) {
      const baseNum = Number(numMatch[1]);
      const unitStr = numMatch[2] || "g";
      const totalNum = Math.round(baseNum * quantity);
      return `${totalNum}${unitStr ? ` ${unitStr}` : ""}`;
    }
    return `${Number(quantity.toFixed(1))} × ${rawUnit}`;
  };

  // 4. Meal Constructor
  const buildMeal = (mealName, mealType, recommendedTime, targetCals, targetProtein, targetCarbs, targetFats) => {
    let proteinFood, carbFood, fiberOrFruitFood;

    if (mealType === "breakfast") {
      if (!isVeg) {
        proteinFood = pickFood(getFoodsByCategory("protein", "breakfast", true), "protein");
      } else {
        proteinFood = pickFood(getFoodsByCategory("protein", "breakfast"), "protein");
      }
      carbFood = pickFood(getFoodsByCategory("carbs", "breakfast"), "carbs");
      fiberOrFruitFood = pickFood(getFoodsByCategory("fruits", "breakfast") || getFoodsByCategory("fats", "breakfast"), "fruits");
    } else if (mealType === "lunch") {
      if (!isVeg) {
        proteinFood = pickFood(getFoodsByCategory("protein", "lunch", true), "protein");
      } else {
        proteinFood = pickFood(getFoodsByCategory("protein", "lunch"), "protein");
      }
      carbFood = pickFood(getFoodsByCategory("carbs", "lunch"), "carbs");
      fiberOrFruitFood = pickFood(getFoodsByCategory("vegetables", "lunch"), "vegetables");
    } else if (mealType === "evening_snack") {
      proteinFood = pickFood(getFoodsByCategory("protein", "evening_snack") || getFoodsByCategory("dairy", "evening_snack"), "protein");
      carbFood = pickFood(getFoodsByCategory("fruits", "evening_snack"), "fruits");
      fiberOrFruitFood = pickFood(getFoodsByCategory("fats", "evening_snack"), "fats");
    } else {
      // dinner
      if (!isVeg) {
        proteinFood = pickFood(getFoodsByCategory("protein", "dinner", true), "protein");
      } else {
        proteinFood = pickFood(getFoodsByCategory("protein", "dinner"), "protein");
      }
      carbFood = pickFood(getFoodsByCategory("carbs", "dinner"), "carbs");
      fiberOrFruitFood = pickFood(getFoodsByCategory("vegetables", "dinner"), "vegetables");
    }

    const selectedFoods = [proteinFood, carbFood, fiberOrFruitFood].filter(Boolean);

    // Remove duplicates if any
    const uniqueFoods = [];
    const seenIds = new Set();
    for (const f of selectedFoods) {
      if (!seenIds.has(f.name)) {
        seenIds.add(f.name);
        uniqueFoods.push(f);
      }
    }

    // Allocate target calories across items:
    // Protein item gets 45% of calories
    // Carb item gets 40% of calories
    // Veg/fruit/fat gets 15% of calories
    const itemShares = [0.45, 0.40, 0.15];

    const mealFoods = uniqueFoods.map((food, idx) => {
      const share = itemShares[idx] || (1 / uniqueFoods.length);
      const foodTargetCal = targetCals * share;
      const baseCal = Math.max(food.calories, 20);
      let qty = Number((foodTargetCal / baseCal).toFixed(2));
      if (qty < 0.1) qty = 0.1;

      const calories = Math.round(food.calories * qty);
      const protein = Number((food.protein * qty).toFixed(1));
      const carbs = Number((food.carbs * qty).toFixed(1));
      const fats = Number((food.fats * qty).toFixed(1));

      return {
        food: food._id,
        name: food.name,
        icon: food.icon || (food.foodType === "non-veg" ? "🍗" : "🥗"),
        quantity: qty,
        unit: food.servingSize,
        portion: formatPortion(food, qty),
        calories,
        protein,
        carbs,
        fats,
      };
    });

    const mealTotalCalories = mealFoods.reduce((acc, f) => acc + f.calories, 0);
    const mealTotalProtein = Number(mealFoods.reduce((acc, f) => acc + f.protein, 0).toFixed(1));
    const mealTotalCarbs = Number(mealFoods.reduce((acc, f) => acc + f.carbs, 0).toFixed(1));
    const mealTotalFats = Number(mealFoods.reduce((acc, f) => acc + f.fats, 0).toFixed(1));

    return {
      mealName,
      mealType,
      recommendedTime,
      foods: mealFoods,
      totalCalories: mealTotalCalories,
      totalProtein: mealTotalProtein,
      totalCarbs: mealTotalCarbs,
      totalFats: mealTotalFats,
    };
  };

  // Generate 4 structured meals
  const meals = [
    buildMeal(
      "Breakfast",
      "breakfast",
      "8:00 AM",
      Math.round(dailyTargets.calories * mealRatios.breakfast),
      Math.round(dailyTargets.protein * mealRatios.breakfast),
      Math.round(dailyTargets.carbs * mealRatios.breakfast),
      Math.round(dailyTargets.fats * mealRatios.breakfast)
    ),
    buildMeal(
      "Lunch",
      "lunch",
      "1:00 PM",
      Math.round(dailyTargets.calories * mealRatios.lunch),
      Math.round(dailyTargets.protein * mealRatios.lunch),
      Math.round(dailyTargets.carbs * mealRatios.lunch),
      Math.round(dailyTargets.fats * mealRatios.lunch)
    ),
    buildMeal(
      "Evening Snack",
      "evening_snack",
      "5:00 PM",
      Math.round(dailyTargets.calories * mealRatios.evening_snack),
      Math.round(dailyTargets.protein * mealRatios.evening_snack),
      Math.round(dailyTargets.carbs * mealRatios.evening_snack),
      Math.round(dailyTargets.fats * mealRatios.evening_snack)
    ),
    buildMeal(
      "Dinner",
      "dinner",
      "8:30 PM",
      Math.round(dailyTargets.calories * mealRatios.dinner),
      Math.round(dailyTargets.protein * mealRatios.dinner),
      Math.round(dailyTargets.carbs * mealRatios.dinner),
      Math.round(dailyTargets.fats * mealRatios.dinner)
    ),
  ];

  return meals;
};

module.exports = generateDietPlan;