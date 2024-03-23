const express = require("express")
const currentUserMiddleware = require("../Middlewares/currentUser-Middleware")
const issueModel = require('../models/issueModel')
const router = express.Router()

router.get("/:id", currentUserMiddleware, async (req, res) => {
    const { id } = req.params

    const issue = await issueModel.findById(id)
        .populate({
            path: 'creator',
            select: '-__v'
        })
        .populate({
            path: 'assignees',
            select: '-__v'
        })
        .populate({
            path: 'comments',
            select: '-__v',
            populate: ({
                path: 'creator',
                select: '-__v'
            }),
            options: {
                sort: { timeStamp: -1 }
            }
        })

    if (issue) {
        return res.status(200).json({
            message: "Lay thanh cong issue",
            data: issue
        })
    }
    return res.status(400).json({
        message: "Lay that bai",
        data: null
    })

})


module.exports = router;