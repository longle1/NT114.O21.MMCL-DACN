const express = require('express')
const projectModel = require('../models/projectModel')
const issueModel = require('../models/issueModel')
const projectManagementPublisher = require('../nats/publisher/projectmanagement-publisher')
const router = express.Router()

router.put('/delete/user/:id', async (req, res) => {
    const id = req.params.id

    const currentProject = await projectModel.findById(id)
        .populate({
            path: 'issues'
        })
    if (currentProject) {
        let listMembers = currentProject.members
        const index = listMembers.findIndex(user => user._id.toString() === req.body.userId)
        if (index !== -1) {
            listMembers.splice(index, 1)
            await projectModel.updateOne({ "_id": id }, { $set: { members: listMembers } })

            //đồng thời cũng xóa các bài viết của người này hoặc dự án mà người này đang tham gia
            const issueList = currentProject.issues

            if (issueList) {
                //nếu người dùng đó đã là người tạo các issue thì xóa các issue liên quan
                for (let issue of issueList) {
                    console.log("cac issue ton tai", issue);
                    if (issue.creator.toString() === req.body.userId) {
                        await issueModel.deleteOne({ _id: issue._id })

                        await projectManagementPublisher(issue, "issue:deletedcreator")
                    } else {
                        const index = issue.assignees.findIndex(user => user._id.toString() === req.body.userId)

                        if (index !== -1) {
                            issue.assignees.splice(index, 1)

                            await issueModel.updateOne({ _id: issue._id }, { $set: { assignees: issue.assignees } })

                            //gui kem theo id cua nguoi assignee de xoa cac comment lien quan toi ho
                            await projectManagementPublisher({ issue, userId: req.body.userId }, "issue:deletedassignee")
                        }
                    }
                }
            }

            return res.status(201).json({
                message: "Xóa thành công người này"
            })
        } else {
            return res.status(400).json({
                message: "Không tim thấy user"
            })
        }

    } else {
        return res.status(400).json({
            message: "Project khong ton tai",
            data: null
        })
    }
})

module.exports = router