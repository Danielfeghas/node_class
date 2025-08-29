const jwt = require("jsonwebtoken")
const blacklistedTokenModel = require("../models/blacklistedTokens");
const userModel = require("../models/userModel");

const isLoggedIn = async (req,res,next)=>{
    //check if there is a token in the request headers Authorization
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return res.status(403).json({
            status: "error",
            message: "No token was provided"
        })
    }
    // check if the token is valid 
    // check if the token has not expired
     
    const {userId, email} = await jwt.verify(token, process.env.JWT_SECRET)
    // const decoded = await jwt.verify(token,process)

    //check if the token has not been blacklisted
    const tokenIsBlacklisted = await blacklistedTokenModel.findOne({token})
    if (tokenIsBlacklisted) {
        return res.status(403).json({
            status:"error",
            message: "This token has been black listed"
        })
    }

    // Find the owner(user) of the token
    const user = await userModel.findOne({email})

    //Add the user to the request object for other middlewares/ request handler to use
    req.user = user

    next()
}

module.exports = isLoggedIn