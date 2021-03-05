const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/userController')
/* GET users listing. */
router.get('/', usercontroller.index);

module.exports = router;
2