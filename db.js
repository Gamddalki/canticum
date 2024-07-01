require("dotenv").config();
const mysql = require("mysql2");

// MySQL 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connection = pool.promise();

// 연결 끊길 경우 재연결
function connectDB() {
  console.log("Attempting to reconnect to database...");
  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Error reconnecting:", err);
      setTimeout(connectDB, 2000); // 2초 후 재시도
    } else {
      console.log("Reconnected to database");
      conn.release(); // 연결을 반환
    }
  });
}

connection.on("error", (err) => {
  console.error("Database connection lost:", err);
  connectDB(); // 재연결 시도
});

// DB 연결 확인 로그 추가
pool.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to MySQL database");
    conn.release(); // 연결을 반환
  }
});

module.exports = connection;
