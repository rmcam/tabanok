# Planificación de Nuevas Funcionalidades y Mejoras — Proyecto Tabanok

---

## 1. Panel Docente (En Desarrollo)

**Objetivo:** Permitir a los docentes gestionar contenidos, ver progreso de estudiantes, crear actividades y acceder a reportes. Estructura básica y rutas implementadas.

**Rutas sugeridas:**
- `/teacher/dashboard` — Resumen general, accesos rápidos.
- `/teacher/students` — Lista y progreso de estudiantes.
- `/teacher/activities` — Gestión de actividades y recursos.
- `/teacher/reports` — Reportes de avance y logros.

**Componentes clave:**
- TeacherDashboard
- StudentList
- ActivityManager
- ReportViewer

**Notas:**
- Acceso solo para usuarios con rol `teacher` o `admin`.
- Integrar filtros, exportación de reportes y feedback visual.

---

## 2. Panel Estudiante

**Objetivo:** Brindar a los estudiantes un espacio personalizado para ver su progreso, logros, actividades recomendadas y multimedia.

**Rutas sugeridas:**
- `/student/dashboard` — Progreso, logros, actividades sugeridas.
- `/student/activities` — Acceso a actividades y recursos.
- `/student/multimedia` — Biblioteca de audio, video, imágenes.

**Componentes clave:**
- StudentDashboard
- AchievementList
- RecommendedActivities
- MultimediaLibrary

**Notas:**
- Acceso solo para usuarios con rol `student`.
- Mostrar insignias, ranking y recomendaciones personalizadas.
- Diseño del dashboard interactivo completado.

---

## 3. Integración Multimedia

**Propuesta:**
- Permitir subir y visualizar archivos de audio (pronunciación, canciones), video (cuentos, rituales) e imágenes (arte, símbolos).
- Usar un componente `MultimediaPlayer` reutilizable.
- Soporte para formatos: mp3, wav, mp4, webm, jpg, png, svg.
- Backend: endpoints REST para gestión de archivos multimedia (subida, consulta, borrado).
- Frontend: galería accesible, reproductor integrado, descripciones y metadatos.

---

## 4. Mejoras de Usabilidad

- Mejorar feedback visual en formularios (validación, mensajes de error claros).
- Asegurar foco automático en campos clave y modales.
- Accesos rápidos y breadcrumbs en paneles.
- Tooltips y descripciones en botones críticos.
- Animaciones suaves para transiciones de vista.
- Soporte completo para navegación por teclado.

---

_Este documento sirve como hoja de ruta para las próximas funcionalidades clave del proyecto Tabanok. Ver siguientes pasos en [`docs/Pendientes.md`](./Pendientes.md)._
