# Estado Actual del Proyecto Tabanok

---

## Estado general

- Monorepo optimizado con pnpm workspaces y lockfile único.
- **Licencia MIT implementada:** Se añadió la licencia MIT a todos los archivos de documentación durante la actualización de abril de 2025.  Esta licencia fue elegida por su permisividad y compatibilidad con proyectos de código abierto.
- Backend funcional con NestJS, conectado a PostgreSQL.
- Frontend funcional con React + Vite, autenticación y consumo de API.
- Dependencias y configuración centralizadas.
- Paquete común creado para tipos y utilidades compartidas.
- Docker Compose unificado para base de datos, backend y frontend.
- Configuración base de TypeScript unificada.
- Documentación centralizada y actualizada.
- CI/CD implementado para lint, tests y builds automáticos.
- Integración avanzada de validación lingüística con LanguageTool.
- Integración del diccionario Kamëntsá finalizada y verificada.
- **Cobertura de tests alta (200 tests exitosos, incluyendo autenticación).**
- **Integración backend-frontend verificada y estable.**
- Accesibilidad mejorada: navegación completa por teclado implementada, foco visible asegurado, orden lógico verificado.
- **Cumple WCAG 2.1 en navegación, menús y menús desplegables (ARIA labels, landmarks, foco).**
- Gamificación parcialmente implementada. Se ha añadido la función `grantPoints` al servicio de gamificación para otorgar puntos a los usuarios.
- **Rutas protegidas y autenticación robusta:** El componente `PrivateRoute` ahora implementa correctamente la protección de rutas, solo permitiendo acceso a usuarios autenticados y con el rol adecuado. El flujo de autenticación y autorización es consistente y seguro.
  - **Endpoints actuales:**
    - Login: `POST /api/auth/signin`
    - Registro: `POST /api/auth/signup`
  - **Campos requeridos para registro:** `username`, `firstName`, `firstLastName`, `email`, `password`
  - **Campos requeridos para login:** `identifier` (usuario o email), `password`
  - Ver detalles y ejemplos de payloads en [`docs/Autenticacion.md`](./Autenticacion.md)
- **Sidebar y Dashboard funcionales:** El dashboard muestra correctamente los módulos/unidades del usuario autenticado, integrando el hook `useUnits` que ahora utiliza la instancia `api` para peticiones autenticadas.
- **Buenas prácticas React y seguridad:** Se corrigieron errores de estructura de rutas y uso de `<Route>`, y se mejoró la gestión de tokens y roles en frontend.
- **Licencia:** MIT License

---

## Detalles del módulo Gamificación

Ver documentación completa y actualizada en [`docs/Gamificacion.md`](./Gamificacion.md).
- Documentación de flujos de testing, despliegue y contribución creada.

---

## Pendientes principales

- Expandir la lógica de gamificación.
- Activar despliegue automático a producción (el pipeline ya construye y sube imágenes, falta activar paso SSH).
- Mejorar cobertura de tests en frontend (backend ya tiene alta cobertura).
- ~~Integrar validación lingüística avanzada en frontend (LanguageTool o Grammarly).~~ (completado octubre 2025)
- Finalizar auditorías manuales y con lectores de pantalla para accesibilidad.
- ~~Revisar y actualizar dependencias obsoletas o con advertencias.~~ (completado noviembre 2025)
- Planificar nuevas funcionalidades y mejoras.
- ~~Servir el archivo `favicon.ico` desde el backend.~~ (completado)
- ~~Documentar y testear flujos de error y protección de rutas.~~ (completado diciembre 2025)
- **Agregar pruebas automáticas para rutas privadas y manejo de tokens expirados.**
- **Revisar y documentar la integración de hooks personalizados (`useUnits`, `useAuth`).**

---

## Próximos pasos recomendados

1. Expandir la lógica de gamificación y testear flujos de usuario.
2. Mejorar cobertura de tests en frontend, especialmente en rutas protegidas y hooks personalizados.
3. Activar despliegue automático a producción.
4. Finalizar auditorías manuales de accesibilidad.
5. Documentar y testear exhaustivamente la protección de rutas y el manejo de autenticación.
6. Planificar nuevas funcionalidades y mejoras (panel docente, panel estudiante, integración multimedia).
7. Mantener la documentación y la hoja de ruta actualizadas tras cada cambio relevante.

---

## Estado del Frontend

- Aplicación React + Vite con estructura modular.
- Rutas públicas y privadas gestionadas con React Router y el componente `PrivateRoute` (actualizado).
- Autenticación y manejo de roles implementados completamente.
- La información del usuario, el token de autenticación y los roles se guardan en el almacenamiento local.
- El componente `PrivateRoute` verifica si el usuario está autenticado y si tiene el rol necesario para acceder a la ruta, devolviendo solo los hijos autorizados.
- Se ha agregado una ruta para la página "unauthorized".
- El componente `App` verifica si el usuario está autenticado al cargar la aplicación.
- Internacionalización configurada con `react-i18next`, soporte multilenguaje.
- Estilos con Tailwind CSS y configuración personalizada.
- Uso de **shadcn/ui** para componentes accesibles, personalizables y consistentes.
- Componentes reutilizables para navegación, formularios, sidebar, toggles y más.
- Integración avanzada con LanguageTool mediante un hook reutilizable (`useLanguageTool`) para validación lingüística en tiempo real.
- Accesibilidad en proceso, con componentes accesibles y mejoras pendientes para cumplir WCAG 2.1.
- Consumo de API backend para diccionario Kamëntsá y otros recursos.
- Uso de hooks personalizados para gestión de estado y lógica de UI (`useUnits`, `useAuth`).
- Prisma utilizado para tipado y posible integración directa.
- Arquitectura preparada para escalabilidad y nuevas funcionalidades.

