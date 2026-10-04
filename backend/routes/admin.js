const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ADMIN PANEL ROUTE
router.get("/panel", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin 👑" });
});

module.exports = router;