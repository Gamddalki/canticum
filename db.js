require("dotenv").config();
const mysql = require("mysql");

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // 데이터베이스 호스트 주소
  user: process.env.DB_USERNAME, // 데이터베이스 사용자 이름
  password: process.env.DB_PASSWORD, // 데이터베이스 사용자 비밀번호
  database: process.env.DB_DATABASE, // 데이터베이스 이름
});

function connectDB() {
  // 데이터베이스 연결
  connection.connect((err) => {
    if (err) {
      console.log("Error connecting to database:", err);
      setTimeout(connectDB, 2000); // 2초 후 재연결 시도
    } else {
      console.log("Connected to database");
    }
  });
  // 연결 끊길 경우 재연결
  connection.on("error", (err) => {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Database connection lost. Reconnecting...");
      connectDB();
    } else {
      throw err;
    }
  });
}

// 최초 연결
connectDB();

module.exports = connection;
