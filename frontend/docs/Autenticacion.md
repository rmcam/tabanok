# Flujo de Autenticación y Protección de Rutas en Tabanok Frontend

---

## Resumen

Este documento describe la implementación actual de la autenticación en Tabanok, integrando **React (Vite + TypeScript)** en el frontend y **NestJS** en el backend.

---

## Endpoints de Autenticación

- **Login:** `POST /signin`
- **Registro:** `POST /signup`
- **Cerrar sesión:** `POST /auth/logout`
- **Solicitar restablecimiento de contraseña:** `POST /auth/forgot-password`
- **Restablecer contraseña:** `POST /auth/reset-password`

---

## Payloads y Respuestas

### Login

**Request:**

```json
POST /auth/signin
{
  "identifier": "usuario_institucional_o_email",
  "password": "contraseña"
}
```

**Response:**

```json
{
  "statusCode": 201,
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "uuid",
    "username": "usuario",
    "firstName": "Nombre",
    "lastName": "Apellido",
    "email": "correo@ejemplo.com",
    "role": "user",
    "status": "active",
    "languages": [],
    "preferences": {
      "notifications": true,
      "language": "es",
      "theme": "light"
    },
    "level": 1,
    "culturalPoints": 0,
    "gameStats": {
      "totalPoints": 0,
      "level": 1,
      "streak": 0,
      "lastActivity": "2025-04-18T20:03:24.979Z"
    },
    "resetPasswordToken": null,
    "resetPasswordExpires": null,
    "lastLoginAt": null,
    "isEmailVerified": false,
    "createdAt": "2025-04-18T20:03:24.982Z",
    "updatedAt": "2025-04-18T20:03:24.982Z"
  }
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
  "statusCode": 201,
  "accessToken": "...",
  "refreshToken": "...",
  "user": {
    "id": "uuid",
    "username": "usuario",
    "firstName": "Nombre",
    "lastName": "Apellido",
    "email": "correo@ejemplo.com",
    "role": "user",
    "status": "active",
    "languages": [],
    "preferences": {
      "notifications": true,
      "language": "es",
      "theme": "light"
    },
    "level": 1,
    "culturalPoints": 0,
    "gameStats": {
      "totalPoints": 0,
      "level": 1,
      "streak": 0,
      "lastActivity": "2025-04-18T20:03:24.979Z"
    },
    "resetPasswordToken": null,
    "resetPasswordExpires": null,
    "lastLoginAt": null,
    "isEmailVerified": false,
    "createdAt": "2025-04-18T20:03:24.982Z",
    "updatedAt": "2025-04-18T20:03:24.982Z"
  }
}
```

### Restablecer contraseña

**Request:**

```json
POST /auth/reset-password
{
  "token": "token_de_restablecimiento",
  "newPassword": "nueva_contraseña"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "Contraseña restablecida exitosamente"
}
```

### Solicitar restablecimiento de contraseña

**Request:**

```json
POST /auth/forgot-password
{
  "email": "correo@ejemplo.com"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "Correo electrónico de restablecimiento de contraseña enviado"
}
```

### Cierre de Sesión

**Request:**

```json
POST /auth/logout
```

**Response:**

```json
{
  "message": "Sesión cerrada exitosamente"
}
```

---

## Flujo de Autenticación

1.  El usuario se registra enviando los campos requeridos al endpoint `/api/auth/signup`.
2.  El usuario inicia sesión enviando `identifier` (usuario o email) y `password` a `/auth/signin`.
3.  El backend responde con el usuario y un JWT (`accessToken`).
4.  El frontend almacena el usuario completo (incluyendo el JWT) en sessionStorage con la clave 'authUser'.
5.  Para acceder a rutas protegidas, el frontend envía el JWT en el header `Authorization: Bearer <token>`, obteniéndolo del usuario almacenado en sessionStorage.
6.  El backend valida el token y autoriza el acceso.

---

## Protección de rutas sensibles

### Frontend

-   El frontend utiliza el componente `PrivateRoute` para proteger rutas sensibles.
-   Si el usuario no está autenticado, se muestra un loader mientras se verifica el estado; si no está autenticado tras la verificación, se redirige automáticamente a la página de login (`/login`).
-   Si la ruta requiere un rol específico (por ejemplo, `admin`), y el usuario no lo tiene, se redirige a `/unauthorized`.
-   Tras iniciar sesión correctamente, el usuario es redirigido automáticamente a `/dashboard`. El componente `Dashboard` utiliza el hook `useUnits` para cargar las unidades. La ruta de la API para obtener las unidades es `/api/unity`.
-   Las rutas protegidas actualmente son:
    -   `/dashboard`
    -   `/`
-   Ejemplo de uso en `App.tsx`:

    ```tsx
    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    ```

### Backend

-   El backend utiliza guards (`JwtAuthGuard` y `RolesGuard`) para proteger las rutas.
-   `JwtAuthGuard` verifica la validez del token JWT en el encabezado `Authorization`.
-   `RolesGuard` verifica si el usuario tiene el rol necesario para acceder a la ruta.
-   Si el usuario no está autenticado o no tiene permisos, se deniega el acceso con un código de estado 401 (No autorizado) o 403 (Prohibido).

#### Manejo de Tokens Expirados

-   El backend verifica la fecha de expiración del token JWT.
-   Si el token ha expirado, se devuelve un error 401 (No autorizado).
-   El frontend intercepta este error y redirige al usuario a la página de inicio de sesión para renovar el token.

---

## Estructura del Frontend de Autenticación

-   `src/lib/api.ts`: Centraliza la configuración de axios para las llamadas a la API.
-   `src/lib/authService.ts`: Contiene las funciones para realizar las llamadas a la API de autenticación.
-   `src/auth/context/`: Contexto de autenticación.
-   `src/App.tsx`: Componente principal de la aplicación, define las rutas y utiliza el componente `PrivateRoute` para proteger las rutas sensibles.
-   `src/components/PrivateRoute.tsx`: Componente para proteger rutas.
-   `src/auth/components/`: Componentes para la autenticación.
-   `src/components/ui/`: Componentes de la interfaz de usuario.
-   `src/components/Dashboard.tsx`: Componente para la página del panel de control.

---

## Pendientes y recomendaciones

-   Documentar el flujo de validación de email.
-   Mantener ejemplos de payloads y respuestas actualizados.

---

Última actualización: 20/4/2025, 2:00:00 a. m. (America/Bogota, UTC-5:00)
