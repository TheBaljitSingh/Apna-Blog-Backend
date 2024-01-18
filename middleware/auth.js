const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require('dotenv').config();




exports.isAuthenticatedUser = async(req, res, next)=>{
    try {
        // console.log("printing the token of req " + req.body.token);
        // const token = req.headers['Authorization'];
        // const token = req.headers.authorization || req.cookies.token|| '';
        const {token} = req.body;
        // const token = "toyehaitoken";
    
    
        // var token = req.headers.authorization.split(' ')[1];
        console.log("token ko print kar raha hu"+token.substring(6));
    
    
        if(!token){
            return next("Bhai pahale Login to to kar, ye access karne ke liyea", 401);
        }
    
        
        const decodedData = jwt.verify(token.substring(6), process.env.JWT_SECRET)
    
        authUser =  await User.findById(decodedData.id);
    
        if(!authUser){
            return res.status(401).json("Invalid Token");
        }
    
        req.user = authUser;
        // Now you can access the authenticated user in your routes using req.user
    
        console.log(decodedData);
    
    
        next();
    } catch (error) {
        console.log(error);
        
    }
}


exports.authorizeRoles= (...roles)=>{
    return(req, res, next)=>{

        if(!roles.includes(req.user.role)){
            return next(`Role: ${req.user.role} is not allowed to acces this resource`, 403);

        }
 
        next();
    }
}