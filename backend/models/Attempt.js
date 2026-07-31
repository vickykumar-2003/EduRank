const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },

        answers: [
            {
                question: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Question",
                },

                selectedOption: {
                    type: Number,
                    required: true,
                },

                isCorrect: {
                    type: Boolean,
                    default: false,
                },
            },
        ],

        score: {
            type: Number,
            default: 0,
        },

        percentage: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["started", "submitted"],
            default: "started",
        },

        startedAt: {
            type: Date,
            default: Date.now,
        },

        submittedAt: {
            type: Date,
        },

    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Attempt", attemptSchema);