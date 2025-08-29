const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express()
const connectToDb = require("./config/connectToDb")
connectToDb()
require("./config/nodemailerTransporter")

const sendEmail = require("./utils/sendEmail")
// sendEmail("danielfeghas01@gmail.com", "daniel feghas")

//ERROR HANDLING...
//1-- wrong endpoint
//2-- error


dotenv.config()

// ROUTERS
const productRouter = require("./routers/productRouter")
const userRouter = require("./routers/userRouter")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json())
app.use(cors())


const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to jumia API v1"
    }) 
})



app.use("/products", productRouter)
app.use("/users", userRouter)


app.use("/{*any}", errorHandler)



app.all("/{*any}", (req, res)=>{
    res.status(404).json({
        message: `${req.method} ${req.originalUrl} is not an endpoint on this server`
    })
})


// app.all("*",(req, res)=>{
//     res.status(404).json({
//         status: "error",
//         message: "Endpoint does not exist"
//     })
// })

// PACKAGES FOR CLOUDINARY
//1. Cloudinary
//2. multer
//3. multer-storage-cloudinary


//MVC + R = MODEL, VIEW , CONTROLLER,ROUTES
// AUTHENTICATION & AUTHORIZATION

// Middleware => function that invoke itself before the final request handler
//MIDDLEWARE= { isLoggedIn, isAdmin, isVerified, isActiveSubscriber, isPremierSubscriber}
//LOGOUT