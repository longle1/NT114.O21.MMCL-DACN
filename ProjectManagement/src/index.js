const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(bodyParser.json())
app.use(cors())


async function connectToMongoDb() {
    try {
        await mongoose.connect("mongodb://projectmanagement-mongo-srv:27017/db") 

        console.log("Ket noi thanh cong database");
    } catch (error) {
        console.log("Kết nối thất bại tới database");
    }
}

connectToMongoDb()

app.listen(4003, () => {
    console.log("Listening on port 4003");
})
