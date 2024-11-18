const inputPrecio = document.getElementById("precio");

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
