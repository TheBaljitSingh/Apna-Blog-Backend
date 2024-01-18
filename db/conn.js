const mongoose = require("mongoose");

require('dotenv').config();



console.log(process.env.MONGO_URL);

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then((data)=>{
        console.log(`DB Connections Established`)
    })
    .catch((e)=>{
        console.log(`Database Connectin Error: ${e}`)
    })
}

module.exports = connectDB;