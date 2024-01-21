  const express = require('express');
  const bodyParser = require("body-parser");
  const cookieParser = require("cookie-parser");
  const cors = require('cors');
  require('dotenv').config();


  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.json());
  app.use(cookieParser());
  


// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

app.use(cors());
// app.use((req, res, next) => {
//   const allowedOrigins = ['http://localhost:3005', 'https://apnadaily-blog.netlify.app/'];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//        res.setHeader('Access-Control-Allow-Origin', origin);
//   }
//   //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', true);
//   return next();
// });

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3001/');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

  //Route import kiya
  const postRoute = require("./Routes/postRoute");
  const allJournal = require("./Routes/getRoute");
  const sendMail = require("./Routes/sendMailRoute");
  const userRoute = require("./Routes/userRoute");
          


  app.use("/auth/", postRoute);
  app.use("/auth/", userRoute);
  app.use("/api/", allJournal);
  app.use('/api/', sendMail);




  app.get("/",(req,res)=>{
      console.log("ye sahi chal raha hai");
      // res.send(`Backend is Working`+ <a href="">Go To FrontEnd</a>)
    
      res.sendFile( __dirname + '/views/home.html');


  })


  module.exports = app;
