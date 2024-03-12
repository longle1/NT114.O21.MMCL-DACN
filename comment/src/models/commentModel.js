const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    issueId: String,
    creator: mongoose.Schema.Types.ObjectId,
    content: String
})

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel