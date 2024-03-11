const express = require("express")

const bodyParser = require("body-parser")

const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const call = async () => {
    // const result = await axios.post('http://auth-srv:4000/api/users/signup', {
    //     username: 'longle',
    //     email: 'ltphilong2001@gmail.com',
    //     password: '12345'
    // })

    await axios.post('http://auth-srv:4000/api/users/signup', {
        username:'23',
        email: '12',
        password: '123123'
    })
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            // Xử lý lỗi nếu có
            console.log(error.data);
        });
}

call()

app.listen(4001, () => {
    console.log("Listening on port 4001");
})
