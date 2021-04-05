const express = require('express');
const router = express.Router();
const staffcontroller = require('../controller/staffController')
const passportjwt = require('../middleware/passportjwt')
/* GET users listing. */
router.get('/', [passportjwt.isLogin],staffcontroller.selectall); //?http://localhost:3000/staff
router.get('/:id', staffcontroller.selectbyid); //?http://localhost:3000/staff/:id
router.get('/name/:name', staffcontroller.selectbyname); //?http://localhost:3000/staff/name/:name
router.post('/', staffcontroller.insert); //?http://localhost:3000/staff
router.put('/:id', staffcontroller.update); //?http://localhost:3000/staff/:id
router.delete('/:id', staffcontroller.delete); //?http://localhost:3000/staff:id

module.exports = router;
