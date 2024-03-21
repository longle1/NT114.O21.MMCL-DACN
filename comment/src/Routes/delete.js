const express = require("express")
const commentModel = require("../models/commentModel")
const commentPublisher = require("../nats/comment-publisher")
const router = express.Router()


router.delete("/delete/:id", async (req, res) => {
    try {
        const result = await commentModel.deleteOne({ _id: req.params.id })

        //public toi issue service
        commentPublisher({ _id: req.params.id }, "comment:deleted")
        res.status(201).json({
            message: "Xóa thành công 1 comment",
            data: result
        })
    } catch (error) {

    }
})
module.exports = router