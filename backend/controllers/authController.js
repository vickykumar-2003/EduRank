
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const register = async (req, res) => {
    try {
        const { name, email, phone, password, class: studentClass, school } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            class: studentClass,
            school
        });

        user.password = undefined;

        res.status(201).json({
            success: true,
            message: "Student Registered Successfully",
            user
        });
    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req,res) =>{

    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
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

module.exports = { register, login };