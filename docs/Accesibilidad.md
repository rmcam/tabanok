# Auditoría de Accesibilidad - Frontend Kamëntsá

---

## Objetivo

Cumplir con las pautas **WCAG 2.1** para garantizar una experiencia inclusiva y accesible para todos los usuarios.

---

## Herramientas utilizadas

- **Lighthouse** (Chrome DevTools)
- **axe-core** (extensión navegador)
- **Validadores manuales** (navegación por teclado, lectores de pantalla)

---

## Hallazgos preliminares

- [x] Algunos botones carecen de etiquetas ARIA contextuales (`aria-label`, `aria-disabled`). (En proceso de corrección)
- [x] Inputs sin asociación explícita con `<label>` o `aria-labelledby` (corregido en formulario de búsqueda).
- [x] Contraste de color a revisar en estados hover y focus. (En proceso de corrección)
- [x] Falta de descripciones accesibles para iconos y elementos visuales. (En proceso de corrección)
- [x] Navegación por teclado funcional, pero mejorable en menús y diálogos. (En proceso de mejora)
- [x] Formularios sin mensajes de error accesibles (`aria-invalid`, `aria-describedby`) (corregido en formulario de búsqueda con `role="status"`).

---

## Recomendaciones

- Añadir atributos **ARIA** contextuales en botones, inputs y navegación.
- Mejorar contraste de colores para cumplir ratio mínimo AA.
- Asociar correctamente `<label>` con inputs mediante `htmlFor`.
- Añadir descripciones accesibles a iconos con `aria-label` o `title`.
- Gestionar foco visible y orden lógico de tabulación.
- Proveer mensajes de error accesibles y claros.
- Realizar auditorías periódicas y pruebas con usuarios.

---

## Estado de cumplimiento

| Pauta WCAG 2.1                     | Estado       | Notas                                     |
|-----------------------------------|--------------|-------------------------------------------|
| Contraste suficiente              | En progreso      | Revisar colores secundarios y hover       |
| Navegación por teclado            | En progreso      | Mejorar en menús y formularios            |
| Etiquetas y roles ARIA            | En progreso      | Añadir en botones, inputs, iconos (mejorado en formulario de búsqueda) |
| Mensajes de error accesibles      | En progreso      | Integrar con validación y ARIA (mejorado en formulario de búsqueda)    |
| Lectura por lectores de pantalla  | En progreso      | Añadir descripciones y roles              |

---

## Próximos pasos

- Implementar mejoras recomendadas.
- Validar nuevamente con herramientas automáticas y manuales.
- Se han realizado mejoras en el manejo de errores y la accesibilidad en el formulario de inicio de sesión.
- Ver pendientes y estado de cumplimiento en [`docs/Pendientes.md`](./Pendientes.md).

---

## Última actualización

Abril 2025
