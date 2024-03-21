const express = require("express")
const currentUserMiddleware = require("../Middlewares/currentUser-Middleware")
const issueModel = require('../models/issueModel')
const issuePublisher = require("../nats/publisher/issue-publisher")
const router = express.Router()

router.put("/update/:id", currentUserMiddleware, async (req, res, next) => {
    try {
        const id = req.params.id
        let currentIssue = await issueModel.findById(id)
        if (!currentIssue) {
            return res.status(400).json({
                message: "Khong tim thay issue"
            })
        } else {
            //kiem tra xem assignees co duoc them vao hay khong
            let listAssignees = currentIssue.assignees
            if (req.body.assignees != null) {
                listAssignees = listAssignees.concat(req.body.assignees)
                //them assignees moi vao danh sach neu duoc them vao    
                req.body.assignees = listAssignees
            }
            currentIssue = { ...currentIssue._doc, ...req.body }
            await issueModel.updateOne({ _id: id }, currentIssue)
            const copyIssue = {
                _id: currentIssue._id,
                priority: currentIssue.priority,
                shortSummary: currentIssue.shortSummary,
                positionList: currentIssue.positionList,
                issueType: currentIssue.issueType,
                issueStatus: currentIssue.issueStatus,
                assignees: currentIssue.assignees
            }
            //public su kien toi projectmanagement service
            issuePublisher(copyIssue, 'issue:updated')

            return res.status(200).json({
                message: "Cap nhat thanh cong issue",
                data: currentIssue
            })

            console.log("ra ngoai nay rofi");

        }
    } catch (error) {
        next(error)
    }
})


module.exports = router;