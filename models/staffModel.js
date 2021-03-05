const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    salary: String,
    create: {type: Date,Default: Date.now}
})

const staff = mongoose.model('staffs',schema)

module.exports = staff