const express = require("express");
const router = express.Router();


const {protect} = require("../middlerware/authMiddleware");


router.get("/profile", protect, (req,res) => {
    res.status(200).json({
        success: true,
        message: "Protected Profile Route",
        user: req.user
    });
});


module.exports = router;