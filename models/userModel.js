const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");
// const crypto = require("crypto");

require('dotenv').config();

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Your Name"],
        maxLength:[30,"Name can't exceed 30 char long"],
        minLength:[4, "Name should more than 4 char"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your password"],
        // minLength:[8, "Password should be 8 char long"],
        minLength:[2],
        select:false
    },
    avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    role:{
        type:String,
        default:"User",
    },
    resetPasswordToken:String, 
    resetPasswordExpire:Date,

});


//Encryption

// pre hook is used for db me save hone se pahale kya karna hai? hashing karna hai, ho jayega


userSchema.pre("save", async function(next){
    // console.log("Hi from indise");
    if(this.isModified("password")){
        // next();
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
    

})


// JWT token 

userSchema.methods.getJWTToken = async function(){
    return  jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
};

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// //Generating password reset token

userSchema.methods.getResetPasswordToken = function(){
  //Generating token
//   const resetToken = crypto.randomBytes(20).toString("hex");

//   //Hashing and adding resetPasswordtoken to userSchema
//   this.resetPasswordToken = crypto
//   .createHash("sha256")
//   .update(resetToken)
//   .digest("hax");

//   this.resetPasswordExpire = Date.now()+15*60*1000;
  
//   return resetToken;

}


module.exports = mongoose.model("User", userSchema);