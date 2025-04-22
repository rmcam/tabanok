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

## Hallazgos preliminares

- [ ] Falta de descripciones accesibles para iconos y elementos visuales.
- [ ] Navegación por teclado funcional, pero mejorable en menús y diálogos.
- [ ] Formularios sin mensajes de error accesibles (`aria-invalid`, `aria-describedby`).
- [ ] Expandir la lógica de gamificación.
- [ ] Configurar CI/CD.
- [ ] Automatizar despliegues a producción.
- [ ] Revisar redundancias y eliminar campos obsoletos restantes.
- [ ] Mejorar cobertura de tests en el frontend.

---

**Actualizaciones en `HomePage.tsx`:**

*   Se han añadido `alt` texts descriptivos a todas las imágenes en las secciones `HeroSection`, `Featured Lessons` y `Testimonials` para mejorar la accesibilidad.

---

Última actualización: 22/4/2025, 12:20:41 a. m. (America/Bogota, UTC-5:00)
