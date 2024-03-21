const express = require("express")
const commentModel = require("../models/commentModel")
const commentPublisher = require("../nats/comment-publisher")
const router = express.Router()


router.put("/update/:id", async (req, res) => {
    try {
        const result = await commentModel.updateOne({ _id: req.params.id }, { content: req.body.content, timeStamp: req.body.timeStamp, isModified: true })
        //public toi issue service
        commentPublisher({ _id: req.params.id, content: req.body.content, timeStamp: req.body.timeStamp, isModified: true }, "comment:updated")
        res.status(201).json({
            message: "Cập nhật thành công 1 comment",
            data: result
        })
    } catch (error) {

    }
})
module.exports = router