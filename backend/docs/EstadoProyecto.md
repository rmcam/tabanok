## Actualizaciones del componente HomePage

El componente `HomePage` ha sido refactorizado y mejorado con los siguientes cambios:

*   Se agregó una imagen de fondo a la Hero Section.
*   Se modificó la descripción de la Hero Section para que sea más concisa y persuasiva.
*   Se agregaron iconos a las características.
*   Se agregaron descripciones a las lecciones destacadas.
*   Se agregó un botón "Ver todas las lecciones" a la sección de Lecciones Destacadas.
*   Se agregó una capa de superposición oscura a la imagen de fondo de la Hero Section para mejorar el contraste.
*   Se agregó el componente FAQ a la página de inicio.
*   Se eliminó la sección FAQ duplicada.
*   Se cambió el fondo de la sección de contacto a blanco.
*   Se reemplazó el enlace de contacto con un formulario de contacto.
*   Se aumentó el padding vertical del footer a `py-2`.
*   Se mejoró la responsividad de las imágenes en la sección de Lecciones Destacadas.
*   Se centralizó la lógica de las tarjetas de la sección Hero.
*   Se utilizó un componente reutilizable para las tarjetas de características.
*   Se mejoró la accesibilidad de las imágenes en la sección de Lecciones Destacadas.
*   Se implementó la funcionalidad de "Ver todas las lecciones".
*   Se agregaron imágenes a los testimonios.
*   Se ha añadido la funcionalidad de autoplay al carrusel de testimonios.
*   Se implementó un carrusel interactivo en la HeroSection para mostrar diferentes tarjetas de `heroCardsData` con transiciones suaves y controles de navegación.
*   Se añadió un efecto de "card hover" a las Lecciones Destacadas para hacerlas más interactivas.
*   Se implementó un efecto de desplazamiento suave al hacer clic en los enlaces "Ver lección" y "Ver todas las lecciones" utilizando `react-router-hash-link`.
*   Se centralizó la lógica de las tarjetas de la sección Hero, obteniendo los datos directamente desde `heroCards.ts`.
*   Se eliminó la dependencia del archivo JSON `public/heroCards.json`.
*   Se implementó una animación de aparición gradual (fade-in) al cargar la página.
*   Se agregó un efecto parallax a la sección del Hero (`src/components/home/components/HeroSection.tsx`).
    *   Se ajustó la opacidad del fondo negro para que la imagen sea más visible.
    *   Se alineó verticalmente el contenido del Hero Section para que esté centrado.
*   Se reemplazó el carrusel de testimonios con uno que tiene una animación de aparición gradual.
*   Se añadió un efecto de desplazamiento horizontal a la sección de "Lecciones Destacadas".
    *   Se añadió un espacio entre las tarjetas.
    *   Se aumentó el tamaño de la imagen y el texto.
