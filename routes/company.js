const express = require("express");
const router = express.Router();
const passportjwt = require("../middleware/passportjwt");
const checkAdmin = require("../middleware/checkadmin");
const companyController = require("../controller/companyController");
/* GET users listing. */
router.get(
  "/",
  [passportjwt.isLogin, checkAdmin.isAdmin],
  companyController.index
);

module.exports = router;
