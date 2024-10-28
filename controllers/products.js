const express = require("express");
const { productos, categorias } = require("../data");
const {
  encontrarProductoPorId,
  encontrarCategoriaPorId,
  borrarProducto,
  agregarProducto,
} = require("../services/products");
const upload = require("../services/images");
const router = express.Router();

// ruta de la lista de productos
router.get("/productos/", (req, res) => {
  // estas 2 variables pueden contener valores que vienen al agregar, editar o borrar
  // un producto como query params, que son utilizados para mostrar un toast en la lista de productos como aviso
  const mensaje = req.query.mensaje;
  const tipo_mensaje = req.query.tipo_mensaje;
  // para referenciar cada producto con su categoria, agregandole el nombre de la categoria
  const productosConCategoria = productos.map((producto) => {
    return {
      ...producto,
      nombre_categoria: encontrarCategoriaPorId(producto.id_categoria).nombre,
    };
  });
  // renderizar el template de index.html pasandole como datos los productos
  res.render("index.html", {
    productos: productosConCategoria,
    mensaje,
    tipo_mensaje,
  });
});

router.get("/productos/agregar", (req, res) => {
  res.render("agregar_producto.html", {
    categorias,
  });
});

router.post(
  "/productos/agregar",
  upload.single("imagen_producto"),
  (req, res) => {
    const {
      nombre,
      categoria: id_categoria,
      precio,
      cantidad_en_stock: stock,
    } = req.body;
    const nombreImagenCreada = req.file.filename;
    agregarProducto(
      nombre,
      Number(id_categoria),
      Number(precio),
      Number(stock),
      // asociandole la imagen creada en la carpeta public
      `/images/productos/${nombreImagenCreada}`
    );
    // para el toast
    const mensaje = "Producto agregado exitosamente";
    const tipoMensaje = "Agregado";
    res.redirect(`/productos/?mensaje=${mensaje}&tipo_mensaje=${tipoMensaje}`);
  }
);

// ruta para un producto en especifico
router.get("/productos/:id", (req, res) => {
  const producto = encontrarProductoPorId(req.params.id);
  // si no se encontro un producto con esa id, mandarle un 404
  // y renderizar el template de error 404
  if (!producto) {
    return res.status(404).render("404.html");
  }
  // si se encontro el producto, renderizar el template de un producto en especifico,
  // pasandole los datos de ese producto
  res.render("producto.html", {
    producto: {
      ...producto,
      nombre_categoria: encontrarCategoriaPorId(producto.id_categoria).nombre,
    },
  });
});

router.get("/productos/:id/editar", (req, res) => {
  const producto = encontrarProductoPorId(req.params.id);
  if (!producto) {
    return res.status(404).render("404.html");
  }

  res.render("editar_producto.html", {
    producto: {
      ...producto,
      nombre_categoria: encontrarCategoriaPorId(producto.id_categoria).nombre,
    },
  });
});

// para borrar un producto en especifico
router.delete("/productos/:id", (req, res) => {
  const id = req.params.id;
  const producto = encontrarProductoPorId(id);
  if (!producto) {
    return res.status(404).render("404.html");
  }
  borrarProducto(id);
  // se borro correctamente
  res.sendStatus(204);
});

// para exportar el router y que lo use app
module.exports = router;