*   Se modificaron los colores de los botones (`src/components/ui/button.tsx`) para que tengan un color más acorde a la paleta de colores de la cultura Kamëntsá.
*   Se alinearon los campos del formulario y se aumentó el tamaño del texto en `src/components/home/components/ContactForm.tsx`.
*   Se implementaron indicadores interactivos en el carrusel de la HeroSection.
*   Se implementó la carga dinámica de las lecciones destacadas desde la API del backend.
*   Se corrigió el error `ReferenceError: process is not defined` al utilizar `import.meta.env.VITE_API_URL` en lugar de `process.env.VITE_API_URL`.
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
- Accesibilidad en progreso, no cumple completamente con WCAG 2.1. Se ha agregado la propiedad `ariaLabel` al componente `Button` para mejorar la accesibilidad.
- Gamificación: Se han implementado los principales flujos de negocio y se han realizado pruebas unitarias para verificar su correcto funcionamiento. Se ha optimizado el flujo de "Obtención de estadísticas de colaboración" en `CollaborationRewardService` mediante la implementación de un sistema de caché.
- **Sidebar desplegable implementado:** Se agregó un sidebar desplegable que aparece en todos los sitios excepto en la ruta "/". Se añadió un buscador al sidebar utilizando el componente Input. Se añadió un sistema de notificaciones al dashboard utilizando el componente Sonner.
- **Mejoras en el Dashboard:** Se modificó el dashboard para darle un aspecto profesional pero llamativo para los niños, incluyendo un fondo degradado, un título más llamativo y un gráfico de barras para las estadísticas. Se añadieron breadcrumbs para facilitar la navegación dentro del dashboard.
- **Buenas prácticas React y seguridad:** Se corrigieron errores de estructura de rutas y uso de `<Route>`, y se mejoró la gestión de tokens y roles en frontend. Se ha solucionado el error 500 al obtener los temas. Se han definido modelos de datos JSON para el panel del docente y multimedia, mejorando la gestión de datos y la integración con el backend. Se han añadido nuevos endpoints para la gestión de estos modelos.
- **Se han resuelto los errores de TypeScript y ESLint en el frontend relacionados con las props `units`, `unitsLoading` y `unitsError` en `App.tsx` y `Dashboard`.**
- **Se han actualizado las dependencias del proyecto, incluyendo `react-day-picker`, `date-fns` y `vite`.**
- **Se ha reemplazado `vite-plugin-components` con `unplugin-vue-components`.**
- **Se ha eliminado la dependencia `@types/jwt-decode`.**
- **Panel Docente:** El dashboard ha sido mejorado, moviendo componentes desde `TeacherDashboard.tsx` a `Dashboard.tsx` y adaptando el diseño. El dashboard ahora incluye secciones para "Herramientas para docentes", "Cómo funciona" y "Evaluaciones Efectivas". Se ha implementado la gestión de contenidos en el Panel Docente, permitiendo crear, eliminar y editar contenidos. Se ha implementado la lógica para mostrar el campo de contenido dependiendo del tipo de contenido seleccionado, la lógica para la gestión de categorías y etiquetas, y se ha mejorado la interfaz de usuario del formulario. Se han creado los componentes `CategoryManager.tsx` y `TagManager.tsx` para la gestión de categorías y etiquetas, respectivamente. Se ha creado el componente `Form.tsx` para mejorar la interfaz de usuario del formulario.
- **Documentación de endpoints con Swagger normalizada y profesionalmente documentada.**
- **Gestión de Contenidos:** Se ha implementado la interfaz de usuario para la gestión de contenidos en el Panel Docente.
- **Protección de rutas:** Se ha revisado la protección de rutas, redirigiendo a "/" si no está logueado. Se ha modificado la lógica para mostrar el sidebar en `App.tsx` para que también dependa del estado de autenticación.

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

---

## Estado del Frontend

- Aplicación React + Vite con estructura modular. Para más detalles, ver [`docs/Frontend-Arquitectura.md`](./Frontend-Arquitectura.md).
- Se movió el componente `Content.tsx` de `src/components/Content.tsx` a `src/components/general/Content.tsx`.
- Se eliminó el componente `src/components/common/CommonContent.tsx` ya que no se estaba utilizando en el proyecto.
- Se movieron los hooks de `src/hooks/auth/` a `src/auth/hooks/`.
- Rutas públicas y privadas gestionadas con React Router y el componente `PrivateRoute`. La autenticación por el momento funciona, hay que revisar a detalle.
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
- Se han refactorizado los componentes en `src/components` para mejorar la organización y seguir las buenas prácticas.
- Se han creado subcarpetas para agrupar componentes relacionados y se han movido los archivos correspondientes.
- También se han refactorizado componentes grandes en componentes más pequeños y reutilizables.
- La estructura de directorios en `src/components` ahora es:
    *   `common/`
    *   `dashboard/`
    *   `general/`
    *   `home/`
    *   `navigation/`
    *   `ui/`

---

## Histórico de funcionalidades eliminadas

- **Chat**: Se eliminó el módulo de chat para simplificar el backend y frontend, ya que no era una funcionalidad prioritaria en la revitalización lingüística ni en la hoja de ruta actual. Si se requiere en el futuro, se planificará e implementará nuevamente con la comunidad.

---

Última actualización: 22/4/2025, 12:17:58 a. m. (America/Bogota, UTC-5:00)
