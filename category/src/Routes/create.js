const express = require("express")
const categoryModel = require('../models/category')
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

router.get('/create',async (req, res) => {
    for(const obj of objects) {
        categoryModel.create({
            name: obj
        })
        await category.save()
    }
    const listData = await categoryModel.find({})
    res.send({data: listData})

    res.status(201).send("Khoi tao thanh cong")
})

module.exports = router