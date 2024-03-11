const express = require("express")
const userModel = require("../models/users")
const BadRequestError = require("../Errors/Bad-Request-Error")
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post("/signup", async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const existedUser = await userModel.findOne({ email })
        

        //kiem tra xem user da ton tai hay chua
        if (!existedUser) {
            const newUser = {
                username,
                email,
                password,
                avatar: `https://ui-avatars.com/api/?name=${username}`
            }
            const user = await userModel.create(newUser)
            await user.save()

            const userJwt = jwt.sign({
                id: user.id,
                email: user.email,
            }, process.env.JWT_KEY)
            //luu tru jwt trong cookie
            req.session = {
                jwt: userJwt
            }
            res.status(201).json({
                message: "Successfully created user",
                statusCode: 201,
                data: newUser
            })
        } else {
            throw new BadRequestError("User is already existed")
        }
    }catch(error) {
        next(error)
    }
})

module.exports = router