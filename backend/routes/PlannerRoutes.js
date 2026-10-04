const express = require("express");
const router = express.Router();

const {
    createPlanner,
    getPlanner
} = require("../controllers/PlannerController");

// Save Planner
router.post("/", createPlanner);

// Get Planner by User ID
router.get("/:userId", getPlanner);

module.exports = router;