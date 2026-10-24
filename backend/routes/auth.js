const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// AUTH ROUTE TEST
// GET /api/auth/test
// =====================================================

router.get("/test", (req, res) => {
    console.log("✅ AUTH TEST ROUTE HIT");

    return res.status(200).json({
        success: true,
        message: "Auth routes are working correctly"
    });
});

// =====================================================
// REGISTER
// POST /api/auth/register
// =====================================================

router.post("/register", async (req, res) => {

    console.log("");
    console.log("========================================");
    console.log("🔥 REGISTER REQUEST RECEIVED");
    console.log("========================================");

    try {

        console.log("📦 Request Body:");
        console.log(req.body);

        // -------------------------------------------------
        // GET DATA
        // -------------------------------------------------

        const {
            name,
            email,
            password,
            role,
            gender,
            age,
            height,
            weight,
            goal
        } = req.body;

        // -------------------------------------------------
        // VALIDATE REQUEST BODY
        // -------------------------------------------------

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        // -------------------------------------------------
        // CLEAN INPUT
        // -------------------------------------------------

        const cleanName = String(name).trim();

        const cleanEmail = String(email)
            .trim()
            .toLowerCase();

        // -------------------------------------------------
        // PASSWORD VALIDATION
        // -------------------------------------------------

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least 6 characters"
            });
        }

        // -------------------------------------------------
        // EMAIL VALIDATION
        // -------------------------------------------------

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address"
            });
        }

        console.log("👤 Name:", cleanName);
        console.log("📧 Email:", cleanEmail);

        // -------------------------------------------------
        // CHECK MONGODB CONNECTION
        // -------------------------------------------------

        if (User.db.readyState !== 1) {

            console.error(
                "❌ MongoDB is not connected"
            );

            return res.status(503).json({
                success: false,
                message:
                    "Database is not connected"
            });
        }

        // -------------------------------------------------
        // CHECK EXISTING USER
        // -------------------------------------------------

        console.log(
            "🔎 Checking existing user..."
        );

        const existingUser =
            await User.findOne({
                email: cleanEmail
            });

        if (existingUser) {

            console.log(
                "⚠️ User already exists:",
                cleanEmail
            );

            return res.status(409).json({
                success: false,
                message:
                    "Email already registered"
            });
        }

        console.log(
            "✅ Email is available"
        );

        // -------------------------------------------------
        // HASH PASSWORD
        // -------------------------------------------------

        console.log(
            "🔐 Hashing password..."
        );

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );

        console.log(
            "✅ Password hashed"
        );

        // -------------------------------------------------
        // CREATE USER
        // -------------------------------------------------

        const newUser = new User({
            name: cleanName,

            email: cleanEmail,

            password: hashedPassword,

            role: role || "user",

            gender: gender || "Male",

            age: age ? Number(age) : undefined,

            height: height ? Number(height) : undefined,

            weight: weight ? Number(weight) : undefined,

            goal: goal || "General Fitness"
        });

        console.log(
            "👤 User object created"
        );

        // -------------------------------------------------
        // SAVE USER
        // -------------------------------------------------

        const savedUser =
            await newUser.save();

        console.log(
            "========================================"
        );

        console.log(
            "✅ USER REGISTERED SUCCESSFULLY"
        );

        console.log(
            "🆔 User ID:",
            savedUser._id
        );

        console.log(
            "📧 Email:",
            savedUser.email
        );

        console.log(
            "========================================"
        );

        // -------------------------------------------------
        // RESPONSE
        // -------------------------------------------------

        return res.status(201).json({
            success: true,
            message:
                "User Registered Successfully"
        });

    } catch (error) {

        console.error("");
        console.error(
            "========================================"
        );

        console.error(
            "❌ REGISTER ERROR"
        );

        console.error(
            "========================================"
        );

        console.error(
            "Name:",
            error.name
        );

        console.error(
            "Message:",
            error.message
        );

        console.error(
            "Stack:",
            error.stack
        );

        console.error(
            "========================================"
        );

        // -------------------------------------------------
        // DUPLICATE EMAIL
        // -------------------------------------------------

        if (error.code === 11000) {

            return res.status(409).json({
                success: false,
                message:
                    "Email already registered"
            });
        }

        // -------------------------------------------------
        // MONGOOSE VALIDATION ERROR
        // -------------------------------------------------

        if (
            error.name ===
            "ValidationError"
        ) {

            const messages =
                Object.values(
                    error.errors
                ).map(
                    (item) =>
                        item.message
                );

            return res.status(400).json({
                success: false,
                message:
                    messages.join(", ")
            });
        }

        // -------------------------------------------------
        // GENERAL ERROR
        // -------------------------------------------------

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Registration failed"
        });
    }
});

// =====================================================
// LOGIN
// POST /api/auth/login
// =====================================================

