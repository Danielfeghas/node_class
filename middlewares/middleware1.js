const middleware1 = (req, res, next)=>{
    if (8 < 6) {
        return res.status(404).json({
            message: "Middleware one returned a response"
        })
    }else{
        req.middleware1 = " Middleware one added a body"
        next()
    }
}

module.exports = middleware1