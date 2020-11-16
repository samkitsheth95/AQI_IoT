const mysql = require('mysql');
const {
  MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB,
} = process.env;


const connection = mysql.createConnection({
  host     : MYSQL_HOST,
  user     : MYSQL_USER,
  password : MYSQL_PASSWORD,
  database : MYSQL_DB
});


function getDataHandler(req, res) {
    connection.query("SELECT * FROM aqiData ORDER BY id DESC LIMIT 10", function (err, result) {
      if (err) throw err;
      res.status(200).send(result);
    });     
  }


  module.exports = {
    getDataHandler,
  };