router.post("/login", async (req, res) => {

    console.log("");
    console.log("========================================");
    console.log("🔐 LOGIN REQUEST RECEIVED");
    console.log("========================================");

    try {

        console.log("📦 Login Request Body:");

        // Don't log the actual password
        console.log({
            email: req.body?.email
        });

        // -------------------------------------------------
        // GET DATA
        // -------------------------------------------------

        const {
            email,
            password
        } = req.body;

        // -------------------------------------------------
        // VALIDATION
        // -------------------------------------------------

        if (!email) {
            return res.status(400).json({
                success: false,
                message:
                    "Email is required"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message:
                    "Password is required"
            });
        }

        // -------------------------------------------------
        // CLEAN EMAIL
        // -------------------------------------------------

        const cleanEmail =
            String(email)
                .trim()
                .toLowerCase();

        console.log(
            "📧 Searching:",
            cleanEmail
        );

        // -------------------------------------------------
        // CHECK DATABASE
        // -------------------------------------------------

        if (User.db.readyState !== 1) {

            console.error(
                "❌ MongoDB is not connected"
            );

            return res.status(503).json({
                success: false,
                message:
                    "Database is not connected"
            });
        }

        // -------------------------------------------------
        // FIND USER
        // -------------------------------------------------

        const user =
            await User.findOne({
                email: cleanEmail
            });

        if (!user) {

            console.log(
                "❌ User not found"
            );

            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password"
            });
        }

        console.log(
            "✅ User found:",
            user.email
        );

        // -------------------------------------------------
        // CHECK PASSWORD
        // -------------------------------------------------

        console.log(
            "🔐 Checking password..."
        );

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {

            console.log(
                "❌ Incorrect password"
            );

            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password"
            });
        }

        console.log(
            "✅ Password matched"
        );

        // -------------------------------------------------
        // CHECK JWT SECRET
        // -------------------------------------------------

        if (!process.env.JWT_SECRET) {

            console.error(
                "❌ JWT_SECRET is missing"
            );

            return res.status(500).json({
                success: false,
                message:
                    "JWT_SECRET is not configured"
            });
        }

        // -------------------------------------------------
        // CREATE JWT
        // -------------------------------------------------

        console.log(
            "🔑 Creating JWT..."
        );

        const token =
            jwt.sign(
                {
                    id: user._id.toString(),
                    role: user.role
                },

                process.env.JWT_SECRET || "ai_fitness_secret",

                {
                    expiresIn: "30d"
                }
            );

        console.log(
            "✅ JWT created"
        );

        // -------------------------------------------------
        // LOGIN SUCCESS
        // -------------------------------------------------

        console.log(
            "========================================"
        );

        console.log(
            "🎉 LOGIN SUCCESS"
        );

        console.log(
            "📧 User:",
            user.email
        );

        console.log(
            "👤 Role:",
            user.role
        );

        console.log(
            "========================================"
        );

        // -------------------------------------------------
        // RESPONSE
        // -------------------------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                gender: user.gender || "Male",
                age: user.age,
                height: user.height,
                weight: user.weight,
                goal: user.goal || "General Fitness"
            }
        });

    } catch (error) {

        console.error("");
        console.error(
            "========================================"
        );

        console.error(
            "❌ LOGIN ERROR"
        );

        console.error(
            "========================================"
        );

        console.error(
            "Name:",
            error.name
        );

        console.error(
            "Message:",
            error.message
        );

        console.error(
            "Stack:",
            error.stack
        );

        console.error(
            "========================================"
        );

        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Login failed"
        });
    }
});

// =====================================================
// GET CURRENT USER PROFILE
// GET /api/auth/profile
// =====================================================

router.get("/profile", verifyToken, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                gender: user.gender || "Male",
                age: user.age,
                height: user.height,
                weight: user.weight,
                goal: user.goal || "General Fitness"
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to load profile"
        });
    }
});

// =====================================================
// UPDATE USER PROFILE
// PUT /api/auth/profile
// =====================================================

router.put("/profile", verifyToken, async (req, res) => {
    try {
        const userId = req.user?.id || req.user?._id;
        const { name, gender, age, height, weight, goal } = req.body;

        const updateData = {};
        if (name) updateData.name = String(name).trim();
        if (gender) updateData.gender = gender;
        if (age !== undefined && age !== "") updateData.age = Number(age);
        if (height !== undefined && height !== "") updateData.height = Number(height);
        if (weight !== undefined && weight !== "") updateData.weight = Number(weight);
        if (goal) updateData.goal = goal;

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                gender: updatedUser.gender || "Male",
                age: updatedUser.age,
                height: updatedUser.height,
                weight: updatedUser.weight,
                goal: updatedUser.goal || "General Fitness"
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update profile"
        });
    }
});

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;