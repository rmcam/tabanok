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

Además, para resolver la dependencia circular, se importó `TypeOrmModule.forFeature([Gamification])` y se exportó `GamificationRepository`.

---

## Relación entre Usuarios y Estadísticas

Cada usuario tiene una entrada en la tabla `statistics` que contiene información sobre su progreso y logros en la plataforma. Esta información se utiliza para personalizar la experiencia del usuario y proporcionar recomendaciones relevantes.

---

## Pruebas Unitarias

El módulo de gamificación cuenta con pruebas unitarias para verificar el correcto funcionamiento de sus servicios. Las pruebas se encuentran en el directorio `backend/src/features/gamification/services/__tests__/`.

### `GamificationService`

El archivo `backend/src/features/gamification/services/__tests__/gamification.service.spec.ts` contiene pruebas unitarias para el servicio `GamificationService`.

#### Pruebas

-   **`addPoints`:**

    -   Verifica que se lance una excepción `NotFoundException` si no se encuentra la gamificación.
    -   Verifica que se agreguen puntos y actividad reciente, y que se llame a `checkCompletedMissions`.
    -   Verifica que solo se mantengan las últimas 50 actividades.

-   **`getUserStats`:**

    -   Verifica que se lance una excepción `NotFoundException` si no se encuentra el usuario.
    -   Verifica que se devuelvan las estadísticas si el usuario existe.

-   **`updateUserPoints`:**

    -   Verifica que se lance una excepción `NotFoundException` si no se encuentra el usuario.
    -   Verifica que se actualicen los puntos si el usuario existe.

-   **`updateUserLevel`:**

    -   Verifica que se lance una excepción `NotFoundException` si no se encuentra el usuario.

-   **`awardAchievement`:**

    -   Verifica que se lance una excepción `NotFoundException` si no se encuentra el usuario.

-   **`awardReward`:**

    -   Verifica que se lance una excepción `NotFoundException` si no se encuentra el usuario.
