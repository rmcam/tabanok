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

El campo `identifier` permite ingresar con el nombre de usuario o el correo electrónico.

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

El formulario de registro ahora es un formulario de varios pasos con **indicador de progreso** y **validación por pasos**. Los campos se dividen en tres pasos:

*   Paso 1: Información de la cuenta (email, contraseña, usuario)
*   Paso 2: Información personal (nombre, segundo nombre, apellido, segundo apellido)
*   Paso 3: Confirmación de datos

La validación se ejecuta al interactuar con el campo (`onBlur`) y **al intentar avanzar al siguiente paso**. Los inputs muestran **feedback visual de error** (borde rojo).

```json
POST /api/auth/signup
{
  "username": "usuario",
  "firstName": "Nombre",
  "secondName": "SegundoNombre (Opcional)",
  "firstLastName": "Apellido",
  "secondLastName": "SegundoApellido (Opcional)",
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
2.  El usuario inicia sesión enviando `identifier` (nombre de usuario o email) y `password` a `/auth/signin`.
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

-   El backend utiliza guards (`JwtAuthGuard` y `RolesGuard`) para proteger las rutas. Estas guardias se aplican **globalmente** a toda la aplicación.
-   `JwtAuthGuard` verifica la validez del token JWT en el encabezado `Authorization`. Las rutas marcadas con `@Public()` son excluidas de esta guardia.
-   `RolesGuard` verifica si el usuario tiene el rol necesario para acceder a la ruta, basándose en el decorador `@Roles()`.
-   Si el usuario no está autenticado, no tiene permisos, o el token ha expirado, se deniega el acceso con un código de estado 401 (No autorizado) o 403 (Prohibido).

#### Manejo de Tokens Expirados

-   El backend verifica la fecha de expiración del token JWT.
-   Si el token ha expirado, se devuelve un error 401 (No autorizado).
-   El frontend intercepta este error y redirige al usuario a la página de inicio de sesión para renovar el token.

#### Manejo de Rutas Públicas Específicas (`/lesson/featured`)

Se identificó un problema donde el endpoint `GET /lesson/featured`, a pesar de estar marcado con `@Public()`, requería autenticación. La causa raíz fue el orden de las rutas en `LessonController`, donde la ruta dinámica `GET /lesson/:id` interceptaba las solicitudes dirigidas a `/lesson/featured`.

**Solución Implementada:**

1.  **Reordenamiento de Rutas:** En `src/features/lesson/lesson.controller.ts`, la definición de la ruta `GET /lesson/featured` se movió para que aparezca antes de la ruta `GET /lesson/:id`. Esto asegura que la solicitud a `/lesson/featured` sea manejada por el método correcto.
2.  **Configuración Global del Guardia:** El `JwtAuthGuard` se aplica globalmente en `src/app.module.ts` utilizando `APP_GUARD` con `useFactory` para asegurar la correcta inyección del `Reflector`.
3.  **Limpieza del Módulo de Autenticación:** Se eliminó `JwtAuthGuard` y `JwtStrategy` de los `providers` y `exports` en `src/auth/auth.module.ts` para evitar duplicidad y posibles conflictos con la instancia global del guardia.
4.  **Verificación Manual en el Guardia (Solución Alternativa):** Se añadió una verificación explícita en el método `canActivate` de `JwtAuthGuard` para permitir el acceso si la URL de la solicitud comienza con `/lesson/featured` y el método es `GET`. Esto actúa como una capa adicional de seguridad si el reconocimiento de metadatos falla por alguna razón.

---

## Estructura del Frontend de Autenticación

-   `src/auth/services/authService.ts`: Contiene las funciones para realizar las llamadas a la API de autenticación (Login, Signup, Forgot Password, etc.) y las interfaces de datos (`SigninData`, `SignupData`).
-   `src/auth/hooks/useAuthService.ts`: Hook personalizado que encapsula la lógica de las llamadas a la API de autenticación y la gestión de tokens.
-   `src/auth/hooks/useAuth.ts`: Hook personalizado que encapsula la lógica de autenticación (manejo de estado, llamadas a `authService`, almacenamiento en `sessionStorage`, navegación).
-   `src/auth/components/`: Componentes específicos de autenticación (`SigninForm.tsx`, `SignupForm.tsx`, `ForgotPasswordForm.tsx`). Implementan formularios con validación utilizando el hook `useFormValidation` y ahora incluyen **feedback visual de error** en los inputs.
-   `src/components/common/FormWrapper.tsx`: Nuevo componente para envolver los formularios, centralizando los **estilos visuales del contenedor** (padding, fondo, bordes, sombra).
-   `src/components/common/Modal.tsx`: Componente genérico reutilizable para mostrar contenido en un diálogo modal. Se modificó para que la prop `trigger` sea **opcional**, permitiendo la apertura programática.
-   `src/components/common/AuthModals.tsx`: Componente que agrupa los modales de `Signin`, `Signup` y `ForgotPassword`. Se **refactorizó para usar un único componente `Modal`** cuyo contenido cambia dinámicamente. Permite controlar qué modal abrir por defecto (`defaultOpen`), si mostrar los disparadores por defecto (`showDefaultTriggers`), y ejecutar una acción al cerrar un modal (`onModalClose`).
-   `src/components/common/PrivateRoute.tsx`: Componente de orden superior para proteger rutas que requieren autenticación.
-   `src/App.tsx`: Define las rutas principales de la aplicación y utiliza `PrivateRoute`.

---

## Pendientes y recomendaciones

-   Documentar el flujo de validación de email.
-   Mantener ejemplos de payloads y respuestas actualizados.
-   Considerar la implementación de un **sistema de notificación global** (ej. toast) para mostrar mensajes de éxito o error después del envío del formulario.
-   Asegurar la **congruencia de la tipografía** en los formularios con la paleta de estilos general del proyecto.

---

Última actualización: 23/4/2025, 2:15:00 a. m. (America/Bogota, UTC-5:00)
