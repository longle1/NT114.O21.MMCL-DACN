const express = require("express")
const currentUserMiddleware = require("../Middlewares/currentUser-Middleware")
const issueModel = require('../models/issueModel')
const router = express.Router()

router.delete("/delete/:id", currentUserMiddleware, async (req, res) => {
    try {
        const { id } = req.params.id

        const currentIssue = await issueModel.findById(id)
        if (!currentIssue) {
            return res.status(400).json({
                message: "Khong tim thay issue"
            })
        } else {
            await issueModel.deleteOne({ _id: id })
            return res.status(200).json({
                message: "Xoa thanh cong user"
            })
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router;