var mysql = require("mysql");
var dbConfig = require("../config/db.config");

// Create a connection to the database
var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements:true,
  queryTimeout: 10000,
  connectTimeout: 100000,

});

// open the MySQL connection
connection.connect(error=>{
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
