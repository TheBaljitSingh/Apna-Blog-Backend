  const express = require('express');
  const bodyParser = require("body-parser");
  const cookieParser = require("cookie-parser");
  const cors = require('cors');
  require('dotenv').config();
  const qs = require('qs');



  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.json());
  app.use(cookieParser());
  

app.use(cors());


  //Route import kiya
  const postRoute = require("./Routes/postRoute");
  const allJournal = require("./Routes/getRoute");
  const sendMail = require("./Routes/sendMailRoute");
  const userRoute = require("./Routes/userRoute");
          
 


  app.use("/auth/", postRoute);
  app.use("/auth/", userRoute);
  app.use("/api/", allJournal);
  app.use('/api/', sendMail);




  // app.get('/auth/google', (req, res) => {
  //   const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify({
  //     client_id: process.env.GOOGLE_CLIENT_ID,
  //     redirect_uri: `${FRONTEND_URL}auth/google/callback`,
  //     response_type: 'code',
  //     scope: 'openid email profile',
  //     access_type: 'offline',
  //   })}`;
  //   res.redirect(redirectUri);
  // });



  // app.get('/auth/google/callback', async (req, res) => {
  //   const { code } = req.query;
  //   const tokenUrl = 'https://oauth2.googleapis.com/token';
  
  //   const tokenResponse = await axios.post(tokenUrl, qs.stringify({
  //     code,
  //     client_id: process.env.GOOGLE_CLIENT_ID,
  //     client_secret: process.env.GOOGLE_CLIENT_SECRET,
  //     redirect_uri: `${FRONTEND_URL}auth/google/callback*`,
  //     grant_type: 'authorization_code',
  //   }), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //   });
  
  //   const { access_token, id_token } = tokenResponse.data;
  
  //   const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   });
  
  //   const user = userInfoResponse.data;
  
  //   const jwtToken = jwt.sign({ id: user.sub, email: user.email }, process.env.JWT_SECRET, {
  //     expiresIn: '1h',
  //   });
  
  //   res.cookie('token', jwtToken, { httpOnly: true });
  //   res.redirect('/');
  // });


  app.get("/",(req,res)=>{
      console.log("ye sahi chal raha hai");
      // res.send(`Backend is Working`+ <a href="">Go To FrontEnd</a>)
    
      res.sendFile( __dirname + '/views/home.html');


  })




  app.get("/check", async (req, res) => {
    console.log(req.socket);
    const allowedIp = '103.241.224.21'; 
    const visitorIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(visitorIp);

  
    if (visitorIp !== allowedIp) {
      return res.status(403).send('Access denied');
    }
  
  
    try {
      // Make a request to your React application
      const response = await axios.get(`https://3bytexl.vercel.app`, {
        headers: {
          'x-vercel-deployment-url': 'https://3bytexl.vercel.app',
          'x-forwarded-host': 'https://3bytexl.vercel.app',
        },
      });
  
      // Return the response from your React application
      res.json(response.data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });




  module.exports = app;
