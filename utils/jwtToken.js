//creating token and saving in cookie
require('dotenv').config();
const jwt = require("jsonwebtoken");


const sendToken = (user, statusCode, res)=>{

    // const token = user.getJWTToken();
    // const token = "ye token hai";
    
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })

    // console.log(token);


    //options for cookie
    const options = {
        expire: new Date(
            Date.now + process.env.COOKIE_EXPIRE * 24 *60*60*1000
        ),
        
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
}

module.exports = sendToken;