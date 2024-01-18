const app = require("./app");
const connectDB = require("./db/conn");
require('dotenv').config();


const port = process.env.PORT || 3000;


//Connect to the Database

connectDB();


const server = app.listen(port, (err)=>{
    if(err)console.log("error hai => "+ err)
    console.log(`Server is working on http://localhost:${port}`);
})

process.on("unhandledRejection",(err)=>{
    console.log(`Err: ${err.message}`);
    console.log(`Shutting down the serverdue to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })

})
