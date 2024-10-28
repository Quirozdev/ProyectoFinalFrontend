// si se creo el parrafo que esta oculto, es porque estan los datos para el toast
const contenedorInformacionToast = document.getElementById(
  "contenedor-informacion-toast"
);

if (contenedorInformacionToast) {
  const tipo_mensaje = contenedorInformacionToast
    .getAttribute("data-tipo-mensaje")
    .toLowerCase();
  const mensaje = contenedorInformacionToast.getAttribute("data-mensaje");

  const colorFondo =
    tipo_mensaje === "borrado"
      ? "#dc2626"
      : tipo_mensaje === "editado"
      ? "#ca8a04"
      : "#16a34a";

  const notyf = new Notyf({
    duration: 5000,
    position: {
      x: "right",
      y: "top",
      dismissible: true,
    },
    types: [
      {
        type: "success",
        background: colorFondo,
      },
    ],
  });

  notyf.success(mensaje);
}
