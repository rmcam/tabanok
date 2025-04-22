# Módulo de Gamificación - Proyecto Tabanok

**Actualizado abril 2025**

---

## Flujos de negocio

### Logros culturales

Gestionado en `CulturalAchievementService`. Permite crear, obtener, inicializar el progreso, actualizar el progreso y obtener logros del usuario.

### Recompensas por colaboración

Gestionado en `CollaborationRewardService`. Permite otorgar recompensas por colaboración y obtener estadísticas de colaboración.

### Mentoría

Gestionado en `MentorService`. Permite verificar la elegibilidad del mentor, solicitar mentoría, crear misiones de mentoría, finalizar misiones de mentoría, crear mentores, asignar estudiantes, actualizar el estado de la mentoría, registrar sesiones, obtener detalles del mentor y obtener estudiantes del mentor.

### Misiones

Gestionado en `MissionService`. Permite crear misiones, obtener misiones activas, actualizar el progreso de la misión, otorgar recompensas de la misión, generar misiones diarias y generar misiones semanales.

### Eventos especiales

Gestionado en `SpecialEventService`. Permite crear temporadas, obtener la temporada actual, generar temporadas y obtener el progreso de la temporada.

---

## Refactorización del servicio StatisticsReportService

El servicio `StatisticsReportService` ha sido refactorizado para mejorar su estructura y facilitar su mantenimiento.

## Dependencia circular entre AuthModule y GamificationModule

Se resolvió la dependencia circular entre `AuthModule` y `GamificationModule` utilizando `forwardRef()`.

---

## Relación entre Usuarios y Estadísticas

Cada usuario tiene una entrada en la tabla `statistics` que contiene información sobre su progreso y logros en la plataforma.

---

## Pruebas Unitarias

El módulo de gamificación cuenta con pruebas unitarias para verificar el correcto funcionamiento de sus servicios.

### Servicios con pruebas unitarias

*   `GamificationService`
*   `LeaderboardService`
*   `MissionService`
*   `CulturalAchievementService`
*   `CollaborationRewardService`
*   `MentorService`

---

## Pendientes

*   Revisar la cobertura completa de las pruebas unitarias para asegurar que todos los casos de uso estén cubiertos.
*   Monitorizar el rendimiento de los flujos de negocio y realizar optimizaciones adicionales si es necesario.
*   Documentar completamente las API del módulo utilizando Swagger.

---

Última actualización: 20/4/2025, 2:00:00 a. m. (America/Bogota, UTC-5:00)
