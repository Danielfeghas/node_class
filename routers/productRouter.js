const express = require("express")
const productRouter = express.Router()
const { getAllProducts, getSingleProduct, updateProduct, deleteProduct, addProduct } = require("../controllers/productControllers")

productRouter.get("/", getAllProducts)
productRouter.post("/", addProduct)
productRouter.get("/:id", getSingleProduct)
productRouter.patch("/:id", updateProduct)
productRouter.delete("/:id", deleteProduct)

module.exports = productRouter