# Pendientes de Accesibilidad

---

## Próximos pasos

- **Nota: Se priorizarán las pruebas del frontend y se dejarán las pruebas del backend para el final, siempre y cuando se asegure la correcta integración entre ambos.**

- Revisar y documentar la integración de hooks personalizados (`useUnits`, `useAuth`).
- Implementar mejoras recomendadas.
- Validar nuevamente con herramientas automáticas y manuales.
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
- Automatizar despliegues a producción.
- Automatizar despliegues.
- Revisar redundancias y eliminar campos obsoletos restantes.
- Revisar redundancias y eliminar campos obsoletos restantes en el módulo de gamificación.
- Revisar la cobertura completa de las pruebas unitarias para asegurar que todos los casos de uso estén cubiertos.
- Monitorizar el rendimiento de los flujos de negocio y realizar optimizaciones adicionales si es necesario.
- [x] Documentar completamente las API del módulo utilizando Swagger.
- Mejorar cobertura de tests en frontend (backend ya tiene alta cobertura).
- Implementar la lógica de gestión de contenidos, progreso de estudiantes, creación de actividades y acceso a reportes en el Panel Docente.
- Diseñar la interfaz de usuario del Panel Docente.
- Integrar el Panel Docente con el backend.
- Proteger las rutas del Panel Docente con el rol `teacher` o `admin`.

## Estado de cumplimiento

| Pauta WCAG 2.1                   | Estado      | Notas                                                                  |
| -------------------------------- | ----------- | ---------------------------------------------------------------------- |
| Contraste suficiente             | En progreso | Revisar colores secundarios y hover                                    |
| Navegación por teclado           | En progreso | Mejorar en menús y formularios                                         |
| Etiquetas y roles ARIA           | En progreso | Añadir en botones, inputs, iconos (mejorado en formulario de búsqueda) |
| Mensajes de error accesibles     | En progreso | Integrar con validación y ARIA (mejorado en formulario de búsqueda)    |
| Lectura por lectores de pantalla | En progreso | Añadir descripciones y roles                                           |
| Componentes revisados            | Completado  | Se han revisado y mejorado los componentes `Progress`, `RewardsSection`, `Carousel`, `RecommendationsSection`, `CommunitySection`, `EntryDetailWrapper`, `NotFound`, `PrivateRoute`, `ProfilePage` y `StudentDashboard`. |

## Hallazgos preliminares

- [ ] Algunos botones carecen de etiquetas ARIA contextuales (`aria-label`, `aria-disabled`).
- [ ] Inputs sin asociación explícita con `<label>` o `aria-labelledby`.
- [ ] Contraste de color a revisar en estados hover y focus.
- [ ] Falta de descripciones accesibles para iconos y elementos visuales.
- [ ] Navegación por teclado funcional, pero mejorable en menús y diálogos.
- [ ] Formularios sin mensajes de error accesibles (`aria-invalid`, `aria-describedby`).
