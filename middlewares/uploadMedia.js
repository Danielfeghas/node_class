//multer
// multer-storage-cloudinaryy

//using multer to create a middleware before passing the file to DB

const multer = require("multer")
const { CloudinaryStorage} = require ("multer-storage-cloudinary")
const cloudinary = require("../config/cloudinary")


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "products",
        allowedFormats: ["jpg","png","jpeg","gif"],
        transformation: [{width:500, height: 500}]
    }
})

const productImageUpload = multer({storage})
module.exports = productImageUpload