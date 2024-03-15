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
    }
})

const issueModel = mongoose.model('issues', issueSchema)

module.exports = issueModel