const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema(
  {
    // ================= User Details =================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    // ================= Fitness Goal =================

    goal: {
      type: String,
      required: true,
      enum: [
       "Weight Loss",
    "Weight Gain",
    "Muscle Gain",
    "Fat Loss",
    "Strength",
    "General Fitness",
      ],
    },

    experience: {
      type: String,
      required: true,
    },

    workoutDays: {
      type: Number,
      required: true,
    },

    activityLevel: {
      type: String,
      required: true,
    },

    equipment: {
      type: String,
      required: true,
    },

    // ================= Health Details =================

    medicalConditions: {
      type: String,
      default: "",
    },

    injuries: {
      type: String,
      default: "",
    },

    sleepHours: {
      type: Number,
      default: 0,
    },

    waterIntake: {
      type: Number,
      default: 0,
    },

    targetWeight: {
      type: Number,
      default: 0,
    },

    // ================= Workout Plan =================

    workoutPlan: {
      Monday: String,
      Tuesday: String,
      Wednesday: String,
      Thursday: String,
      Friday: String,
      Saturday: String,
      Sunday: String,
    },

    // ================= Clear Exercise Routine =================

    exerciseRoutine: [
      {
        day: String,
        focus: String,
        exercises: [
          {
            name: String,
            sets: String,
            reps: String,
          },
        ],
      },
    ],

    // ================= Clear Diet Routine =================

    dietRoutine: {
      dailyTargets: {
        calories: Number,
        protein: Number,
        carbs: Number,
        fats: Number,
        bmr: Number,
        water: String,
      },

      mealSplit: {
        protein: Number,
        carbs: Number,
        fats: Number,
      },

      meals: [
        {
          name: String,
          time: String,
          items: [String],
          calories: Number,
          protein: Number,
          carbs: Number,
          fats: Number,
        },
      ],

      rules: [String],
    },

    // ================= Goal Guide =================

    goalGuide: {
      title: String,
      description: String,
      tips: [String],
    },

    // ================= Workout Details =================

    workoutDuration: String,

    restBetweenSets: String,

    dailySteps: String,

    cardioMinutes: String,

    // ================= Fitness Tips =================

    fitnessTips: [String],

    // ================= Warm Up =================

    warmUp: String,

    coolDown: String,

    // ================= Motivation =================

    motivation: String,

    weeklyChallenge: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Planner", plannerSchema);