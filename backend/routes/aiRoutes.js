const express = require("express");
const router = express.Router();
const { generateCoachResponse } = require("../services/aiService");

// POST /api/ai/coach
router.post("/coach", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const reply = await generateCoachResponse(String(message).trim());

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("AI Coach Route Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
      error: error.message,
    });
  }
});

module.exports = router;
