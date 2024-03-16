const express = require("express")
const currentUserMiddleware = require("../Middlewares/currentUser-Middleware")

const router = express.Router()
router.put("/comments/insert/:id", currentUserMiddleware, async (req, res) => {
    const { id } = req.params.id
    const commentId = req.body
    const currentIssue = await issueModel.findById(id)
    if (!currentIssue) {
        return res.status(400).json({
            message: "Khong tim thay issue"
        })
    } else {

        let comments = currentIssue.comments

        comments.push(commentId)

        const data = await issueModel.updateOne({ _id: id }, { $set: { comments: comments } })
        return res.status(200).json({
            message: "Them thanh cong comment",
            data: data
        })
    }
})

module.exports = router;