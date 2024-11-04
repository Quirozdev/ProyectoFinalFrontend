// Este script tiene el proposito de ponerle datos
// al modelo/tabla de Categorias, para que este prellenada

require("dotenv").config();
const mongoose = require("mongoose");
const Categoria = require("../models/categories");

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("Error al tratar de conectarse a MongoDB: ", error);
  });

const seedCategorias = [
  { nombre: "Granos y Cereales" },
  { nombre: "Lácteos" },
  { nombre: "Bebidas" },
  { nombre: "Conservas" },
  { nombre: "Snacks" },
  { nombre: "Productos de Limpieza" },
  { nombre: "Frutas y Verduras" },
  { nombre: "Panadería" },
  { nombre: "Carnes Frías" },
  { nombre: "Especias y Condimentos" },
  { nombre: "Cereales para Desayuno" },
  { nombre: "Pastas" },
  { nombre: "Aceites y Grasas" },
  { nombre: "Salsas y Aderezos" },
  { nombre: "Dulces y Chocolates" },
  { nombre: "Comida Congelada" },
  { nombre: "Frutos Secos" },
  { nombre: "Galletas" },
  { nombre: "Bebidas Energéticas" },
  { nombre: "Hogar y Cuidado Personal" },
  { nombre: "Productos para Mascotas" },
  { nombre: "Sopas y Caldos" },
  { nombre: "Té y Café" },
  { nombre: "Comidas Instantáneas" },
  { nombre: "Utensilios de Cocina" },
  { nombre: "Artículos de Papel" },
  { nombre: "Productos Farmacéuticos" },
  { nombre: "Cuidado del Bebé" },
  { nombre: "Electrodomésticos Pequeños" },
  { nombre: "Accesorios de Cocina" },
];

async function seedDB() {
  // borrar las categorias que hay como un reset
  await Categoria.deleteMany({});
  // insertar las categorias
  await Categoria.insertMany(seedCategorias);
}

seedDB()
  .then(() => {
    console.log("Se insertaron los datos seed (datos de categorias)");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error(
      "Algo salio mal al tratar de insertar los datos seed: ",
      error
    );
  });
