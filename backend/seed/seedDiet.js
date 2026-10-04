const mongoose = require("mongoose");
require("dotenv").config();

const Diet = require("../models/Diet");
const foods = require("../data/foods");

const seedDiet = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Delete old food data
    await Diet.deleteMany({});

    console.log("Old diet data cleared");

    // Insert new foods
    await Diet.insertMany(foods);

    console.log("Diet foods added successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding diet data:", error);

    process.exit(1);
  }
};

seedDiet();