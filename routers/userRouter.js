const express = require('express')
const { addUserHandler,signUpHandler,login, logout, getUsersHandler, verifyAccount, resendVerification, activateSubscription } = require('../controllers/userController')
const middleware1 = require("../middlewares/middleware1")
const middleware2 = require("../middlewares/middleware2")
const blacklistedTokenModel = require('../models/blacklistedTokens')
const userModel = require('../models/userModel')
const isLoggedIn = require('../middlewares/isLoggedIn')
const isAdmin = require("../middlewares/isAdmin")
const productImageUpload = require('../middlewares/uploadMedia')
const { addProductHandler } = require('../controllers/productControllers')
const userRouter = express.Router()


userRouter.post("/",isLoggedIn,addProductHandler)

userRouter.post("/",signUpHandler)
userRouter.post("/", addUserHandler)
userRouter.post("/login",login)
userRouter.post("/logout",logout)
userRouter.get("/", middleware1, middleware2, getUsersHandler)
userRouter.post("/verify-account/:token",verifyAccount)
userRouter.post("/resend-verification",resendVerification)
userRouter.post("/activate-subscription/:userId", activateSubscription)


// userRouter.get("/verify-token",async (req,res) => {
//     let token;
//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//         token = req.headers.authorization.split(" ")[1]
//     }
//         if (!token) {
//         return res.status(403).json({
//             status: "error",
//             message: "No token was provided"
//         })
//     }
//     const {userId, email } = await jwt.verify(token, process.env.JWT_SECRET)

//     const tokenIsBlacklisted = await blacklistedTokenModel.findOne({token})
//     if (tokenIsBlacklisted) {
//         return res.status(403).json({
//             status: "error",
//             message: "This token is blacklisted"
//         })
//     }
//     const user = await userModel.findOne({email})

//     res.status(200).json({
//         status: "success",
//         user
//     })
// })



module.exports = userRouter