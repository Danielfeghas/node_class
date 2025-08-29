const userModel = require("../models/userModel")
const bcrypt = require ("bcryptjs")
const jwt = require("jsonwebtoken")
const blacklistedTokenModel = require("../models/blacklistedTokens")
const generateRandomString = require("../utils/generateRandomString")
const sendEmail = require("../utils/sendEmail")

// sendEmail("danielfeghas01@gmail.com", "daniel feghas")


// const notification = sendEmail

//middleware= a function that invoke itself before the final request handler


const signUpHandler = async (req, res, next) => {
    const {password}= req.body
    try {
        const salt = await bcrypt.genSalt(10)
        // hashedPassWord
        const hashedPassword = await bcrypt.hash(password, salt)
        //Generate random token
        const verificationToken = generateRandomString()
        // Generate verification expiration
        const verificationExp = Date.now() + 3600000 // next 1 hr
        // Save user to DB
        const user = await userModel.create({...req.body, password: hashedPassword, verificationToken,verificationExp})
        // send verification email to user
        sendEmail(user.email, user.name, verificationToken)


        const result = {
            name: user.name,
            email:user.email,
            companyName: user.companyName
        }
        
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Unable to create user"
            })
        }
       
        
        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            user: result,
            
            
        })
        
    } catch (error) {
        // console.log(error);
        next(error)
        
    }
}

const login = async (req,res) => {
    const {email, password} = req.body
    try {
        //VERIFY THE EMAIL
        const user = await userModel.findOne({email}).select("+password")
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Email or password is incorrect"
            })
        }

        //VERIFY THE PASSWORD
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({
                status: "error",
                message: "Email or password is incorrect"
            })
        }

        // GENERATE ACCESS TOKEN
        const token = jwt.sign({userId: user.id, email: user.email},process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_SECRET_EXP
        })
        
        
        
        return res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
            email
        })

    } catch (error) {
        console.log(error);
        
    }
}

const logout = async (req, res) => {
    const {token}= req.body
    if (!token) {
        return res.status(400).json({
            status: "error",
            message: "Token is required"
    })
    }
    try {
        await blacklistedTokenModel.create({token})
        return res.status(200).json({
            satus: "success",
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log(error);
        
    }
}




const addUserHandler = async (req, res) => {
    try {
        const user = await userModel.create(req.body)
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "User not created"
            })
        }

        return res.status(201).json({
            status: "success",
            message: "User added successfully",
            user
        })
    } catch (error) {
        console.log(error)
    }
}


// GET ALL USERS
const getUsersHandler = async (req, res) => {
    console.log(req.middleware1)
    try {
        const users = await userModel.find()
        if (!users) {
            return res.status(400).json({
                status: "error",
                message: "Unable to fetch users"
            })
        }

        res.status(200).json({
            status: "success",
            message: "all users fetched",
            users
        })

    } catch (error) {
        console.log(error)
    }
}

// VERIFY ACCOUNT

const verifyAccount = async (req,res) => {
    // collect the token
    const {token} = req.params
    try {
      // find the user with the token
      const user = await userModel.findOne({verificationToken: token})  
      if (!user) {
        return res.status(404).json({
            status: "error",
            message: "This token is either invalid or has been verified"
        })
      }

      // check expiration

      if (user.verificationExp < Date.now()) {
        return res.status(400).json({
            status: "error",
            message: "Token has expired. Kindly request for verification again"
        })
      }

      // update the user token and exp to null
      await userModel.findOneAndUpdate(user._id, {verificationExp: null, verificationToken: null, verified: true})
      res.status(200).json({
        status: "success",
        message: "Account verified successfully"
      })
    } catch (error) {
        console.log(error);
        
    }
}

// RESEND VERIFICATION

const resendVerification = async (req, res) => {
    const {email} = req.body;

    try {
       const user = await userModel.findOne({email}) ;
       if (!user) {
        return res.status(404).json({
            status: "error",
            message: "user not found"
        })
       }

       if (user.verified) {
        return res.status(400).json({
            status: "error",
            message: "Account already verified"
        })
       }

       //to check if the token is still valid
       if (user.verificationExp && user.verificationExp > Date.now()) {
        return res.status(400).json({
            status: "error",
            message: "A verification email was sent recently."
        })
       }

       //generate new token and expiration

       const newToken = generateRandomString()
       const newExp = Date.now() +3600000; // an hour

       // update the user
       user.verificationToken = newToken
       user.verificationExp = newExp

       // send new verification email
       sendEmail(user.email, user.name, newToken)
       res.status(200).json({
        status: "success",
        message: "A new verification email has been sent"
       })


    } catch (error) {
        console.log(error);
        
    }
}

// ACTIVATE SUBSCRIPTION
 
const activateSubscription = async (req, res) => {
    const {userId} = req.params;
    console.log(userId);
    
    
    try {
       const user = await userModel.findById(userId) 

       if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found"
        })
       }
       user.subscription = "ACTIVE"
       await user.save()

       return res.status(200).json({
        status: "success",
        message: "Your subscription is activated successfully"
       })
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {
    addUserHandler,
    getUsersHandler,
    signUpHandler,
    login,
    logout,
    verifyAccount,
    resendVerification,
    activateSubscription
}