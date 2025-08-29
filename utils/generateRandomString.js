const crypto = require("crypto")


const generateRandomString = (num = 6) => {
    const randomString = crypto.randomBytes(num).toString("hex") // abcdef1234567890

    return randomString
}

module.exports = generateRandomString