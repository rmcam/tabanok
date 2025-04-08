# Estado Actual del Proyecto Tabanok

---

## Estado general

- Monorepo optimizado con pnpm workspaces y lockfile único.
- Backend funcional con NestJS, conectado a PostgreSQL.
- Frontend funcional con Next.js, autenticación y consumo de API.
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
- Gamificación parcialmente implementada.

---

## Detalles del módulo Gamificación

Ver documentación completa y actualizada en [`docs/Gamificacion.md`](./Gamificacion.md).
- Documentación de flujos de testing, despliegue y contribución creada.

---

## Pendientes principales

- Expandir la lógica de gamificación.
- Activar despliegue automático a producción (el pipeline ya construye y sube imágenes, falta activar paso SSH).
- Mejorar cobertura de tests en frontend (backend ya tiene alta cobertura).
- Integrar validación lingüística avanzada en frontend (LanguageTool o Grammarly).
- Finalizar auditorías manuales y con lectores de pantalla para accesibilidad.
- Revisar y actualizar dependencias obsoletas o con advertencias.
- Planificar nuevas funcionalidades y mejoras.

---

## Próximos pasos recomendados

1. Expandir la lógica de gamificación.
2. Integrar validación lingüística avanzada en frontend.
3. Mejorar cobertura de tests en frontend.
4. Activar despliegue automático a producción.
5. Finalizar auditorías manuales de accesibilidad.
6. Revisar dependencias y actualizar.
7. Planificar nuevas funcionalidades y mejoras.

---

## Estado del Frontend

- Aplicación Next.js 15 con App Router (`app/`), estructura modular.
- Rutas públicas agrupadas en `(auth)/` (login, registro, etc.).
- Rutas protegidas agrupadas en `(protected)/`, protegidas mediante un único layout que usa `getServerSession()` de Auth.js v5 beta.
- Autenticación implementada con Auth.js v5 beta, sin middlewares personalizados.
- Internacionalización configurada con `next-i18next`, soporte multilenguaje.
- Estilos con Tailwind CSS y configuración personalizada.
- Uso de **shadcn/ui** para componentes accesibles, personalizables y consistentes.
- Componentes reutilizables para navegación, formularios, sidebar, toggles y más.
- Integración con LanguageTool para validación lingüística avanzada.
- Accesibilidad en proceso, con componentes accesibles y mejoras pendientes para cumplir WCAG 2.1.
- Consumo de API backend para diccionario Kamëntsá y otros recursos.
- Uso de hooks personalizados para gestión de estado y lógica de UI.
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
