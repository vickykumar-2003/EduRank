const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true,
        },


        question: { 
            type: String,
            required: true,
            trim: true,
        },

        options: {
            type: [String],
            required: true,
          
        },

        correctAnswer: {
            type: Number,
            required: true,
            min: 0,
            max: 3,
        },


        marks: {
            type: Number,
            default: 1,
        },


        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

    },

    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Question", questionSchema);