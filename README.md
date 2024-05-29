# Challenge-Promises
Ejercicio: Gestión de equipo de fútbol
Desarrolla una aplicación para gestionar un equipo de fútbol, que permita realizar operaciones como agregar jugadores, listar jugadores, asignar posiciones y realizar cambios durante un partido. Utiliza promesas, async/await, try/catch y composición de funciones asíncronas para manejar las operaciones de forma segura y eficiente.

# Requisitos:
1) La aplicación debe permitir agregar nuevos jugadores al equipo proporcionando su nombre, edad y posición.
2) Debe ser posible listar todos los jugadores del equipo, indicando su nombre, edad y posición.
3) Implementa un mecanismo para asignar posiciones a los jugadores, como delantero, centrocampista, defensa o portero.
4) Proporciona una función para realizar cambios durante un partido, que permita sustituir jugadores de acuerdo a las reglas del fútbol.
5) Utiliza un almacenamiento persistente para los datos del equipo y los jugadores, como una base de datos simple (puede ser simulado con archivos en el sistema de archivos).
6) Maneja los errores de manera adecuada utilizando try/catch para capturar errores asíncronos y promesas rechazadas.

# Pasos Sugeridos
1) Define una estructura de datos para representar a un jugador, que incluya su nombre, edad, posición y estado (titular, suplente o lesionado).
2) Implementa funciones asíncronas para agregar un nuevo jugador, listar jugadores, asignar posiciones y realizar cambios durante un partido.
3) Utiliza promesas para manejar la lectura y escritura de datos desde y hacia el almacenamiento persistente.
4) Crea una función principal asíncrona que interactúe con el usuario, permitiéndole realizar las operaciones mencionadas.
5) Utiliza la composición de funciones asíncronas para realizar operaciones complejas, como realizar cambios durante un partido.
