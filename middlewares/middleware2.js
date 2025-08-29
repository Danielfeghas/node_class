const middleware2 = (req,res,next)=>{
    if (5>9) {
        return res.status(400).json({
            message: "Middleware two returned a response"
        })
    }
    req.middleware2 = "MIDDLEWARE TWO BODY"
    next()
}

module.exports = middleware2