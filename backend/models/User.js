const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Transgender", "male", "female", "transgender", "other"],
            default: "Male"
        },

        age: {
            type: Number
        },

        height: {
            type: Number
        },

        weight: {
            type: Number
        },

        goal: {
            type: String,
            default: "General Fitness"
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);