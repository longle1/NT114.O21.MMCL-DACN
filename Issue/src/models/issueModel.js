const mongoose = require("mongoose")

const issueSchema = new mongoose.Schema({
    projectId: mongoose.Schema.Types.ObjectId,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    priority: {
        type: Number,
        default: null
    },
    timeSpent: {
        type: Number,
        default: null
    },
    timeRemaining: {
        type: Number,
        default: null
    },
    timeOriginalEstimate: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    shortSummary: {
        type: String,
        default: null
    },
    positionList: {
        type: Number,
        default: null
    },
    issueType: {
        type: Number,
        default: null
    },
    issueStatus: {
        type: Number,
        default: null
    },
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