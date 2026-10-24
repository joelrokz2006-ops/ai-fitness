const mongoose = require("mongoose");

const dailyProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: String, // Normalized local calendar date "YYYY-MM-DD"
      required: true,
      index: true,
    },
    dietProgress: {
      planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DietPlan",
      },
      completedMeals: {
        type: [String],
        default: [],
      },
    },
    workoutProgress: {
      planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Planner",
      },
      completedExercises: {
        type: [String],
        default: [],
      },
    },
    waterGlasses: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

dailyProgressSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailyProgress", dailyProgressSchema);
