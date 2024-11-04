// para cargar las variables de entorno
require("dotenv").config();

const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

// conexion con la bd
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al tratar de conectarse a MongoDB: ", error);
  });
