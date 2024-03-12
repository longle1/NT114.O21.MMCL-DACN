const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieSession = require("cookie-session")

const cors = require('cors')
const errorHandler = require("./Middlewares/Error-handler")

const app = express()

app.set('trust proxy', 1)

app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use(bodyParser.json())
app.use(cors())

async function connectToMongoDb() {
    try {
        await mongoose.connect("mongodb://comment-mongo-srv:27017/db") 

        console.log("Ket noi thanh cong database");
    } catch (error) {
        console.log("Kết nối thất bại tới database");
    }
}

connectToMongoDb()

app.use(errorHandler)

app.listen(4001, () => {
    console.log("Listening on port 4001");
})
