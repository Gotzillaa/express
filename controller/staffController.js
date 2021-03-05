const Staff = require('../models/staffModel')

//*-------------------------------------------------------------------------show all data
exports.selectall = async (req, res, next) => {
  const staff = await Staff.find().sort({ _id: -1 })  //.sort({_id: -1})เรียง _id จากมากไปน้อย

  res.status(200).json({
    data: staff
  });
}

//*-------------------------------------------------------------------------show by id  
exports.selectbyid = async (req, res, next) => {
  try {
    const { id } = req.params
    const staff = await Staff.findById(id) //*
    //*const staff = await Staff.findOne({_id: req.params.id})  //.id มาจาก router /:id

    if (!staff) {
      throw new Error('ไม่พบรหัสพนักงาน')
    }
    res.status(200).json({
      data: staff
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: 'เกิดข้อผิดพาด' + error.message
      }
    })
  }
}

////*-------------------------------------------------------------------------show by name
exports.selectbyname = async (req, res, next) => {
  try {
    const { name } = req.params
    const staff = await Staff.find({ name: name }) //*
    //*const staff = await Staff.findOne({_id: req.params.id})  //.id มาจาก router /:id

    if (!staff) {
      throw new Error('ไม่พบชื่อพนักงาน')
    }
    res.status(200).json({
      data: staff
    });

  } catch (error) {
    res.status(400).json({
      error: {
        message: 'เกิดข้อผิดพาด' + error.message
      }
    })
  }
}

//*-------------------------------------------------------------------------insert data
exports.insert = async (req, res, next) => {

  //*เพิ่มข้อมูลบ้างฟิว
  const { name, salary } = req.body
  let staff = new Staff({
    name: name,
    salary: salary,
  })
  await staff.save();


  // let staff = new Staff(req.body)
  // await staff.save();
  res.status(201).json({
    message: 'เพิิ่มข้อมูลเรียบร้อยแล้ว'
  });
}

//*-------------------------------------------------------------------------update
// exports.update = async (req, res, next) => {
//   try {
//     const {id} = req.params
//     const staff = await Staff.findById(id)
//     const { name, salary } = req.body
//     staff.name =name,
//     staff.salary = salary
//     await staff.save()
    
//     res.status(201).json({
//       message: 'แก้ไขข้อมูลเรียบร้อยแล้ว'
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: {
//         message: 'เกิดข้อผิดพาด'
//       }
//     })
//   }
// }




exports.update = async (req, res, next) => {
  try {
    // const {id} = req.params
    // const staff = await Staff.findById(id)
    // const { name, salary } = req.body
    // console.log('salaryData : '+salary);
    // staff.name =name
    // if(salary===undefined){
    //   staff.salary = '0'
    // }
    // staff.salary = salary
    // await staff.save()

    //!วิธีที่2
    const {id} = req.params
    const { name, salary } = req.body
    const staff = await Staff.findByIdAndUpdate(id,{
      name: name,
      salary: salary
    })
    
    res.status(201).json({
      message: 'แก้ไขข้อมูลเรียบร้อยแล้ว'
    });
  } catch (error) {
    res.status(400).json({
      error: {
        message: 'เกิดข้อผิดพาด'
      }
    })
  }
}

  
  

//*-------------------------------------------------------------------------delete
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params
    const findid = await Staff.findById(id)
    if (findid) {
      const staff = await Staff.findByIdAndDelete(id)
      // const staff = await Staff.deleteOne({_id:id})
      res.status(200).json({
        message: 'ลบข้อมูลเรียบร้อยแล้ว'
      });
    } else {
      res.status(200).json({
        message: 'ไม่สามารถลบข้อมูลได้'
      });
    }
    //const staff = await Staff.findByIdAndDelete(id)
    // const staff = await Staff.deleteOne({_id:id})


  } catch (error) {
    res.status(400).json({
      error: {
        message: 'เกิดข้อผิดพาด'
      }
    })
  }
}