const Producto = require("../models/product.js");
const { deleteImage } = require("./images.js");

async function encontrarProductoPorId(id) {
  const producto = await Producto.findById(id).populate("categoria");
  return producto;
}

async function obtenerProductos() {
  const productosConCategoria = await Producto.find().populate("categoria");
  return productosConCategoria;
}

async function agregarProducto(
  nombre,
  id_categoria,
  precio,
  cantidad_en_stock,
  url_imagen
) {
  const productoAInsertar = new Producto({
    nombre: nombre,
    precio_unitario: precio,
    cantidad_en_stock: cantidad_en_stock,
    url_imagen: url_imagen,
    categoria: {
      _id: id_categoria,
    },
  });
  const productoInsertado = await productoAInsertar.save();
  return productoInsertado;
}

async function actualizarProducto({
  id_producto,
  nombre,
  id_categoria,
  precio,
  cantidad_en_stock,
  url_imagen,
}) {
  const producto = await Producto.findByIdAndUpdate(
    id_producto,
    {
      nombre: nombre,
      precio_unitario: precio,
      cantidad_en_stock: cantidad_en_stock,
      url_imagen: url_imagen,
      id_categoria: id_categoria,
    },
    { new: true }
  );
  return producto;
}

async function borrarProducto(id) {
  const productoBorrado = await Producto.findByIdAndDelete(id);
  // borrar la imagen asociada al producto
  await deleteImage(productoBorrado.url_imagen);
  return productoBorrado;
}

module.exports = {
  obtenerProductos,
  encontrarProductoPorId,
  agregarProducto,
  actualizarProducto,
  borrarProducto,
};
