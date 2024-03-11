const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const errorHandler = require("./Middlewares/Error-handler")
const mongoose = require("mongoose")
const cookieSession = require('cookie-session')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
    signed: false,
    secure: true    
}))

app.use('/api/users', require('./Routes/signup'))
app.use('/api/users', require('./Routes/login'))
app.use('/api/users', require('./Routes/currentUser'))
app.use('/api/users', require('./Routes/logout'))   


async function connectToMongoDb() {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/db") 

        console.log("Ket noi thanh cong database");
    } catch (error) {
        console.log("Kết nối thất bại tới database");
    }
}

connectToMongoDb()

app.use(errorHandler)

app.listen(4000, () => {
    console.log("Listening on port 4000");
})