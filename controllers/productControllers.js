const productModel = require("../models/productModel")

const addProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body)
        if (!product) {
            return res.status(400).json({
                status: "error",
                message: "Product not created"
            })
        }

        return res.status(201).json({
            status: "success",
            message: "Product added successfully",
            product
        })

    } catch (error) {
        console.log(error)
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        if (!products) {
            return res.status(400).json({
                status: "error",
                message: "Products not fetched"
            })
        }

        return res.status(200).json({
            status: "success",
            mesasge: "All products fetched",
            products
        })
    } catch (error) {
        console.log(error)
    }
}

const getSingleProduct = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Get single product"
    })
}

const updateProduct = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Product has been updated"
    })
}

const deleteProduct = (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Product has been deleted"
    })
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    addProduct
}


