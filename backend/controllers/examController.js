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

const publishExam = async (req,res) =>{
    try{
        const exam = await Exam.findById(req.params.id);

        if(!exam){
            return res.status(404).json({
                success: false,
                message: "Exam not found"
            });
        }

        exam.status = "published";

        await exam.save();

        res.status(200).json({
            success: true,
            message: "Exam published successfully",
            exam
        });
    }

    catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getPublishedExams = async (req,res) =>{
    try{
        const exams = await Exam.find({status: "published"})
        .sort({createdAt: -1});

        res.status(200).json({
            success: true,
            count: exams.length,
            exams
        });
    }

    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




module.exports = {
    createExam,
    getAllExams,
    publishExam,
    getPublishedExams
};