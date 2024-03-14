const express = require("express")
const issueModel = require('../models/issueModel')
const currentUserMiddleware = require("../Middlewares/currentUser-Middleware")
const issueCreatedPublisher = require("../nats/listener/issue-created-publisher")

const router = express.Router()

router.get("/create", currentUserMiddleware, async (req, res) => {
    try {
        const { description, shortSummary } = req.body

        const newIssue = await issueModel.create({
            description: "tron vn", 
            shortSummary: "tron vn"
        })

        console.log(newIssue);

        issueCreatedPublisher(newIssue)

        res.status(201).json({
            message: "tao thanh cong 1 issue",
            data: newIssue
        })

    } catch (error) {
        res.status(400).json({
            message: error,
            data: null
        })
    }
})


module.exports = router;