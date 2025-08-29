const express = require("express")
const productRouter = express.Router()
const { getAllProductsHandler, getSingleProduct, updateProduct, deleteProduct, addProductHandler,searchSortFilterProducts } = require("../controllers/productControllers")
const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")
const productImageUpload = require("../middlewares/uploadMedia")

productRouter.post("/", isLoggedIn,productImageUpload.single("image"), addProductHandler)

productRouter.get("/", getAllProductsHandler)
productRouter.get("/:id", getSingleProduct)
productRouter.get("/search", searchSortFilterProducts)
productRouter.patch("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)

module.exports = productRouter