const express = require("express");
const router = express.Router();


const {protect} = require("../middleware/authMiddleware");
const { createExam , getAllExams} = require("../controllers/examController");

router.post("/create", protect, createExam);
router.get("/all", protect, getAllExams);

module.exports = router;