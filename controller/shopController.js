const Shop = require('../models/shopModel')
const Menu = require('../models/menuModel')

//*-------------------------------------------------------------------------show all data shop
exports.selectall = async (req, res, next) => {
  const shops = await Shop.find().select('name photo location') //.select() //เลือกฟิลด์ที่ต้องการ
  const patchimg = await shops.map((shop)=>{  //map เพื่อแก้ไข photo 'http://localhost:3000/images/'
    return{
      id: shop._id,
      name: shop.name,
      photo: 'http://localhost:3000/images/'+shop.photo,
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
  //const menus = await Menu.find().where('price').gte(100) //.where(''price).gte คือ หา price >=100 // gte>=, gt>
  //const menus = await Menu.find({price:{$gte:200}}) //price>=200
  console.log(menus);
  res.status(200).json({
    data: patchimg
  });
}

//*-------------------------------------------------------------------------show data shop whit menu
exports.getshopwithmenu = async (req, res, next) => {
  const shopwithmenu = await Shop.findById(req.params.id).populate('listmenu')
  
  res.status(200).json({
    data: shopwithmenu
  });
}