const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const errorHandler = require("./Middlewares/Error-handler")
const natsWrapper = require("./nats-wrapper")

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.set('trust proxy', 1)

app.use(cookieSession({
    signed: false,
    secure: true
}))

app.use('/api/issue', require('./Routes/create'))

async function connectToNats() {
    try {
        await natsWrapper.connect('jiraproject', 'issue', 'http://nats-srv:4222')
        natsWrapper.client.on('close', () => {
            console.log('NATs connection closed');
            process.exit()
        })

        process.on('SIGINT', () => { natsWrapper.client.close() })
        process.on('SIGTERM', () => { natsWrapper.client.close() })
        console.log("Ket noi thanh cong toi nats");
    } catch (error) {
        console.log("Kết nối thất bại tới nats", error);
    }
}


async function connectToMongoDb() {
    try {
        await mongoose.connect("mongodb://issue-mongo-srv:27017/db") 

        console.log("Ket noi thanh cong database");
    } catch (error) {
        console.log("Kết nối thất bại tới database");
    }
}

connectToMongoDb()
connectToNats()

app.use(errorHandler)

app.listen(4002, () => {
    console.log("Listening on port 4002");
})
