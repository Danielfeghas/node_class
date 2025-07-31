const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    // 
    name: {
        type: String,
        required: true,
        minLength: 10 
    },
    price: {
        type: Number,
        required: true,
        min: 100
    },
    description: {
        type: String,
    }
})

const productModel = mongoose.model("products", productSchema)
module.exports = productModel

