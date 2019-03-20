const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary')

// en lugar de almacenar las imagenes en disco las metemos en cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'trello',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    // podemos hacer una carpeta para cada usuario metiendo el `${req.user.id}/` antes de lo de abajo
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  }
});

module.exports = multer({ storage })