### Pruebas manuales de accesibilidad pendientes

- Confirmar que no existan trampas de foco en modales o menús.
- Confirmar que el orden visual coincida con el orden en el DOM.
- Confirmar que se usen landmarks HTML5 (`<main>`, `<nav>`, `<header>`, `<footer>`) para facilitar la navegación.
- Confirmar que el foco se gestione correctamente cuando aparece contenido dinámico (ej. modales, alertas).

### Pruebas con lectores de pantalla (NVDA, VoiceOver)

**Objetivo:** Verificar que todos los elementos interactivos tengan nombres accesibles y roles comprensibles.

**Pasos generales:**

1. Navegar toda la aplicación solo con teclado (Tab, Shift+Tab).
2. Escuchar que cada elemento tenga un nombre claro (ej. "Botón: Guardar", "Enlace: Inicio").
3. Confirmar que los roles sean correctos (botón, enlace, menú, encabezado).
4. Verificar que los menús desplegables anuncien apertura/cierre.
5. Confirmar que no se anuncien iconos decorativos innecesarios.
6. En formularios, que cada campo tenga etiqueta asociada.

**Instrucciones para NVDA (Windows):**

- Iniciar NVDA (`Ctrl+Alt+N`).
- Navegar con `Tab` y flechas.
- Usar `NVDA + T` para leer el título de la ventana.
- Usar `NVDA + flecha abajo` para modo exploración.
- Escuchar nombres y roles anunciados.
- Salir con `NVDA + Q`.

**Instrucciones para VoiceOver (Mac):**

- Activar con `Cmd + F5`.
- Navegar con `Control + Option + flechas`.
- Usar `Control + Option + Shift + flechas` para saltar regiones.
- Escuchar nombres y roles.
- Desactivar con `Cmd + F5`.

**Criterios de éxito:**

- Todos los elementos tienen nombres claros y comprensibles.
- Los roles coinciden con la función del elemento.
- Los menús y modales anuncian su estado.
- No hay elementos sin nombre o con nombre confuso.
- No se anuncian iconos decorativos innecesarios.

**Si se detectan problemas:**

- Añadir o ajustar `aria-label`, `aria-labelledby`, `aria-hidden`.
- Revisar estructura semántica y landmarks.
- Repetir la prueba hasta cumplir los criterios.

---

## Histórico de funcionalidades eliminadas

- **Chat**: Se eliminó el módulo de chat para simplificar el backend y frontend, ya que no era una funcionalidad prioritaria en la revitalización lingüística ni en la hoja de ruta actual. Si se requiere en el futuro, se planificará e implementará nuevamente con la comunidad.

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.

<environment_details>
# VSCode Visible Files
docs/EstadoProyecto.md

# VSCode Open Tabs
backend/src/features/gamification/dto/update-points.dto.ts
backend/src/features/gamification/controllers/cultural-achievement.controller.ts
backend/src/features/gamification/controllers/cultural-achievement.controller.spec.ts
backend/src/features/gamification/controllers/leaderboard.controller.ts
backend/src/features/gamification/controllers/leaderboard.controller.spec.ts
backend/src/features/gamification/controllers/mentor.controller.ts
backend/src/features/gamification/dto/mentor.dto.ts
backend/src/features/gamification/controllers/mentor.controller.spec.ts
backend/src/features/gamification/dto/mission-template.dto.ts
backend/src/features/gamification/controllers/mission-template.controller.ts
backend/src/features/gamification/controllers/mission-template.controller.spec.ts
README.md
docs/Accesibilidad.md
docs/Autenticacion.md
docs/EstructuraDiccionario.md
docs/Flujos.md
docs/Frontend-Arquitectura.md
backend/src/features/gamification/entities/reward.entity.ts
backend/src/features/gamification/dto/reward.dto.ts
backend/src/features/gamification/controllers/gamification.controller.ts
backend/src/features/gamification/controllers/gamification.controller.spec.ts
backend/src/features/gamification/gamification.module.ts
frontend/src/features/gamification/components/ProgressPanel.tsx
frontend/src/features/gamification/hooks/useGamification.ts
backend/src/features/gamification/services/gamification.service.ts
backend/src/features/gamification/services/special-event.service.ts
backend/src/features/gamification/services/streak.service.ts
backend/src/features/statistics/statistics.service.ts
docs/Gamificacion.md
docs/InstruccionesDesarrollo.md
docs/DocumentationUpdateChecklist.md
frontend/src/features/dashboard/Dashboard.tsx

# Actively Running Terminals
## Original command: `pnpm --filter backend start:dev`
## Original command: `pnpm --filter frontend run dev`

# Recently Modified Files
These files have been modified since you last accessed them (file was just edited so you may need to re-read it before editing):
docs/EstadoProyecto.md

# Current Time
14/4/2025, 7:26:45 p. m. (America/Bogota, UTC-5:00)

# Context Window Usage
314.990 / 1048,576K tokens used (30%)

# Current Mode
ACT MODE
</environment_details>
