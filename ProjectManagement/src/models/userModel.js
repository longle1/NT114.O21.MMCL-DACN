const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    avatar: String
})

const userModel = new mongoose.model('users', userSchema)

module.exports = userModel