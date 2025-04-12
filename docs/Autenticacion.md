# Flujo de Autenticación y Protección de Rutas en Tabanok Frontend

---

## Resumen

Este documento describe la implementación actual de la autenticación en Tabanok, integrando **React (Vite + TypeScript)** en el frontend y **NestJS** en el backend.

---

## Endpoints de Autenticación

- **Login:** `POST /api/auth/signin`
- **Registro:** `POST /api/auth/signup`

> El proxy de Vite reescribe `/api/auth/*` a `/api/v1/auth/*` en el backend.

---

## Payloads y Respuestas

### Login

**Request:**
```json
POST /api/auth/signin
{
  "identifier": "usuario_institucional_o_email",
  "password": "contraseña"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "username": "usuario",
    "firstName": "Nombre",
    "firstLastName": "Apellido",
    "email": "correo@ejemplo.com",
    "roles": ["user"]
  },
  "accessToken": "jwt_token"
}
```

### Registro

**Request:**
```json
POST /api/auth/signup
{
  "username": "usuario",
  "firstName": "Nombre",
  "firstLastName": "Apellido",
  "email": "correo@ejemplo.com",
  "password": "contraseña"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "username": "usuario",
    "firstName": "Nombre",
    "firstLastName": "Apellido",
    "email": "correo@ejemplo.com",
    "roles": ["user"]
  }
}
```

---

## Flujo de Autenticación

1. El usuario se registra enviando los campos requeridos al endpoint `/api/auth/signup`.
2. El usuario inicia sesión enviando `identifier` (usuario o email) y `password` a `/api/auth/signin`.
3. El backend responde con el usuario y un JWT (`accessToken`).
4. El frontend almacena el JWT (por ejemplo, en localStorage).
5. Para acceder a rutas protegidas, el frontend envía el JWT en el header `Authorization: Bearer <token>`.
6. El backend valida el token y autoriza el acceso.

---

## Protección de rutas sensibles

### Frontend

- El frontend utiliza el componente `PrivateRoute` para proteger rutas sensibles.
- Si el usuario no está autenticado, se muestra un loader mientras se verifica el estado; si no está autenticado tras la verificación, se redirige automáticamente a la página de login (`/login`).
- Si la ruta requiere un rol específico (por ejemplo, `admin`), y el usuario no lo tiene, se redirige a `/unauthorized`.
- Tras iniciar sesión correctamente, el usuario es redirigido automáticamente a `/dashboard`.
- Las rutas protegidas actualmente son:
  - `/dashboard`
  - `/`
  - `/categories` (requiere rol `admin`)
  - `/entry/:id`
  - `/variations`
  - `/gamification`
- Ejemplo de uso en `App.tsx`:
  ```tsx
  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
  <Route path="/categories" element={<PrivateRoute requiredRole="admin"><CategoriesList /></PrivateRoute>} />
  <Route path="/entry/:id" element={<PrivateRoute><EntryDetailWrapper /></PrivateRoute>} />
  ```

### Backend

- El backend utiliza guards (`JwtAuthGuard`) para proteger rutas.
- Si el usuario no está autenticado o no tiene permisos, se deniega el acceso.

---

## Estructura del Frontend de Autenticación

- `api.ts`: Centraliza las llamadas a la API de autenticación (`signin`, `signup`, `logout`).
- `AuthContext.tsx`: Contexto global de autenticación (usuario, loading, error, métodos).
- `AuthProvider.tsx`: Provider que gestiona el estado de autenticación y expone el contexto.
- `useAuth.ts`: Hook para acceder al contexto de autenticación.
- `LoginForm.tsx`, `SignupForm.tsx`: Formularios desacoplados de la lógica de red.
- `PrivateRoute.tsx`: Componente para proteger rutas.

---

## Buenas prácticas aplicadas

- Login institucional: el usuario puede iniciar sesión con su usuario institucional o correo electrónico.
- El registro requiere campos validados: `username`, `firstName`, `firstLastName`, `email`, `password`.
- Separación de responsabilidades entre frontend y backend.
- Uso de JWT para autenticación y autorización.
- Protección de rutas con hooks en el frontend y guards en el backend.
- Código tipado con TypeScript.
- Centralización de la lógica de autenticación.
- Uso de hooks y contextos para acceso global al estado de autenticación.

---

## Pendientes y recomendaciones

- Implementar refresh tokens para mejorar la seguridad.
- Implementar roles y permisos más granulares.
- Mejorar la experiencia de usuario en el manejo de errores.
- Documentar el flujo de recuperación de contraseña y validación de email.
- Mantener ejemplos de payloads y respuestas actualizados.
