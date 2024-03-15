const express = require("express")
const issueModel = require('../models/issueModel')
const currentUserMiddleware = require("../Middlewares/currentUser-Middleware")
const issuePublisher = require("../nats/publisher/issue-publisher")

const router = express.Router()

router.get("/create", currentUserMiddleware, async (req, res) => {
    try {
        const { projectId, creator, priority, timeSpent, timeRemaining, timeOriginalEstimate, description, shortSummary, positionList, issueType, issueStatus, assignees } = req.body

        const newIssue = await issueModel.create({
            projectId,
            priority,
            shortSummary,
            positionList,
            issueType,
            issueStatus,
            assignees,
            creator,
            timeSpent,
            timeRemaining,
            timeOriginalEstimate,
            timeOriginalEstimate,
            description
        })

        


        const issueCopy = {
            _id: newIssue._id,
            projectId: newIssue.projectId,
            priority: newIssue.priority,
            shortSummary: newIssue.shortSummary,
            positionList: newIssue.positionList,
            issueType: newIssue.issueType,
            issueStatus: newIssue.issueStatus
        }

        issuePublisher(issueCopy, 'issue:created')

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