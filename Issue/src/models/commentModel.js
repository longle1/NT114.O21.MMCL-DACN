const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    issueId: String,
    creator: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    content: String
})

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel