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
      focus: "Abs + Core",
      exercises: [
        { name: "Ab Wheel Rollout", sets: 3, reps: "12" },
        { name: "Cable Crunches", sets: 3, reps: "15" },
        { name: "Russian Twists", sets: 3, reps: "20" },
        { name: "Bicycle Crunches", sets: 3, reps: "20" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [],
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
      focus: "Rest Day",
      exercises: [],
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
        { name: "Bench Press", sets: 3, reps: "10" },
        { name: "Barbell Squat", sets: 3, reps: "10" },
        { name: "Dips", sets: 3, reps: "10" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [],
    },
  ],

  "Weight Loss": [
    {
      day: "Monday",
      focus: "Full Body + Conditioning",
      exercises: [
        { name: "Barbell Squat", sets: 3, reps: "12" },
        { name: "Bench Press", sets: 3, reps: "12" },
        { name: "Lat Pulldown", sets: 3, reps: "12" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec" },
      ],
    },
    {
      day: "Tuesday",
      focus: "Upper Body + Core",
      exercises: [
        { name: "Dumbbell Shoulder Press", sets: 3, reps: "12" },
        { name: "Cable Row", sets: 3, reps: "12" },
        { name: "Push Ups", sets: 3, reps: "15" },
        { name: "Bicycle Crunches", sets: 3, reps: "20" },
      ],
    },
    {
      day: "Wednesday",
      focus: "HIIT + Core",
      exercises: [
        { name: "Burpees", sets: 4, reps: "30 sec" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec" },
        { name: "Plank", sets: 3, reps: "45 sec" },
        { name: "Crunches", sets: 3, reps: "20" },
      ],
    },
    {
      day: "Thursday",
      focus: "Lower Body + Conditioning",
      exercises: [
        { name: "Bodyweight Squat", sets: 3, reps: "15" },
        { name: "Lunges", sets: 3, reps: "12 each leg" },
        { name: "Leg Press", sets: 3, reps: "12" },
        { name: "High Knees", sets: 3, reps: "30 sec" },
      ],
    },
    {
      day: "Friday",
      focus: "Full Body Circuit",
      exercises: [
        { name: "Push Ups", sets: 4, reps: "15" },
        { name: "Jumping Jacks", sets: 3, reps: "45 sec" },
        { name: "Cable Row", sets: 3, reps: "12" },
        { name: "Hanging Leg Raise", sets: 3, reps: "12" },
      ],
    },
    {
      day: "Saturday",
      focus: "Cardio & Core",
      exercises: [
        { name: "Burpees", sets: 3, reps: "12" },
        { name: "Russian Twists", sets: 3, reps: "20" },
        { name: "Plank", sets: 3, reps: "60 sec" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [],
    },
  ],

  "Fat Loss": [
    {
      day: "Monday",
      focus: "Full Strength + Conditioning",
      exercises: [
        { name: "Barbell Squat", sets: 4, reps: "10" },
        { name: "Bench Press", sets: 4, reps: "10" },
        { name: "Lat Pulldown", sets: 3, reps: "12" },
        { name: "Mountain Climbers", sets: 4, reps: "30 sec" },
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
        { name: "High Knees", sets: 4, reps: "30 sec" },
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
        { name: "Arnold Press", sets: 4, reps: "10" },
        { name: "Seated Cable Row", sets: 3, reps: "10" },
        { name: "Push Ups", sets: 3, reps: "15" },
        { name: "Jumping Jacks", sets: 3, reps: "45 sec" },
      ],
    },
    {
      day: "Saturday",
      focus: "Core & Hypertrophy",
      exercises: [
        { name: "Cable Crunches", sets: 3, reps: "15" },
        { name: "Russian Twists", sets: 3, reps: "20" },
        { name: "Hyperextensions", sets: 3, reps: "12" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [],
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
      focus: "Rest Day",
      exercises: [],
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
        { name: "Barbell Squat", sets: 4, reps: "6" },
        { name: "Incline Bench Press", sets: 4, reps: "6-8" },
        { name: "Seated Cable Row", sets: 3, reps: "6-8" },
        { name: "Hyperextensions", sets: 3, reps: "10" },
      ],
    },
    {
      day: "Saturday",
      focus: "Core & Stability",
      exercises: [
        { name: "Hanging Leg Raise", sets: 3, reps: "12-15" },
        { name: "Plank", sets: 3, reps: "60 sec" },
        { name: "Ab Wheel Rollout", sets: 3, reps: "10" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [],
    },
  ],

  "General Fitness": [
    {
      day: "Monday",
      focus: "Full Body Workout",
      exercises: [
        { name: "Barbell Squat", sets: 3, reps: "12" },
        { name: "Bench Press", sets: 3, reps: "12" },
        { name: "Lat Pulldown", sets: 3, reps: "12" },
        { name: "Plank", sets: 3, reps: "45 sec" },
      ],
    },
    {
      day: "Tuesday",
      focus: "Cardio & Conditioning",
      exercises: [
        { name: "Jumping Jacks", sets: 3, reps: "45 sec" },
        { name: "High Knees", sets: 3, reps: "30 sec" },
        { name: "Mountain Climbers", sets: 3, reps: "30 sec" },
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
      focus: "Rest Day",
      exercises: [],
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
      focus: "Conditioning & Core",
      exercises: [
        { name: "Burpees", sets: 3, reps: "10" },
        { name: "Plank", sets: 3, reps: "45 sec" },
        { name: "Russian Twists", sets: 3, reps: "20" },
        { name: "Bicycle Crunches", sets: 3, reps: "20" },
      ],
    },
    {
      day: "Sunday",
      focus: "Rest Day",
      exercises: [],
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
// EXERCISE METADATA & VIDEO REPOSITORY
// Maps every exercise to muscle target, instruction, and video demonstration.
// Supports local mp4 videos (/videos/...) and legal embedded tutorials.
// ==================================================

const EXERCISE_METADATA = {
  "Barbell Bench Press": {
    muscle: "Chest",
    instructions: "Lie flat on the bench, grip slightly wider than shoulder width, lower controlled to mid-chest, and press explosively.",
    video: "bench presst.mp4",
    videoUrl: "/videos/bench presst.mp4",
  },
  "Bench Press": {
    muscle: "Chest",
    instructions: "Lie flat on the bench, grip slightly wider than shoulder width, lower controlled to mid-chest, and press explosively.",
    video: "bench presst.mp4",
    videoUrl: "/videos/bench presst.mp4",
  },
  "Incline Dumbbell Press": {
    muscle: "Upper Chest",
    instructions: "Set bench to 30-45 degrees, lower dumbbells slowly to outer chest, and press up over upper chest.",
    video: "upper chest.mp4",
    videoUrl: "/videos/upper chest.mp4",
  },
  "Incline Barbell Press": {
    muscle: "Upper Chest",
    instructions: "Set incline bench to 30 degrees, unrack bar with locked wrists, lower under control to upper chest and push upwards.",
    video: "upper chest.mp4",
    videoUrl: "/videos/upper chest.mp4",
  },
  "Incline Bench Press": {
    muscle: "Upper Chest",
    instructions: "Lie back on 30-45 degree angle bench, lower bar to clavicle level, and drive straight up.",
    video: "upper chest.mp4",
    videoUrl: "/videos/upper chest.mp4",
  },
  "Cable Fly": {
    muscle: "Chest",
    instructions: "Maintain a slight bend in elbows, pull handles together across your chest, squeeze and release slowly.",
    video: "chest cable fly.mp4",
    videoUrl: "/videos/chest cable fly.mp4",
  },
  "Incline Dumbbell Fly": {
    muscle: "Upper Chest",
    instructions: "Open arms in a wide arc feeling chest stretch, then squeeze up without touching dumbbells.",
    video: "flys chest.mp4",
    videoUrl: "/videos/flys chest.mp4",
  },
  "Dumbbell Press": {
    muscle: "Chest",
    instructions: "Press dumbbells vertically over chest, keeping shoulders retracted and core tight.",
    video: "dumbell press.mp4",
    videoUrl: "/videos/dumbell press.mp4",
  },
  "Dumbbell Bench Press": {
    muscle: "Chest",
    instructions: "Press dumbbells vertically over chest, keeping shoulders retracted and core tight.",
    video: "dumbell press.mp4",
    videoUrl: "/videos/dumbell press.mp4",
  },
  "Push Ups": {
    muscle: "Chest & Triceps",
    instructions: "Maintain rigid plank line, lower chest to floor, and push back up through palms.",
    video: "dips chest.mp4",
    videoUrl: "/videos/dips chest.mp4",
  },
  "Chest Dips": {
    muscle: "Lower Chest & Triceps",
    instructions: "Lean forward slightly, lower body until elbows are at 90 degrees, and push back up.",
    video: "dips chest.mp4",
    videoUrl: "/videos/dips chest.mp4",
  },
  "Weighted Dips": {
    muscle: "Chest & Triceps",
    instructions: "Add weight belt, maintain forward lean on parallel bars, lower to 90 degrees and press up.",
    video: "dips chest.mp4",
    videoUrl: "/videos/dips chest.mp4",
  },
  "Close Grip Bench Press": {
    muscle: "Triceps & Chest",
    instructions: "Grip shoulder-width, tuck elbows to ribs, lower bar to sternum and press to lock out.",
    video: "chest tri.mp4",
    videoUrl: "/videos/chest tri.mp4",
  },
  "Triceps Rope Pushdown": {
    muscle: "Triceps",
    instructions: "Pin elbows at sides, push rope down and spread handles apart at bottom lockout.",
    video: "triep1.mp4",
    videoUrl: "/videos/triep1.mp4",
  },
  "Triceps Pushdown": {
    muscle: "Triceps",
    instructions: "Keep elbows fixed at sides, extend forearms down smoothly, and squeeze triceps.",
    video: "triep1.mp4",
    videoUrl: "/videos/triep1.mp4",
  },
  "Triceps Rope": {
    muscle: "Triceps",
    instructions: "Pin elbows to ribs, press rope down and flare outward at bottom.",
    video: "triep1.mp4",
    videoUrl: "/videos/triep1.mp4",
  },
  "Overhead Triceps Extension": {
    muscle: "Triceps",
    instructions: "Keep upper arms close to ears, lower weight behind neck, and extend elbows straight up.",
    video: "tricep2.mp4",
    videoUrl: "/videos/tricep2.mp4",
  },
  "Skull Crusher": {
    muscle: "Triceps",
    instructions: "Lie flat holding bar above forehead, hinge elbows to lower bar to crown of head and press.",
    video: "tricep3.mp4",
    videoUrl: "/videos/tricep3.mp4",
  },
  "Pull Ups": {
    muscle: "Back & Lats",
    instructions: "Hang from bar, drive elbows down into ribs, pull chest to bar height, and lower slowly.",
    video: "pull ups.mp4",
    videoUrl: "/videos/pull ups.mp4",
  },
  "Weighted Pull Ups": {
    muscle: "Back & Lats",
    instructions: "Add weight belt, pull chin fully over bar, pause for 1 second, and lower controlled.",
    video: "pull ups.mp4",
    videoUrl: "/videos/pull ups.mp4",
  },
  "Lat Pulldown": {
    muscle: "Lats & Back",
    instructions: "Grip wide, lean back 10 degrees, pull bar to collarbone squeezing shoulder blades together.",
    video: "lat  pull down.mp4",
    videoUrl: "/videos/lat  pull down.mp4",
  },
  "Barbell Row": {
    muscle: "Upper & Mid Back",
    instructions: "Hinge hips at 45 degrees, pull barbell into lower ribcage, and lower under control.",
    video: "lat row show.mp4",
    videoUrl: "/videos/lat row show.mp4",
  },
  "Pendlay Row": {
    muscle: "Mid Back",
    instructions: "Torso parallel to floor, explode bar off floor into lower chest, reset on floor every rep.",
    video: "lat row show.mp4",
    videoUrl: "/videos/lat row show.mp4",
  },
  "Dumbbell Row": {
    muscle: "Lats",
    instructions: "Support one knee on bench, pull dumbbell into hip pocket, and squeeze lat at the peak.",
    video: "lat row show.mp4",
    videoUrl: "/videos/lat row show.mp4",
  },
  "Seated Cable Row": {
    muscle: "Mid Back",
    instructions: "Sit tall with chest proud, pull handle into navel, and squeeze shoulder blades together.",
    video: "cable row.mp4",
    videoUrl: "/videos/cable row.mp4",
  },
  "Cable Row": {
    muscle: "Mid Back",
    instructions: "Pull cable into abdomen keeping spine neutral and elbows driven back.",
    video: "cable row.mp4",
    videoUrl: "/videos/cable row.mp4",
  },
  "Seated Row": {
    muscle: "Mid Back",
    instructions: "Sit upright, pull weight to torso, pause at peak contraction and release slowly.",
    video: "cable row.mp4",
    videoUrl: "/videos/cable row.mp4",
  },
  "Face Pull": {
    muscle: "Rear Deltoids & Traps",
    instructions: "Pull rope towards eyes with elbows high and externally rotate shoulders at peak.",
    video: "face shoulder.mp4",
    videoUrl: "/videos/face shoulder.mp4",
  },
  "Rear Delt Fly": {
    muscle: "Rear Deltoids",
    instructions: "Bend forward at hips, raise dumbbells out to sides until elbows align with shoulders.",
    video: "face shoulder.mp4",
    videoUrl: "/videos/face shoulder.mp4",
  },
  "Overhead Press": {
    muscle: "Shoulders",
    instructions: "Press barbell from front rack overhead, locking out with head pushed through window.",
    video: "shoulder press.mp4",
    videoUrl: "/videos/shoulder press.mp4",
  },
  "Shoulder Press": {
    muscle: "Shoulders",
    instructions: "Press weights vertically overhead without arching lower back, then lower to ear level.",
    video: "shoulder press.mp4",
    videoUrl: "/videos/shoulder press.mp4",
  },
  "Dumbbell Shoulder Press": {
    muscle: "Shoulders",
    instructions: "Sit upright, press dumbbells in slight arc until overhead, then lower under control.",
    video: "shoulder press.mp4",
    videoUrl: "/videos/shoulder press.mp4",
  },
  "Dumbbell Lateral Raise": {
    muscle: "Side Deltoids",
    instructions: "Raise dumbbells to sides up to shoulder level with slight elbow bend and pinkies tilted up.",
    video: "dumbell raise.mp4",
    videoUrl: "/videos/dumbell raise.mp4",
  },
  "Lateral Raise": {
    muscle: "Side Deltoids",
    instructions: "Lead with elbows to lift dumbbells to shoulder height, pause, and lower slowly.",
    video: "dumbell raise.mp4",
    videoUrl: "/videos/dumbell raise.mp4",
  },
  "Barbell Curl": {
    muscle: "Biceps",
    instructions: "Keep elbows pinned at sides, curl bar to shoulder height, squeeze biceps, and lower slowly.",
    video: "bicep1.mp4",
    videoUrl: "/videos/bicep1.mp4",
  },
  "Bicep Curl": {
    muscle: "Biceps",
    instructions: "Keep elbows pinned, curl weights smoothly without swinging torso, and squeeze biceps.",
    video: "bicep1.mp4",
    videoUrl: "/videos/bicep1.mp4",
  },
  "Hammer Curl": {
    muscle: "Brachialis & Forearms",
    instructions: "Hold dumbbells with neutral palms-in grip, curl weights up keeping wrists firm.",
    video: "bicep2.mp4",
    videoUrl: "/videos/bicep2.mp4",
  },
  "Dumbbell Curl": {
    muscle: "Biceps",
    instructions: "Alternate arms curling dumbbells up with wrist supination at top of movement.",
    video: "bicep3.mp4",
    videoUrl: "/videos/bicep3.mp4",
  },
  "Barbell Squat": {
    muscle: "Quadriceps & Glutes",
    instructions: "Rest bar on traps, brace core, sit hips down below parallel, and drive up through midfoot.",
    video: "leg1.mp4",
    videoUrl: "/videos/leg1.mp4",
  },
  "Front Squat": {
    muscle: "Quadriceps & Core",
    instructions: "Bar rested across anterior deltoids with elbows high, squat deep keeping torso vertical.",
    video: "leg1.mp4",
    videoUrl: "/videos/leg1.mp4",
  },
  "Goblet Squat": {
    muscle: "Quads & Glutes",
    instructions: "Hold dumbbell at chest, keep knees tracking toes, squat down deeply and drive up.",
    video: "leg1.mp4",
    videoUrl: "/videos/leg1.mp4",
  },
  "Bodyweight Squat": {
    muscle: "Quads & Glutes",
    instructions: "Descend hips until thighs are parallel to ground, keep chest tall and press back up.",
    video: "leg6.mp4",
    videoUrl: "/videos/leg6.mp4",
  },
  "Jump Squats": {
    muscle: "Quads & Power",
    instructions: "Drop into half squat and explode vertically into jump, landing softly on midfoot.",
    video: "leg6.mp4",
    videoUrl: "/videos/leg6.mp4",
  },
  "Leg Press": {
    muscle: "Quads & Glutes",
    instructions: "Feet shoulder-width on platform, release safety, lower sled to 90 degrees and press.",
    video: "leg2.mp4",
    videoUrl: "/videos/leg2.mp4",
  },
  "Deadlift": {
    muscle: "Hamstrings, Glutes & Back",
    instructions: "Feet under bar, grip tightly, push floor away through heels, and lock out hips and knees.",
    video: "deadlift.mp4",
    videoUrl: "/videos/deadlift.mp4",
  },
  "Romanian Deadlift": {
    muscle: "Hamstrings & Glutes",
    instructions: "Slight knee bend, hinge hips backward keeping bar glued to shins until deep hamstring stretch.",
    video: "deadlift.mp4",
    videoUrl: "/videos/deadlift.mp4",
  },
  "Leg Extension": {
    muscle: "Quadriceps",
    instructions: "Align knee joint with machine pivot, extend legs straight, pause at top, and lower slowly.",
    video: "extention.mp4",
    videoUrl: "/videos/extention.mp4",
  },
  "Lying Leg Curl": {
    muscle: "Hamstrings",
    instructions: "Lie flat on pad, curl heel pad into glutes, squeeze hamstrings, and lower with control.",
    video: "leg3.mp4",
    videoUrl: "/videos/leg3.mp4",
  },
  "Leg Curl": {
    muscle: "Hamstrings",
    instructions: "Curl heels towards seat, contract hamstrings fully at top, and return smoothly.",
    video: "leg3.mp4",
    videoUrl: "/videos/leg3.mp4",
  },
  "Standing Calf Raise": {
    muscle: "Calves",
    instructions: "Balls of feet on ledge, drop heels into deep stretch, drive up onto toes and squeeze.",
    video: "leg4.mp4",
    videoUrl: "/videos/leg4.mp4",
  },
  "Calf Raise": {
    muscle: "Calves",
    instructions: "Press up through balls of feet as high as possible, hold for 1 second, and lower into stretch.",
    video: "leg4.mp4",
    videoUrl: "/videos/leg4.mp4",
  },
  "Lunges": {
    muscle: "Quads & Glutes",
    instructions: "Step forward, drop back knee towards ground at 90 degrees, and push back up through front heel.",
    video: "leg5.mp4",
    videoUrl: "/videos/leg5.mp4",
  },
  "Walking Lunges": {
    muscle: "Quads & Glutes",
    instructions: "Continuous forward lunging paces with upright posture and controlled knee descent.",
    video: "leg5.mp4",
    videoUrl: "/videos/leg5.mp4",
  },
  "Step Ups": {
    muscle: "Quads & Glutes",
    instructions: "Place full foot on elevated box, drive through heel to stand tall, step down controlled.",
    video: "leg5.mp4",
    videoUrl: "/videos/leg5.mp4",
  },
  "Farmer Walk": {
    muscle: "Forearms & Traps",
    instructions: "Pick up heavy weights, maintain tall posture with pulled-back shoulders, walk with short brisk strides.",
    video: "traps.mp4",
    videoUrl: "/videos/traps.mp4",
  },
  "Dumbbell Clean & Press": {
    muscle: "Full Body & Shoulders",
    instructions: "Explosively clean dumbbells to shoulders using hips, then press overhead in one fluid motion.",
    video: "traps.mp4",
    videoUrl: "/videos/traps.mp4",
  },
  "Plank": {
    muscle: "Core & Abs",
    instructions: "Rest on forearms, squeeze glutes and brace core like preparing for a punch, holding stiff line.",
    video: "abs1.mp4",
    videoUrl: "/videos/abs1.mp4",
  },
  "Weighted Plank": {
    muscle: "Core & Abs",
    instructions: "Place weight plate across mid-back, maintain rigid spine without sagging hips, hold steady.",
    video: "abs1.mp4",
    videoUrl: "/videos/abs1.mp4",
  },
  "Crunches": {
    muscle: "Abs",
    instructions: "Lie on back with knees bent, curl shoulders off floor contracting upper abs, and lower slowly.",
    video: "abs2.mp4",
    videoUrl: "/videos/abs2.mp4",
  },
  "Bicycle Crunches": {
    muscle: "Obliques & Abs",
    instructions: "Rotate opposite elbow to knee while extending other leg, alternating in controlled bicycle rhythm.",
    video: "abs2.mp4",
    videoUrl: "/videos/abs2.mp4",
  },
  "Hanging Leg Raise": {
    muscle: "Lower Abs",
    instructions: "Hang from bar, raise straight legs up to horizontal without swinging, and lower with control.",
    video: "abs3.mp4",
    videoUrl: "/videos/abs3.mp4",
  },
  "Hanging Knee Raise": {
    muscle: "Lower Abs",
    instructions: "Hang from pullup bar, tuck knees into chest, pause, and lower slowly without swinging.",
    video: "abs3.mp4",
    videoUrl: "/videos/abs3.mp4",
  },
  "Ab Wheel Rollout": {
    muscle: "Core",
    instructions: "Kneel on mat, roll wheel forward extending torso as far as manageable without hyperextending back.",
    video: "abs5.mp4",
    videoUrl: "/videos/abs5.mp4",
  },
  "Mountain Climbers": {
    muscle: "Core & Cardio",
    instructions: "High plank position, drive knees alternately into chest in quick, controlled running motion.",
    video: "abs4.mp4",
    videoUrl: "/videos/abs4.mp4",
  },
  "Burpees": {
    muscle: "Full Body Cardio",
    instructions: "Drop hands to floor, kick feet back to plank, drop chest, jump feet in and explode up.",
    video: "abs4.mp4",
    videoUrl: "/videos/abs4.mp4",
  },
  "Renegade Row": {
    muscle: "Core & Back",
    instructions: "Push up position on dumbbells, row one dumbbell to ribcage while stabilizing hips without twisting.",
    video: "abs6.mp4",
    videoUrl: "/videos/abs6.mp4",
  },
  "Kettlebell Swing": {
    muscle: "Glutes & Hamstrings",
    instructions: "Hinge at hips to swing kettlebell back between legs, snap hips forward to drive bell to chest height.",
    video: "abs6.mp4",
    videoUrl: "/videos/abs6.mp4",
  },
  "Incline Treadmill Walk": {
    muscle: "Cardio",
    instructions: "Set incline to 10-12% and speed to 4.5-5.5 km/h, maintain upright posture without holding rails.",
    video: "https://www.youtube.com/embed/g2_A3y3jC_k",
    videoUrl: "https://www.youtube.com/embed/g2_A3y3jC_k",
  },
  "Treadmill Walk (Incline)": {
    muscle: "Cardio",
    instructions: "Set incline to 10-12% and walk at steady pace to burn calories and build conditioning.",
    video: "https://www.youtube.com/embed/g2_A3y3jC_k",
    videoUrl: "https://www.youtube.com/embed/g2_A3y3jC_k",
  },
  "Treadmill Sprints": {
    muscle: "Cardio & Anaerobic",
    instructions: "Sprint at high speed for 30 seconds, followed by 30-60 seconds active rest.",
    video: "https://www.youtube.com/embed/g2_A3y3jC_k",
    videoUrl: "https://www.youtube.com/embed/g2_A3y3jC_k",
  },
  "Fast Walking": {
    muscle: "Cardio",
    instructions: "Maintain brisk, purposeful pace with steady arm swing to elevate heart rate.",
    video: "https://www.youtube.com/embed/g2_A3y3jC_k",
    videoUrl: "https://www.youtube.com/embed/g2_A3y3jC_k",
  },
  "Brisk Walking": {
    muscle: "Cardio",
    instructions: "Walk with cadence that raises heart rate while maintaining conversational breath.",
    video: "https://www.youtube.com/embed/g2_A3y3jC_k",
    videoUrl: "https://www.youtube.com/embed/g2_A3y3jC_k",
  },
  "Brisk Walking / Cycling": {
    muscle: "Cardio",
    instructions: "Maintain moderate aerobic intensity for 30 minutes to support recovery and fat oxidation.",
    video: "https://www.youtube.com/embed/5O6q6vN4cMo",
    videoUrl: "https://www.youtube.com/embed/5O6q6vN4cMo",
  },
  "Cycling": {
    muscle: "Cardio & Quads",
    instructions: "Maintain smooth cadence between 80-90 RPM with moderate resistance.",
    video: "https://www.youtube.com/embed/5O6q6vN4cMo",
    videoUrl: "https://www.youtube.com/embed/5O6q6vN4cMo",
  },
  "Rowing Machine": {
    muscle: "Full Body Cardio",
    instructions: "Drive with legs first, lean back slightly, pull handle to lower ribs, and return smoothly.",
    video: "https://www.youtube.com/embed/UCnz8K3qW70",
    videoUrl: "https://www.youtube.com/embed/UCnz8K3qW70",
  },
  "Battle Ropes": {
    muscle: "Shoulders & Conditioning",
    instructions: "Slight squat stance, alternate whipping ropes up and down with maximum velocity.",
    video: "https://www.youtube.com/embed/m1qA1f46Dmc",
    videoUrl: "https://www.youtube.com/embed/m1qA1f46Dmc",
  },
  "Full Body Stretching": {
    muscle: "Mobility & Recovery",
    instructions: "Hold static stretches for 30 seconds per muscle group focusing on deep relaxed breathing.",
    video: "https://www.youtube.com/embed/g_tea8ZNk5A",
    videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A",
  },
  "Full Body Stretch": {
    muscle: "Mobility & Recovery",
    instructions: "Stretch hamstrings, hip flexors, lats, and chest with slow deep breaths.",
    video: "https://www.youtube.com/embed/g_tea8ZNk5A",
    videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A",
  },
  "Stretching": {
    muscle: "Mobility & Recovery",
    instructions: "Perform gentle post-workout static stretching for key working muscles.",
    video: "https://www.youtube.com/embed/g_tea8ZNk5A",
    videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A",
  },
  "Foam Rolling": {
    muscle: "Myofascial Release",
    instructions: "Roll slowly over tender spots in quads, lats, and calves for 30-60 seconds.",
    video: "https://www.youtube.com/embed/qg_WlG5M3wM",
    videoUrl: "https://www.youtube.com/embed/qg_WlG5M3wM",
  },
  "Hip & Shoulder Mobility": {
    muscle: "Mobility",
    instructions: "Controlled articular rotations for shoulders and 90/90 hip switches.",
    video: "https://www.youtube.com/embed/g_tea8ZNk5A",
    videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A",
  },
  "Yoga / Mobility": {
    muscle: "Flexibility",
    instructions: "Perform gentle flows linking downward dog, cobra, and deep lunges.",
    video: "https://www.youtube.com/embed/g_tea8ZNk5A",
    videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A",
  },
  "Easy Walk": {
    muscle: "Active Recovery",
    instructions: "Gentle low-intensity walking to promote blood circulation and reduce soreness.",
    video: "https://www.youtube.com/embed/g2_A3y3jC_k",
    videoUrl: "https://www.youtube.com/embed/g2_A3y3jC_k",
  },
  "Light Walk": {
    muscle: "Active Recovery",
    instructions: "Relaxed walking to clear lactic buildup and de-stress the central nervous system.",
    video: "https://www.youtube.com/embed/g2_A3y3jC_k",
    videoUrl: "https://www.youtube.com/embed/g2_A3y3jC_k",
  },
  "Recreational Sport": {
    muscle: "General Activity",
    instructions: "Casual swimming, badminton, or outdoor activities for active recreation.",
    video: "https://www.youtube.com/embed/g2_A3y3jC_k",
    videoUrl: "https://www.youtube.com/embed/g2_A3y3jC_k",
  },
  "Sleep 7-8 Hours": {
    muscle: "Full Recovery",
    instructions: "Crucial anabolic window: aim for 7-8 hours quality sleep in a cool, dark room.",
    video: "https://www.youtube.com/embed/qg_WlG5M3wM",
    videoUrl: "https://www.youtube.com/embed/qg_WlG5M3wM",
  },
  "Sleep 8 Hours": {
    muscle: "Full Recovery",
    instructions: "Crucial anabolic window: aim for 8 hours of uninterrupted deep sleep.",
    video: "https://www.youtube.com/embed/qg_WlG5M3wM",
    videoUrl: "https://www.youtube.com/embed/qg_WlG5M3wM",
  },
};

const CANONICAL_SLUG_MAP = {
  // Chest
  "bench-press": "bench-press",
  "barbell-bench-press": "bench-press",
  "close-grip-bench-press": "bench-press",
  "dumbbell-bench-press": "bench-press",
  "dumbbell-press": "bench-press",
  "incline-dumbbell-press": "incline-dumbbell-press",
  "incline-barbell-press": "incline-dumbbell-press",
  "incline-bench-press": "incline-dumbbell-press",
  "chest-fly": "chest-fly",
  "incline-dumbbell-fly": "chest-fly",
  "cable-fly": "chest-fly",
  "cable-crossover": "cable-crossover",
  "dumbell-pull-over": "dumbell-pull-over",
  "dips": "dips",
  "chest-dips": "dips",
  "weighted-dips": "dips",

  // Back
  "pull-ups": "pull-ups",
  "weighted-pull-ups": "pull-ups",
  "lat-pulldown": "lat-pulldown",
  "deadlift": "deadlift",
  "seated-cable-row": "seated-cable-row",
  "barbell-row": "seated-cable-row",
  "cable-row": "seated-cable-row",
  "seated-row": "seated-cable-row",
  "pendlay-row": "seated-cable-row",
  "dumbbell-row": "seated-cable-row",
  "renegade-row": "seated-cable-row",
  "hyperextensions": "hyperextensions",

  // Shoulders
  "overhead-barbell-press": "overhead-barbell-press",
  "overhead-press": "overhead-barbell-press",
  "shoulder-press": "overhead-barbell-press",
  "dumbbell-shoulder-press": "overhead-barbell-press",
  "front-delt-upper-traps": "front-delt-upper-traps",
  "dumbbell-lateral-raise": "front-delt-upper-traps",
  "lateral-raise": "front-delt-upper-traps",
  "lateral-raises": "front-delt-upper-traps",
  "cable-face-pull": "cable-face-pull",
  "face-pull": "cable-face-pull",
  "rear-delt-fly": "cable-face-pull",
  "dumbbell-front-raise": "dumbbell-front-raise",
  "arnold-press": "arnold-press",
  "dumbbell-clean-press": "arnold-press",
  "dumbbell-clean-and-press": "arnold-press",
  "dumbbell-shrugs": "dumbbell-shrugs",
  "shrugs": "dumbbell-shrugs",

  // Arms
  "dumbell-bicep-curl": "dumbell-bicep-curl",
  "barbell-curl": "dumbell-bicep-curl",
  "dumbbell-curl": "dumbell-bicep-curl",
  "bicep-curl": "dumbell-bicep-curl",
  "rope-tricep-pushdowns": "rope-tricep-pushdowns",
  "triceps-pushdown": "rope-tricep-pushdowns",
  "triceps-rope": "rope-tricep-pushdowns",
  "tricep-pushdown": "rope-tricep-pushdowns",
  "triceps-rope-pushdown": "rope-tricep-pushdowns",
  "knee-biceps": "knee-biceps",
  "kick-back": "kick-back",
  "skull-crusher": "kick-back",
  "skull-crushers": "kick-back",
  "incline-dumbbell-curl": "incline-dumbbell-curl",
  "hammer-curl": "incline-dumbbell-curl",
  "overhead-tricep-extension": "overhead-tricep-extension",
  "overhead-triceps-extension": "overhead-tricep-extension",

  // Legs
  "squat": "squat",
  "barbell-squat": "squat",
  "goblet-squat": "squat",
  "front-squat": "squat",
  "bodyweight-squat": "bodyweight-squats",
  "bodyweight-squats": "bodyweight-squats",
  "leg-press": "leg-press",
  "squad-in-different-variation": "squad-in-different-variation",
  "lying-leg-curl": "squad-in-different-variation",
  "leg-curl": "squad-in-different-variation",
  "hamstring-curls": "squad-in-different-variation",
  "standing-calf-raise": "squad-in-different-variation",
  "standing-calf-raises": "squad-in-different-variation",
  "calf-raise": "squad-in-different-variation",
  "jump-squats": "squad-in-different-variation",
  "sumo-squad": "sumo-squad",
  "lunges": "sumo-squad",
  "walking-lunges": "sumo-squad",
  "step-ups": "sumo-squad",
  "leg-extensions": "leg-extensions",
  "leg-extension": "leg-extensions",
  "dead-lift": "dead-lift",
  "romanian-deadlift": "dead-lift",

  // Abs
  "hanging-knee-raises": "hanging-knee-raises",
  "hanging-leg-raise": "hanging-knee-raises",
  "hanging-leg-raises": "hanging-knee-raises",
  "hanging-knee-raise": "hanging-knee-raises",
  "ab-wheel-rollout": "ab-wheel-rollout",
  "cable-crunches": "cable-crunches",
  "crunches": "cable-crunches",
  "russian-twists": "russian-twists",
  "plank-hold": "plank-hold",
  "plank": "plank-hold",
  "weighted-plank": "plank-hold",
  "bicycle-crunches": "bicycle-crunches",

  // Home Workout / Conditioning
  "push-ups": "push-ups",
  "mountain-climbers": "mountain-climbers",
  "burpees": "burpees",
  "jumping-jacks": "jumping-jacks",
  "high-knees": "high-knees",
};

const getExerciseMetadata = (name) => {
  if (EXERCISE_METADATA[name]) {
    return EXERCISE_METADATA[name];
  }
  // Try clean slug lookup
  const cleanSlug = String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  for (const [key, val] of Object.entries(EXERCISE_METADATA)) {
    const keySlug = key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (keySlug === cleanSlug) {
      return val;
    }
  }
  // Fallback defaults
  return {
    muscle: "Target Muscle",
    instructions: "Maintain proper posture and controlled tempo throughout the full range of motion.",
    video: "bench presst.mp4",
    videoUrl: "/videos/bench presst.mp4",
  };
};

// ==================================================
// BUILD EXERCISE ROUTINE (with Video & Metadata)
// ==================================================

const buildExerciseRoutine = (goal) => {
  const routine = EXERCISE_ROUTINES[goal] || EXERCISE_ROUTINES["General Fitness"];

  return routine.map((day) => ({
    day: day.day,
    focus: day.focus,
    exercises: (day.exercises || []).map((ex) => {
      const meta = getExerciseMetadata(ex.name);
      const cleanSlug = String(ex.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      const canonicalSlug = CANONICAL_SLUG_MAP[cleanSlug] || cleanSlug;
      return {
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        muscle: meta.muscle,
        target: meta.muscle,
        instructions: meta.instructions,
        description: meta.instructions,
        video: meta.video,
        videoUrl: meta.videoUrl,
        slug: canonicalSlug,
      };
    }),
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
