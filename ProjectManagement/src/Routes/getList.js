const express = require('express')
const projectModel = require('../models/projectModel')
const router = express.Router()


router.get('/list', async (req, res) => {
    const data = await projectModel
        .find({})
        .populate({
            path: 'category',
            select: ' -__v'
        })
        .populate({
            path: 'creator',
            select: '-__v'
        })
        .populate({
            path: 'members',
            select: '-__v'
        })
        .populate({
            path: 'issues',
            select: '-__v'
        })
    res.send({
        message: "Lay danh sach thanh cong",
        data
    })
})

module.exports = router