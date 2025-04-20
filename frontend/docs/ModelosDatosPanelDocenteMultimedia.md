# Modelos de Datos para Panel Docente y Multimedia

---

## Panel Docente

El modelo de datos para el panel docente se define en `models/teacher_dashboard_model.json`.

### `TeacherDashboard`

```json
{
  "TeacherDashboard": {
    "user": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "role": "enum",
      "level": "number",
      "points": "number"
    },
    "lessons": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "order": "number",
        "content": "object",
        "objectives": "array",
        "points": "number",
        "moduleId": "string",
        "isCompleted": "boolean"
      }
    ],
    "activities": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "type": "enum",
        "difficulty": "enum",
        "content": "object",
        "points": "number",
        "metadata": "object",
        "isActive": "boolean"
      }
    ],
    "units": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "order": "number",
        "requiredPoints": "number",
        "metadata": "object",
        "isActive": "boolean"
      }
    ],
    "progress": [
      {
        "id": "string",
        "userId": "string",
        "exerciseId": "string",
        "score": "number",
        "isCompleted": "boolean",
        "answers": "object"
      }
    ],
    "evaluations": [
      {
        "id": "string",
        "userId": "string",
        "culturalContentId": "string",
        "score": "number",
        "answers": "object",
        "attemptsCount": "number",
        "averageScore": "number",
        "timeSpentSeconds": "number",
        "progressMetrics": "object",
        "feedback": "string",
        "createdAt": "Date",
        "updatedAt": "Date"
      }
    ]
  }
}
```

### Propiedades

-   `user`: Información del usuario docente.
-   `lessons`: Lista de lecciones.
-   `activities`: Lista de actividades.
-   `units`: Lista de unidades.
-   `progress`: Lista de progreso de los estudiantes.
-   `evaluations`: Lista de evaluaciones.

## Multimedia

El modelo de datos para multimedia se define en `models/multimedia_model.json`.

### `Multimedia`

```json
{
  "Multimedia": {
    "id": "string",
    "title": "string",
    "description": "string",
    "type": "enum",
    "url": "string",
    "lessonId": "string",
    "metadata": "object"
  }
}
```

---

Última actualización: 20/4/2025, 2:00:00 a. m. (America/Bogota, UTC-5:00)
