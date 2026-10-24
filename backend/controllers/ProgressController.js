const DailyProgress = require("../models/DailyProgress");

// Helper to validate YYYY-MM-DD date format
const isValidDateString = (str) => /^\d{4}-\d{2}-\d{2}$/.test(str);

// ========================================
// GET PROGRESS FOR A SPECIFIC DATE
// ========================================
const getProgress = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { date, dietPlanId, plannerId } = req.query;

    if (!date || !isValidDateString(date)) {
      return res.status(400).json({
        success: false,
        message: "A valid date (YYYY-MM-DD) is required",
      });
    }

    const progress = await DailyProgress.findOne({ userId, date });

    if (!progress) {
      return res.status(200).json({
        success: true,
        data: {
          date,
          dietPlanId: null,
          completedMeals: [],
          plannerId: null,
          completedExercises: [],
          waterGlasses: 0,
        },
      });
    }

    // Version isolation: If user replaced their diet plan, don't show old plan's completions
    let completedMeals = progress.dietProgress?.completedMeals || [];
    if (
      dietPlanId &&
      progress.dietProgress?.planId &&
      progress.dietProgress.planId.toString() !== dietPlanId.toString()
    ) {
      completedMeals = [];
    }

    // Version isolation: If user replaced their workout plan, don't show old plan's completions
    let completedExercises = progress.workoutProgress?.completedExercises || [];
    if (
      plannerId &&
      progress.workoutProgress?.planId &&
      progress.workoutProgress.planId.toString() !== plannerId.toString()
    ) {
      completedExercises = [];
    }

    res.status(200).json({
      success: true,
      data: {
        date,
        dietPlanId: progress.dietProgress?.planId || null,
        completedMeals,
        plannerId: progress.workoutProgress?.planId || null,
        completedExercises,
        waterGlasses: progress.waterGlasses || 0,
      },
    });
  } catch (error) {
    console.error("Get Progress Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve progress",
      error: error.message,
    });
  }
};

// ========================================
// TOGGLE MEAL OR EXERCISE COMPLETION
// ========================================
const toggleProgress = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { date, type, itemId, completed, planId } = req.body;

    if (!date || !isValidDateString(date)) {
      return res.status(400).json({
        success: false,
        message: "A valid date (YYYY-MM-DD) is required",
      });
    }

    if (!type || !["diet", "workout"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be 'diet' or 'workout'",
      });
    }

    if (!itemId || typeof itemId !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid string itemId is required",
      });
    }

    const cleanItemId = itemId.trim();
    const isCompleted = Boolean(completed);

    let progress = await DailyProgress.findOne({ userId, date });
    if (!progress) {
      progress = new DailyProgress({
        userId,
        date,
        dietProgress: { planId: null, completedMeals: [] },
        workoutProgress: { planId: null, completedExercises: [] },
        waterGlasses: 0,
      });
    }

    if (type === "diet") {
      // Check if plan version has changed
      if (planId) {
        if (
          progress.dietProgress?.planId &&
          progress.dietProgress.planId.toString() !== planId.toString()
        ) {
          // Reset meals for new active plan
          progress.dietProgress.planId = planId;
          progress.dietProgress.completedMeals = [];
        } else if (!progress.dietProgress?.planId) {
          progress.dietProgress = progress.dietProgress || {};
          progress.dietProgress.planId = planId;
        }
      }

      const existingMeals = new Set(progress.dietProgress?.completedMeals || []);
      if (isCompleted) {
        existingMeals.add(cleanItemId);
      } else {
        existingMeals.delete(cleanItemId);
      }
      progress.dietProgress.completedMeals = Array.from(existingMeals);
    } else if (type === "workout") {
      // Check if plan version has changed
      if (planId) {
        if (
          progress.workoutProgress?.planId &&
          progress.workoutProgress.planId.toString() !== planId.toString()
        ) {
          // Reset exercises for new active plan
          progress.workoutProgress.planId = planId;
          progress.workoutProgress.completedExercises = [];
        } else if (!progress.workoutProgress?.planId) {
          progress.workoutProgress = progress.workoutProgress || {};
          progress.workoutProgress.planId = planId;
        }
      }

      const existingExercises = new Set(
        progress.workoutProgress?.completedExercises || []
      );
      if (isCompleted) {
        existingExercises.add(cleanItemId);
      } else {
        existingExercises.delete(cleanItemId);
      }
      progress.workoutProgress.completedExercises = Array.from(existingExercises);
    }

    await progress.save();

    res.status(200).json({
      success: true,
      message: `${type} item ${isCompleted ? "completed" : "set to pending"}`,
      data: {
        date,
        dietPlanId: progress.dietProgress?.planId || null,
        completedMeals: progress.dietProgress?.completedMeals || [],
        plannerId: progress.workoutProgress?.planId || null,
        completedExercises: progress.workoutProgress?.completedExercises || [],
        waterGlasses: progress.waterGlasses || 0,
      },
    });
  } catch (error) {
    console.error("Toggle Progress Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update progress",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE WATER CONSUMPTION
// ========================================
const updateWater = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { date, waterGlasses } = req.body;

    if (!date || !isValidDateString(date)) {
      return res.status(400).json({
        success: false,
        message: "A valid date (YYYY-MM-DD) is required",
      });
    }

    const count = Math.max(0, Number(waterGlasses) || 0);

    const progress = await DailyProgress.findOneAndUpdate(
      { userId, date },
      { $set: { waterGlasses: count } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      data: {
        date,
        waterGlasses: progress.waterGlasses,
        completedMeals: progress.dietProgress?.completedMeals || [],
        completedExercises: progress.workoutProgress?.completedExercises || [],
      },
    });
  } catch (error) {
    console.error("Update Water Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update water intake",
      error: error.message,
    });
  }
};

module.exports = {
  getProgress,
  toggleProgress,
  updateWater,
};
