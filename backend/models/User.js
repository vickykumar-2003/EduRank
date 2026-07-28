const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },

        email:{
            type: String,
            required: true,
            unique: true,
        },

        phone:{
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },



        role:{
            type: String,
            enum: ["student", "admin"],
            default : "student",
        },

        class:{
            type: Number,
            required: true,
            min: 1,
            max:10,
        },

        school:{
            type: String,
            required: true,
        },
    },

    {
        timestamps: true,
    }
);


module.exports = mongoose.model("User", userSchema);