# Módulo de Gamificación - Proyecto Tabanok

**Actualizado abril 2025**

---

## Flujos de negocio

### Logros culturales

El flujo de logros culturales se gestiona principalmente en `CulturalAchievementService`.

1.  **Creación de un logro cultural:**

    - Un administrador llama al método `createAchievement` con los datos del nuevo logro (nombre, descripción, categoría, nivel, requisitos, recompensas, etc.).
    - El método crea una nueva entidad `CulturalAchievement` y la guarda en la base de datos.

2.  **Obtención de logros culturales:**

    - Se llama al método `getAchievements` para obtener una lista de logros culturales.
    - Opcionalmente, se puede filtrar por categoría.
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

2.  **Obtención de estadísticas de colaboración:**
    - Se llama al método `getCollaborationStats` para obtener estadísticas sobre las colaboraciones de un usuario.
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
    - Se crea una nueva relación de mentoría con estado "pendiente".

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
    - Se crean misiones para completar lecciones y realizar contribuciones culturales.

### Temporadas

El flujo de temporadas se gestiona principalmente en `SeasonService`.

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

6.  **Inicio de una nueva temporada:**
    - Se llama al método `startNewSeason` para iniciar una nueva temporada.
    - Se genera la temporada, se generan las misiones estáticas y se generan las misiones dinámicas.

### Eventos especiales

El flujo de eventos especiales se gestiona principalmente en `SpecialEventService`.

1.  **Creación de un evento especial:**

    - Se llama al método `createSpecialEvent` para crear un nuevo evento especial.
    - El método recibe los datos del evento (nombre, descripción, tipo, fechas, recompensas, requisitos, elementos culturales, etc.).
    - Se crea una nueva entidad `SpecialEvent` y se guarda en la base de datos.

2.  **Obtención de eventos activos:**

    - Se llama al método `getActiveEvents` para obtener una lista de eventos especiales activos.
    - Se filtran los eventos por fecha de inicio y fin.

3.  **Unión a un evento:**

    - Se llama al método `joinEvent` para que un usuario se una a un evento especial.
    - Se verifica si el usuario cumple con los requisitos del evento.
    - Se agrega el usuario a la lista de participantes del evento.

4.  **Actualización del progreso del evento:**

    - Se llama al método `updateEventProgress` para actualizar el progreso de un usuario en un evento especial.
    - Se actualiza el progreso del usuario en la tabla `SpecialEvent`.
    - Si el usuario completa el evento, se otorgan las recompensas.

5.  **Otorgamiento de recompensas del evento:**

    - Se llama al método `awardEventRewards` para otorgar las recompensas a un usuario por completar un evento especial.
    - Se otorgan puntos y se actualizan los logros culturales.

6.  **Generación de eventos de temporada:**
    - Se llama al método `generateSeasonEvents` para generar eventos especiales para una temporada.
    - Se crean eventos basados en el tipo de temporada.

### Niveles de usuario

El flujo de niveles de usuario se gestiona principalmente en `UserLevelService`.

1.  **Creación del nivel de usuario:**

    - Al crear un nuevo usuario, se llama al método `createUserLevel` en `GamificationService` para crear un nuevo `UserLevel` para el usuario.
    - El método recibe el objeto `User` como parámetro.
    - El método crea una nueva entidad `UserLevel` y la guarda en la base de datos, estableciendo la relación con el usuario.

2.  **Obtención del nivel de usuario:**

### Rachas

El flujo de rachas se gestiona principalmente en `StreakService`.

1.  **Actualización de la racha:**

    - Se llama al método `updateStreak` cuando un usuario realiza una actividad.
    - Se actualiza la racha del usuario en la tabla `Streak`.
    - Se calcula el multiplicador de puntos en función de la racha.
    - Se otorgan puntos de bonificación al usuario.

2.  **Obtención de información de la racha:**
    - Se llama al método `getStreakInfo` para obtener información sobre la racha de un usuario.
    - Se devuelve la racha actual, la racha más larga y el multiplicador actual.

### Recomendaciones

El flujo de recomendaciones se gestiona principalmente en `RecommendationsService`.

1.  **Obtención de recomendaciones:**

    - Se llama a la API en `/recommendations/:userId` para obtener las recomendaciones para un usuario.
    - El método recibe el ID del usuario como parámetro.
    - El método devuelve una lista de recomendaciones.

### Tabla de clasificación

El flujo de la tabla de clasificación se gestiona principalmente en `LeaderboardService`.

1.  **Obtención de la tabla de clasificación:**

    - Se llama a la API en `/gamification/leaderboard` para obtener la tabla de clasificación.
    - Se ha solucionado un error que impedía la obtención de la tabla de clasificación debido a la falta de metadata para la entidad `UserMission`. Se añadió la entidad `UserMission` a la lista de entidades en el archivo `backend/src/config/typeorm.config.ts`.

2.  **Obtención del rango del usuario:**
    - Actualmente no implementado.

---

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
    exports: SERVICES
})
export class GamificationModule {}

---

## Relación entre Usuarios y Estadísticas

Cada usuario tiene una entrada en la tabla `statistics` que contiene información sobre su progreso y logros en la plataforma. Esta información se utiliza para personalizar la experiencia del usuario y proporcionar recomendaciones relevantes.
