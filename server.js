const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = 8080; //process.env.PORT
const connection = require("./db");

app.use(cors());
app.use(express.json());

// multer 설정
function createMulterStorage(uploadPath) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, `public/uploads/${uploadPath}`)); // 파일 저장 경로
    },
    filename: function (req, file, cb) {
      const newFileName = `${req.params.filename}`;
      cb(null, newFileName);
    },
  });
}

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|mp4|avi|mkv|mov/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images and Videos Only!");
  }
}

function createUploadMiddleware(uploadPath, multiple = true) {
  const storage = createMulterStorage(uploadPath);

  const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 100MB limit
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  });

  if (uploadPath === "popup") return upload.single("video");
  else {
    return multiple ? upload.array("images", 10) : upload.single("image");
  }
}

app.use(express.static(path.join(__dirname, "build")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads"))); // 업로드된 파일을 제공하는 라우트

// 이미지 type, id로 구분해 이미지 가져오는 API
app.get("/api/images/:type/:id?", async (req, res) => {
  const { type, id } = req.params;

  let query;
  let queryParams;

  console.log("요청 받음:", { type, id });

  if (id) {
    query = "SELECT * FROM images WHERE type = ? AND filename LIKE ?";
    queryParams = [type, id + "%"];
  } else {
    query = "SELECT * FROM images WHERE type = ?";
    queryParams = [type];
  }

  console.log("Query:", query);
  console.log("Query Parameters:", queryParams);

  try {
    const [results] = await connection.query(query, queryParams);

    // 쿼리 결과 확인
    console.log("쿼리 결과:", results);

    // 결과가 없는 경우
    if (results.length === 0) {
      console.log("No results found");
      return res.status(404).json({ message: "No images found" });
    }

    // 결과가 있는 경우
    res.json(results);
  } catch (err) {
    console.error("Error executing database query:", err);
    res.status(500).send(err);
  }
});

// 이미지 업로드 API
app.post("/api/uploads/:type/:filename", async (req, res) => {
  const { type, filename } = req.params;

  const codeFormat = (type, filename) => {
    if (type === "popup") return "p000001";
    else {
      const prefix = type.charAt(0).toLowerCase();
      let suffix;

      if (type === "background") {
        suffix = filename.replace(/[^\d]/g, "").slice(0, 1).padStart(6, "0");
      } else {
        suffix = filename.replace(/[^\d]/g, "").slice(0, 6).padStart(6, "0");
      }

      return `${prefix}${suffix}`;
    }
  };

  // 대표 영상 업데이트
  if (type === "video") {
    const { filepath, code } = req.body;

    if (!filepath || !code) {
      return res.status(400).send("Error: No Filepath or Code Provided!");
    }

    try {
      // 데이터베이스에서 같은 code가 있는지 확인
      const [rows] = await connection.query(
        "SELECT * FROM images WHERE code = ?",
        [code]
      );

      if (rows.length > 0) {
        const query = "UPDATE images SET filepath = ? WHERE code = ?";
        const queryParams = [filepath, code];

        await connection.query(query, queryParams, (dbErr) => {
          if (dbErr) {
            console.error("Error updating file info in database:", dbErr);
            return res.status(500).send(dbErr);
          }
        });

        res.send({
          msg: "File Updated and Saved to Database!",
          file: filepath,
        });
      } else return res.status(400).send("Error: Out of Bound!");
    } catch (dbErr) {
      console.error("Error saving file info to database:", dbErr);
      res.status(500).send(dbErr);
    }
  } else {
    const imgUpload = createUploadMiddleware(`${type}`, false);

    imgUpload(req, res, async (err) => {
      if (err) {
        console.error("Image upload middleware error:", err);
        res.status(400).send(err);
      } else {
        if (req.file == undefined) {
          res.status(400).send("Error: No File Selected!");
        } else {
          const filepath = `/uploads/${type}/${filename}`;
          const code = codeFormat(type, filename);

          try {
            // 데이터베이스에서 같은 code가 있는지 확인
            const [rows] = await connection.query(
              "SELECT * FROM images WHERE code = ?",
              [code]
            );
            console.log(code);

            if (type === ("popup" || "background") && rows.length > 0) {
              // 기존 파일 시스템에서 이미지 삭제
              const existingFilepath = rows[0].filepath;
              fs.unlink(
                path.join(__dirname, "public", existingFilepath),
                (fsErr) => {
                  if (fsErr) {
                    console.error("Error deleting existing file:", fsErr);
                  }
                }
              );
              // 이미지 경로 업데이트
              const query =
                "UPDATE images SET filename = ?, filepath = ? WHERE code = ?";
              const queryParams = [filename, filepath, code];
              await connection.query(query, queryParams);
            } else {
              // 이미지 경로 저장
              const query =
                "INSERT INTO images (filename, filepath, type, code) VALUES (?, ?, ?, ?)";
              const queryParams = [filename, filepath, type, code];
              await connection.query(query, queryParams);
            }

            res.send({
              msg: "File Uploaded and Saved to Database!",
              file: filepath,
            });
          } catch (dbErr) {
            console.error("Error saving file info to database:", dbErr);
            res.status(500).send(dbErr);
          }
        }
      }
    });
  }
});

// 공연정보, 소식지 텍스트
app.get("/api/texts/:type", async (req, res) => {
  const { type } = req.params;
  console.log("텍스트 요청 받음:", { type });

  try {
    const [results] = await connection.query(
      `SELECT * FROM newsletters WHERE type = ?`,
      [type]
    );

    // 쿼리 결과 확인
    console.log("텍스트 쿼리 결과:", results);

    // 결과가 있는 경우
    res.json(results);
  } catch (err) {
    console.error("Error executing database query:", err);
    res.status(500).send(err);
  }
});

// 공연정보, 소식지 텍스트 저장 API
app.post("/api/text-uploads/:type", async (req, res) => {
  const { type } = req.params;
  const { date, kortit, engtit } = req.body;

  const generateCode = (type, date) => {
    const typePrefix = type.charAt(0).toLowerCase();
    const dateParts = date
      .split("-")
      .map((part) => part.slice(-2).padStart(2, "0"));
    return `${typePrefix}${dateParts.join("")}`;
  };
  const code = generateCode(type, date);

  console.log("텍스트 저장 요청 받음:", { type, date, kortit, engtit });

  // 데이터베이스에 텍스트 정보 저장
  const query =
    "INSERT INTO newsletters (date, kortit, engtit, type, code) VALUES (?, ?, ?, ?, ?)";
  const queryParams = [date, kortit, engtit, type, code];

  try {
    await connection.query(query, queryParams);
    res.send({
      msg: "Text Saved to Database!",
      type,
      date,
      kortit,
      engtit,
    });
  } catch (dbErr) {
    console.error("Error saving text info to database:", dbErr);
    res.status(500).send(dbErr);
  }
});

//삭제 코드
app.delete("/api/delete/:code", async (req, res) => {
  const { code } = req.params;

  try {
    // images 테이블에서 해당 code를 가진 행을 찾음
    const [rows] = await connection.query(
      "SELECT * FROM images WHERE code = ?",
      [code]
    );

    if (rows.length > 0) {
      // 파일 시스템에서 이미지 파일 삭제
      rows.forEach((row) => {
        const filePath = path.join(__dirname, "public", row.filepath);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          }
        });
      });
    }

    // newsletter 테이블에서 해당 code를 가진 행 삭제
    await connection.query("DELETE FROM newsletters WHERE code = ?", [code]);

    // images 테이블에서 해당 code를 가진 행 삭제
    await connection.query("DELETE FROM images WHERE code = ?", [code]);

    res.send({ msg: "File and Records Deleted Successfully!" });
  } catch (err) {
    console.error("Error deleting file and records:", err);
    res.status(500).send("Error deleting file and records");
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
