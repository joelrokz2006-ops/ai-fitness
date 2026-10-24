const express = require("express");
const router = express.Router();

const {
    createPlanner,
    getMyPlanner,
    getPlanner
} = require("../controllers/PlannerController");
const { verifyToken } = require("../middleware/authMiddleware");

// Save Planner
router.post("/", createPlanner);

// Get Planner for logged-in user
router.get("/my-plan", verifyToken, getMyPlanner);

// Get Planner by User ID (legacy / fallback)
router.get("/:userId", getPlanner);

module.exports = router;