const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    nameProject: String,
    description: String,
    creator: mongoose.Schema.Types.ObjectId,
    members: [
        {
            users: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    projectStatus: [
        {
            issue: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'issues'
            }
        }
    ]
})

const projectModel = mongoose.model('projects', projectSchema)

module.exports = projectModel