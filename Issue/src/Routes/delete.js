const express = require("express")
const currentUserMiddleware = require("../Middlewares/currentUser-Middleware")
const issueModel = require('../models/issueModel')
const commentModel = require('../models/commentModel')
const issuePublisher = require('../nats/publisher/issue-publisher')
const router = express.Router()

router.delete("/delete/:id", currentUserMiddleware, async (req, res) => {
    try {
        const { id } = req.params

        const currentIssue = await issueModel.findById(id)
        if (!currentIssue) {
            return res.status(400).json({
                message: "Issue not found"
            })
        } else {
            await issueModel.deleteOne({ _id: id })

            //publish sự kiện để issue trong projectmanagement service
            await issuePublisher(currentIssue, "issue:deleted")


            if (currentIssue.comments.length > 0) {
                //xoa cac comment cua issue
                await commentModel.deleteMany({ _id: { $in: currentIssue.comments } })

                //publish su kien xoa cac comment trong comment service
                await issuePublisher(currentIssue.comments, 'issue-comment:deleted')
            }
            console.log("Lỗi ngang này");
            return res.status(200).json({
                message: "Successfully deleted this issue"
            })
        }
    } catch (error) {
        console.log("Xảy ra lôix trong này");
        next(error)
    }
})


module.exports = router;