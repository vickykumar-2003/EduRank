const jwt  = require("jsonwebtoken");

const protect = async(req,res, next) =>{
    try{
        let token = req.headers.authorization;

        if(!token  || !token.startsWith("Bearer")){
            return res.status(401).json({
                success: false,
                message: "Access Denide. No Token Provided"
            });
        }

        token = token.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }

    catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
};


const authorize = (...roles) =>{
    return  (req,res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: "Access Denied. You are not authorized."
            });
        }

        next();
    };
};


module.exports = {protect, authorize};