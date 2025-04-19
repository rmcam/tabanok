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
- Integración avanzada de validación lingüística con LanguageTool. Las variaciones se cargan.
- Integración del diccionario Kamëntsá requiere ajustes en el frontend y mejoras en la lógica del backend.
- **Cobertura de tests alta (200 tests exitosos, incluyendo autenticación).**
- **Integración backend-frontend verificada y estable.**
- **Solucionado problema de conexión a la base de datos:** Se resolvieron errores relacionados con TypeORM y ciclos de dependencia en las migraciones (Abril 2025).
- Accesibilidad en progreso, no cumple completamente con WCAG 2.1.
- Gamificación: Se han implementado los principales flujos de negocio y se han realizado pruebas unitarias para verificar su correcto funcionamiento. Se ha optimizado el flujo de "Obtención de estadísticas de colaboración" en `CollaborationRewardService` mediante la implementación de un sistema de caché.
- Rutas protegidas y redirecciones requieren mejoras.
- El sidebar no se muestra y el dashboard requiere mejoras de estilo.
- **Buenas prácticas React y seguridad:** Se corrigieron errores de estructura de rutas y uso de `<Route>`, y se mejoró la gestión de tokens y roles en frontend. Se ha solucionado el error 500 al obtener los temas. Se han definido modelos de datos JSON para el panel del docente y multimedia, mejorando la gestión de datos y la integración con el backend.  Se han añadido nuevos endpoints para la gestión de estos modelos.
- **Se han resuelto los errores de TypeScript y ESLint en el frontend relacionados con las props `units`, `unitsLoading` y `unitsError` en `App.tsx` y `Dashboard`.**
- **Panel Docente:** Estructura básica de componentes (`TeacherDashboard`, `StudentList`, `ActivityManager`, `ReportViewer`) y rutas implementadas en el frontend. Acceso restringido a usuarios con rol `teacher` o `admin`.

---

## Próximos pasos recomendados

1.  Expandir la lógica de gamificación y testear flujos de usuario.
2.  Mejorar cobertura de tests en frontend, especialmente en rutas protegidas y hooks personalizados.
3.  Activar despliegue automático a producción.
4.  Finalizar auditorías manuales de accesibilidad.
5.  Documentar y testear exhaustivamente la protección de rutas y el manejo de autenticación.
6.  Planificar nuevas funcionalidades y mejoras (panel docente, panel estudiante, integración multimedia).
7.  Mantener la documentación y la hoja de ruta actualizadas tras cada cambio relevante.

---

## Detalles del módulo Gamificación

Ver documentación completa y actualizada en [`docs/Gamificacion.md`](./Gamificacion.md).
- Documentación de flujos de testing, despliegue y contribución creada.

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
- **Solucionado problema de conexión a la base de datos:** Se resolvieron errores relacionados con TypeORM y ciclos de dependencia en las migraciones (Abril 2025).
- **Solucionado error de llave foránea al eliminar usuarios:** Se modificó el método `remove` en `UserService` para eliminar las estadísticas asociadas al usuario antes de eliminar el usuario.
- **Solucionado error de correo electrónico/nombre de usuario duplicado al registrar usuarios:** Se modificaron los tests `auth.e2e-spec.ts` para utilizar correos electrónicos y nombres de usuario únicos en cada test.
- Accesibilidad mejorada: navegación completa por teclado implementada, foco visible asegurado, orden lógico verificado.
- **Cumple WCAG 2.1 en navegación, menús y menús desplegables (ARIA labels, landmarks, foco).**
- Gamificación parcialmente implementada. Se ha añadido la función `grantPoints` al servicio de gamificación para otorgar puntos a los usuarios.
- **Rutas protegidas y autenticación robusta:** Ver detalles y ejemplos en [`docs/Autenticacion.md`](./Autenticacion.md)
- **Sidebar y Dashboard funcionales:** El dashboard muestra correctamente los módulos/unidades del usuario autenticado, integrando el hook `useUnits` que ahora utiliza la instancia `api` para peticiones autenticadas.
- **Buenas prácticas React y seguridad:** Se corrigieron errores de estructura de rutas y uso de `<Route>`, y se mejoró la gestión de tokens y roles en frontend. Se ha agregado la columna `level` a la tabla `users`. Se han solucionado errores relacionados con la entidad `User` en el módulo de gamificación.
- **Licencia:** MIT License

---

## Detalles del módulo Gamificación

Ver documentación completa y actualizada en [`docs/Gamificacion.md`](./Gamificacion.md).
- Documentación de flujos de testing, despliegue y contribución creada.

---

Ver pendientes principales en [`docs/Pendientes.md`](./Pendientes.md).

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
- Rutas públicas y privadas gestionadas con React Router y el componente `PrivateRoute` (actualizado). La autenticación por el momento funciona, hay que revisar a detalle.
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

### Pruebas manuales de accesibilidad

-   **Trampas de foco:** No se encontraron trampas de foco en modales o menús.
-   **Orden visual:** Se confirmó que el orden visual coincide con el orden en el DOM.
-   **Landmarks HTML5:** Se utilizan landmarks HTML5 (`<main>`, `<nav>`, `<header>`, `<footer>`) para facilitar la navegación.
-   **Gestión del foco:** Se confirmó que el foco se gestiona correctamente cuando aparece contenido dinámico (ej. modales, alertas).

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
