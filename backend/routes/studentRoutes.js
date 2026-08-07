const express = require("express");
const router = express.Router();


const {protect} = require("../middleware/authMiddleware");
const { getProfile, updateProfile, getMyAttempts } = require("../controllers/studentController");


router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/attempts", protect, getMyAttempts);


module.exports = router;