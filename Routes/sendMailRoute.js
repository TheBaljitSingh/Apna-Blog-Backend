const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// require("dotenv").config();


// const {newContact} = require("../Controllers/contactController")

router.route("/send-mail").post((req, res)=>{

    try {
        const {name, email, message} = req.body;
        
        if(!name || !email|| !message){
            res.send(500).json({
                message:"input field required",
            })
        }


        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PWD,
              },
          });

          
    
          async function main(){
            const info = await transporter.sendMail({
                from: `"User" <${email}>`,
                to: "baljitsingh692002@gmail.com",
                subject: `From: ${name}`,
                text: ` Name: ${name}\n Email: ${email}\n Message: ${message}`,
    
            });
            res.status(200).json({
                message: "Email send",
                id: info.messageId,
                code:200
            })
            
          }
            main().catch(console.error);

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "SendMail page pe error hai"
        })
        
        
    }
    
})

module.exports = router;