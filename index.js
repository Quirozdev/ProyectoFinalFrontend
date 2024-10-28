const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const routerProductos = require("./controllers/products");
const PORT = 3000;

// para que el servidor mande nuestros css y javascript al navegador desde nuestra carpeta public
app.use(express.static("public"));

// configurar el sistema de templates de nunjucks, muy parecido al de Jinja para el framework de Flask de Python
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// para que app tenga las rutas del router de productos
app.use(routerProductos);

// para que la pagina principal redireccione a la lista de productos
app.get("/", (req, res) => {
  res.redirect("/productos/");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
