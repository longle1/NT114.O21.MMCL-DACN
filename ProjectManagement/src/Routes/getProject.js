const express = require('express')
const projectModel = require('../models/projectModel')
const router = express.Router()

router.get('/:id', async (req, res) => {
    const id = req.params.id

    const currentProject = await projectModel.findById(id)
        .populate({
            path: 'members',
            select: '-__v -avatar'
        })

    if (!currentProject) {
        res.status(400).json({
            message: "Project khong ton tai"
        })
    } else {
        res.status(200).json({
            message: "Lay thanh cong project",
            data: currentProject
        })
    }
})

module.exports = router