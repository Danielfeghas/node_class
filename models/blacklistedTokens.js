const mongoose =require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true
    }
})

const blacklistedTokenModel = mongoose.model("blacklistedTokens", blacklistedTokenSchema);
module.exports = blacklistedTokenModel;