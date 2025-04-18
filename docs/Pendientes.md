# Pendientes de Accesibilidad

---

## Próximos pasos

- Implementar mejoras recomendadas.
- Validar nuevamente con herramientas automáticas y manuales.
- Expandir la lógica de gamificación.
- Activar despliegue automático a producción (el pipeline ya construye y sube imágenes, falta activar paso SSH).
- Mejorar cobertura de tests en frontend (backend ya tiene alta cobertura).
- Finalizar auditorías manuales de accesibilidad.
- Planificar nuevas funcionalidades y mejoras.
- **Agregar pruebas automáticas para rutas privadas y manejo de tokens expirados.**
- **Revisar y documentar la integración de hooks personalizados (`useUnits`, `useAuth`).**
- Definir los modelos de datos para panel docente y multimedia.
- Crear los componentes base y rutas protegidas para el Panel Docente.
- Implementar endpoints REST para multimedia.
- Prototipar la UI de los paneles en Figma antes de codificar.
- Documentar cada avance y mantener este plan actualizado.
- Internacionalizar mensajes existentes en formularios.
- Integrar control ortográfico y gramatical en inputs de contenido.
- Documentar reglas y filtros personalizados.
- Validar calidad lingüística en contenido generado por usuarios.
- Revisar redundancias y eliminar campos obsoletos restantes.
- Revisar redundancias y eliminar campos obsoletos restantes en el módulo de gamificación.
- Automatizar despliegues a producción.
- Mejorar cobertura de tests en el frontend.
- Documentar nuevas funcionalidades y mejoras.
- Mejorar cobertura de tests.
- Configurar CI/CD.
- Integrar control ortográfico y gramatical avanzado.
- Mejorar accesibilidad según WCAG 2.1.
- Automatizar despliegues.

## Estado de cumplimiento

| Pauta WCAG 2.1                     | Estado       | Notas                                     |
|-----------------------------------|--------------|-------------------------------------------|
| Contraste suficiente              | En progreso      | Revisar colores secundarios y hover       |
| Navegación por teclado            | En progreso      | Mejorar en menús y formularios            |
| Etiquetas y roles ARIA            | En progreso      | Añadir en botones, inputs, iconos (mejorado en formulario de búsqueda) |
| Mensajes de error accesibles      | En progreso      | Integrar con validación y ARIA (mejorado en formulario de búsqueda)    |
| Lectura por lectores de pantalla  | En progreso      | Añadir descripciones y roles              |

## Hallazgos preliminares

- [ ] Algunos botones carecen de etiquetas ARIA contextuales (`aria-label`, `aria-disabled`).
- [ ] Inputs sin asociación explícita con `<label>` o `aria-labelledby`.
- [ ] Contraste de color a revisar en estados hover y focus.
- [ ] Falta de descripciones accesibles para iconos y elementos visuales.
- [ ] Navegación por teclado funcional, pero mejorable en menús y diálogos.
- [ ] Formularios sin mensajes de error accesibles (`aria-invalid`, `aria-describedby`).
