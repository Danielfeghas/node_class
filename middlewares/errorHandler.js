//1. study the error object
//2. look for something unique to the error
//3. handle it

//VALIDATION ERROR
const handleValidationError = (err)=>{

}

//CAST ERROR
const handleCastError = (err)=>{
    const message =`${err.value} ia an invalid ${err.path}`
    return{
        statusCode: 400,
        message
    }
}

//DUPLICATE ERROR
const handleDuplicate = (err) => {
    const errKey = Object.keys(err.keyValue)[0]
    const errValue = Object.values(err.KeyValue)[0]
    const statusCode = 400
    const message = `${errKey} of ${errValue} already exists`
    return {
        statusCode,
        message
    }
}

 //JWT ERROR
//  const handleJwtError = (err)=> {
//     const message = `${}`

//  }



const errorHandler = (err, req, res, next)=>{
    console.log(err);
    if (err.code === 11000) {
        const error = handleDuplicate(err)
        res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }else if (err.name == "CastError") {
       const error = handleCastError(err) 
       res.status(error.statusCode).json({
        status:"error",
        message:error.message
       })
    } else {
        res.status(500).json({
            status:"error",
            message: "something went wrong"
        })

    }
    
}

module.exports = errorHandler