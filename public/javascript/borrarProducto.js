const botonBorrar = document.getElementById("btn-borrar");

const modalBorrar = document.getElementById("modal-borrar");
const botonBorrarConfirmacion = document.getElementById(
  "btn-borrar-confirmacion"
);
const botonCancelar = document.getElementById("btn-cancelar");

// para abrir el modal de borrado
botonBorrar.addEventListener("click", (e) => {
  openModal(modalBorrar);
});

// para cerrar el modal de borrado
botonCancelar.addEventListener("click", (e) => {
  closeModal(modalBorrar);
});

// para confirmar el borrado del producto
botonBorrarConfirmacion.addEventListener("click", (e) => {
  // la id del producto se encuentra como atributo del botton de confirmar borrado
  const id = botonBorrarConfirmacion.getAttribute("data-id-producto");
  fetch(`/productos/${id}`, {
    method: "DELETE",
  }).then(() => {
    const tipoMensaje = "Borrado";
    const mensaje = "Producto borrado exitosamente";
    // para redireccionar con query params que van a ser usados para mostrar un toast en esa pagina
    window.location.assign(
      encodeURI(`/productos/?mensaje=${mensaje}&tipo_mensaje=${tipoMensaje}`)
    );
  });
});

// esto es parte de la libreria de Bulma para manejar como se abre y cierra el modal
// cerrandolo presionando un area fuera del model o presionando la tecla Esc
// Functions to open and close a modal
function openModal($el) {
  $el.classList.add("is-active");
}

function closeModal($el) {
  $el.classList.remove("is-active");
}

function closeAllModals() {
  (document.querySelectorAll(".modal") || []).forEach(($modal) => {
    closeModal($modal);
  });
}

// Add a click event on buttons to open a specific modal
(document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
  const modal = $trigger.dataset.target;
  const $target = document.getElementById(modal);

  $trigger.addEventListener("click", () => {
    openModal($target);
  });
});

// Add a click event on various child elements to close the parent modal
(
  document.querySelectorAll(
    ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
  ) || []
).forEach(($close) => {
  const $target = $close.closest(".modal");

  $close.addEventListener("click", () => {
    closeModal($target);
  });
});

// Add a keyboard event to close all modals
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllModals();
  }
});
