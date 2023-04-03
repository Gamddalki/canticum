const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "db.canticum7.gabia.io",
  user: "canticum7",
  password: "canticum07!",
  database: "dbcanticum7",
});

connection.connect();

connection.query("SELECT * from test_user", (error, rows, fields) => {
  if (error) throw error;
  console.log("비밀번호는 ", rows);
});

connection.end();
