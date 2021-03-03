const express = require('express');
const router = express.Router();
const user = require('../controller/userController')
/* GET users listing. */
router.get('/', user.index);

module.exports = router;
