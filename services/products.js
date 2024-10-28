const { categorias, productos } = require("../data.js");
const { v4: uuidv4 } = require("uuid");

// simulando operaciones de una base de datos en memoria

function encontrarProductoPorId(id) {
  return productos.find((producto) => {
    return producto.id === id;
  });
}

function encontrarCategoriaPorId(id) {
  return categorias.find((categoria) => {
    return categoria.id === id;
  });
}

function agregarProducto(
  nombre,
  id_categoria,
  precio,
  cantidad_en_stock,
  url_imagen
) {
  // generando una id para el nuevo producto que sea unica
  // no vamos a usar ids autoincrementales, para usar este generador de identificadores tambien con la imagen
  const id = uuidv4();
  productos.push({
    id,
    nombre,
    id_categoria,
    precio_unitario: precio,
    cantidad_en_stock,
    url_imagen,
  });
  return id;
}

function actualizarProducto({
  id_producto,
  nombre,
  id_categoria,
  precio,
  cantidad_en_stock,
  url_imagen,
}) {
  const index = productos.findIndex((producto) => {
    return (producto.id = id_producto);
  });

  // checando cada campo opcional que se haya pasado para actualizarlo
  if (nombre) {
    productos[index].nombre = nombre;
  }
  if (id_categoria) {
    productos[index].id_categoria = id_categoria;
  }
  if (precio) {
    productos[index].precio = precio;
  }
  if (cantidad_en_stock) {
    productos[index].cantidad_en_stock = cantidad_en_stock;
  }
  if (url_imagen) {
    productos[index].url_imagen = url_imagen;
  }
}

function borrarProducto(id) {
  const index = productos.findIndex((producto) => {
    return producto.id == id;
  });
  productos.splice(index, 1);
}

module.exports = {
  encontrarProductoPorId,
  encontrarCategoriaPorId,
  agregarProducto,
  actualizarProducto,
  borrarProducto,
};
