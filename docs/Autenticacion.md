# Flujo de Autenticación y Protección de Rutas en Tabanok Frontend

---

## Resumen

Este documento describe cómo está implementada la autenticación en el frontend de Tabanok usando **React con Vite y TypeScript**, delegando la lógica de autenticación al backend (NestJS).

---

## Autenticación

- El frontend envía las credenciales (email y contraseña) al backend (`/auth/signin` o `/auth/signup`).
- El backend valida las credenciales y genera un token JWT.
- El frontend almacena el token JWT (por ejemplo, en localStorage o cookies).
- Para acceder a rutas protegidas, el frontend envía el token JWT en el header `Authorization`.
- El backend verifica el token JWT y autoriza el acceso a la ruta.

## Protección de rutas sensibles

- El frontend utiliza un hook para verificar si el usuario está autenticado.
- Si el usuario no está autenticado, se redirige a la página de login.
- El backend utiliza guards para proteger las rutas sensibles.
- Si el usuario no está autenticado o no tiene los permisos necesarios, se deniega el acceso a la ruta.

## Variables sensibles y secretos

Todos los secretos y URLs sensibles están en variables de entorno, **no en el código fuente**.

## Buenas prácticas aplicadas

- Separación de responsabilidades entre frontend y backend.
- Uso de JWT para autenticación y autorización.
- Protección de rutas con hooks en el frontend y guards en el backend.
- Código tipado con TypeScript.

## Pendientes y recomendaciones

- Implementar refresh tokens para mejorar la seguridad.
- Implementar roles y permisos más granulares.
- Continuar pruebas de seguridad.
