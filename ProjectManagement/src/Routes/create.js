const express = require('express')
const currentUserMiddleware = require('../Middlewares/currentUser-Middleware')
const projectModel = require('../models/projectModel')
const BadRequestError = require('../Errors/Bad-Request-Error')

const router = express.Router()

router.post('/create', currentUserMiddleware, async (req, res, next) => {
    try {
        const { nameProject, description, category, creator } = req.body;
        console.log("req.body", category);
        const existedProject = await projectModel.findOne({ nameProject })
        //neu project chua ton tai
        if (existedProject) {
            throw new BadRequestError("Project already existed")
        } else {
            const project = await projectModel.create({
                nameProject,
                description,
                category,
                creator
            })
            res.status(201).json({
                message: "Initial success project",
                data: project
            })
        }

        res.status(200).json({
            message: "Something went wrong",
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router