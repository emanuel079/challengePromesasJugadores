// Clase Jugador: define la estructura de datos para un jugador.
class Jugador {
    constructor(nombre, edad, posicion, estado = 'suplente') {
        this.nombre = nombre; // Nombre del jugador
        this.edad = edad;     // Edad del jugador
        this.posicion = posicion; // Posición del jugador en el campo de juego
        this.estado = estado; // Estado actual del jugador (titular, suplente, lesionado), por defecto es 'suplente'
    }
}

// Función para obtener los jugadores almacenados en localStorage.
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores'); // Obtiene la cadena JSON de jugadores de localStorage
    return jugadoresString ? JSON.parse(jugadoresString) : []; // Parsea la cadena JSON a un array de objetos, o retorna un array vacío si no hay datos
};

// Función para guardar los jugadores en localStorage.
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores)); // Convierte el array de jugadores a una cadena JSON y la guarda en localStorage
};

// Función asíncrona para agregar un nuevo jugador al equipo.
// Función asíncrona para agregar un nuevo jugador desde el formulario
const agregarJugadorDesdeFormulario = async () => {
    try {
        const nombre = document.getElementById('nombre').value; // Obtener el valor del campo nombre del formulario
        const edad = parseInt(document.getElementById('edad').value); // Obtener el valor del campo edad del formulario
        const posicion = document.getElementById('posicion').value; // Obtener el valor del campo posición del formulario

        let jugadores = obtenerJugadoresLocalStorage(); // Obtiene la lista actual de jugadores
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre); // Busca si ya existe un jugador con el mismo nombre
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.'); // Si el jugador ya existe, lanza un error
        }

        const nuevoJugador = new Jugador(nombre, edad, posicion); // Crea un nuevo objeto jugador
        jugadores.push(nuevoJugador); // Añade el nuevo jugador al array de jugadores
        guardarJugadoresLocalStorage(jugadores); // Guarda el array actualizado de jugadores en localStorage
        alert('Jugador agregado correctamente.'); // Notifica al usuario que el jugador fue agregado
    } catch (error) {
        console.error('Error:', error.message); // Maneja errores mostrando un mensaje en la consola
    }
};


// Obtener el contenedor donde se va a agregar el formulario
const contenedorFormulario = document.getElementById('contenedorFormulario');

// Agregar el formulario al contenedor
contenedorFormulario.innerHTML = crearFormularioIngresoJugador();


// Asignar el evento de clic al botón "Agregar Jugador" del formulario
document.getElementById('btnAgregarJugador').addEventListener('click', agregarJugadorDesdeFormulario);

// Función para mostrar u ocultar el formulario de agregar jugador
const toggleFormularioAgregarJugador = () => {
    const contenedorFormulario = document.getElementById('contenedorFormulario');
    // Verificar si el formulario está visible o no y cambiar su estado
    if (contenedorFormulario.style.display === 'none') {
        contenedorFormulario.style.display = 'block'; // Mostrar el formulario
    } else {
        contenedorFormulario.style.display = 'none'; // Ocultar el formulario
    }
};

// Asignar el evento de clic al botón "Agregar jugador" para mostrar u ocultar el formulario
document.getElementById('btnAgregarJugador').addEventListener('click', toggleFormularioAgregarJugador);

// Función asíncrona para listar todos los jugadores del equipo.
const listarJugadores = async () => {
    try {
        const jugadores = obtenerJugadoresLocalStorage(); // Obtiene la lista de jugadores

        // Filtrar jugadores titulares y suplentes
        const titulares = jugadores.filter(jugador => jugador.estado === 'Titular');
        const suplentes = jugadores.filter(jugador => jugador.estado === 'Suplente');

        // Ordenar jugadores por posición
        const posiciones = ['Portero', 'Defensa', 'Centrocampista', 'Delantero']; // Define un orden para las posiciones
        titulares.sort((a, b) => posiciones.indexOf(a.posicion) - posiciones.indexOf(b.posicion));
        suplentes.sort((a, b) => posiciones.indexOf(a.posicion) - posiciones.indexOf(b.posicion));

        // Crear HTML para titulares
        let tablaTitularesHtml = '<h3>Titulares</h3><table border="1"><tr><th>Nombre</th><th>Edad</th><th>Posición</th></tr>';
        titulares.forEach(jugador => {
            tablaTitularesHtml += `<tr><td>${jugador.nombre}</td><td>${jugador.edad}</td><td>${jugador.posicion}</td></tr>`;
        });
        tablaTitularesHtml += '</table>';

        // Crear HTML para suplentes
        let tablaSuplentesHtml = '<h3>Suplentes</h3><table border="1"><tr><th>Nombre</th><th>Edad</th><th>Posición</th></tr>';
        suplentes.forEach(jugador => {
            tablaSuplentesHtml += `<tr><td>${jugador.nombre}</td><td>${jugador.edad}</td><td>${jugador.posicion}</td></tr>`;
        });
        tablaSuplentesHtml += '</table>';

        // Establecer el HTML de los elementos con id 'listaJugadoresTitulares' y 'listaJugadoresSuplentes'
        document.getElementById('listaJugadoresTitulares').innerHTML = tablaTitularesHtml;
        document.getElementById('listaJugadoresSuplentes').innerHTML = tablaSuplentesHtml;
    } catch (error) {
        console.error('Error:', error.message); // Maneja errores mostrando un mensaje en la consola
    }
};

