const express = require("express");
const { obtenerCategorias } = require("../services/categories");
const {
  obtenerProductos,
  encontrarProductoPorId,
  borrarProducto,
  agregarProducto,
  actualizarProducto,
} = require("../services/products");
const { upload } = require("../services/images");
const router = express.Router();

// Nota: Las rutas de este controlador son especificas para
// renderizar nuestros templates/frontend, las rutas de API Rest
// que se pueden utilizar desde Postman por ejemplo, se encuentran
// en la carpeta de api dentro de la carpeta de controladores

// ruta de la lista de productos
router.get("/productos/", async (req, res) => {
  // estas 2 variables pueden contener valores que vienen al agregar, editar o borrar
  // provienen de los mensajes "flash" que se producen en otros controladores para indicar esas acciones
  // y que en el template de index se puedan mostrar los toasts
  const tipo_mensaje = req.flash("tipoMensaje");
  const mensaje = req.flash("mensaje");

  const productosConCategoria = await obtenerProductos();
  // renderizar el template de index.html pasandole como datos los productos
  res.render("index.html", {
    productos: productosConCategoria,
    // si no estan esos flash/mensajes, entonces son un arreglo vacio, por ende mandar un undefined para que no se muestren en el template
    tipo_mensaje: tipo_mensaje.length > 0 ? tipo_mensaje : undefined,
    mensaje: mensaje.length > 0 ? mensaje : undefined,
  });
});

router.get("/productos/agregar", async (req, res) => {
  const categorias = await obtenerCategorias();
  res.render("agregar_producto.html", {
    categorias,
  });
});

router.post(
  "/productos/agregar",
  // se sube la imagen del producto
  upload.single("imagen_producto"),
  async (req, res) => {
    const {
      nombre,
      categoria: id_categoria,
      precio,
      cantidad_en_stock: stock,
    } = req.body;
    const nombreImagenCreada = req.file.filename;
    const productoAgregado = await agregarProducto(
      nombre,
      id_categoria,
      Number(precio),
      Number(stock),
      // asociandole la imagen creada en la carpeta public
      `/images/productos/${nombreImagenCreada}`
    );
    // para el toast
    req.flash("tipoMensaje", "Agregado");
    req.flash("mensaje", "Producto agregado exitosamente");

    res.redirect(`/productos/`);
  }
);

// ruta para un producto en especifico
router.get("/productos/:id", async (req, res) => {
  const producto = await encontrarProductoPorId(req.params.id);
  // si no se encontro un producto con esa id, mandarle un 404
  // y renderizar el template de error 404
  if (!producto) {
    return res.status(404).render("404.html");
  }
  // si se encontro el producto, renderizar el template de un producto en especifico,
  // pasandole los datos de ese producto
  res.render("producto.html", {
    producto: producto,
  });
});

router.get("/productos/:id/editar", async (req, res) => {
  // en esta ruta solo se manda los datos del producto a editar
  // al template, no se actualiza aqui, eso es en la ruta put correspondiente
  const producto = await encontrarProductoPorId(req.params.id);
  if (!producto) {
    return res.status(404).render("404.html");
  }

  res.render("editar_producto.html", {
    producto: producto,
  });
});

// para borrar un producto en especifico
router.delete("/productos/:id", async (req, res) => {
  const id = req.params.id;
  const producto = await borrarProducto(id);
  if (!producto) {
    return res.status(404).render("404.html");
  }

  // para el toast de borrado
  req.flash("tipoMensaje", "Borrado");
  req.flash("mensaje", "Producto eliminado exitosamente");
  // se borro correctamente
  res.sendStatus(204);
});

// para exportar el router y que lo use app
module.exports = router;
