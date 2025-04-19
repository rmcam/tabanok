# Módulo de Gamificación - Proyecto Tabanok

**Actualizado abril 2025**

---

## Flujos de negocio

### Logros culturales

El flujo de logros culturales se gestiona principalmente en `CulturalAchievementService`.

1.  **Creación de un logro cultural:**

    - Un administrador llama al método `createAchievement` con los datos del nuevo logro (nombre, descripción, categoría, nivel, requisitos, recompensas, etc.).
    - El método crea una nueva entidad `CulturalAchievement` y la guarda en la base de datos.
    - Los tipos de logros culturales son:
        *   `PARTICIPACION_EVENTO`: Logro por participar en un evento cultural.
        *   `CREACION_CONTENIDO`: Logro por crear contenido cultural.
        *   `CONTRIBUCION_CULTURAL`: Logro por realizar una contribución cultural.
        *   `APRENDIZAJE_LENGUA`: Logro por aprender la lengua.
        *   `DOMINIO_CULTURAL`: Logro por demostrar dominio cultural.

2.  **Obtención de logros culturales:**

    - Se llama al método `getAchievements` para obtener una lista de logros culturales.
    - Opcionalmente, se puede filtrar por categoría y tipo.
    - El método devuelve una lista de entidades `CulturalAchievement` activas.

3.  **Inicialización del progreso del usuario:**

    - Cuando un usuario comienza a trabajar en un logro cultural, se llama al método `initializeUserProgress` con el ID del usuario y el ID del logro.
    - El método crea una nueva entrada en la tabla `AchievementProgress` para realizar un seguimiento del progreso del usuario.
    - Se inicializa el progreso para cada requisito del logro.

4.  **Actualización del progreso del usuario:**

    - A medida que el usuario avanza hacia la consecución del logro, se llama al método `updateProgress` con el ID del usuario, el ID del logro y una lista de actualizaciones de progreso.
    - El método actualiza el progreso del usuario en la tabla `AchievementProgress`.
    - Se calcula el porcentaje total de progreso y se verifican los hitos.
    - Si el usuario completa el logro, se marca como completado y se otorgan las recompensas.

5.  **Obtención de logros del usuario:**

    - Se llama al método `getUserAchievements` para obtener una lista de logros completados y en curso para un usuario.
    - El método devuelve un objeto con dos listas: `completed` (logros completados) e `inProgress` (logros en curso).

6.  **Obtención del progreso del logro:**
    - Se llama al método `getAchievementProgress` para obtener el progreso detallado de un logro específico para un usuario.
    - El método devuelve una entidad `AchievementProgress` con información sobre el progreso del usuario.

### Recompensas por colaboración

El flujo de recompensas por colaboración se gestiona principalmente en `CollaborationRewardService`.

1.  **Otorgamiento de recompensa por colaboración:**

    - Se llama al método `awardCollaboration` cuando un usuario realiza una colaboración (creación de contenido, revisión, contribución cultural, etc.).
    - El método recibe el ID del usuario, el ID de la contribución, el tipo de colaboración y la calidad de la contribución.
    - Se calcula la cantidad de puntos a otorgar en función de la calidad de la contribución y las bonificaciones por racha.
    - Se registra la colaboración en la tabla `CollaborationReward`.
    - Se actualiza el perfil de gamificación del usuario con los puntos otorgados.
    - Si el usuario cumple con los requisitos para obtener una insignia especial, se le otorga la insignia.
    - Los tipos de colaboración son:
        *   `CONTENIDO_CREACION`: Creación de contenido.
        *   `CONTENIDO_REVISION`: Revisión de contenido.
        *   `CONTRIBUCION_CULTURAL`: Contribución cultural.
        *   `CONTENIDO_TRADUCCION`: Traducción de contenido.
        *   `AYUDA_COMUNITARIA`: Ayuda comunitaria.
        *   `REPORTE_ERRORES`: Reporte de errores.

2.  **Obtención de estadísticas de colaboración:**
    - Se llama al método `getCollaborationStats` para obtener estadísticas sobre las colaboraciones de un usuario.
    - Opcionalmente, se puede filtrar por tipo de colaboración.
    - El método devuelve información como el número total de contribuciones, el número de contribuciones excelentes, la racha actual y las insignias obtenidas.

### Mentoría

El flujo de mentoría se gestiona principalmente en `MentorService`.

1.  **Verificación de elegibilidad del mentor:**

    - Se llama al método `checkMentorEligibility` para verificar si un usuario es elegible para ser mentor.
    - Se requiere un valor cultural mínimo para ser elegible.

2.  **Solicitud de mentoría:**

    - Un aprendiz llama al método `requestMentorship` para solicitar un mentor.
    - El método verifica si el mentor es elegible y si tiene la especialización requerida.
    - Se crea una solicitud de mentoría con estado "pendiente".

