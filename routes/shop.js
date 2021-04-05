const express = require('express');
const router = express.Router();
const shopcontroller = require('../controller/shopController')

router.get('/', shopcontroller.selectall);
router.get('/menu', shopcontroller.selectallmenu);
router.get('/:id', shopcontroller.getshopwithmenu);
router.post('/', shopcontroller.insert);

module.exports = router;

