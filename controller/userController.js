const User = require('../models/userModel')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

exports.register = async(req, res, next) => {
   try {
     //*เพิ่มข้อมูลบ้างฟิว
   const { name, email, password } = req.body

   const errors = validationResult(req)
   if(!errors.isEmpty()){
    const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง')
    error.statusCode = 422
    error.validation = errors.array()
    throw error;
   }

   //* check email ซ้ำ
   const checkemail = await User.findOne({email: email})
   if(checkemail){
     const error = new Error('อีเมลล์ซ้ำ มีผู้ใช้งานแล้ว')
     error.statusCode = 400
     throw error;
    }
   let user = new User()
   user.name = name,
   user.email = email,
   user.password = await user.encryptPassword(password)
   await user.save();

   res.status(201).json({
     message: 'ลงทะเบียนเรียบร้อยแล้ว'
   });
   } catch (error) {
    next(error)
    
  }
}

exports.login = async(req, res, next) => {
  try {
    //*เพิ่มข้อมูลบ้างฟิว
  const { email, password } = req.body

  const errors = validationResult(req)
  if(!errors.isEmpty()){
   const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง')
   error.statusCode = 422
   error.validation = errors.array()
   throw error;
  }

  //* check ว่ามีอีเมลนี้ในระบบ
  const user = await User.findOne({email: email})
  if(!user){
    const error = new Error('ไม่พบผู้ใช้งานในระบบ')
    error.statusCode = 404
    throw error;
   }
   //*ตรวจสอบรหัสผ่าน
   const isValid = await user.checkPassword(password)
   if(!isValid){
     const error = new Error('รหัสผ่านไม่ถูกต้อง')
     error.statusCode = 401 
     throw error;
   }
   //*สร้าง token
   const token = await jwt.sign({
     id: user._id,
     name: user.name,
     email: user.email,
     role: user.role
   },config.JWT_SECRET, {expiresIn: '3 days'})

   //*decode วันหมดอายุ
   const expires_in = jwt.decode(token)

  res.status(200).json({
    //message: 'Login Seccess.'
    access_token: token,
    expires_in: expires_in.exp,
    token_type: 'Bearer.'
  });
  } catch (error) {
   next(error)
  }
 }

exports.showuser = async(req, res, next) => {
  const user = await User.find()
  res.status(200).json({
    data: user
  });
}

exports.profile = async(req, res, next) => {

  const { name,email,role } = req.user
  res.status(200).json({
    data: {
      name: name,
      email: email,
      role: role
    }
  });
}