3.  **Creación de misión de mentoría:**

    - Un mentor llama al método `createMentorshipMission` para crear una misión para su aprendiz.
    - El método crea una nueva misión de mentoría con los datos proporcionados.

4.  **Finalización de misión de mentoría:**

    - Se llama al método `completeMentorshipMission` cuando se completa una misión de mentoría.
    - Se otorgan puntos de bonificación al mentor y al aprendiz.

5.  **Creación de mentor:**

    - Un administrador llama al método `createMentor` para registrar un nuevo mentor en el sistema.
    - Se crea un nuevo mentor con un nivel inicial y especializaciones.

6.  **Asignación de estudiante:**

    - Un administrador llama al método `assignStudent` para asignar un estudiante a un mentor.
    - Se verifica la disponibilidad del mentor y que tenga la especialización requerida.
    - Se crea una solicitud de mentoría con estado "pendiente".

7.  **Actualización del estado de la mentoría:**

    - Se llama al método `updateMentorshipStatus` para actualizar el estado de una relación de mentoría (ej. activa, inactiva, completada).
    - Si la mentoría se completa, se actualizan las estadísticas del mentor.

8.  **Registro de sesión:**

    - Se llama al método `recordSession` para registrar una nueva sesión de mentoría.
    - Se guarda información como la duración, el tema y las notas de la sesión.

9.  **Obtención de detalles del mentor:**

    - Se llama al método `getMentorDetails` para obtener los detalles de un mentor específico.

10. **Obtención de estudiantes del mentor:**

    - Se llama al método `getMentorStudents` para obtener la lista de estudiantes asignados a un mentor específico.

11. **Actualización de la disponibilidad del mentor:**
    - Se llama al método `updateMentorAvailability` para actualizar la disponibilidad horaria de un mentor.
    - Los tipos de mentoría son:
        *   `ESTUDIANTE_ESTUDIANTE`: Mentoría entre estudiantes.
        *   `DOCENTE_ESTUDIANTE`: Mentoría entre docentes y estudiantes.

### Misiones

El flujo de misiones se gestiona principalmente en `MissionService`.

1.  **Creación de una misión:**

    - Se llama al método `createMission` para crear una nueva misión.
    - El método recibe los datos de la misión (título, descripción, tipo, frecuencia, valor objetivo, puntos de recompensa, etc.).
    - Se crea una nueva entidad `Mission` y se guarda en la base de datos.

2.  **Obtención de misiones activas:**

    - Se llama al método `getActiveMissions` para obtener una lista de misiones activas para un usuario.
    - Se filtran las misiones por fecha de inicio y fin.

3.  **Actualización del progreso de la misión:**

    - Se llama al método `updateMissionProgress` para actualizar el progreso de un usuario en una misión.
    - Se actualiza el progreso del usuario en la tabla `Mission`.
    - Si el usuario completa la misión, se otorgan las recompensas.

4.  **Otorgamiento de recompensas de la misión:**

    - Se llama al método `awardMissionRewards` para otorgar las recompensas a un usuario por completar una misión.
    - Se otorgan puntos y una insignia (si corresponde).

5.  **Generación de misiones diarias:**

    - Se llama al método `generateDailyMissions` para generar misiones diarias.
    - Se crean misiones para completar lecciones, practicar ejercicios y explorar contenido cultural.

6.  **Generación de misiones semanales:**
    - Se llama al método `generateWeeklyMissions` para generar misiones semanales.
    - Se crean misiones para completar lecciones, realizar contribuciones culturales y mantener una racha semanal.

### Misiones

El flujo de misiones se gestiona principalmente en `MissionService`.

1.  **Creación de una misión:**

    - Se llama al método `createMission` para crear una nueva misión.
    - El método recibe los datos de la misión (título, descripción, tipo, frecuencia, valor objetivo, puntos de recompensa, etc.).
    - Se crea una nueva entidad `Mission` y se guarda en la base de datos.

2.  **Obtención de misiones activas:**

    - Se llama al método `getActiveMissions` para obtener una lista de misiones activas para un usuario.
    - Se filtran las misiones por fecha de inicio y fin.

3.  **Actualización del progreso de la misión:**

    - Se llama al método `updateMissionProgress` para actualizar el progreso de un usuario en una misión.
    - Se actualiza el progreso del usuario en la tabla `Mission`.
    - Si el usuario completa la misión, se otorgan las recompensas.

4.  **Otorgamiento de recompensas de la misión:**

    - Se llama al método `awardMissionRewards` para otorgar las recompensas a un usuario por completar una misión.
    - Se otorgan puntos y una insignia (si corresponde).

5.  **Generación de misiones diarias:**

    - Se llama al método `generateDailyMissions` para generar misiones diarias.
    - Se crean misiones para completar lecciones, practicar ejercicios y explorar contenido cultural.

