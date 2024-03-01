const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  const allowedMimeType = ["image/jpg", "image/gif", "image/jpeg", "image/png"];

  if (!allowedMimeType.includes(file.mimetype)) {
    cb(
      new Error(
        "Bu resim tipini sistem desteklememektedir. Lütfen geçerli bir resim tipi girin."
      ),
      false
    );
  } else {
    cb(null, true);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const rootDir = path.dirname(require.main.filename);
    const uploadDir = path.join(rootDir, "/public/uploads");

    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const url = `image_${uniqueSuffix}.${extension}`;

    if (!req.savedImages) {
      req.savedImages = [];
    }

    req.savedImages.push(url);

    cb(null, url);
  },
});

const upload = multer({
  storage,
  fileFilter,
}).array("images", 3);
const deleteImagesByNames = (imageNames) => {
  const rootDir = path.dirname(require.main.filename);
  const publicDir = path.join(rootDir, "/public/uploads"); // Resimlerin bulunduğu dizin

  imageNames.forEach((imageName) => {
    const cleanImageName = imageName.replace(/[\[\]"]/g, '');
    const imagePath = path.join(publicDir, cleanImageName); // Resim dosyasının tam yolu
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`${cleanImageName} adlı resim silinemedi:`, err);
        return;
      }
    });
  });
};

module.exports = { upload, deleteImagesByNames };
