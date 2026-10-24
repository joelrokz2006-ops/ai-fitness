const jwt = require("jsonwebtoken");

// ========================================
// VERIFY JWT TOKEN
// ========================================

const verifyToken = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check header
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    // Expected format:
    // Authorization: Bearer TOKEN

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    const secret = process.env.JWT_SECRET || "ai_fitness_secret";

    // Verify token
    const decoded = jwt.verify(
      token,
      secret
    );

    console.log("✅ Token verified");
    console.log("Decoded user:", decoded);

    // Store decoded user information
    req.user = decoded;

    // Continue
    next();

  } catch (error) {

    console.error("❌ JWT Error:", error.message);

    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Session expired. Please log in again."
          : "Invalid or expired token",
    });
  }
};

module.exports = {
  verifyToken,
};