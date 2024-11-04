const Categoria = require("../models/categories.js");

async function obtenerCategorias() {
  const categorias = await Categoria.find();
  return categorias;
}

async function encontrarCategoriaPorId(id) {
  const producto = await Categoria.findById(id);
  return producto;
}

module.exports = {
  obtenerCategorias,
  encontrarCategoriaPorId,
};
