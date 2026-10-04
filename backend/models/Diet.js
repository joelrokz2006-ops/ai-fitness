const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "protein",
        "carbs",
        "vegetables",
        "fruits",
        "fats",
        "dairy",
      ],
      required: true,
    },

    foodType: {
      type: String,
      enum: ["veg", "non-veg"],
      required: true,
    },

    calories: {
      type: Number,
      required: true,
      min: 0,
    },

    protein: {
      type: Number,
      default: 0,
      min: 0,
    },

    carbs: {
      type: Number,
      default: 0,
      min: 0,
    },

    fats: {
      type: Number,
      default: 0,
      min: 0,
    },

    fiber: {
      type: Number,
      default: 0,
      min: 0,
    },

    servingSize: {
      type: String,
      required: true,
    },

    mealTypes: {
      type: [String],

      enum: [
        "breakfast",
        "morning_snack",
        "lunch",
        "evening_snack",
        "dinner",
        "pre_workout",
        "post_workout",
      ],

      default: [],
    },

    suitableGoals: {
      type: [String],

      enum: [
        "weight_loss",
        "weight_gain",
        "muscle_gain",
        "maintenance",
      ],

      default: [],
    },

    image: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "🥗",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
