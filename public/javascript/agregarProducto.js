const inputPrecio = document.getElementById("precio");
const imagenSeleccionada = document.getElementById("imagen_seleccionada");

// para que no se puedan introducir mas de 2 decimales en el precio
inputPrecio.addEventListener("input", (e) => {
  if (tiene2DecimalesOMas(inputPrecio.value)) {
    inputPrecio.value = redondear(e.target.value);
  }
});

function redondear(valor) {
  return parseFloat(valor).toFixed(2);
}

function tiene2DecimalesOMas(valor) {
  const [parteEntera, parteDecimal] = valor.split(".");
  return parteDecimal && parteDecimal.length >= 2;
}

function leerArchivo(event) {
  const input = event.target;
  // checa si el input tiene un archivo seleccionado
  if (input.files && input.files[0]) {
    const file = input.files[0];
    // para leer el archivo de imagen
    const reader = new FileReader();

    reader.onload = async (e) => {
      // cuando ya se leyo
      // al elemento de img que estaba oculto se le asigna el src
      // del archivo leido y se muestra en el dom
      imagenSeleccionada.src = e.target.result;
      imagenSeleccionada.style.display = "block";
    };
    // requerido
    reader.readAsDataURL(file);
  }
}

// agregarle al input de archivo de imagen del producto el evento de cuando se selecciona un archivo
document.getElementById("imagen_producto").addEventListener("change", (e) => {
  // resetear la imagen seleccionada
  imagenSeleccionada.src = "";
  imagenSeleccionada.style.display = "none";
  // leer el archivo de imagen
  leerArchivo(e);
});
