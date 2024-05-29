const mostrarFormulario = (formularioId) => {
    const formularios = document.querySelectorAll('.formulario-container');
    let algunFormularioVisible = false;

    formularios.forEach(form => {
        if (form.id === formularioId) {
            form.style.display = form.style.display === 'block' ? 'none' : 'block';
            if (form.style.display === 'block') {
                algunFormularioVisible = true;
            }
        } else {
            form.style.display = 'none';
        }
    });
    
    ajustarAnchoTabla(algunFormularioVisible);
};

const ocultarFormularios = () => {
    document.querySelectorAll('.formulario-container').forEach(form => {
        form.style.display = 'none';
    });
    ajustarAnchoTabla(false);
};

const ajustarAnchoTabla = (algunFormularioVisible) => {
    const tableContainer = document.querySelector('.table-container');
    if (algunFormularioVisible) {
        tableContainer.classList.remove('full-width');
        tableContainer.classList.add('half-width');
    } else {
        tableContainer.classList.remove('half-width');
        tableContainer.classList.add('full-width');
    }
};

const limpiarFormulario = (formularioId) => {
    const formulario = document.getElementById(formularioId);
    if (formulario && typeof formulario.reset === 'function') {
        formulario.reset();
    } else {
        console.error('No se pudo limpiar el formulario:', formularioId);
    }
};

document.getElementById('btnIniciarGestion').addEventListener('click', () => {
    document.getElementById('presentacion').style.display = 'none';
    document.getElementById('gestorEquipo').style.display = 'block';
    document.getElementById('body').classList.remove('inicio');
    document.getElementById('body').classList.add('gestor');
    ajustarAnchoTabla(false);  // Asegura que la tabla esté a pantalla completa al iniciar
});

document.getElementById('btnVolverInicio').addEventListener('click', () => {
    document.getElementById('gestorEquipo').style.display = 'none';
    document.getElementById('presentacion').style.display = 'block';
    document.getElementById('body').classList.remove('gestor');
    document.getElementById('body').classList.add('inicio');
    ocultarFormularios();
    ajustarAnchoTabla(false);  // Asegura que la tabla esté a pantalla completa al volver a inicio
});

document.getElementById('btnAgregarJugador').addEventListener('click', () => mostrarFormulario('formularioAgregarJugador'));
document.getElementById('btnAsignarPosicion').addEventListener('click', () => mostrarFormulario('formularioAsignarPosicion'));
document.getElementById('btnCambiarEstado').addEventListener('click', () => mostrarFormulario('formularioCambiarEstado'));
document.getElementById('btnRealizarCambio').addEventListener('click', () => mostrarFormulario('formularioRealizarCambio'));
document.getElementById('btnEliminarJugador').addEventListener('click', () => mostrarFormulario('formularioEliminarJugador'));

document.getElementById('formularioJugador').addEventListener('submit', (event) => {
    event.preventDefault();
    agregarJugadorDesdeFormulario(event);
    limpiarFormulario('formularioJugador');
    ocultarFormularios();
    ajustarAnchoTabla(false);
});
document.getElementById('formularioPosicion').addEventListener('submit', (event) => {
    event.preventDefault();
    asignarPosicion(event);
    limpiarFormulario('formularioPosicion');
    ocultarFormularios();
    ajustarAnchoTabla(false);
});
document.getElementById('formularioEstado').addEventListener('submit', (event) => {
    event.preventDefault();
    cambiarEstado(event);
    limpiarFormulario('formularioEstado');
    ocultarFormularios();
    ajustarAnchoTabla(false);
});
document.getElementById('formularioCambio').addEventListener('submit', (event) => {
    event.preventDefault();
    realizarCambio(event);
    limpiarFormulario('formularioCambio');
    ocultarFormularios();
    ajustarAnchoTabla(false);
});
document.getElementById('formularioEliminar').addEventListener('submit', (event) => {
    event.preventDefault();
    eliminarJugador(event);
    limpiarFormulario('formularioEliminar');
    ocultarFormularios();
    ajustarAnchoTabla(false);
});
