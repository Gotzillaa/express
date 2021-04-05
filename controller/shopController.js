const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

const Shop = require('../models/shopModel')
const Menu = require('../models/menuModel')
const config = require('../config/index')

//*-------------------------------------------------------------------------show all data shop
exports.selectall = async (req, res, next) => {
  const shops = await Shop.find().select('name photo location') //.select() //เลือกฟิลด์ที่ต้องการ
  const patchimg = await shops.map((shop)=>{  //map เพื่อแก้ไข photo 'http://localhost:3000/images/'
    return{
      id: shop._id,
      name: shop.name,
      photo: config.DOMAIN+shop.photo,
      location: shop.location
    }
  })
  res.status(200).json({
    data: patchimg
  });
}

//*-------------------------------------------------------------------------show all data menu
exports.selectallmenu = async (req, res, next) => {
 //const menus = await Menu.find()
   const menus = await Menu.find().populate('shop','name location photo -_id').sort('-_id')
  // const menus = await Menu.find().where('price').gte(100) //.where(''price).gte คือ หา price >=100 // gte>=, gt>
  // const menus = await Menu.find({price:{$gte:200}}) //price>=200

  res.status(200).json({
    data: menus
  });

}

//*-------------------------------------------------------------------------show data shop whit menu
exports.getshopwithmenu = async (req, res, next) => {
  const shopwithmenu = await Shop.findById(req.params.id).populate('listmenu')
  
  res.status(200).json({
    data: shopwithmenu
  });
}

//*-------------------------------------------------------------------------insert data
exports.insert = async (req, res, next) => {

  //*เพิ่มข้อมูลบ้างฟิว
  const { name, location, photo } = req.body
  let shop = new Shop({
    name: name,
    location: location,
    photo: await saveImageToDisk(photo),
  })
  await shop.save();


  // let staff = new Staff(req.body)
  // await staff.save();
  res.status(201).json({
    message: 'เพิิ่มข้อมูลเรียบร้อยแล้ว'
  });
}

//!======================================================saveImageToDisk

async function saveImageToDisk(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = path.resolve('./') ;
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/public/images/`;

  //หานามสกุลไฟล์
  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = '';
  if (ext === 'svg+xml') {
      filename = `${uuidv4.v4()}.svg`;
  } else {
      filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  //เขียนไฟล์ไปไว้ที่ path
  await writeFileAsync(uploadPath+filename, image.data, 'base64');
  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}

