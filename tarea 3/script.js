document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;

    if (nombre && email && telefono) {
        document.getElementById('successMessage').textContent = `¡Gracias, ${nombre}! Los datos fueron enviados correctamente.`;
        document.getElementById('clientForm').reset();  // Limpiar el formulario después del envío
    } else {
        document.getElementById('successMessage').textContent = 'Por favor, completa todos los campos obligatorios.';
    }
});