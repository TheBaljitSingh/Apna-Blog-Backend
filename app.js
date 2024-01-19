  const express = require('express');
  const bodyParser = require("body-parser");
  const cookieParser = require("cookie-parser");
  const cors = require('cors');
  require('dotenv').config();


  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.json());
  app.use(cookieParser());
  


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

  //Route import kiya
  const post = require("./Routes/postRoute");
  const allJournal = require("./Routes/getRoute");
  const sendMail = require("./Routes/sendMailRoute");
  const userRoute = require("./Routes/userRoute");
          


  app.use("/auth/", post);
  app.use("/api/", allJournal);
  app.use('/api/', sendMail);
  // app.use("/api/", userRoute);
  app.use("/auth/", userRoute);




  app.get("/",(req,res)=>{
      console.log("ye sahi chal raha hai");
      // res.send(`Backend is Working`+ <a href="">Go To FrontEnd</a>)
    
      res.sendFile( __dirname + '/views/home.html');


  })


  module.exports = app;
