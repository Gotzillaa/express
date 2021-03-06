const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    photo: {type: String, default: 'nopic.jpg'},
    location: {
        lat: {type: Number},
        lgn: {type: Number},
    },
    //* createdAt: {type: Date,Default: Date.now},
    //* updatedAt: {type: Date,Default: Date.now}
},{
    toJSON: {virtuals: true},  // แสดง field price_vat
    timestamps: true  //* timestamps จะสร้าง createdAt, updatedAt ให้เอง
})

schema.virtual('listmenu',{
    ref: 'menus', //* ลิ้งค์ไปที่ model menus
    localField: '_id', //*_id ฟิลด์ของโมเดล shop
    foreignField: 'shop' //*ฟิลด์ของโมเดล menu (FK)
})

const shop = mongoose.model('shops',schema)

module.exports = shop