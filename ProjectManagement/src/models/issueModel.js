const mongoose = require("mongoose")

const issueSchema = new mongoose.Schema({
    projectId: mongoose.Schema.Types.ObjectId,
    priority: Number,
    shortSummary: String,
    positionList: Number,
    issueType: Number,
    issueStatus: Number
})

const issueModel = mongoose.model('issues', issueSchema)

module.exports = issueModel