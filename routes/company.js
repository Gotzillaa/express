const express = require('express');
const router = express.Router();
const companyController = require('../controller/companyController')
/* GET users listing. */
router.get('/', companyController.index);

module.exports = router;
