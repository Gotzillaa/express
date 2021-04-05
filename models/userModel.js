const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userschema = new mongoose.Schema({
    name: {type:String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true, index: true},
    password: {type:String, required: true, trim: true, minlienth: 3},
    role: {type:String, default: 'member'},
});

//*เข้ารหัส
userschema.methods.encryptPassword = async function(password){
  const salt = await bcrypt.genSalt(5)
  const hashPassword = await bcrypt.hash(password, salt)
  return hashPassword
}

//*check password
userschema.methods.checkPassword = async function(password){
  const isValid =await bcrypt.compare(password, this.password)
  return isValid;
}

  
const user = mongoose.model('users',userschema)
module.exports = user