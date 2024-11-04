const express = require("express");
const router = express.Router();
const {
  obtenerProductos,
  encontrarProductoPorId,
  borrarProducto,
  agregarProducto,
  actualizarProducto,
} = require("../../services/products");
const { upload } = require("../../services/images");

// Nota: Estas rutas son para que la API se pueda usar como una
// API Rest desde cualquier sitio.
// Las rutas que aparecen en el controlador del mismo nombre pero
// en una carpeta mas arriba son para el manejo de nuestros templates/frontend,
// las cuales manejan los datos de una manera distinta.

// Rutas para la API
// Obtener todos los productos
router.get("/api/productos/", async (req, res) => {
  const productosConCategoria = await obtenerProductos();
  res.send(productosConCategoria);
});

// Obtener un producto por su ID
router.get("/api/productos/:id", async (req, res) => {
  const producto = await encontrarProductoPorId(req.params.id);
  if (!producto) {
    return res.status(404).send("Producto no encontrado");
  }
  res.send(producto);
});

// Agregar un nuevo producto
router.post(
  "/api/productos",
  upload.single("imagen_producto"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No se ha subido ninguna imagen.");
    }
    try {
      // se tiene que hacer un JSON.parse() para que la imagen se pueda mandar junto a los datos JSON como form-data
      const {
        nombre,
        categoria: id_categoria,
        precio_unitario,
        cantidad_en_stock: stock,
      } = JSON.parse(req.body.producto);
      const nombreImagenCreada = req.file.filename;
      const productoAgregado = await agregarProducto(
        nombre,
        id_categoria,
        precio_unitario,
        stock,
        // asociandole la imagen creada en la carpeta public
        `/images/productos/${nombreImagenCreada}`
      );
      res.send(productoAgregado);
    } catch (err) {
      res.status(500).send("Error al agregar el producto");
    }
  }
);

// Actualizar un producto existente
router.put("/api/productos/:id", async (req, res) => {
  try {
    const productoActualizado = await actualizarProducto({
      id_producto: req.params.id,
      // actualizar los campos que vengan en el body de la request
      nombre: req.body?.nombre,
      cantidad_en_stock: req.body?.cantidad_en_stock,
      precio: req.body?.precio_unitario,
      id_categoria: req.body?.categoria,
      url_imagen: req.body?.url_imagen,
    });

    if (!productoActualizado)
      return res.status(404).send("Producto no encontrado");
    res.send(productoActualizado);
  } catch (error) {
    res.status(500).send("Error al actualizar el producto");
  }
});

// Eliminar un producto
router.delete("/api/productos/:id", async (req, res) => {
  try {
    const producto = await borrarProducto(req.params.id);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }
    res.status(204).send("Producto eliminado exitosamente");
  } catch (error) {
    res.status(500).send("Error al eliminar el producto");
  }
});

// para exportar el router y que lo use app
module.exports = router;
