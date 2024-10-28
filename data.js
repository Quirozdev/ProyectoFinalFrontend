// categorias precreadas

const categorias = [
  { id: 1, nombre: "Granos y Cereales" },
  { id: 2, nombre: "Lácteos" },
  { id: 3, nombre: "Bebidas" },
  { id: 4, nombre: "Conservas" },
  { id: 5, nombre: "Snacks" },
  { id: 6, nombre: "Productos de Limpieza" },
  { id: 7, nombre: "Frutas y Verduras" },
  { id: 8, nombre: "Panadería" },
  { id: 9, nombre: "Carnes Frías" },
  { id: 10, nombre: "Especias y Condimentos" },
  { id: 11, nombre: "Cereales para Desayuno" },
  { id: 12, nombre: "Pastas" },
  { id: 13, nombre: "Aceites y Grasas" },
  { id: 14, nombre: "Salsas y Aderezos" },
  { id: 15, nombre: "Dulces y Chocolates" },
  { id: 16, nombre: "Comida Congelada" },
  { id: 17, nombre: "Frutos Secos" },
  { id: 18, nombre: "Galletas" },
  { id: 19, nombre: "Bebidas Energéticas" },
  { id: 20, nombre: "Hogar y Cuidado Personal" },
  { id: 21, nombre: "Productos para Mascotas" },
  { id: 22, nombre: "Sopas y Caldos" },
  { id: 23, nombre: "Té y Café" },
  { id: 24, nombre: "Comidas Instantáneas" },
  { id: 25, nombre: "Utensilios de Cocina" },
  { id: 26, nombre: "Artículos de Papel" },
  { id: 27, nombre: "Productos Farmacéuticos" },
  { id: 28, nombre: "Cuidado del Bebé" },
  { id: 29, nombre: "Electrodomésticos Pequeños" },
  { id: 30, nombre: "Accesorios de Cocina" },
];

// aqui se van a ir guardando los productos en memoria
const productos = [];

module.exports = {
  categorias,
  productos,
};
