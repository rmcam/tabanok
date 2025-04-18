# Componente StudentDashboard

Este componente muestra el panel del estudiante, presentando información sobre sus insignias, ranking y recomendaciones.

## Funcionalidad

El componente realiza tres peticiones a la API para obtener la información necesaria:

- `/api/v1/badges/users/{userId}`: Obtiene las insignias del estudiante.
- `/api/v1/leaderboard/{userId}`: Obtiene el ranking del estudiante.
- `/api/v1/recommendations/users/{userId}`: Obtiene las recomendaciones para el estudiante.

Actualmente, el `userId` está hardcodeado como '123'.  Esto debe ser reemplazado por el ID del usuario actual.

## Tareas pendientes

- Reemplazar el `userId` ('123') con el ID del usuario actual.
- Implementar la lógica para mostrar el progreso, los logros, las actividades sugeridas y la biblioteca multimedia del estudiante.

## Estructura

El componente se divide en tres secciones principales:

- **Insignias:** Muestra una lista de las insignias obtenidas por el estudiante.
- **Ranking:** Muestra el ranking del estudiante en la tabla de clasificación.
- **Recomendaciones:** Muestra una lista de recomendaciones para el estudiante.

## Ejemplo de uso

```jsx
<StudentDashboard />
