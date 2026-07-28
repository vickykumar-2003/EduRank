const Question = require("../models/Question");

const createQuestion = async (req,res) =>{
    try{
        const{
            exam,
            question,
            options,
            correctAnswer,
            marks,
        } = req.body;

        const newQuestion = await Question.create({
            exam,
            question,
            options,
            correctAnswer,
            marks,
            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            messsage: "Questtion Created Successfully",
            question: newQuestion,
        });
    }
    catch (error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getQuestionByExam = async (req,res) =>{
    try{
        const question = await Question.find({
            exam: req.params.examId,
        });

        res.status(200).json({
            success: true,
            count: question.length,
            question,
        });
    }

    catch   (error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateQuestion = async (req, res) => {
    try {

        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedQuestion) {
            return res.status(404).json({
                success: false,
                message: "Question not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Question Updated Successfully",
            question: updatedQuestion,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};



module.exports = {
    createQuestion,
    getQuestionByExam,
    updateQuestion,
};