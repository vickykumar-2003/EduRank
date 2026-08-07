const User = require("../models/User");
  const Attempt = require("../models/Attempt");

const getProfile = async (req, res) =>{

    try{
        const user = await User.findById(req.user.id).select("-password");


            if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    
    }

    catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const updateProfile = async (req, res) =>{
    try{
        const user = await User.findById(req.user.id);


        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.class = req.body.class || user.class;
        user.school = req.body.school || user.school;

        await user.save();

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Profile Updated Successsfully",
            user
        });
    }
    catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }


  

 
};

   const getMyAttempts = async (req, res) =>{
        try{


            const attempts = await Attempt.find({
                student: req.user.id
            })
            .populate("exam", "title year class")
            .sort({createdAt: -1});


            res.status(200).json({
                success: true,
                count: attempts.length,
                attempts
            });
        }
        catch (error){

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }



module.exports = { getProfile,updateProfile, getMyAttempts};