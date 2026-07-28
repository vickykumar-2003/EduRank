const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        year: {
            type: Number,
            required: true,
        },

        class: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },

        duration: {
            type: Number,
            required: true,
        },

        totalQuestions: {
            type: Number,
            required: true,
        },

        totalMarks: {
            type: Number,
            required: true,
        },

        startTime: {
            type: Date,
            required: true,
        },

        endTime: {
            type: Date,
            required: true,
        },



        status: {
            type: String,
            enum: ["draft", "published", "completed"],
            default: "draft"
        },


        instructions: {
            type: String,
            default: "Read all questions carefully before submitting the exam."
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Exam", examSchema);
