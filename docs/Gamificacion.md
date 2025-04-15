# Módulo de Gamificación - Proyecto Tabanok

**Actualizado abril 2025**

---

## Estructura del módulo

```
backend/src/features/gamification/
├── entities/
│   ├── base-achievement.entity.ts
│   ├── achievement.entity.ts
│   ├── cultural-achievement.entity.ts
│   ├── user-achievement.entity.ts
│   ├── mission-template.entity.ts
│   ├── mission.entity.ts
│   ├── season.entity.ts
│   ├── special-event.entity.ts
│   ├── leaderboard.entity.ts
│   ├── badge.entity.ts
│   ├── gamification.entity.ts
│   ├── mentor.entity.ts
│   ├── mentor-specialization.entity.ts
│   ├── mentorship-relation.entity.ts
│   ├── user-level.entity.ts
│   ├── user-reward.entity.ts
│   ├── achievement-progress.entity.ts
│   └── ...
├── controllers/
├── dto/
├── enums/
├── repositories/
├── services/
├── gamification.module.ts
```

---

## Configuración y despliegue (abril 2025)

- La conexión a la base de datos se realiza preferentemente mediante la variable de entorno `DATABASE_URL`.
- En producción (Render, Docker), asegúrate de definir `DATABASE_URL` con la URL completa de PostgreSQL.
- La configuración de TypeORM es asíncrona y prioriza `DATABASE_URL`, pero puede usar `DB_HOST`, `DB_PORT`, etc., como fallback.
- Todas las entidades relevantes están incluidas en la configuración para evitar errores de metadatos.
- Se reemplazó `bcrypt` por `bcryptjs` para evitar problemas con binarios nativos en despliegues.
- En `main.ts` se asigna `globalThis.crypto` condicionalmente para compatibilidad con Node.js y entornos Docker.

---

## Descripción general

El módulo de gamificación gestiona:

- Logros generales y culturales
- Progreso detallado de logros
- Niveles y experiencia de usuario
- Recompensas y badges
- Misiones diarias, semanales, mensuales y temáticas
- Temporadas culturales con misiones específicas
- Rankings y tablas de clasificación
- Mentorías y relaciones
- Notificaciones relacionadas con gamificación

---

## Consolidación de logros (abril 2025)

Se creó una **entidad base abstracta** `BaseAchievement` con los campos comunes:

- `id`, `name`, `description`, `iconUrl`

De ella heredan:

- **Achievement**: logros generales, con campo adicional `criteria`.
- **CulturalAchievement**: logros culturales, con categorías, niveles, requisitos, recompensas adicionales, etc.

En la tabla de unión `user_achievements` se agregó el campo:

- `achievementType`: `'GENERAL'` o `'CULTURAL'`

Esto permite distinguir el tipo de logro asociado a cada usuario, clarificando la coexistencia y facilitando la extensión futura.

---

## Optimización generación dinámica de misiones y temporadas (abril 2025)

Se creó la entidad `MissionTemplate` para definir plantillas configurables de misiones, con:

- Título, descripción
- Frecuencia (`diaria`, `semanal`, `mensual`, `temporada`)
- Categorías, etiquetas
- Condiciones y recompensas en JSON
- Fechas de inicio y fin
- Estado activo/inactivo

Esto permite que administradores gestionen misiones sin modificar código, facilitando personalización, escalabilidad y adaptación a eventos o campañas.

---

## Integración automática de actividades con misiones (octubre 2025)

Se implementó la integración automática entre las actividades del usuario y el progreso de sus misiones.

- Cada vez que un usuario completa una actividad (lección, ejercicio, contribución cultural, etc.), el sistema actualiza automáticamente el progreso de las misiones relacionadas.
- Esta integración es transparente y no requiere intervención manual ni llamadas adicionales desde el frontend.
- Al alcanzar el objetivo de una misión, se otorgan automáticamente las recompensas y/o insignias configuradas.
- Esto permite una experiencia más fluida y motivadora para el usuario, que recibe recompensas inmediatas por sus acciones cotidianas.

---

## Integración frontend-backend (abril 2025)

- Las rutas usan `/api/v1/gamification/...`.
- Se agregaron funciones para otorgar logros, recompensas, actualizar puntos y nivel.
- Se agregó la función `grantPoints` al servicio de gamificación para otorgar puntos a los usuarios.
- Mensajes internacionalizados en español.
- Hooks en `frontend/hooks/gamification/useGamification.ts`.
- Componentes actualizados para usar hooks y mostrar mensajes coherentes.
- Funcionalidades accesibles y correctamente representadas en la interfaz.

---

## Panel administrativo de misiones (octubre 2025)

Se implementó un **panel administrativo en el frontend** para gestionar dinámicamente las misiones gamificadas, sin necesidad de modificar código.

**Funcionalidades:**

- Listar todas las misiones existentes.
- Crear nuevas misiones con título, descripción, frecuencia, categorías, fechas y estado.
- Editar misiones existentes con los mismos campos.
- Activar o desactivar misiones.
- Interfaz accesible y coherente con el resto del sistema.
- Integración directa con la API REST `/api/v1/gamification/missions`.

Este panel facilita la personalización, escalabilidad y adaptación a eventos o campañas culturales y pedagógicas.

---

## Estado de la licencia

MIT License

---

## Pendientes futuros

- Documentar endpoints específicos y flujos de negocio.
- Revisar redundancias y eliminar campos obsoletos restantes.
