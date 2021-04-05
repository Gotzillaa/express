const mongoose = require('mongoose')

let companySchema = new mongoose.Schema({
    name: String,
    address: {
        province: {type:String}
    }
})

const company = mongoose.model('companys',companySchema)

module.exports = company