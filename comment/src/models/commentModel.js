const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    issueId: {
        type: String,
        default: null
    },
    creator: mongoose.Schema.Types.ObjectId,
    content: {
        type: String,
        default: null
    }
})

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel