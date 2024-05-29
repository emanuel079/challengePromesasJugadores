const agregarJugadorDesdeFormulario = async (event) => {
    event.preventDefault();
    try {
        const nombre = document.getElementById('nombre').value.trim();
        const edad = parseInt(document.getElementById('edad').value);
        const posicion = document.getElementById('posicion').value.trim();
        const estado = document.getElementById('estado').value.trim();

        let jugadores = obtenerJugadoresLocalStorage();
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        const nuevoJugador = new Jugador(nombre, edad, posicion, estado);
        jugadores.push(nuevoJugador);
        guardarJugadoresLocalStorage(jugadores);
        alert('Jugador agregado correctamente.');

        listarJugadores();
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const asignarPosicion = async (event) => {
    event.preventDefault();
    try {
        const nombre = document.getElementById('nombrePosicion').value.trim();
        const nuevaPosicion = document.getElementById('nuevaPosicion').value.trim();
        let jugadores = obtenerJugadoresLocalStorage();
        const jugadorIndex = jugadores.findIndex(jugador => jugador.nombre === nombre);
        if (jugadorIndex === -1) {
            throw new Error('El jugador no existe en el equipo.');
        }
        jugadores[jugadorIndex].posicion = nuevaPosicion;
        guardarJugadoresLocalStorage(jugadores);
        alert('Posición asignada correctamente.');
        
        listarJugadores();
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const cambiarEstado = async (event) => {
    event.preventDefault();
    try {
        const nombre = document.getElementById('nombreEstado').value.trim();
        const nuevoEstado = document.getElementById('nuevoEstado').value.trim();
        let jugadores = obtenerJugadoresLocalStorage();
        const jugadorIndex = jugadores.findIndex(jugador => jugador.nombre === nombre);
        if (jugadorIndex === -1) {
            throw new Error('El jugador no existe en el equipo.');
        }
        console.log('Jugador encontrado:', jugadores[jugadorIndex]);
        jugadores[jugadorIndex].estado = nuevoEstado;
        guardarJugadoresLocalStorage(jugadores);
        alert('Estado asignado correctamente.');

        console.log('Jugadores después del cambio:', jugadores);
        
        listarJugadores();
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const realizarCambio = async (event) => {
    event.preventDefault();
    try {
        const jugadorEntrante = document.getElementById('jugadorEntrante').value.trim();
        const jugadorSaliente = document.getElementById('jugadorSaliente').value.trim();
        let jugadores = obtenerJugadoresLocalStorage();
        const indexEntrante = jugadores.findIndex(jugador => jugador.nombre === jugadorEntrante);
        const indexSaliente = jugadores.findIndex(jugador => jugador.nombre === jugadorSaliente);
        if (indexEntrante === -1 || indexSaliente === -1) {
            throw new Error('Uno o ambos jugadores no existen.');
        }
        jugadores[indexEntrante].estado = 'Titular';
        jugadores[indexSaliente].estado = 'Suplente';
        guardarJugadoresLocalStorage(jugadores);
        alert('Cambio realizado correctamente.');
        
        listarJugadores();
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const eliminarJugador = async (event) => {
    event.preventDefault();
    try {
        const nombre = document.getElementById('nombreEliminar').value.trim();
        let jugadores = obtenerJugadoresLocalStorage();
        const jugadorIndex = jugadores.findIndex(jugador => jugador.nombre === nombre);
        if (jugadorIndex === -1) {
            throw new Error('El jugador no existe en el equipo.');
        }
        jugadores.splice(jugadorIndex, 1);
        guardarJugadoresLocalStorage(jugadores);
        alert('Jugador eliminado correctamente.');
        
        listarJugadores();
    } catch (error) {
        console.error('Error:', error.message);
    }
};
