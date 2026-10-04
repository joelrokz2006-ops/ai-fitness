const calculateCalories = require("./calorieCalculator");

// ==================================================
// CLEAR EXERCISE ROUTINE (per goal)
// Every day: focus + exact exercises with sets / reps
// ==================================================

const EXERCISE_ROUTINES = {
  "Muscle Gain": [
    {
      day: "Monday",
      focus: "Chest + Triceps",
      exercises: [
        { name: "Barbell Bench Press", sets: 4, reps: "8-10" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10-12" },
        { name: "Cable Fly", sets: 3, reps: "12-15" },
        { name: "Triceps Rope Pushdown", sets: 3, reps: "12-15" },
        { name: "Overhead Triceps Extension", sets: 3, reps: "12" },
      ],
    },
    {
      day: "Tuesday",
      focus: "Back + Biceps",
      exercises: [
        { name: "Pull Ups", sets: 4, reps: "8-10" },
        { name: "Barbell Row", sets: 4, reps: "8-10" },
        { name: "Lat Pulldown", sets: 3, reps: "10-12" },
        { name: "Face Pull", sets: 3, reps: "15" },
        { name: "Barbell Curl", sets: 3, reps: "10-12" },
        { name: "Hammer Curl", sets: 3, reps: "12" },
      ],
    },
    {
      day: "Wednesday",
      focus: "Legs",
      exercises: [
        { name: "Barbell Squat", sets: 4, reps: "8-10" },
        { name: "Leg Press", sets: 3, reps: "10-12" },
        { name: "Romanian Deadlift", sets: 3, reps: "10" },
        { name: "Leg Extension", sets: 3, reps: "12-15" },
        { name: "Lying Leg Curl", sets: 3, reps: "12" },
        { name: "Standing Calf Raise", sets: 4, reps: "15" },
      ],
    },
    {
      day: "Thursday",
      focus: "Shoulders + Abs",
      exercises: [
        { name: "Overhead Press", sets: 4, reps: "8-10" },
        { name: "Dumbbell Lateral Raise", sets: 4, reps: "15" },
        { name: "Rear Delt Fly", sets: 3, reps: "15" },
        { name: "Hanging Leg Raise", sets: 3, reps: "12-15" },
        { name: "Plank", sets: 3, reps: "60 sec" },
      ],
    },
    {
      day: "Friday",
      focus: "Arms + Chest",
      exercises: [
        { name: "Close Grip Bench Press", sets: 4, reps: "8-10" },
        { name: "Incline Dumbbell Fly", sets: 3, reps: "12" },
        { name: "Chest Dips", sets: 3, reps: "10-12" },
        { name: "Dumbbell Curl", sets: 3, reps: "10-12" },
        { name: "Skull Crusher", sets: 3, reps: "12" },
      ],
    },
    {
      day: "Saturday",
      focus: "Light Cardio",
      exercises: [
        { name: "Incline Treadmill Walk", sets: 1, reps: "20 min" },
        { name: "Rowing Machine", sets: 1, reps: "10 min" },
        { name: "Full Body Stretching", sets: 1, reps: "10 min" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [
        { name: "Easy Walk", sets: 1, reps: "20-30 min" },
        { name: "Foam Rolling", sets: 1, reps: "10 min" },
        { name: "Sleep 7-8 Hours", sets: 1, reps: "Recovery" },
      ],
    },
  ],

  "Weight Gain": [
    {
      day: "Monday",
      focus: "Chest + Triceps",
      exercises: [
        { name: "Barbell Bench Press", sets: 4, reps: "6-8" },
        { name: "Incline Barbell Press", sets: 3, reps: "8-10" },
        { name: "Dumbbell Press", sets: 3, reps: "10" },
        { name: "Triceps Pushdown", sets: 3, reps: "10-12" },
      ],
    },
    {
      day: "Tuesday",
      focus: "Back + Biceps",
      exercises: [
        { name: "Deadlift", sets: 4, reps: "5-6" },
        { name: "Barbell Row", sets: 4, reps: "8-10" },
        { name: "Seated Cable Row", sets: 3, reps: "10-12" },
        { name: "Barbell Curl", sets: 3, reps: "10" },
      ],
    },
    {
      day: "Wednesday",
      focus: "Legs",
      exercises: [
        { name: "Barbell Squat", sets: 4, reps: "6-8" },
        { name: "Leg Press", sets: 4, reps: "10-12" },
        { name: "Romanian Deadlift", sets: 3, reps: "10" },
        { name: "Leg Curl", sets: 3, reps: "12" },
        { name: "Calf Raise", sets: 4, reps: "15" },
      ],
    },
    {
      day: "Thursday",
      focus: "Rest",
      exercises: [
        { name: "Light Walk", sets: 1, reps: "20 min" },
        { name: "Stretching", sets: 1, reps: "10 min" },
      ],
    },
    {
      day: "Friday",
      focus: "Shoulders + Arms",
      exercises: [
        { name: "Overhead Press", sets: 4, reps: "6-8" },
        { name: "Lateral Raise", sets: 4, reps: "15" },
        { name: "Barbell Curl", sets: 3, reps: "10" },
        { name: "Skull Crusher", sets: 3, reps: "10-12" },
      ],
    },
    {
      day: "Saturday",
      focus: "Full Body",
      exercises: [
        { name: "Pull Ups", sets: 3, reps: "8-10" },
        { name: "Dumbbell Bench Press", sets: 3, reps: "10" },
        { name: "Goblet Squat", sets: 3, reps: "12" },
        { name: "Farmer Walk", sets: 3, reps: "40 m" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [
        { name: "Easy Walk", sets: 1, reps: "20 min" },
        { name: "Sleep 8 Hours", sets: 1, reps: "Recovery" },
      ],
    },
  ],

  "Weight Loss": [
    {
      day: "Monday",
      focus: "Full Body + Cardio",
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "12" },
        { name: "Dumbbell Bench Press", sets: 3, reps: "12" },
        { name: "Lat Pulldown", sets: 3, reps: "12" },
        { name: "Treadmill Walk (Incline)", sets: 1, reps: "20 min" },
      ],
    },
    {
      day: "Tuesday",
      focus: "Upper Body + Walking",
      exercises: [
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "12" },
        { name: "Cable Row", sets: 3, reps: "12" },
        { name: "Push Ups", sets: 3, reps: "15" },
        { name: "Brisk Walking", sets: 1, reps: "30 min" },
      ],
    },
    {
      day: "Wednesday",
      focus: "HIIT + Core",
      exercises: [
        { name: "Burpees", sets: 4, reps: "30 sec" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec" },
        { name: "Jump Squats", sets: 4, reps: "30 sec" },
        { name: "Plank", sets: 3, reps: "45 sec" },
        { name: "Crunches", sets: 3, reps: "20" },
      ],
    },
    {
      day: "Thursday",
      focus: "Lower Body + Cardio",
      exercises: [
        { name: "Bodyweight Squat", sets: 3, reps: "15" },
        { name: "Lunges", sets: 3, reps: "12 each leg" },
        { name: "Leg Press", sets: 3, reps: "12" },
        { name: "Cycling", sets: 1, reps: "20 min" },
      ],
    },
    {
      day: "Friday",
      focus: "Full Body Circuit",
      exercises: [
        { name: "Kettlebell Swing", sets: 4, reps: "15" },
        { name: "Step Ups", sets: 3, reps: "12 each leg" },
        { name: "Dumbbell Row", sets: 3, reps: "12" },
        { name: "Battle Ropes", sets: 3, reps: "30 sec" },
      ],
    },
    {
      day: "Saturday",
      focus: "Walking / Light Cardio",
      exercises: [
        { name: "Fast Walking", sets: 1, reps: "40 min" },
        { name: "Stretching", sets: 1, reps: "10 min" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [
        { name: "Light Walk", sets: 1, reps: "20 min" },
        { name: "Stretching", sets: 1, reps: "10 min" },
      ],
    },
  ],

  "Fat Loss": [
    {
      day: "Monday",
      focus: "Full Strength + Cardio",
      exercises: [
        { name: "Barbell Squat", sets: 4, reps: "10" },
        { name: "Bench Press", sets: 4, reps: "10" },
        { name: "Lat Pulldown", sets: 3, reps: "12" },
        { name: "Incline Treadmill Walk", sets: 1, reps: "20 min" },
      ],
    },
    {
      day: "Tuesday",
      focus: "Upper Body",
      exercises: [
        { name: "Overhead Press", sets: 3, reps: "10" },
        { name: "Cable Fly", sets: 3, reps: "15" },
        { name: "Seated Row", sets: 3, reps: "12" },
        { name: "Lateral Raise", sets: 3, reps: "15" },
        { name: "Plank", sets: 3, reps: "60 sec" },
      ],
    },
    {
      day: "Wednesday",
      focus: "HIIT + Core",
      exercises: [
        { name: "Treadmill Sprints", sets: 8, reps: "30 sec" },
        { name: "Burpees", sets: 3, reps: "30 sec" },
        { name: "Bicycle Crunches", sets: 3, reps: "20" },
        { name: "Hanging Knee Raise", sets: 3, reps: "15" },
      ],
    },
    {
      day: "Thursday",
      focus: "Lower Body",
      exercises: [
        { name: "Deadlift", sets: 4, reps: "8" },
        { name: "Leg Press", sets: 3, reps: "12" },
        { name: "Walking Lunges", sets: 3, reps: "12 each leg" },
        { name: "Leg Curl", sets: 3, reps: "12" },
        { name: "Calf Raise", sets: 3, reps: "15" },
      ],
    },
    {
      day: "Friday",
      focus: "Full Body Circuit",
      exercises: [
        { name: "Dumbbell Clean & Press", sets: 4, reps: "10" },
        { name: "Renegade Row", sets: 3, reps: "10 each side" },
        { name: "Jump Squats", sets: 3, reps: "15" },
        { name: "Rowing Machine", sets: 1, reps: "10 min" },
      ],
    },
    {
      day: "Saturday",
      focus: "Light Cardio",
      exercises: [
        { name: "Cycling", sets: 1, reps: "30 min" },
        { name: "Stretching", sets: 1, reps: "10 min" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [
        { name: "Light Walk", sets: 1, reps: "20 min" },
        { name: "Foam Rolling", sets: 1, reps: "10 min" },
      ],
    },
  ],

  Strength: [
    {
      day: "Monday",
      focus: "Chest + Push",
      exercises: [
        { name: "Barbell Bench Press", sets: 5, reps: "5" },
        { name: "Overhead Press", sets: 4, reps: "5" },
        { name: "Weighted Dips", sets: 3, reps: "6-8" },
        { name: "Triceps Pushdown", sets: 3, reps: "8-10" },
      ],
    },
    {
      day: "Tuesday",
      focus: "Leg Strength",
      exercises: [
        { name: "Barbell Squat", sets: 5, reps: "5" },
        { name: "Romanian Deadlift", sets: 4, reps: "6-8" },
        { name: "Leg Press", sets: 3, reps: "8-10" },
        { name: "Calf Raise", sets: 4, reps: "12-15" },
      ],
    },
    {
      day: "Wednesday",
      focus: "Rest / Light Mobility",
      exercises: [
        { name: "Light Walk", sets: 1, reps: "20 min" },
        { name: "Hip & Shoulder Mobility", sets: 1, reps: "15 min" },
      ],
    },
    {
      day: "Thursday",
      focus: "Back + Pull",
      exercises: [
        { name: "Deadlift", sets: 5, reps: "3-5" },
        { name: "Weighted Pull Ups", sets: 4, reps: "5-6" },
        { name: "Barbell Row", sets: 4, reps: "6-8" },
        { name: "Barbell Curl", sets: 3, reps: "8-10" },
      ],
    },
    {
      day: "Friday",
      focus: "Full Body Strength",
      exercises: [
        { name: "Front Squat", sets: 4, reps: "6" },
        { name: "Incline Bench Press", sets: 4, reps: "6-8" },
        { name: "Pendlay Row", sets: 3, reps: "6-8" },
        { name: "Farmer Walk", sets: 3, reps: "40 m" },
      ],
    },
    {
      day: "Saturday",
      focus: "Core + Mobility",
      exercises: [
        { name: "Hanging Leg Raise", sets: 3, reps: "12-15" },
        { name: "Weighted Plank", sets: 3, reps: "60 sec" },
        { name: "Ab Wheel Rollout", sets: 3, reps: "10" },
        { name: "Stretching", sets: 1, reps: "10 min" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [
        { name: "Easy Walk", sets: 1, reps: "20 min" },
        { name: "Sleep 8 Hours", sets: 1, reps: "Recovery" },
      ],
    },
  ],

  "General Fitness": [
    {
      day: "Monday",
      focus: "Full Body Workout",
      exercises: [
        { name: "Goblet Squat", sets: 3, reps: "12" },
        { name: "Dumbbell Bench Press", sets: 3, reps: "12" },
        { name: "Lat Pulldown", sets: 3, reps: "12" },
        { name: "Plank", sets: 3, reps: "45 sec" },
      ],
    },
    {
      day: "Tuesday",
      focus: "Light Cardio",
      exercises: [
        { name: "Brisk Walking / Cycling", sets: 1, reps: "30 min" },
        { name: "Stretching", sets: 1, reps: "10 min" },
      ],
    },
    {
      day: "Wednesday",
      focus: "Upper Body",
      exercises: [
        { name: "Shoulder Press", sets: 3, reps: "12" },
        { name: "Cable Row", sets: 3, reps: "12" },
        { name: "Push Ups", sets: 3, reps: "15" },
        { name: "Bicep Curl", sets: 3, reps: "12" },
        { name: "Triceps Rope", sets: 3, reps: "12" },
      ],
    },
    {
      day: "Thursday",
      focus: "Rest / Mobility",
      exercises: [
        { name: "Light Walk", sets: 1, reps: "20 min" },
        { name: "Yoga / Mobility", sets: 1, reps: "15 min" },
      ],
    },
    {
      day: "Friday",
      focus: "Lower Body + Core",
      exercises: [
        { name: "Bodyweight Squat", sets: 3, reps: "15" },
        { name: "Lunges", sets: 3, reps: "12 each leg" },
        { name: "Leg Curl", sets: 3, reps: "12" },
        { name: "Crunches", sets: 3, reps: "20" },
      ],
    },
    {
      day: "Saturday",
      focus: "Walking / Activity",
      exercises: [
        { name: "Fast Walking", sets: 1, reps: "40 min" },
        { name: "Recreational Sport", sets: 1, reps: "20-30 min" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [
        { name: "Light Walk", sets: 1, reps: "20 min" },
        { name: "Full Body Stretch", sets: 1, reps: "10 min" },
      ],
    },
  ],
};

// ==================================================
// CLEAR DIET ROUTINE (per goal)
// ==================================================

const DIET_TEMPLATES = {
  "Muscle Gain": {
    meals: [
      {
        name: "Breakfast",
        time: "8:00 AM",
        items: [
          "80 g oats cooked in 250 ml milk",
          "3 whole eggs / 200 g paneer",
          "1 banana + 10 almonds",
        ],
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        items: [
          "150 g chicken breast / 200 g paneer",
          "200 g rice or 3 chapati",
          "1 bowl dal + mixed vegetables",
          "1 bowl curd + salad",
        ],
      },
      {
        name: "Evening Snack",
        time: "5:00 PM",
        items: [
          "1 scoop whey / 250 ml milk",
          "2 bananas or 1 apple",
          "30 g roasted chana or peanuts",
        ],
      },
      {
        name: "Dinner",
        time: "8:30 PM",
        items: [
          "150 g chicken / 150 g paneer",
          "2 chapati + 100 g rice",
          "Stir fried vegetables",
          "1 glass milk before sleeping",
        ],
      },
    ],
  },

  "Weight Gain": {
    meals: [
      {
        name: "Breakfast",
        time: "8:00 AM",
        items: [
          "100 g oats in 300 ml milk + peanut butter",
          "3 whole eggs / 200 g paneer",
          "1 banana + 10 walnuts",
        ],
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        items: [
          "180 g chicken / 250 g paneer",
          "300 g rice or 4 chapati",
          "1 bowl dal + vegetables",
          "1 bowl curd + salad",
        ],
      },
      {
        name: "Evening Snack",
        time: "5:00 PM",
        items: [
          "Mass shake: milk + banana + peanut butter",
          "2 sandwiches with cheese",
          "Handful of dry fruits",
        ],
      },
      {
        name: "Dinner",
        time: "8:30 PM",
        items: [
          "180 g chicken / 200 g paneer",
          "3 chapati + 150 g rice",
          "Vegetables + soup",
          "1 glass milk before sleeping",
        ],
      },
    ],
  },

  "Weight Loss": {
    meals: [
      {
        name: "Breakfast",
        time: "8:00 AM",
        items: [
          "4 egg whites + 1 whole egg / 150 g paneer",
          "1 small bowl oats or 1 multigrain toast",
          "Green tea + 1 fruit",
        ],
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        items: [
          "150 g chicken / 150 g paneer",
          "1 small bowl rice or 2 chapati",
          "Big bowl salad + sauteed vegetables",
          "1 bowl dal",
        ],
      },
      {
        name: "Evening Snack",
        time: "5:00 PM",
        items: [
          "Roasted chana / sprouts",
          "Buttermilk or green tea",
          "1 fruit",
        ],
      },
      {
        name: "Dinner",
        time: "8:30 PM",
        items: [
          "150 g chicken / 150 g paneer",
          "1 chapati or 100 g rice",
          "Vegetable soup + steamed vegetables",
        ],
      },
    ],
  },

  "Fat Loss": {
    meals: [
      {
        name: "Breakfast",
        time: "8:00 AM",
        items: [
          "4 egg whites + 1 whole egg / 150 g paneer",
          "1 bowl oats or 2 egg-white omelette with veggies",
          "Green tea + 1 fruit",
        ],
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        items: [
          "150 g grilled chicken / 150 g paneer",
          "1 small bowl brown rice or 2 chapati",
          "Raw salad + sauteed vegetables",
          "1 bowl dal",
        ],
      },
      {
        name: "Evening Snack",
        time: "5:00 PM",
        items: [
          "Sprouts / roasted chana",
          "Black coffee or green tea",
          "1 fruit",
        ],
      },
      {
        name: "Dinner",
        time: "8:30 PM",
        items: [
          "150 g grilled chicken / 150 g paneer",
          "1 chapati or 100 g rice",
          "Clear soup + steamed vegetables",
        ],
      },
    ],
  },

  Strength: {
    meals: [
      {
        name: "Breakfast",
        time: "8:00 AM",
        items: [
          "4 whole eggs / 200 g paneer",
          "2 multigrain toast + avocado or peanut butter",
          "1 fruit + 250 ml milk",
        ],
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        items: [
          "150 g chicken / 200 g paneer",
          "250 g rice or 3 chapati",
          "1 bowl dal + vegetables",
          "1 bowl curd + salad",
        ],
      },
      {
        name: "Evening Snack",
        time: "5:00 PM",
        items: [
          "1 scoop whey + 1 banana",
          "30 g almonds or walnuts",
          "Black coffee (pre workout)",
        ],
      },
      {
        name: "Dinner",
        time: "8:30 PM",
        items: [
          "150 g fish / chicken / 150 g paneer",
          "2 chapati + 100 g rice",
          "Vegetables + salad",
        ],
      },
    ],
  },

  "General Fitness": {
    meals: [
      {
        name: "Breakfast",
        time: "8:00 AM",
        items: [
          "2 eggs / 1 bowl poha or upma",
          "250 ml milk",
          "1 fruit",
        ],
      },
      {
        name: "Lunch",
        time: "1:00 PM",
        items: [
          "120 g chicken / 150 g paneer",
          "2 chapati + 1 bowl rice",
          "Dal + vegetables + salad",
        ],
      },
      {
        name: "Evening Snack",
        time: "5:00 PM",
        items: [
          "1 fruit + handful of nuts",
          "Green tea or buttermilk",
        ],
      },
      {
        name: "Dinner",
        time: "8:30 PM",
        items: [
          "120 g chicken / 150 g paneer",
          "2 chapati",
          "Vegetables + clear soup",
        ],
      },
    ],
  },
};

const CALORIE_GOAL_MAP = {
  "Weight Loss": "weight_loss",
  "Fat Loss": "weight_loss",
  "Weight Gain": "weight_gain",
  "Muscle Gain": "muscle_gain",
  Strength: "strength",
  "General Fitness": "general_fitness",
};

// ==================================================
// BUILD EXERCISE ROUTINE
// ==================================================

const buildExerciseRoutine = (goal) => {
  const routine = EXERCISE_ROUTINES[goal] || EXERCISE_ROUTINES["General Fitness"];

  return routine.map((day) => ({
    day: day.day,
    focus: day.focus,
    exercises: day.exercises,
  }));
};

// ==================================================
// BUILD DIET ROUTINE
// ==================================================

const buildDietRoutine = ({ age, gender, height, weight, goal, activityLevel }) => {
  const macros = calculateCalories({
    age: Number(age),
    gender: String(gender || "male").toLowerCase(),
    weight: Number(weight),
    height: Number(height),
    activityLevel: "medium",
    goal: CALORIE_GOAL_MAP[goal] || "general_fitness",
  });

  const template =
    DIET_TEMPLATES[goal] || DIET_TEMPLATES["General Fitness"];

  const ratios = [0.25, 0.35, 0.15, 0.25];

  const proteinRatio = macros.protein * 4 / macros.calories;
  const fatRatio = macros.fats * 9 / macros.calories;
  const carbRatio = Math.max(1 - proteinRatio - fatRatio, 0);

  const meals = template.meals.map((meal, index) => {
    const share = ratios[index] || 0.25;

    return {
      name: meal.name,
      time: meal.time,
      items: meal.items,
      calories: Math.round(macros.calories * share),
      protein: Math.round(macros.protein * share),
      carbs: Math.round(macros.carbs * share),
      fats: Math.round(macros.fats * share),
    };
  });

  return {
    dailyTargets: {
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fats,
      bmr: macros.bmr,
      water: "3 - 4 Litres",
    },
    mealSplit: {
      protein: Math.round(proteinRatio * 100),
      carbs: Math.round(carbRatio * 100),
      fats: Math.round(fatRatio * 100),
    },
    meals,
    rules: [
      "Drink 3 - 4 litres of water every day",
      "No cold drinks, packed juice or junk food",
      "Add a protein source to every meal",
      "Stop eating 2 hours before sleeping",
      "Sleep 7 - 8 hours for proper recovery",
    ],
  };
};

module.exports = {
  buildExerciseRoutine,
  buildDietRoutine,
};
