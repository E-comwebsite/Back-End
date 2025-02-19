const multer = require("multer");


const storage = multer.diskStorage({
  destination: "src/filestorage", 
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

const MultipleUpload = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "certification", maxCount: 1 },
]);

const SingleUpload = upload.single("image");

module.exports = { MultipleUpload, SingleUpload };
