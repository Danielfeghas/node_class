const userModel = require("../models/userModel")

const signup = async (req, res) => {
    try {
        const user = await userModel.create(req.body)
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Unable to signup"
            })
        }

        return res.status(201).json({
            status: "success",
            message: "signup successfully",
            user
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signup
}