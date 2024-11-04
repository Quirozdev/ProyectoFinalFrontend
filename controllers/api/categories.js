const express = require("express");
const router = express.Router();
const {
  obtenerCategorias,
  encontrarCategoriaPorId,
} = require("../../services/categories");

// Para este recurso solo vamos a admitir operaciones de lectura

// Obtener todas las categorias
router.get("/api/categorias/", async (req, res) => {
  const categorias = await obtenerCategorias();
  res.send(categorias);
});

// Obtener una categoria por su ID
router.get("/api/categorias/:id", async (req, res) => {
  const categoria = await encontrarCategoriaPorId(req.params.id);
  if (!categoria) {
    return res.status(404).send("Categoria no encontrada");
  }
  res.send(categoria);
});

// para exportar el router y que lo use app
module.exports = router;
