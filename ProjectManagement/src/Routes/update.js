const express = require('express')
const projectModel = require('../models/projectModel')
const router = express.Router()


router.put('/update/:id', async (req, res) => {
    const { category, description, nameProject } = req.body.props
    const id = req.params.id
    const currentProject = await projectModel.findById(id)

    if (!currentProject) {
        return res.status(400).json({
            message: "Khong tim thay project"
        })
    } else {
        const updatedProject = await projectModel.updateOne(
            { "_id": id },
            { $set: { "category": category, "description": description, "nameProject": nameProject } }
        )

        res.status(200).json({
            message: "Cap nhat thanh cong project",
            data: updatedProject
        })
    }
})

module.exports = router