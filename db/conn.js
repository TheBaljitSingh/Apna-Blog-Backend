const mongoose = require("mongoose");

require('dotenv').config();

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