// editarproducto.js

document.addEventListener('DOMContentLoaded', function() {
    const editarBtn = document.getElementById('btn-editar');
    const productoId = '{{ producto.id }}'; // El ID del producto que deseas editar

    editarBtn.addEventListener('click', function() {
        // Obtener los valores de los campos
        const nombre = document.getElementById('nombre').value;
        const categoriaId = document.getElementById('categoria').value; // Obtener la categoría seleccionada
        const precioUnitario = document.getElementById('precio_unitario').value;
        const cantidadEnStock = document.getElementById('cantidad_en_stock').value;
        const urlImagen = document.getElementById('url_imagen').value;

        // Validar los campos (puedes agregar más validaciones si es necesario)
        if (!nombre || !categoriaId || !precioUnitario || !cantidadEnStock || !urlImagen) {
            alert('Por favor completa todos los campos.');
            return;
        }

        // Preparar los datos a enviar
        const data = {
            nombre: nombre,
            categoria_id: categoriaId, // Incluir la categoría seleccionada
            precio_unitario: precioUnitario,
            cantidad_en_stock: cantidadEnStock,
            url_imagen: urlImagen
        };

        // Realizar la solicitud de edición utilizando fetch
        fetch(`/api/productos/${productoId}/editar/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Producto actualizado correctamente.');
                // Redirigir o actualizar la vista
                window.location.href = `/productos/${productoId}`;
            } else if (data.error) {
                alert(`Error: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error al editar el producto:', error);
            alert('Hubo un error al actualizar el producto.');
        });
    });
});
