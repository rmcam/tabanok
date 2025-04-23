# Pendientes

---

## Próximos pasos

- Implementar mejoras recomendadas de accesibilidad.
- Validar nuevamente la accesibilidad con herramientas automáticas y manuales.
- Expandir la lógica de gamificación.
- Finalizar auditorías manuales de accesibilidad.
- Planificar nuevas funcionalidades y mejoras.
- Prototipar la UI de los paneles en Figma antes de codificar.
- Documentar cada avance y mantener este plan actualizado.
- Internacionalizar mensajes existentes en formularios.
- Integrar control ortográfico y gramatical en inputs de contenido.
- Documentar reglas y filtros personalizados.
- Validar calidad lingüística en contenido generado por usuarios.
- Mejorar accesibilidad según WCAG 2.1.
- Mejorar cobertura de tests en el frontend.
- Mejorar cobertura de tests en el backend.
- Agregar pruebas automáticas para rutas privadas y manejo de tokens expirados.
- Configurar CI/CD.
- Automatizar despliegues a producción (el pipeline ya construye y sube imágenes, falta activar paso SSH).
- Revisar redundancias y eliminar campos obsoletos restantes.
- Revisar redundancias y eliminar campos obsoletos restantes en el módulo de gamificación.
- Revisar la cobertura completa de las pruebas unitarias para asegurar que todos los casos de uso estén cubiertos.
- Monitorizar el rendimiento de los flujos de negocio y realizar optimizaciones adicionales si es necesario.
- Implementar la lógica de gestión de contenidos, progreso de estudiantes, creación de actividades y acceso a reportes en el Panel Docente.
- Diseñar la interfaz de usuario del Panel Docente.
- Integrar el Panel Docente con el backend.
- Proteger las rutas del Panel Docente con el rol `teacher` o `admin`.
- Implementar la lógica para mostrar el campo de contenido dependiendo del tipo de contenido seleccionado en el Panel Docente.
- Implementar la lógica para guardar los datos del formulario en el backend del Panel Docente.
- Implementar la lógica para la gestión de categorías y etiquetas en el Panel Docente.
- Mejorar la interfaz de usuario del formulario en el Panel Docente.
- Refactorizar los componentes en `src/components` para mejorar la organización y seguir las buenas prácticas.
- [x] Actualizar la documentación para reflejar los cambios en el componente `HomePage`. | ✅ |
- Mejorar el contraste entre el texto y la imagen de fondo en la Hero Section.
- [x] Implementar un carrusel interactivo en la HeroSection para mostrar diferentes tarjetas de `heroCardsData` con transiciones suaves y controles de navegación. | ✅ |
- Añadir un efecto de "card hover" a las Lecciones Destacadas para hacerlas más interactivas.
- Implementar un efecto de desplazamiento suave al hacer clic en los enlaces "Ver lección" y "Ver todas las lecciones" utilizando `react-router-hash-link`.
- [x] Implementar el almacenamiento de tokens en `HttpOnly cookies` (requiere cambios en el backend). | ✅ | (Implementado en backend y frontend).
- [x] Confirmar la lógica de usar el email como username por defecto en el registro con los requisitos del backend. | ✅ |

## Estado de cumplimiento

| Pauta WCAG 2.1                   | Estado      | Notas                                                                  |
| -------------------------------- | ----------- | ---------------------------------------------------------------------- |
| Contraste suficiente             | En progreso | Revisar colores secundarios y hover (mejorado)                           |
| Navegación por teclado           | En progreso | Mejorar en menús y formularios (mejorado en Sidebar, se agregó focus-visible:outline-none)                    |
| Etiquetas y roles ARIA           | En progreso | Añadir en botones, inputs, iconos (mejorado en formulario de búsqueda y Sidebar) |
| Mensajes de error accesibles     | En progreso | Integrar con validación y ARIA (mejorado en formulario de búsqueda)    |
| Lectura por lectores de pantalla | En progreso | Añadir descripciones y roles                                           |
| Componentes revisados            | Completado  | Se han revisado y mejorado los componentes `Progress`, `RewardsSection`, `Carousel`, `RecommendationsSection`, `CommunitySection`, `EntryDetailWrapper`, `NotFound`, `PrivateRoute`, `ProfilePage` y `StudentDashboard`. |

## Mejoras en el componente `PrivateRoute`

