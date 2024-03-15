const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: null
    }
})

userSchema.virtual('ProjectRefCategory', {
    ref: 'projects',
    localField: '_id',
    foreignField: 'category'
})

userSchema.virtual('ProjectRefCreator', {
    ref: 'projects',
    localField: '_id',
    foreignField: 'creator'
})

const userModel = new mongoose.model('users', userSchema)

module.exports = userModel