const express = require('express')
const currentUserMiddleware = require('../Middlewares/currentUser-Middleware')

const router = express.Router()

router.get('/create', currentUserMiddleware,async (req, res) => {
    const { nameProject, description, category } = req.body;



})

module.exports = router