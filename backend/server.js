const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =====================================================
// CONFIGURATION
// =====================================================

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (like mobile apps, curl, postman)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith("http://localhost:")) {
                return callback(null, true);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
        optionsSuccessStatus: 204
    })
);
    


// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// =====================================================
// REQUEST LOGGER
// =====================================================

app.use((req, res, next) => {

    console.log(
        `➡️ ${req.method} ${req.originalUrl}`
    );

    next();
});

// =====================================================
// MONGODB CONNECTION
// =====================================================

const seedInitialData = async () => {
    try {
        const Diet = require("./models/Diet");
        const foods = require("./data/foods");
        const count = await Diet.countDocuments();
        if (count === 0) {
            await Diet.insertMany(foods);
            console.log(`🥗 Diet food database seeded with ${foods.length} items (veg & non-veg).`);
        } else {
            console.log(`🥗 Diet food database ready with ${count} items.`);
        }

        // Seed default demo user for frictionless access
        const User = require("./models/User");
        const bcrypt = require("bcryptjs");
        const defaultUserId = "6a4f325f87cee48babb5be6e";
        const existingDemoUser = await User.findOne({ email: "demo@fitness.com" });
        if (!existingDemoUser) {
            const hashedPassword = await bcrypt.hash("password123", 10);
            await User.create({
                _id: defaultUserId,
                name: "Demo Athlete",
                email: "demo@fitness.com",
                password: hashedPassword,
                role: "user"
            });
            console.log("👤 Default demo user ready: demo@fitness.com / password123");
        }
    } catch (seedErr) {
        console.warn("⚠️ Initial seed warning:", seedErr.message);
    }
};

const connectDatabase = async () => {
    try {
        if (process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 2000
            });
            console.log("=================================");
            console.log("✅ MongoDB Connected (Local/Remote)");
            console.log("=================================");
            await seedInitialData();
            return;
        }
    } catch (error) {
        console.warn("⚠️ Standard MongoDB connection failed:", error.message);
    }

    console.log("🔄 Starting embedded In-Memory MongoDB Server...");
    try {
        const { MongoMemoryServer } = require("mongodb-memory-server");
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri);
        console.log("=================================");
        console.log("✅ MongoDB Connected (Embedded In-Memory)");
        console.log(`📡 DB URI: ${uri}`);
        console.log("=================================");

        await seedInitialData();
    } catch (memError) {
        console.error("❌ Failed to start embedded MongoDB:", memError.message);
    }
};

connectDatabase();

// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "🚀 AI Fitness Backend Running Successfully"
    });

});

// =====================================================
// LOAD ROUTES
// =====================================================

let authRoutes;
let plannerRoutes;
let dietRoutes;

// -----------------------------------------------------
// AUTH ROUTE
// -----------------------------------------------------

try {

    authRoutes = require("./routes/auth");

    console.log(
        "🔐 Auth Routes:",
        typeof authRoutes
    );

} catch (error) {

    console.error(
        "❌ Failed to load Auth Routes:",
        error.message
    );

}

// -----------------------------------------------------
// PLANNER ROUTE
// -----------------------------------------------------

try {

    plannerRoutes = require("./routes/PlannerRoutes");

    console.log(
        "📅 Planner Routes:",
        typeof plannerRoutes
    );

} catch (error) {

    console.error(
        "❌ Failed to load Planner Routes:",
        error.message
    );

}

// -----------------------------------------------------
// DIET ROUTE
// -----------------------------------------------------

try {

    dietRoutes = require("./routes/DietRoutes");

    console.log(
        "🥗 Diet Routes:",
        typeof dietRoutes
    );

} catch (error) {

    console.error(
        "❌ Failed to load Diet Routes:",
        error.message
    );

}

// =====================================================
// REGISTER ROUTES SAFELY
// =====================================================

// AUTH

if (typeof authRoutes === "function") {

    app.use(
        "/api/auth",
        authRoutes
    );

    console.log(
        "✅ /api/auth mounted"
    );

} else {

    console.error(
        "❌ /api/auth was NOT mounted"
    );

}

// PLANNER

if (typeof plannerRoutes === "function") {

    app.use(
        "/api/planner",
        plannerRoutes
    );

    console.log(
        "✅ /api/planner mounted"
    );

} else {

    console.error(
        "❌ /api/planner was NOT mounted"
    );

}

// DIET

if (typeof dietRoutes === "function") {

    app.use(
        "/api/diet",
        dietRoutes
    );

    console.log(
        "✅ /api/diet mounted"
    );

} else {

    console.error(
        "❌ /api/diet was NOT mounted"
    );

}

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {

    res.status(200).json({
        success: true,
        server: "running",
        database:
            mongoose.connection.readyState === 1
                ? "connected"
                : "disconnected"
    });

});

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route Not Found",
        path: req.originalUrl
    });

});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {

    console.error(
        "================================="
    );

    console.error(
        "❌ GLOBAL SERVER ERROR"
    );

    console.error(
        err.stack || err.message
    );

    console.error(
        "================================="
    );

    // CORS error
    if (
        err.message &&
        err.message.startsWith("CORS blocked")
    ) {

        return res.status(403).json({
            success: false,
            message: err.message
        });

    }

    return res.status(500).json({
        success: false,
        message:
            err.message ||
            "Internal Server Error"
    });

});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {

    console.log("");
    console.log("=================================");
    console.log("🚀 AI FITNESS BACKEND");
    console.log("=================================");
    console.log(
        `🚀 Server Running on Port ${PORT}`
    );
    console.log(
        `🌐 http://localhost:${PORT}`
    );
    console.log(
        `❤️ Health: http://localhost:${PORT}/api/health`
    );
    console.log("=================================");
    console.log("");

});