const mongoose = require('mongoose')
const Schema = mongoose.Schema
let schema = Schema({
    name: {type: String, required: true, trim: true},
    price: {type: Number},
    shop: {type: Schema.Types.ObjectId, ref: 'shops'}, //*foreign key (_id(objectID) ของ shop), ref: มาจาก model ของ sohpModel
},{
    timestamps: true,
    toJSON: {virtuals: true}  // แสดง field price_vat
})

//*สร้าง virtual field ชื่อ price_vat (ไม่มีใน database)
schema.virtual('price_vat').get(function(){ 
    return (this.price*0.07)+this.price
})

const menu = mongoose.model('menus',schema)

module.exports = menu