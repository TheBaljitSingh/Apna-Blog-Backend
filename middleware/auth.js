const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require('dotenv').config();




exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Bhai pahale Login to to kar, ye access karne ke liyea" });
        }

        // Get the token from the Authorization header
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Token not provided, please log in first." });
        }

        // Verify the token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        // Find the authenticated user by ID
        const authUser = await User.findById(decodedData.id);

        if (!authUser) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        // Attach the authenticated user to the request object
        req.user = authUser;

        // Now you can access the authenticated user in your routes using req.user
        next();
    } catch (error) {
        console.log(error);
        return next(error);
    }
};


exports.authorizeRoles= (...roles)=>{
    return(req, res, next)=>{

        if(!roles.includes(req.user.role)){
            return next(`Role: ${req.user.role} is not allowed to acces this resource`, 403);

        }
 
        next();
    }
}