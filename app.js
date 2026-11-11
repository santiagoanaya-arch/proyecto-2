// Función para limpiar texto y convertir a número (acepta comas y puntos)
function obtenerNumero(texto) {
    if (texto === undefined || texto === null || texto.trim() === "") return NaN;
    let textoLimpio = texto.trim().replace(',', '.');
    return parseFloat(textoLimpio);
}

// Función para mostrar mensajes de error
function mostrarError(contenedor, mensaje) {
    contenedor.innerHTML = "⚠️ " + mensaje;
    contenedor.className = "resultado alert-error block";
}

// ---------------------------------------------------------
// 1. LÓGICA SECUENCIAL: Sumatoria de XP
// ---------------------------------------------------------
function calcularXP() {
    let inpAsistencia = document.getElementById('ptsAsistencia').value;
    let inpTareas = document.getElementById('ptsTareas').value;
    let inpParticipacion = document.getElementById('ptsParticipacion').value;
    let contenedor = document.getElementById('resultadoSecuencial');

    let asistencia = obtenerNumero(inpAsistencia);
    let tareas = obtenerNumero(inpTareas);
    let participacion = obtenerNumero(inpParticipacion);

    if (isNaN(asistencia) || isNaN(tareas) || isNaN(participacion)) {
        mostrarError(contenedor, "Ingresa valores numéricos en todas las casillas.");
        return;
    }

    // Proceso Secuencial: Paso 1 (Sumar todo)
    let totalXP = asistencia + tareas + participacion;
    
    // Paso 2 (Mostrar Resultado)
    contenedor.innerHTML = `¡Estudiante ganó <strong>${totalXP} XP</strong>! ⚡`;
    contenedor.className = "resultado alert-orange block";
}

// ---------------------------------------------------------
// 2. LÓGICA CONDICIONAL: Asignación de Medallas
// ---------------------------------------------------------
function asignarMedalla() {
    let input = document.getElementById('totalXP').value;
    let contenedor = document.getElementById('resultadoCondicional');
    
    let puntos = obtenerNumero(input);

    if (isNaN(puntos) || puntos < 0) {
        mostrarError(contenedor, "Ingresa una cantidad válida de XP (mayor a 0).");
        return;
    }

    // Proceso Condicional (IF / ELSE IF / ELSE)
    if (puntos >= 100) {
        contenedor.innerHTML = "Rango: 🥇 MEDALLA DE ORO";
    } else if (puntos >= 50) {
        contenedor.innerHTML = "Rango: 🥈 MEDALLA DE PLATA";
    } else {
        contenedor.innerHTML = "Rango: 🥉 MEDALLA DE BRONCE";
    }
    
    contenedor.className = "resultado alert-teal block";
}

// ---------------------------------------------------------
// 3. LÓGICA ITERATIVA: Asignador de Turnos
// ---------------------------------------------------------
function generarTurnos() {
    let textoNombres = document.getElementById('listaEstudiantes').value;
    let contenedor = document.getElementById('resultadoIterativa');

    if (textoNombres.trim() === "") {
        mostrarError(contenedor, "Ingresa al menos un nombre.");
        return;
    }

    // Separar los nombres por coma
    let listaEstudiantes = textoNombres.split(',');
    
    // Crear el inicio de la lista HTML
    let contenidoHTML = "<strong>Orden de Participación:</strong><ul>";
    let turnoActual = 1;

    // Proceso Iterativo (Ciclo FOR)
    for (let i = 0; i < listaEstudiantes.length; i++) {
        let nombre = listaEstudiantes[i].trim();
        
        // Si no está vacío, asignarle un turno
        if (nombre !== "") {
            contenidoHTML += `<li>Turno ${turnoActual}: ${nombre} 🙋🏽‍♂️</li>`;
            turnoActual++;
        }
    }
    contenidoHTML += "</ul>";

    if (turnoActual === 1) {
        mostrarError(contenedor, "No se encontraron nombres válidos.");
        return;
    }

    contenedor.innerHTML = contenidoHTML;
    contenedor.className = "resultado alert-indigo block";
}