// Función asíncrona para asignar una nueva posición a un jugador.
const asignarPosicion = async () => {
    try {
        const nombre = prompt("Ingrese el nombre del jugador para cambiar su posición:"); // Pide al usuario el nombre del jugador a cambiar de posición
        const nuevaPosicion = prompt("Ingrese la nueva posición:"); // Pide la nueva posición para el jugador
        let jugadores = obtenerJugadoresLocalStorage(); // Obtiene la lista de jugadores
        const jugadorIndex = jugadores.findIndex(jugador => jugador.nombre === nombre); // Busca el índice del jugador en el array
        if (jugadorIndex === -1) {
            throw new Error('El jugador no existe en el equipo.'); // Si el jugador no existe, lanza un error
        }
        jugadores[jugadorIndex].posicion = nuevaPosicion; // Cambia la posición del jugador
        guardarJugadoresLocalStorage(jugadores); // Guarda el array actualizado de jugadores
        alert('Posición asignada correctamente.'); // Notifica al usuario que la posición fue asignada
    } catch (error) {
        console.error('Error:', error.message); // Maneja errores mostrando un mensaje en la consola
    }
};

const cambiarEstado = async() => {    
    try{
        const nombre = prompt("Ingrese el nombre del jugador para cambiar su estado:"); // Pide al usuario el nombre del jugador a cambiar estado
        const nuevoEstado = prompt("Ingrese nuevo estado:"); // Pide nuevo estado para el jugador
        let jugadores = obtenerJugadoresLocalStorage(); // Obtiene la lista de jugadores
        const jugadorIndex = jugadores.findIndex(jugador => jugador.nombre === nombre); // Busca el índice del jugador en el array
        if (jugadorIndex === -1) {
            throw new Error('El jugador no existe en el equipo.'); // Si el jugador no existe, lanza un error
        }
        jugadores[jugadorIndex].estado = nuevoEstado; // Cambia la posición del jugador
        guardarJugadoresLocalStorage(jugadores); // Guarda el array actualizado de jugadores
        alert('Estado asignado correctamente.'); // Notifica al usuario que la posición fue asignada
    } catch (error) {
        console.error('Error:', error.message); // Maneja errores mostrando un mensaje en la consola
    }
};

const eliminarJugador = async () => {
    try {
        const nombre = prompt("Ingrese el nombre del jugador a eliminar:"); // Pide al usuario el nombre del jugador a eliminar
        let jugadores = obtenerJugadoresLocalStorage(); // Obtiene la lista de jugadores
        const jugadorIndex = jugadores.findIndex(jugador => jugador.nombre === nombre); // Busca el índice del jugador en el array
        if (jugadorIndex === -1) {
            throw new Error('El jugador no existe en el equipo.'); // Si el jugador no existe, lanza un error
        }
        jugadores.splice(jugadorIndex, 1); // Elimina el jugador del array usando splice
        guardarJugadoresLocalStorage(jugadores); // Guarda el array actualizado de jugadores
        alert('Jugador eliminado correctamente.'); // Notifica al usuario que el jugador fue eliminado
    } catch (error) {
        console.error('Error:', error.message); // Maneja errores mostrando un mensaje en la consola
    }
};

// Función asíncrona para realizar un cambio durante un partido.
const realizarCambio = async () => {
    try {
        const jugadorEntrante = prompt("Ingrese el nombre del jugador entrante:"); // Pide el nombre del jugador que entra al juego
        const jugadorSaliente = prompt("Ingrese el nombre del jugador saliente:"); // Pide el nombre del jugador que sale del juego
        let jugadores = obtenerJugadoresLocalStorage(); // Obtiene la lista de jugadores
        const indexEntrante = jugadores.findIndex(jugador => jugador.nombre === jugadorEntrante); // Busca el índice del jugador entrante
        const indexSaliente = jugadores.findIndex(jugador => jugador.nombre === jugadorSaliente); // Busca el índice del jugador saliente
        if (indexEntrante === -1 || indexSaliente === -1) {
            throw new Error('Uno o ambos jugadores no existen.'); // Si alguno de los jugadores no existe, lanza un error
        }
        jugadores[indexEntrante].estado = 'titular'; // Cambia el estado del jugador entrante a titular
        jugadores[indexSaliente].estado = 'suplente'; // Cambia el estado del jugador saliente a suplente
        guardarJugadoresLocalStorage(jugadores); // Guarda el array actualizado de jugadores
        alert('Cambio realizado correctamente.'); // Notifica al usuario que el cambio fue realizado
    } catch (error) {
        console.error('Error:', error.message); // Maneja errores mostrando un mensaje en la consola
    }
};

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
    // Aquí se podría añadir lógica para iniciar acciones específicas si es necesario
};

main(); // Iniciar la aplicación
