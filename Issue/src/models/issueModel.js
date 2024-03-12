const mongoose = require("mongoose")

const issueSchema = new mongoose.Schema({
    projectId: mongoose.Schema.Types.ObjectId,
    creator: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    priority: Number,
    timeSpent: Number,
    timeRemaining: Number,
    timeOriginalEstimate: Number,
    desciption: String,
    shortSummary: String,
    positionList: Number,
    issueType: Number,
    issueStatus: Number,
    assignees: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            comment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comments'
            }
        }
    ]
})

const issueModel = mongoose.model('issues', issueSchema)

module.exports = issueModel