6.  **Generación de misiones semanales:**
    - Se llama al método `generateWeeklyMissions` para generar misiones semanales.
    - Se crean misiones para completar lecciones, realizar contribuciones culturales y mantener una racha semanal.

### Eventos especiales

El flujo de eventos especiales se gestiona principalmente en `SpecialEventService`.

1.  **Creación de una temporada:**

    - Se llama al método `createSeason` para crear una nueva temporada.
    - El método recibe los datos de la temporada (tipo, nombre, descripción, fechas, elementos culturales, recompensas, etc.).
    - Se crea una nueva entidad `Season` y se guarda en la base de datos.

2.  **Obtención de la temporada actual:**

    - Se llama al método `getCurrentSeason` para obtener la temporada activa actual.
    - Se filtra por fecha de inicio y fin.

3.  **Generación de temporadas:**

    - Se llaman a los métodos `generateBetscnateSeason`, `generateJajanSeason`, `generateBengbeBetsaSeason` y `generateAnteuanSeason` para generar temporadas específicas.
    - Se crean misiones específicas para cada temporada.

4.  **Generación de misiones de temporada:**

    - Se llama al método `generateSeasonMissions` para generar misiones para una temporada.
    - Se crean misiones basadas en el tipo de temporada.

5.  **Obtención del progreso de la temporada:**

    - Se llama al método `getSeasonProgress` para obtener el progreso de un usuario en una temporada.
    - Se calcula el número de misiones completadas, los puntos ganados y el rango del usuario.

---

## Refactorización del servicio StatisticsReportService

El servicio `StatisticsReportService` ha sido refactorizado para mejorar su estructura y facilitar su mantenimiento. Se han realizado los siguientes cambios:

*   Se ha creado una interfaz `ReportGenerator` que define el método `generateReport`.
*   Se han creado clases separadas para cada tipo de reporte (`LearningProgressReportGenerator`, `AchievementsReportGenerator`, `PerformanceReportGenerator`, `ComprehensiveReportGenerator`) que implementan la interfaz `ReportGenerator`.
*   Se han inyectado las clases de reporte como dependencias en `StatisticsReportService`.
*   Se ha modificado el método `generateReport` en `StatisticsReportService` para utilizar las clases de reporte inyectadas.

Estos cambios promueven el principio de responsabilidad única, facilitan las pruebas unitarias y mejoran la flexibilidad del código.

## Dependencia circular entre AuthModule y GamificationModule

Se detectó una dependencia circular entre `AuthModule` y `GamificationModule`. Para resolver este problema, se utilizó `forwardRef()` para permitir que los módulos se refieran entre sí sin causar un error de dependencia circular. En el archivo `backend/src/features/gamification/gamification.module.ts`, se envolvió `AuthModule` en `forwardRef()` de la siguiente manera:

