const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config()

const mongodbUri = process.env.MONGODB_URI
const connectToDb = async ()=>{
    console.log("connecting...")
    try {
        const connected = await mongoose.connect(mongodbUri)
        if(connected){
            console.log("MONGODB CONNECTED ✅😎")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectToDb