const express = require("express")
const commentModel = require("../models/commentModel")
const commentPublisher = require("../nats/comment-publisher")
const router = express.Router()


router.post("/create", async (req, res) => {
    try {
        const result = await commentModel.create(req.body);
        //public toi issue service
        commentPublisher(result, "comment:created")
        res.status(201).json({
            message: "tao thanh cong comment",
            data: result
        })
    } catch (error) {

    }
})
module.exports = router