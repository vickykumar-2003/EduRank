const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");

const {
    createExam,
    getAllExams,
    updateExam,
    deleteExam,
    publishExam,
    getPublishedExams
} = require("../controllers/examController");

router.post("/create", protect, authorize("admin"), createExam);

router.get("/all", protect, getAllExams);

router.put("/update/:id", protect, authorize("admin"), updateExam);

router.get("/published", protect, getPublishedExams);

router.delete("/delete/:id", protect, authorize("admin"), deleteExam);

router.put("/publish/:id", protect, authorize("admin"), publishExam);

module.exports = router;