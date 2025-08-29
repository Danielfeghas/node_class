const productModel = require("../models/productModel")

const addProductHandler = async (req, res) => {
    console.log(req.user);
    const userId = req.user._id
    const file = req.file
    if (!file) {
        return res.status(400).json({
            status: "error",
            message: "file not found"
        })
    }
    
    try {
        const product = await productModel.create({...req.body, seller:userId, image: file.path})
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

const getAllProductsHandler = async (req, res) => {
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

const getSingleProduct = async (req, res,next) => {
    const {productId} = req.params
    try {
        const product = await productModel.findById(productId).populate("seller","name email companyName").select("+inStock -category")

        if (!product) {
           return res.status(400).json({
            status: "error",
            message: "Unable to fetch product"
           }) 
        }

        res.status(200).json({
            status: "success",
            message: "Get single product",
            product
        })

    } catch (error) {
        console.log(error);
        next(error)
        
    }
}

const updateProduct = async (req, res) => {
    const {productId}= req.params
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(productId,req.body)
        if (!updatedProduct) {
           return res.status(400).json({
            status: "error",
            message: "Unable to update product"
           }) 
        }

        res.status(200).json({
            status: "success",
            message: "Product has been updated",
            product:updatedProduct
        })

    } catch (error) {
        console.log(error);
        
    }
}

const deleteProduct = async (req, res) => {
    const {productId} = req.params
    try {
        await productModel.findByIdAndDelete(productId)
        res.status(200).json({
            status: "success",
            message: "Product has been deleted"
        })

    } catch (error) {
       console.log(error);
        
    }
}

const searchSortFilterProducts = async () => {
    try {
        const {search, minPrice, maxPrice} = req.query

        const query = {}
        if (search) {
            query.$or = [
                {name: new RegExp(search)}, // Nike Shoe
                {description: new RegExp(search)}
            ]
        }

        if (minPrice) {
            query.price = {
                $gte: minPrice
            }
        }

        if (maxPrice) {
            query.price = {
                $lte: maxPrice
            }
        }

        const products = await productModel.find(query)
        if (!products) {
            return res.status(400).json({
                status: "error",
                message: "Unable to fetch products"
            })
        }

        return res.status(200).json({
            status: "success",
            mesasge: "All products fetched",
            count: products.length,
            products
        })
    } catch (error) {
        console.log(error)
    }
}


// Model.deleteMany()
// Model.deleteOne()
// Model.find() => get all document in a collection
// Model.find({query}:{name: (nike)}) => get all document that matches the query in a collection
// Model.findById() => return a single document with the specified objectId
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()







module.exports = {
    getAllProductsHandler,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    addProductHandler,
    searchSortFilterProducts
}


