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

- [ ] Algunos botones carecen de etiquetas ARIA contextuales (`aria-label`, `aria-disabled`).
- [ ] Inputs sin asociación explícita con `<label>` o `aria-labelledby`.
- [ ] Contraste de color a revisar en estados hover y focus.
- [ ] Falta de descripciones accesibles para iconos y elementos visuales.
- [ ] Navegación por teclado funcional, pero mejorable en menús y diálogos.
- [ ] Formularios sin mensajes de error accesibles (`aria-invalid`, `aria-describedby`).

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
| Contraste suficiente              | Parcial      | Revisar colores secundarios y hover       |
| Navegación por teclado            | Parcial      | Mejorar en menús y formularios            |
| Etiquetas y roles ARIA            | Parcial      | Añadir en botones, inputs, iconos         |
| Mensajes de error accesibles      | Parcial      | Integrar con validación y ARIA            |
| Lectura por lectores de pantalla  | Parcial      | Añadir descripciones y roles              |

---

## Próximos pasos

- Implementar mejoras recomendadas.
- Validar nuevamente con herramientas automáticas y manuales.
- Documentar avances y marcar tareas completadas en `docs/Pendientes.md`.

---

## Última actualización

Abril 2025
