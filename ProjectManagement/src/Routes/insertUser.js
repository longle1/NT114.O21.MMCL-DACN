const express = require('express')
const userModel = require('../models/userModel')
const projectModel = require('../models/projectModel')

const router = express.Router()

router.post('/insert', async (req, res) => {
    try {
        const { project_id, user_id } = req.body.props
        const currentProject = await projectModel.findById(project_id)
        if (!currentProject) {
            return res.status(400).json({
                message: "khong tim thay project"
            })  
        } else {
            const listMembers = currentProject.members
            const isExisted = listMembers.findIndex(userId => userId.toString() === user_id)
            if (isExisted === -1) {
                listMembers.push(user_id)
    
                const updatedProject= await projectModel.updateOne(
                    { "_id": project_id },
                    { $set: { "members": listMembers } }
                )
    
                return res.status(200).json({
                    message: "Them thanh cong user vao du an",
                    data: updatedProject
                })
            }
            return res.status(400).json({
                message: "User da duoc them vao du an nay"
            })
        }
    }catch(error) {
        console.log("error", error);
    }
})

module.exports = router