const Company = require('../models/companyModel')

//* 
exports.index = async (req, res, next) => {
  const company = await Company.findOne()

  res.status(200).json({
    data: company
  });
}


// exports.index = (req, res, next) => {
//   res.status(200).json({
//     data: [{
//       name: 'awirut',
//       tel: '0983655292',
//       address: {
//         province: 'Khonkaen',
//         postcode: '40110'
//       }
//     },
//     {
//       name: 'awirut2',
//       tel: '0983655292',
//       address: {
//         province: 'Khonkaen',
//         postcode: '40110'
//       }
//     },{
//       name: 'awirut3',
//       tel: '0983655292',
//       address: {
//         province: 'Khonkaen',
//         postcode: '40110'
//       }
//     }]
//   });
// }