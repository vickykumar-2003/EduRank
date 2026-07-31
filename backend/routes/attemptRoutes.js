const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const {startExam, submitExam, getResult,  getLeaderboard} = require("../controllers/attemptController");

router.post("/start/:examId", protect, startExam);
router.post("/submit/:attemptId", protect, submitExam);
router.get("/result/:attemptId", protect, getResult);
router.get("/leaderboard/:examId", protect, getLeaderboard);

module.exports = router;