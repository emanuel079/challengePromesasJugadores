document.addEventListener('DOMContentLoaded', () => {
    listarJugadores();
});

const listarJugadores = async () => {
    try {
        const jugadores = obtenerJugadoresLocalStorage();
        console.log('Jugadores en localStorage:', jugadores);  // Log para verificar los jugadores en localStorage

        const titulares = jugadores.filter(jugador => jugador.estado === 'Titular');
        const suplentes = jugadores.filter(jugador => jugador.estado === 'Suplente');

        console.log('Titulares:', titulares);  // Log para verificar los jugadores titulares
        console.log('Suplentes:', suplentes);  // Log para verificar los jugadores suplentes

        const posiciones = ['Arquero', 'Defensor', 'Mediocampo', 'Delantero'];
        titulares.sort((a, b) => posiciones.indexOf(a.posicion) - posiciones.indexOf(b.posicion));
        suplentes.sort((a, b) => posiciones.indexOf(a.posicion) - posiciones.indexOf(b.posicion));

        let tablaTitularesHtml = `
            <h3>Titulares</h3>
            <table class="table table-bordered table-striped table-hover" style="width: 100%">
                <thead class="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Posición</th>
                    </tr>
                </thead>
                <tbody>
        `;
        titulares.forEach(jugador => {
            tablaTitularesHtml += `
                <tr>
                    <td>${jugador.nombre}</td>
                    <td>${jugador.edad}</td>
                    <td>${jugador.posicion}</td>
                </tr>
            `;
        });
        tablaTitularesHtml += '</tbody></table>';

        let tablaSuplentesHtml = `
            <br>
            <h3>Suplentes</h3>
            <table class="table table-bordered table-striped table-hover" style="width: 100%">
                <thead class="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Posición</th>
                    </tr>
                </thead>
                <tbody>
        `;
        suplentes.forEach(jugador => {
            tablaSuplentesHtml += `
                <tr>
                    <td>${jugador.nombre}</td>
                    <td>${jugador.edad}</td>
                    <td>${jugador.posicion}</td>
                </tr>
            `;
        });
        tablaSuplentesHtml += '</tbody></table>';

        document.getElementById('listaJugadoresTitulares').innerHTML = tablaTitularesHtml;
        document.getElementById('listaJugadoresSuplentes').innerHTML = tablaSuplentesHtml;
    } catch (error) {
        console.error('Error:', error.message);
    }
};
