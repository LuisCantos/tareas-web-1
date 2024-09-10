document.getElementById('clientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cedula = document.getElementById('cedula').value;
    const apellidos = document.getElementById('apellidos').value;
    const nombres = document.getElementById('nombres').value;
    const correo = document.getElementById('correo').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;

    if (cedula && apellidos && nombres && correo && fechaNacimiento) {
        document.getElementById('successMessage').textContent = `¡Gracias, ${nombres} ${apellidos}! Tus datos fueron enviados correctamente.`;
        document.getElementById('clientForm').reset();  // Limpiar el formulario después del envío
    } else {
        document.getElementById('successMessage').textContent = 'Por favor, completa todos los campos obligatorios.';
    }
});
