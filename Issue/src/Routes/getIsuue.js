const express = require("express")
const currentUserMiddleware = require("../Middlewares/currentUser-Middleware")

const router = express.Router()

router.post("/api/comment/update", currentUserMiddleware, (req, res) => {

})


module.exports = router;