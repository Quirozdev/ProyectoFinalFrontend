const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio_unitario: { type: Number, required: true },
  cantidad_en_stock: { type: Number, required: true },
  url_imagen: { type: String, required: true },
  // relacion 1 a 1 con la tabla/modelo de categorias
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
});

module.exports = mongoose.model("Producto", productSchema);
