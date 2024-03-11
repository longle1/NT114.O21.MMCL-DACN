const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    avatar: String,
})

const userModel = new mongoose.model('users', userSchema)

userSchema.pre("save", function(next) {
    if(this.isModified("password")) {
        //tien hanh ma hoa 
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)

        next()
    }

    next()
})

module.exports = userModel