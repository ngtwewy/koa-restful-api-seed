/*
 * mysql pool
 */

var mysql = require('mysql2');
var config = require("../config");

let pool = mysql.createPool({
  user: config.database.username,
  password: config.database.password,
  database: config.database.database,
  host: config.database.host,
  port: config.database.port
})

let mysqlPoolQuery = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, fields) => {
          if (err) reject(err)
          else resolve(fields)
          connection.release();
        })
      }
    })
  })
}

module.exports = mysqlPoolQuery;
