const Planner = require("../models/Planner");
const {
  buildExerciseRoutine,
  buildDietRoutine,
} = require("../services/plannerRoutine");

// =========================
// CREATE PLANNER
// =========================

const createPlanner = async (req, res) => {
  try {
    const { goal, age, gender, height, weight } = req.body;

    // =========================
    // AGE RESTRICTION (18+)
    // Only users above 17 can use the Gym Planner
    // =========================

    if (age === undefined || age === null || age === "") {
      return res.status(400).json({
        success: false,
        message: "Please enter your age.",
      });
    }

    if (Number(age) < 18) {
      return res.status(400).json({
        success: false,
        message:
          "Gym Planner is only for users above 17 years old (18+).",
      });
    }

    if (!gender || !Number(height) || !Number(weight)) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields correctly.",
      });
    }

    // =========================
    // CLEAR EXERCISE + DIET ROUTINE
    // =========================

    const exerciseRoutine = buildExerciseRoutine(goal);

    const dietRoutine = buildDietRoutine({
      age,
      gender,
      height,
      weight,
      goal,
      activityLevel: req.body.activityLevel,
    });

    let workoutPlan = {};
    let goalGuide = {};
    let fitnessTips = [];

    let workoutDuration = "";
    let restBetweenSets = "";
    let dailySteps = "";
    let cardioMinutes = "";

    let warmUp = "";
    let coolDown = "";

    let motivation = "";
    let weeklyChallenge = "";

    switch (goal) {
      // ==================================
      // MUSCLE GAIN
      // ==================================

      case "Muscle Gain":
        workoutPlan = {
          Monday: "Chest + Triceps",
          Tuesday: "Back + Biceps",
          Wednesday: "Legs",
          Thursday: "Shoulders + Abs",
          Friday: "Arms + Chest",
          Saturday: "Light Cardio",
          Sunday: "Rest",
        };

        goalGuide = {
          title: "How to Build Muscle",
          description:
            "Focus on resistance training, progressive overload, recovery, and consistent workouts.",
          tips: [
            "Focus on compound exercises",
            "Increase weight gradually",
            "Train consistently",
            "Allow muscles enough recovery time",
          ],
        };

        fitnessTips = [
          "Use proper exercise form",
          "Do not train the same muscle heavily every day",
          "Track your workout progress",
          "Take proper rest days",
        ];

        workoutDuration = "60-75 Minutes";
        restBetweenSets = "60-90 Seconds";
        dailySteps = "8000";
        cardioMinutes = "20 Minutes";

        warmUp = "10 Minutes Dynamic Warm Up";
        coolDown = "5-10 Minutes Stretching";

        motivation =
          "Muscle growth takes time. Stay consistent and keep progressing.";

        weeklyChallenge =
          "Try to improve one exercise by adding a rep or slightly increasing the weight.";

        break;

      // ==================================
      // WEIGHT GAIN
      // ==================================

      case "Weight Gain":
        workoutPlan = {
          Monday: "Chest + Triceps",
          Tuesday: "Back + Biceps",
          Wednesday: "Legs",
          Thursday: "Rest",
          Friday: "Shoulders + Arms",
          Saturday: "Full Body",
          Sunday: "Rest",
        };

        goalGuide = {
          title: "How to Gain Weight",
          description:
            "Focus on strength training and gradually increasing your training volume.",
          tips: [
            "Prioritize strength training",
            "Use compound exercises",
            "Increase training volume gradually",
            "Get enough recovery between workouts",
          ],
        };

        fitnessTips = [
          "Focus on progressive overload",
          "Maintain proper exercise technique",
          "Do not skip recovery days",
          "Track your strength progress",
        ];

        workoutDuration = "60-75 Minutes";
        restBetweenSets = "90 Seconds";
        dailySteps = "7000";
        cardioMinutes = "15 Minutes";

        warmUp = "10 Minutes Mobility + Light Cardio";
        coolDown = "5-10 Minutes Stretching";

        motivation =
          "Build strength gradually. Consistency is more important than rushing.";

        weeklyChallenge =
          "Try to improve your performance in one compound exercise.";

        break;

      // ==================================
      // WEIGHT LOSS
      // ==================================

      case "Weight Loss":
        workoutPlan = {
          Monday: "Full Body Workout + Cardio",
          Tuesday: "Upper Body + Walking",
          Wednesday: "HIIT + Core",
          Thursday: "Lower Body + Cardio",
          Friday: "Full Body Circuit",
          Saturday: "Walking or Light Cardio",
          Sunday: "Rest",
        };

        goalGuide = {
          title: "How to Lose Weight",
          description:
            "Combine regular resistance training, cardio, daily activity, and consistent habits.",
          tips: [
            "Stay physically active",
            "Include both strength training and cardio",
            "Increase daily movement gradually",
            "Stay consistent with your routine",
          ],
        };

        fitnessTips = [
          "Walk regularly",
          "Use proper form during HIIT",
          "Do not overtrain",
          "Track your weekly progress",
        ];

        workoutDuration = "45-60 Minutes";
        restBetweenSets = "45-60 Seconds";
        dailySteps = "10000";
        cardioMinutes = "30-40 Minutes";

        warmUp = "5-10 Minutes Light Cardio";
        coolDown = "5-10 Minutes Stretching";

        motivation =
          "Small consistent actions create long-term results.";

        weeklyChallenge =
          "Complete your planned workouts and stay active throughout the week.";

        break;

      // ==================================
      // FAT LOSS
      // ==================================

      case "Fat Loss":
        workoutPlan = {
          Monday: "Full Body Strength + Cardio",
          Tuesday: "Upper Body",
          Wednesday: "HIIT + Core",
          Thursday: "Lower Body",
          Friday: "Full Body Circuit",
          Saturday: "Light Cardio",
          Sunday: "Rest",
        };

        goalGuide = {
          title: "Fat Loss Training Guide",
          description:
            "Use strength training to maintain muscle and add cardio according to your fitness level.",
          tips: [
            "Prioritize strength training",
            "Add cardio gradually",
            "Stay active during the day",
            "Take recovery seriously",
          ],
        };

        fitnessTips = [
          "Avoid doing intense HIIT every day",
          "Focus on good exercise technique",
          "Increase activity gradually",
          "Stay consistent",
        ];

        workoutDuration = "60 Minutes";
        restBetweenSets = "45-60 Seconds";
        dailySteps = "10000";
        cardioMinutes = "30-45 Minutes";

        warmUp = "10 Minutes Light Cardio + Mobility";
        coolDown = "10 Minutes Stretching";

        motivation =
          "Consistency beats extreme workouts.";

        weeklyChallenge =
          "Complete three cardio sessions and your planned strength workouts.";

        break;

      // ==================================
      // STRENGTH
      // ==================================

      case "Strength":
        workoutPlan = {
          Monday: "Chest + Push Exercises",
          Tuesday: "Leg Strength",
          Wednesday: "Rest or Light Mobility",
          Thursday: "Back + Pull Exercises",
          Friday: "Full Body Strength",
          Saturday: "Core + Mobility",
          Sunday: "Rest",
        };

        goalGuide = {
          title: "Build Strength",
          description:
            "Focus on compound movements, proper form, and gradual progression.",
          tips: [
            "Prioritize compound exercises",
            "Practice proper form",
            "Increase training load gradually",
            "Allow enough rest between challenging sets",
          ],
        };

        fitnessTips = [
          "Warm up before heavy exercises",
          "Do not sacrifice form for weight",
          "Track your lifts",
          "Take adequate recovery",
        ];

        workoutDuration = "60-90 Minutes";
        restBetweenSets = "90-120 Seconds";
        dailySteps = "7000";
        cardioMinutes = "15 Minutes";

        warmUp = "10 Minutes Mobility + Exercise-Specific Warm Up";
        coolDown = "5-10 Minutes Stretching";

        motivation =
          "Strength is built gradually through consistent practice.";

        weeklyChallenge =
          "Improve your technique or performance in one main exercise.";

        break;

      // ==================================
      // GENERAL FITNESS
      // ==================================

      default:
        workoutPlan = {
          Monday: "Full Body Workout",
          Tuesday: "Light Cardio",
          Wednesday: "Upper Body",
          Thursday: "Rest or Mobility",
          Friday: "Lower Body + Core",
          Saturday: "Walking or Light Activity",
          Sunday: "Rest",
        };

        goalGuide = {
          title: "General Fitness",
          description:
            "Build a balanced routine using strength training, cardio, mobility, and recovery.",
          tips: [
            "Exercise regularly",
            "Include strength and cardio",
            "Work on mobility",
            "Take regular rest days",
          ],
        };

        fitnessTips = [
          "Warm up before workouts",
          "Stay active during the day",
          "Focus on correct exercise form",
          "Build consistency",
        ];

        workoutDuration = "45-60 Minutes";
        restBetweenSets = "60 Seconds";
        dailySteps = "8000";
        cardioMinutes = "20-30 Minutes";

        warmUp = "5-10 Minutes Light Warm Up";
        coolDown = "5-10 Minutes Stretching";

        motivation =
          "A consistent routine is better than a perfect routine you cannot maintain.";

        weeklyChallenge =
          "Complete at least three planned workouts this week.";

        break;
    }

    const planner = new Planner({
      ...req.body,

      exerciseRoutine,
      dietRoutine,

      workoutPlan,
      goalGuide,
      fitnessTips,

      workoutDuration,
      restBetweenSets,
      dailySteps,
      cardioMinutes,

      warmUp,
      coolDown,

      motivation,
      weeklyChallenge,
    });

    await planner.save();

    res.status(201).json({
      success: true,
      message: "Gym planner created successfully",
      data: planner,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// GET PLANNER
// =========================

const getPlanner = async (req, res) => {
  try {
    const { userId } = req.params;

    const planner = await Planner.findOne({ userId }).sort({ createdAt: -1 });

    if (!planner) {
      return res.status(404).json({
        success: false,
        message: "Planner data not found",
      });
    }

    res.status(200).json({
      success: true,
      data: planner,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createPlanner,
  getPlanner,
};