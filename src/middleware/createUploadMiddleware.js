const multer = require("multer");
const path = require("path");

// multer 설정
function createMulterStorage(uploadPath) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, `../../public/uploads/${uploadPath}`)); // 파일 저장 경로
    },
    filename: function (req, file, cb) {
      const newFileName = `${req.params.filename}`;
      cb(null, newFileName);
    },
  });
}

// Check file type
function checkFileType(file, cb) {
  const filetypes =
    /jpeg|jpg|png|gif|mp4|avi|mkv|mov|hwp|doc|docx|docs|pdf|txt|xlsx|xls|ppt|pptx|odt|rtf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname || mimetype) {
    return cb(null, true);
  } else {
    return cb("Error: Only Images, Videos, and Documents are allowed!");
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
  else if (uploadPath === "noti") return upload.array("file", 10);
  else {
    return multiple ? upload.array("images", 10) : upload.single("image");
  }
}

module.exports = createUploadMiddleware;
