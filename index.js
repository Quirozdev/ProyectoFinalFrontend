// para cargar las variables de entorno
require("dotenv").config();

// para establecer la conexion con MongoDB
require("./db/db");
const express = require("express");
const nunjucks = require("nunjucks");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();
const routerProductos = require("./controllers/products");
const routerApiProductos = require("./controllers/api/products");
const routerApiCategorias = require("./controllers/api/categories");
// si no se provee un puerto en las variables de entorno, se usa el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Middleware para permit el uso de JSON
app.use(express.json());

// para que el servidor mande nuestros css y javascript al navegador desde nuestra carpeta public
app.use(express.static("public"));

// para usar sesiones que son requeridas para los mensajes flash
app.use(
  session({
    secret: "dsfiugjhv3rRWS34_d",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

// para los mensajes flash
app.use(flash());

// configurar el sistema de templates de nunjucks, muy parecido al de Jinja para el framework de Flask de Python
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// para que app tenga las rutas del router de productos
// Un controlador es para el manejo de nuestros templates/frontend y
// el otro es para nuestra API Rest
app.use(routerProductos);
app.use(routerApiProductos);
app.use(routerApiCategorias);

// para que la pagina principal redireccione a la lista de productos
app.get("/", (req, res) => {
  res.redirect("/productos/");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
