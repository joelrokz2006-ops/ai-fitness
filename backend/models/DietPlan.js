const mongoose = require("mongoose");

// ==============================
// FOOD ITEM INSIDE A MEAL
// ==============================

const foodItemSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diet",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0.01,
      default: 1,
    },

    unit: {
      type: String,
      required: true,
      default: "g",
    },

    icon: {
      type: String,
      default: "🥗",
    },

    portion: {
      type: String,
      default: "",
    },

    calories: {
      type: Number,
      default: 0,
    },

    protein: {
      type: Number,
      default: 0,
    },

    carbs: {
      type: Number,
      default: 0,
    },

    fats: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

// ==============================
// MEAL SCHEMA
// ==============================

const mealSchema = new mongoose.Schema(
  {
    mealName: {
      type: String,
      required: true,
    },

    mealType: {
      type: String,

      enum: [
        "breakfast",
        "morning_snack",
        "lunch",
        "evening_snack",
        "dinner",
        "pre_workout",
        "post_workout",
      ],

      required: true,
    },

    recommendedTime: {
      type: String,
      default: "",
    },

    foods: {
      type: [foodItemSchema],
      default: [],
    },

    totalCalories: {
      type: Number,
      default: 0,
    },

    totalProtein: {
      type: Number,
      default: 0,
    },

    totalCarbs: {
      type: Number,
      default: 0,
    },

    totalFats: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

// ==============================
// MAIN DIET PLAN SCHEMA
// ==============================

const dietPlanSchema = new mongoose.Schema(
  {
    // User who owns this plan
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Plan name
    planName: {
      type: String,
      default: "My Personalized Diet Plan",
    },

    // User Goal
    goal: {
      type: String,

      enum: [
        "weight_loss",
        "weight_gain",
        "muscle_gain",
        "maintenance",
      ],

      required: true,
    },

    // Food Preference
    foodPreference: {
      type: String,

      enum: ["veg", "non-veg", "both"],

      default: "both",
    },

    // User body information at plan creation time
    userDetails: {
      age: Number,

      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },

      weight: Number,

      height: Number,

      activityLevel: {
        type: String,
        enum: ["low", "medium", "high"],
      },
    },

    // ==============================
    // DAILY NUTRITION TARGET
    // ==============================

    dailyTargets: {
      calories: {
        type: Number,
        required: true,
      },

      protein: {
        type: Number,
        required: true,
      },

      carbs: {
        type: Number,
        required: true,
      },

      fats: {
        type: Number,
        required: true,
      },
    },

    // ==============================
    // DAILY MEALS
    // ==============================

    meals: {
      type: [mealSchema],
      default: [],
    },

    // AI / SYSTEM NOTES
    recommendations: {
      type: [String],
      default: [],
    },

    // PLAN STATUS
    status: {
      type: String,

      enum: ["active", "completed", "archived"],

      default: "active",
    },

    generatedBy: {
      type: String,

      enum: ["system", "ai", "admin"],

      default: "system",
    },
  },
  {
    timestamps: true,
  }
);

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);

module.exports = DietPlan;