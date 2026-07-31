const User = require("../models/User");
const Exam = require("../models/Exam");
const Question = require("../models/Question");
const Attempt = require("../models/Attempt");


const getDashboard = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({
            role: "student"
        });

        const totalExams = await Exam.countDocuments();

        const publishedExams = await Exam.countDocuments({
            status: "published"
        });

        const totalQuestions = await Question.countDocuments();

        const totalAttempts = await Attempt.countDocuments();

        const completedAttempts = await Attempt.countDocuments({
            status: "submitted"
        });


        const result = await Attempt.aggregate([
            {
                $match: {
                    status: "submitted"
                }
            },

            {
                $group: {
                    _id: null,
                    averageScore: {
                        $avg: "$score"
                    }
                }
            }
        ]);


        const averageScore =
            result.length > 0
                ? result[0].averageScore.toFixed(2)
                : 0;

        res.status(200).json({
            success: true,
            dashboard: {
                totalStudents,
                totalExams,
                publishedExams,
                totalQuestions,
                totalAttempts,
                completedAttempts,
                averageScore
            }
        });
    }

    catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getDashboard
};