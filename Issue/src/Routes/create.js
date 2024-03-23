const express = require("express")
const issueModel = require('../models/issueModel')
const currentUserMiddleware = require("../Middlewares/currentUser-Middleware")
const issuePublisher = require("../nats/publisher/issue-publisher")

const router = express.Router()

router.post("/create", currentUserMiddleware, async (req, res) => {
    try {

        const newIssue = await issueModel.create(req.body)

        const issueCopy = {
            _id: newIssue._id,
            projectId: newIssue.projectId,
            priority: newIssue.priority,
            shortSummary: newIssue.shortSummary,
            positionList: newIssue.positionList,
            issueType: newIssue.issueType,
            issueStatus: newIssue.issueStatus,
            assignees: newIssue.assignees,
            creator: newIssue.creator
        }

        issuePublisher(issueCopy, 'issue:created')

        return res.status(201).json({
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