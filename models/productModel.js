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
        required:true,
        minLength:20
    },
    status: {
        type: String,
       default: "pending",

        enum: ["pending", "approved","rejected"]

    },
    category: {
        type: String,
        enum: ["fashion","Gadget", "Electronics"]
    },
    inStock: {
        type: Boolean,
    },
    seller : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    image: {
        type: String,
        required: true
    }
})

//enum == specific

const productModel = mongoose.model("products", productSchema)
module.exports = productModel

