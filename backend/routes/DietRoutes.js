const express = require("express");
const router = express.Router();

const {
  generatePlan,
  getMyPlan,
} = require("../controllers/Dietcontroller");

const {
  verifyToken,
} = require("../middleware/authMiddleware");

// Generate personalized diet plan
router.post(
  "/generate",
  verifyToken,
  generatePlan
);

// Get logged-in user's diet plan
router.get(
  "/my-plan",
  verifyToken,
  getMyPlan
);

module.exports = router;