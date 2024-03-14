const express = require('express')
const currentUserMiddleware = require('../Middlewares/currentUser-Middleware')
const projectModel = require('../models/projectModel')
const BadRequestError = require('../Errors/Bad-Request-Error')

const router = express.Router()

router.post('/create', currentUserMiddleware, async (req, res, next) => {
    try {
        const { projectName, description, category } = req.body;
        const existedProject = await projectModel.findOne({ projectName })

        console.log(existedProject);
        //neu project chua ton tai
        if (existedProject) {
            console.log("project da ton tai");
            throw new BadRequestError("Project already existed")
        } else {
            console.log("project chua ton tai");
            const project = await projectModel.create({
                projectName,
                description,
                category
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