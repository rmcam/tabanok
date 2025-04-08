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
│   └── ...
├── controllers/
├── dto/
├── enums/
├── repositories/
├── services/
├── gamification.module.ts
```

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

## Integración frontend-backend (abril 2025)

- Las rutas usan `/api/v1/gamification/...`.
- Se agregaron funciones para otorgar logros, recompensas, actualizar puntos y nivel.
- Mensajes internacionalizados en español.
- Hooks en `frontend/hooks/gamification/useGamification.ts`.
- Componentes actualizados para usar hooks y mostrar mensajes coherentes.
- Funcionalidades accesibles y correctamente representadas en la interfaz.

---

## Estado de la licencia

Actualmente **pendiente de definir**. Se recomienda decidir e incluir una licencia adecuada para el proyecto.

---

## Pendientes futuros

- Crear panel de administración para gestionar plantillas de misiones.
- Documentar endpoints específicos y flujos de negocio.
- Revisar redundancias y eliminar campos obsoletos restantes.
- Definir la licencia del proyecto.
