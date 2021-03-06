const express = require('express');
const router = express.Router();
const shopcontroller = require('../controller/shopController')
/* GET users listing. */
router.get('/', shopcontroller.selectall);
router.get('/:id', shopcontroller.getshopwithmenu); 
router.get('/menu', shopcontroller.selectallmenu);

module.exports = router;
