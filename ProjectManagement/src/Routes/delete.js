const express = require('express')
const projectModel = require('../models/projectModel')
const router = express.Router()


router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    const currentProject = await projectModel.findById(id)

    if (!currentProject) {
        return res.status(400).json({
            message: "Khong tim thay project"
        })
    } else {
        const deletedProject = await projectModel.deleteOne({ _id: id })
        res.status(200).json({
            message: "Xoa thanh thanh cong project",
            data: deletedProject
        })
    }
})

module.exports = router