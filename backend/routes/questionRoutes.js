const express = require("express");
const router = express.Router();

const { protect} = require("../middleware/authMiddleware");
const { createQuestion, getQuestionByExam, updateQuestion} = require("../controllers/questionController");

router.post("/create", protect, createQuestion);
router.get("/exam/:examId", protect,getQuestionByExam);
router.put("/update/:id", protect, updateQuestion);



module.exports = router;