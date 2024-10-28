const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Configuracion del almacenamiento de imagenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "public", "images", "productos")); // Carpeta donde se guardaran las imagenes
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname)); // Renombrar archivo con un identificador unico
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4, // poner limite de tamanio de 4 Mb
  },
});

module.exports = upload;