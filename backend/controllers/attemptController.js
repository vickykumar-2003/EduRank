const Attempt = require("../models/Attempt");
const Exam = require("../models/Exam");
const Question = require("../models/Question");

const startExam = async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.examId);

        if (!exam) {
            return res.status(404).json({
                success: false,
                message: "Exam not found"
            });
        }

        if (exam.status !== "published") {
            return res.status(400).json({
                success: false,
                message: "Exam is not published yet"
            });
        }

        const existingAttempt = await Attempt.findOne({
            student: req.user.id,
            exam: req.params.examId,
            status: "started"
        });

        if (existingAttempt) {
            return res.status(400).json({
                success: false,
                message: "You have already this exam"
            });
        }

        const attempt = await Attempt.create({
            student: req.user.id,
            exam: req.params.examId
        });

        res.status(201).json({
            success: true,
            message: "Exam started successfully",
            attempt
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const submitExam = async (req, res) => {
    try {
        const { answers } = req.body;

        const attempt = await Attempt.findById(req.params.attemptId);

        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "Attempt not found"
            });
        }

        let score = 0;
        let totalMarks = 0;

        const finalAnswers = [];

        for (const ans of answers) {

            const question = await Question.findById(ans.question);

            if (!question) {
                return res.status(404).json({
                    success: false,
                    message: `Question not found: ${ans.question}`
                });
            }

            totalMarks += question.marks;

            const isCorrect = question.correctAnswer === ans.selectedOption;

            if (isCorrect) {
                score += question.marks;
            }

            finalAnswers.push({
                question: ans.question,
                selectedOption: ans.selectedOption,
                isCorrect
            });
        }

        const percentage =
            totalMarks > 0
                ? Number(((score / totalMarks) * 100).toFixed(2))
                : 0;


        attempt.answers = finalAnswers;
        attempt.score = score;
        attempt.percentage = percentage;
        attempt.status = "submitted";
        attempt.submittedAt = new Date();


        await attempt.save();

        res.status(200).json({
            success: true,
            message: "Exam Submitted Successfully",
            score,
            percentage,
            attempt
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const getResult = async (req, res) => {
    try {
        const attempt = await Attempt.findById(req.params.attemptId)
            .populate("student", "name email")
            .populate("exam", "title year class");


        if (!attempt) {
            return res.status(404).json({
                success: false,
                message: "Result not found"
            });
        }

        res.status(200).json({
            success: true,
            result: attempt
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Attempt.find({
            exam: req.params.examId,
            status: "submitted"
        })
            .populate("student", "name email")
            .sort({ score: -1 });


        const rankedLeaderboard = leaderboard.map((attempt, index) => ({
            rank: index + 1,
            student: attempt.student,
            score: attempt.score,
            percentage: attempt.percentage
        }));

        res.status(200).json({
            success: true,
            count: rankedLeaderboard.length,
            leaderboard: rankedLeaderboard
        });
    }

    catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { startExam, submitExam, getResult, getLeaderboard };