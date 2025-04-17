# Endpoints y flujos de negocio del módulo de gamificación

## Endpoints

### POST /gamification/grant-points/:userId

Otorga puntos a un usuario.

**Parámetros de entrada:**

*   `userId`: ID del usuario (number).
*   `points`: Cantidad de puntos a otorgar (number).

**Salida:**

*   Usuario actualizado con los puntos otorgados en el campo `gameStats.totalPoints`.

## Flujos de negocio

### Otorgar puntos a un usuario

1.  El cliente envía una solicitud `POST` al endpoint `/gamification/grant-points/:userId` con el ID del usuario y la cantidad de puntos a otorgar.
2.  El controlador `GamificationController` recibe la solicitud y llama al método `grantPoints` del servicio `GamificationService`.
3.  El servicio `GamificationService` busca el usuario en la base de datos.
4.  Si el usuario no existe, el servicio lanza un error.
5.  Si el usuario existe, el servicio agrega los puntos a la cantidad de puntos actual del usuario.
6.  El servicio guarda el usuario actualizado en la base de datos.
7.  El servicio retorna el usuario actualizado.
