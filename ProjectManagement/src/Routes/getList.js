const express = require('express')
const projectModel = require('../models/projectModel')
const categoryModel = require('../models/categoryModel')
const router = express.Router()

const objects = [
    "Kinh te chinh tri",
    "Thuong mai dien tu",
    "Cong nghe thong tin",
    "Buu chinh vien thong",
    "Cong nghe thuc pham",
    "Mang may tinh va truyen thong",
    "An toan thong tin",
    "Khoa hoc may tinh",
    "Khoa hoc du lieu"
]

router.get('/hehe', async(req, res) => {
    for(const obj of objects) {
        await categoryModel.create({
            name: obj
        })
    }
    const listData = await categoryModel.find({})
    res.send({data: listData})

    res.status(201).send("Khoi tao thanh cong")
})

router.get('/list',async (req, res) => {
    const data = await projectModel
        .find({})
        .populate('category')
    console.log(data);
    res.send({
        message: "Lay danh sach thanh cong",
        data
    });
})

module.exports = router