require('dotenv').config()

module.exports={
    POST: process.env.PORT,
    MONGDB_URI: process.env.MONGDB_URI,
    DOMAIN:process.env.DOMAIN,
    JWT_SECRET:process.env.JWT_SECRET
     
}