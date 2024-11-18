const botonBorrarConfirmacion = document.getElementById("confirmar-borrado");
const botonCancelar = document.getElementById("btn-cancelar");

// para confirmar el borrado del producto
botonBorrarConfirmacion.addEventListener("click", (e) => {
  // la id del producto se encuentra como atributo del botton de confirmar borrado
  const id = botonBorrarConfirmacion.getAttribute("data-id-producto");
  fetch(`/productos/${id}`, {
    method: "DELETE",
  }).then(() => {
    // para redireccionar
    window.location.assign(encodeURI(`/productos/`));
  });
});
