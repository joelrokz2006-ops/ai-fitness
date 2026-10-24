const express = require("express");
const router = express.Router();

const {
  getProgress,
  toggleProgress,
  updateWater,
} = require("../controllers/ProgressController");

const { verifyToken } = require("../middleware/authMiddleware");

// GET today's / date's progress for authenticated user
router.get("/", verifyToken, getProgress);

// POST toggle meal or workout exercise completion
router.post("/toggle", verifyToken, toggleProgress);

// POST update hydration water glasses
router.post("/water", verifyToken, updateWater);

module.exports = router;
