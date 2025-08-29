const isAdmin = (req, res, next) => {
    const user = req.user
    if (user.role !== "admin") {
        return res.status(403).json({
            status: "error",
            message: "You are not authorize to perform this action"
        })
    }

    next()
}

module.exports = isAdmin