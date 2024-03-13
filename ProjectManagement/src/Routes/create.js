const express = require('express')
const currentUserMiddleware = require('../../../Issue/src/Middlewares/currentUser-Middleware')

const router = express.Router()

router.post('/create', currentUserMiddleware, (req, res) => {
    
})

module.export = router