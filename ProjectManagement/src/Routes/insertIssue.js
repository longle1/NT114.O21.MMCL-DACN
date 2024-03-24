const express = require('express')
const projectModel = require('../models/projectModel')
const router = express.Router()

router.put('/insert/issue', async (req, res) => {
    try {
        const { project_id, issue_id } = req.body

        const currentProject = await projectModel.findById(project_id)

        if (currentProject) {
            let listIssue = currentProject.issues

            listIssue.push(issue_id)
            await projectModel.updateOne({ "_id": project_id }, { $set: { issues: listIssue } })

            return res.status(201).json({
                message: "Them thanh cong issue vao du an",
                data: currentProject
            })
        } else {
            return res.status(400).json({
                message: "Project khong ton tai",
                data: null
            })
        }
    } catch (error) {

    }
})

module.exports = router