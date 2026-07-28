const { model } = require("mongoose");
const Exam = require("../models/Exam");

const createExam = async(req,res) =>{
    try{
        const {
            title,
            year,
            class:examClass,
            duration,
            totalQuestions,
            totalMarks,
            startTime,
            endTime,
            instructions
        } = req.body;

        const exam = await Exam.create({
            title,
            year,
            class: examClass,
            duration,
            totalQuestions,
            totalMarks,
            startTime,
            endTime,
            instructions,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Exam Created Successfully",
            exam
        });
    }

    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllExams = async (req,res) =>{
    try{

  const exams = await Exam.find().sort({createdAt: -1});

        res.status(200).json({
            success: true,
            count: exams.length,
            exams
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
    createExam,
    getAllExams
};