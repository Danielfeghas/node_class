const express = require("express")
const dotenv = require("dotenv")
const app = express()
const connectToDb = require("./config/connectToDb")
connectToDb()

dotenv.config()

app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`)
})

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to jumia API v1"
    }) 
})

// ROUTERS
const productRouter = require("./routers/productRouter")
const userRouter = require("./routers/userRouter")

app.use("/products", productRouter)
app.use("/users", userRouter)