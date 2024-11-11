function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Por favor, complete todos los campos.");
        return false;
    }
    return true;
}

function checkIn() {
    document.getElementById('status').innerText = 'Check-In registrado exitosamente a las ' + new Date().toLocaleTimeString();
}

function checkOut() {
    document.getElementById('status').innerText = 'Check-Out registrado exitosamente a las ' + new Date().toLocaleTimeString();
}

function validateDayOff() {
    const date = document.getElementById('date').value;
    const reason = document.getElementById('reason').value;

    if (!date || !reason) {
        alert("Por favor, complete todos los campos.");
        return false;
    }
    return true;
}

// Datos de ejemplo para la validación de inicio de sesión
const userCredentials = {
    username: "profesor",
    password: "contraseña123"
};

// Arreglo para almacenar los registros de trabajo
let workHours = [];

// Función para cargar el historial de trabajo desde localStorage
function loadWorkHours() {
    const storedWorkHours = localStorage.getItem('workHours');
    if (storedWorkHours) {
        workHours = JSON.parse(storedWorkHours);
    }
}

// Función para guardar el historial de trabajo en localStorage
function saveWorkHours() {
    localStorage.setItem('workHours', JSON.stringify(workHours));
}

// Función para validar el inicio de sesión
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === userCredentials.username && password === userCredentials.password) {
        // Redirige a la página de registro de asistencia
        window.location.href = "attendance.html"; // Cambia esto según la ruta real
        return false; // Evita el envío del formulario
    } else {
        alert("Credenciales incorrectas. Intente de nuevo.");
        return false;
    }
}

// Función para registrar Check-In
function checkIn() {
    const now = new Date();
    const entryTime = now.toLocaleTimeString();
    const entryDate = now.toLocaleDateString();

    // Verificar si ya existe un registro para ese día
    const existingRecord = workHours.find(record => record.date === entryDate);
    
    if (existingRecord) {
        existingRecord.entry = entryTime; // Actualiza la hora de entrada
    } else {
        workHours.push({ date: entryDate, entry: entryTime, exit: '', total: 0 });
    }

    saveWorkHours(); // Guardar en localStorage
    document.getElementById('status').innerText = 'Check-In registrado exitosamente a las ' + entryTime;
    alert("Check-In registrado exitosamente a las " + entryTime);
}

// Función para registrar Check-Out
function checkOut() {
    const now = new Date();
    const exitTime = now.toLocaleTimeString();
    const todayDate = now.toLocaleDateString();
    const lastWorkHour = workHours.find(record => record.date === todayDate);

    // Verificar si el registro de trabajo existe y si hay un Check-In
    if (lastWorkHour) {
        if (lastWorkHour.exit === '') {
            lastWorkHour.exit = exitTime;
            lastWorkHour.total = calculateTotalHours(lastWorkHour.entry, exitTime);
            saveWorkHours(); // Guardar en localStorage
            document.getElementById('status').innerText = 'Check-Out registrado exitosamente a las ' + exitTime;
            alert("Check-Out registrado exitosamente a las " + exitTime);
            
            // Actualizar la tabla de horas trabajadas
            updateWorkHoursTable();
        } else {
            alert("Ya has registrado el Check-Out para hoy.");
        }
    } else {
        alert("Por favor, registra primero el Check-In.");
    }
}

// Función para marcar el descanso
function markBreak() {
    const now = new Date();
    const breakTime = now.toLocaleTimeString();
    const lastWorkHour = workHours.find(record => record.date === new Date().toLocaleDateString());

    if (lastWorkHour) {
        lastWorkHour.break = breakTime;
        saveWorkHours(); // Guardar en localStorage
        alert("Descanso registrado a las " + breakTime);
    } else {
        alert("Por favor, registra primero el Check-In.");
    }
}

// Función para calcular el total de horas trabajadas
function calculateTotalHours(entryTime, exitTime) {
    const entry = new Date(`1970-01-01T${entryTime}`);
    const exit = new Date(`1970-01-01T${exitTime}`);
    
    // Verificar si las horas son válidas
    if (entry && exit) {
        const totalHours = (exit - entry) / 3600000; // Convertir milisegundos a horas
        return totalHours.toFixed(2); // Devolver solo el número de horas
    } else {
        return 0; // Devolver 0 si no se pudo calcular
    }
}

// Cargar las horas trabajadas en la nueva página
window.onload = function() {
    loadWorkHours(); // Cargar desde localStorage

    const tableBody = document.getElementById('workHoursTable');
    
    if (tableBody) {
        workHours.forEach(workHour => {
            const row = `<tr>
                            <td>${workHour.date}</td>
                            <td>${workHour.entry}</td>
                            <td>${workHour.exit || ''}</td>
                            <td>${workHour.total ? workHour.total + ' horas' : '0 horas'}</td>
                         </tr>`;
            tableBody.innerHTML += row;
        });
    }
}

// Función para actualizar la tabla de horas trabajadas
function updateWorkHoursTable() {
    const tableBody = document.getElementById('workHoursTable');
    tableBody.innerHTML = ''; // Limpiar la tabla

    workHours.forEach(workHour => {
        const row = `<tr>
                        <td>${workHour.date}</td>
                        <td>${workHour.entry}</td>
                        <td>${workHour.exit || ''}</td>
                        <td>${workHour.total ? workHour.total + ' horas' : '0 horas'}</td>
                     </tr>`;
        tableBody.innerHTML += row;
    });
}

// Función para validar la solicitud de días libres
function validateDayOff() {
    const date = document.getElementById('dayOffDate').value;
    const reason = document.getElementById('reason').value;

    if (!date || !reason) {
        alert("Por favor, complete todos los campos.");
        return false;
    }

    alert("Solicitud de día libre enviada para el " + date + " con motivo: " + reason);
    return true;
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('workHours'); // Limpiar el almacenamiento local
    window.location.href = "index.html"; // Redirige a la página de inicio
}

function loadXMLWorkHours() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        const xmlDoc = xhttp.responseXML;
        const tableBody = document.getElementById('xmlWorkHoursTable');
        
        const entries = xmlDoc.getElementsByTagName('entry');
        for (let i = 0; i < entries.length; i++) {
            const date = entries[i].getElementsByTagName('date')[0].childNodes[0].nodeValue;
            const entryTime = entries[i].getElementsByTagName('entryTime')[0].childNodes[0].nodeValue;
            const exitTime = entries[i].getElementsByTagName('exitTime')[0].childNodes[0].nodeValue;
            const totalHours = entries[i].getElementsByTagName('totalHours')[0].childNodes[0].nodeValue;

            const row = `<tr>
                            <td>${date}</td>
                            <td>${entryTime}</td>
                            <td>${exitTime}</td>
                            <td>${totalHours} horas</td>
                         </tr>`;
            tableBody.innerHTML += row;
        }
    };
    xhttp.open("GET", "work-hours.xml", true);
    xhttp.send();
}

// Llamar a la función para cargar los datos XML cuando la página cargue
window.onload = function () {
    loadWorkHours(); // Cargar desde localStorage
    updateWorkHoursTable(); // Actualizar la tabla desde localStorage
    loadXMLWorkHours(); // Cargar desde XML
};




