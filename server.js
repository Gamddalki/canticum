const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");
const PORT = 8080; //process.env.PORT
const connection = require("./db");

app.use(express.static(path.join(__dirname, "build")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads"))); // 업로드된 파일을 제공하는 라우트

// 이미지 경로를 조회하는 API 엔드포인트 (유형 및 ID별로 구분)
app.get("/api/images/:type/:id?", (req, res) => {
  const { type, id } = req.params;

  let query;
  let queryParams;

  console.log("요청 받음:", { type, id });

  if (id) {
    query =
      "SELECT filename, filepath FROM images WHERE type = ? AND filename LIKE ?";
    queryParams = [type, id + "%"];
  } else {
    query = "SELECT filename, filepath FROM images WHERE type = ?";
    queryParams = [type];
  }

  connection.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