```typescript
import { Module, forwardRef } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature(ENTITIES),
        NotificationsModule,
        forwardRef(() => AuthModule)
    ],
    controllers: CONTROLLERS,
    providers: SERVICES,
exports: SERVICES,
})
export class GamificationModule {}

/*
**COMENTADO ABRIL 2025:** Se resolvió el error "Entity metadata for User#activities was not found" añadiendo el nombre de la tabla a la entidad `Activity` y añadiendo la entidad `Activity` a la lista de entidades en el archivo `backend/src/config/typeorm.config.ts`.
*/

Además, para resolver la dependencia circular, se importó `TypeOrmModule.forFeature([Gamification])` y se exportó `GamificationRepository`.

Además, el `UserLevelRepository` ahora es una dependencia del `UserModule` y se ha importado `TypeOrmModule.forFeature([UserLevel])` en el `UserModule` para resolver un problema de dependencias.

---

## Relación entre Usuarios y Estadísticas

Cada usuario tiene una entrada en la tabla `statistics` que contiene información sobre su progreso y logros en la plataforma. Esta información se utiliza para personalizar la experiencia del usuario y proporcionar recomendaciones relevantes.

---

## Pruebas Unitarias

El módulo de gamificación cuenta con pruebas unitarias para verificar el correcto funcionamiento de sus servicios. Las pruebas se encuentran en el directorio `backend/src/features/gamification/services/__tests__/`.

### Servicios con pruebas unitarias

*   `GamificationService`: El archivo `backend/src/features/gamification/services/__tests__/gamification.service.spec.ts` contiene pruebas para los métodos `awardPoints`, `getUserStats`, `updateStats`, `grantAchievement` y `awardReward`.
*   `LeaderboardService`: El archivo `backend/src/features/gamification/services/__tests__/leaderboard.service.spec.ts` contiene pruebas para los métodos `getLeaderboard` y `getUserRank`.
*   `MissionService`: El archivo `backend/src/features/gamification/services/__tests__/mission.service.spec.ts` contiene pruebas para los métodos `createMission`, `getActiveMissions`, `updateMissionProgress` y `findOne`.
*   `CulturalAchievementService`: El archivo `backend/src/features/gamification/services/__tests__/cultural-achievement.service.spec.ts` contiene pruebas para los métodos `createAchievement`, `getAchievements`, `initializeUserProgress`, `updateProgress`, `getUserAchievements` y `getAchievementProgress`.
*   `CollaborationRewardService`: El archivo `backend/src/features/gamification/services/__tests__/collaboration-reward.service.spec.ts` contiene pruebas para los métodos `awardCollaboration`, `calculateContributionStreak`, `calculateStreakBonus` y `getCollaborationStats`.
*   `GamificationService`: El archivo `backend/src/features/gamification/services/__tests__/gamification.service.spec.ts` contiene pruebas para los métodos `awardPoints`, `getUserStats`, `updateStats`, `grantAchievement` y `awardReward`.

Se han agregado pruebas más completas para los servicios `CulturalAchievementService`, `CollaborationRewardService` y `GamificationService` para asegurar una mayor cobertura del módulo de gamificación.
Además, se ha optimizado el flujo de "Obtención de estadísticas de colaboración" en `CollaborationRewardService` mediante la implementación de un sistema de caché. Esto reduce la carga en la base de datos y mejora el tiempo de respuesta para las solicitudes de estadísticas de colaboración.

---

## Próximos pasos

*   Revisar la cobertura completa de las pruebas unitarias para asegurar que todos los casos de uso estén cubiertos.
*   Monitorizar el rendimiento de los flujos de negocio y realizar optimizaciones adicionales si es necesario.
*   Documentar completamente las API del módulo utilizando Swagger.
*   Se expandió la lógica de cálculo de niveles en `backend/src/lib/gamification.ts` para que sea más precisa y motivadora, con más niveles (ahora 16) y una progresión más suave. La función `calculateLevel` ahora define los siguientes niveles:
    *   Nivel 1: menos de 50 puntos
    *   Nivel 2: menos de 100 puntos
    *   Nivel 3: menos de 150 puntos
    *   Nivel 4: menos de 200 puntos
    *   Nivel 5: menos de 250 puntos
    *   Nivel 6: menos de 300 puntos
    *   Nivel 7: menos de 400 puntos
    *   Nivel 8: menos de 500 puntos
    *   Nivel 9: menos de 600 puntos
    *   Nivel 10: menos de 700 puntos
    *   Nivel 11: menos de 800 puntos
    *   Nivel 12: menos de 900 puntos
    *   Nivel 13: menos de 1000 puntos
    *   Nivel 14: menos de 1100 puntos
    *   Nivel 15: menos de 1200 puntos
    *   Nivel 16: 1200 puntos o más
*   Se modificó la función `updateUserLevel` en `backend/src/features/gamification/services/user-level.service.ts` para utilizar la función `calculateLevel` para determinar el nuevo nivel.
*   Se implementó la lógica para registrar las insignias y recompensas en la tabla `User` en los métodos `grantBadge`, `awardReward` y `grantAchievement`.
*   Se modificó el método `awardPoints` para actualizar las estadísticas del usuario en función del tipo de actividad. Ahora, si la actividad es de tipo 'lesson', se incrementa el número de lecciones completadas. Si la actividad es de tipo 'exercise', se incrementa el número de ejercicios completados.
*   Se eliminó el campo `points` de la entidad `CulturalAchievement` en `backend/src/features/gamification/entities/cultural-achievement.entity.ts`.
*   Se eliminaron los campos `level`, `experience`, `nextLevelExperience` y `culturalAchievements` de la entidad `Gamification` en `backend/src/features/gamification/entities/gamification.entity.ts`.
*   Se eliminó la entidad `Level` en `backend/src/features/gamification/entities/level.entity.ts`.
*   Se agregaron pruebas unitarias para las funciones `createMentorshipMission`, `completeMentorshipMission`, `createMentor`, `assignStudent`, `updateMentorshipStatus`, `recordSession`, `getMentorDetails`, `getMentorStudents` y `updateMentorAvailability` en el archivo `backend/src/features/gamification/services/__tests__/mentor.service.spec.ts`.

---

## Estado del Proyecto

El módulo de gamificación se encuentra en un estado avanzado de desarrollo. Se han implementado los principales flujos de negocio y se han realizado pruebas unitarias para verificar su correcto funcionamiento.

## Pendientes

*   Revisar la cobertura completa de las pruebas unitarias para asegurar que todos los casos de uso estén cubiertos.
*   Monitorizar el rendimiento de los flujos de negocio y realizar optimizaciones adicionales si es necesario.
*   Documentar completamente las API del módulo utilizando Swagger.
