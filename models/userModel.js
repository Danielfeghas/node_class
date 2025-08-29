const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    companyName: {
        type:String,
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin', 'seller']
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    verificationExp: {
        type: String,
    },
    
    subscription: {
        type: String,
        default: "INACTIVE",
        enum: ["ACTIVE", 'INACTIVE'],
    },
    subscriptionPlan: {
        type: String,
        default: 'free',
        enum: ['free', 'basic', 'premium']
    }
})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel
