const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });

const db = mysql.createConnection(process.env.DB_URL)


db.connect(err => {
    if(err) throw err;
    console.log('MySQL connected...')
})

module.exports = db;