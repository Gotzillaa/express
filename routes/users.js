const express = require('express');
const {body} = require('express-validator')
const router = express.Router();
const usercontroller = require('../controller/userController')
const passportjwt = require('../middleware/passportjwt')
/* GET users listing. */
router.get('/', usercontroller.showuser);  //*http://localhost:3000/user
router.post('/login', usercontroller.login);  //*http://localhost:3000/user/login
router.post('/register',[
body('name').not().isEmpty().withMessage('กรุณากรอชื่อ-สกุล'),
body('email').not().isEmpty().withMessage('กรุณากรอกอีเมล').isEmail().withMessage('รูปแบบอีเมลไม่ถูกต้อง'),
body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({min: 5}).withMessage('รหัสผ่านต้องมากกว่า 5 ตัวอักษร')],
usercontroller.register);  //*http://localhost:3000/user/register
router.get('/me', [passportjwt.isLogin], usercontroller.profile);  //*http://localhost:3000/user
module.exports = router;
