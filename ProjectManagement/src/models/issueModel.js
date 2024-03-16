const mongoose = require("mongoose")

const issueSchema = new mongoose.Schema({
    projectId: mongoose.Schema.Types.ObjectId,
    priority: {
        type: Number,
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
})

issueSchema.virtual('issueRefProject', {
    ref: 'projects',
    localField: '_id',
    foreignField: 'issues'
})

const issueModel = mongoose.model('issues', issueSchema)

module.exports = issueModel