- Se ha movido el tipo `User` al archivo `src/auth/types/authTypes.ts` para facilitar su reutilización.
- Se ha mejorado la redirección de usuarios no autenticados utilizando el componente `Navigate` de `react-router-dom` directamente.
- Se ha mejorado el indicador de carga utilizando un componente `Loading` más sofisticado.
- **Ahora utiliza el AuthContext para verificar la autenticación y habilita la verificación de roles.**

## Hallazgos preliminares

- [ ] Falta de descripciones accesibles para iconos y elementos visuales.
- [ ] Navegación por teclado funcional, pero mejorable en menús y diálogos.
- [x] Formularios sin mensajes de error accesibles (`aria-invalid`, `aria-describedby`). | ✅ | (Se añadió feedback visual de error en los inputs y se integró con el sistema de notificaciones placeholder `showToast`. Se implementó un formulario de registro de varios pasos con validación por pasos y feedback visual de error en `SignupForm.tsx`, refactorizado para usar estados de carga del contexto y simplificar la lógica de validación).
- [x] Considerar la implementación de un **sistema de notificación global** (ej. toast) para mostrar mensajes de éxito o error después del envío del formulario. | ✅ | (Se integró `sonner` para notificaciones en el módulo de autenticación).
- [ ] Expandir la lógica de gamificación.
- [ ] Configurar CI/CD.
- [ ] Automatizar despliegues a producción.
- [ ] Revisar redundancias y eliminar campos obsoletos restantes.
- [ ] Mejorar cobertura de tests en el frontend.

---

**Actualizaciones en `HomePage.tsx`:**

*   Se han añadido `alt` texts descriptivos a todas las imágenes en las secciones `HeroSection`, `Featured Lessons` y `Testimonials` para mejorar la accesibilidad.

---

## Estado del Frontend

- Aplicación React + Vite con estructura modular. Para más detalles, ver [`docs/Frontend-Arquitectura.md`](./Frontend-Arquitectura.md).
- Se movió el componente `Content.tsx` de `src/components/Content.tsx` a `src/components/general/Content.tsx`.
- Se eliminó el componente `src/components/common/CommonContent.tsx` ya que no se estaba utilizando en el proyecto.
- Se movieron los hooks de `src/hooks/auth/` a `src/auth/hooks/`.
- Rutas públicas y privadas gestionadas con React Router y el componente `PrivateRoute`.
- **Autenticación y manejo de roles implementados completamente utilizando un Contexto de React (`AuthContext`) y un Proveedor (`AuthProvider`).**
- La información del usuario, el token de autenticación y los roles ahora se gestionan a través de cookies HttpOnly en el backend y se obtienen mediante la verificación de sesión.
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
- Se ha asegurado la consistencia de la estructura de datos en `heroCardsData` añadiendo el campo `buttons: []` a todos los elementos.
- Se ha simplificado la lógica de color de los indicadores del carrusel para usar un color para el indicador activo y otro para los inactivos.
- Se ha eliminado el borde amarillo de las tarjetas de testimonios.
- Se ha ajustado el espaciado vertical entre las secciones principales de la página a `py-12`.
- Se ha intentado corregir el comportamiento del carrusel para evitar cambios de tamaño al añadir una altura fija (`h-[500px]`) al contenedor del carrusel y asegurar que los elementos internos ocupen esa altura (`h-full`).
- Se ha creado un nuevo componente `FeaturedLessonCard` (`src/components/home/components/FeaturedLessonCard.tsx`) para encapsular la lógica de visualización de las tarjetas de lecciones destacadas y se ha integrado en `HomePage.tsx`.
*   Se mejoró la accesibilidad del carrusel principal y el carrusel de testimonios con atributos ARIA (`role`, `aria-roledescription`, `aria-label`).
*   Se añadió un botón de pausa/reproducción al carrusel de testimonios para controlar el autoplay.
*   Se refactorizaron las clases CSS comunes de los `FeatureCard` en una constante para mejorar la mantenibilidad.
*   Se añadió un mecanismo de reintento para la carga de lecciones destacadas en caso de error, mostrando un botón para reintentar.
*   Se añadieron enlaces de ejemplo (Política de Privacidad, Términos de Servicio, Contacto) en el pie de página.
*   Se agregó una barra de navegación estática (`HomeNavbar.tsx`) a la página de inicio que es visible al cargar y permanece fija al desplazarse, conteniendo los botones "Iniciar Sesión" y "Registrarse".
*   Se eliminó la acción directa de abrir el modal de registro del botón "Comienza ahora" en la sección principal, ya que esta funcionalidad ahora se maneja a través de la barra de navegación estática.

---

Última actualización: 23/4/2025, 2:44:00 p. m. (America/Bogota, UTC-5:00)
