const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    issueId: mongoose.Schema.Types.ObjectId,
    creator: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    },
    content: {
        type: String,
        default: null
    }
})

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel