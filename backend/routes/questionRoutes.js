const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
    createQuestion,
    getQuestionByExam,
    updateQuestion,
    getSingleQuestion,
    deleteQuestion
} = require("../controllers/questionController");


router.post("/create", protect, authorize("admin"), createQuestion);

router.get("/exam/:examId", protect, getQuestionByExam);

router.put("/update/:id", protect, authorize("admin"), updateQuestion);

router.delete("/delete/:id", protect, authorize("admin"), deleteQuestion);

router.get("/:id", protect, getSingleQuestion);



module.exports = router;