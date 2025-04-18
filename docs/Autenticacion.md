# Flujo de Autenticación y Protección de Rutas en Tabanok Frontend

---

## Resumen

**Nota:** La autenticación está en proceso de revisión.

Este documento describe la implementación actual de la autenticación en Tabanok, integrando **React (Vite + TypeScript)** en el frontend y **NestJS** en el backend.

---

## Endpoints de Autenticación

- **Login:** `POST /auth/signin`
- **Registro:** `POST /auth/signup`

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

---

## Flujo de Autenticación

**Nota:** Al crear un nuevo usuario, se crea automáticamente una entrada en la tabla `statistics` para almacenar su información de progreso y logros.

1. El usuario se registra enviando los campos requeridos al endpoint `/api/auth/signup`.
2. El usuario inicia sesión enviando `identifier` (usuario o email) y `password` a `/api/auth/signin`.
3. El backend responde con el usuario y un JWT (`accessToken`).
4. El frontend almacena el usuario completo (incluyendo el JWT) en sessionStorage con la clave 'authUser'.
5. Para acceder a rutas protegidas, el frontend envía el JWT en el header `Authorization: Bearer <token>`, obteniéndolo del usuario almacenado en sessionStorage.
6. El backend valida el token y autoriza el acceso.

---

## Protección de rutas sensibles

### Frontend

- El frontend utiliza el componente `PrivateRoute` para proteger rutas sensibles.
- Si el usuario no está autenticado, se muestra un loader mientras se verifica el estado; si no está autenticado tras la verificación, se redirige automáticamente a la página de login (`/login`).
- Si la ruta requiere un rol específico (por ejemplo, `admin`), y el usuario no lo tiene, se redirige a `/unauthorized`.
- Tras iniciar sesión correctamente, el usuario es redirigido automáticamente a `/dashboard`. El componente `Dashboard` utiliza el hook `useUnits` para cargar las unidades. La ruta de la API para obtener las unidades es `/api/unity`.
- Las rutas protegidas actualmente son:
  - `/dashboard`
  - `/`
  - `/categories` (requiere rol `admin`)
  - `/entry/:id`
  - `/variations`
  - `/gamification`
  - `/profile`
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

- `lib/api.ts`: Centraliza la configuración de axios para las llamadas a la API, incluyendo la URL base y los interceptores.
- `api.ts`: Centraliza las llamadas a la API de autenticación (`signin`, `signup`, `logout`), utilizando el cliente axios configurado en `lib/api.ts`.
- `AuthContext.tsx`: Contexto global de autenticación (usuario, loading, error, métodos). Define la interfaz `AuthUser` con las propiedades `id`, `username`, `email`, `roles`, `token` y `refreshToken`.
- `AuthProvider.tsx`: Provider que gestiona el estado de autenticación y expone el contexto. **Utiliza `useMemo` y `useCallback` para optimizar el rendimiento y evitar re-renderizados innecesarios de los componentes que consumen el contexto.**
- `useAuth.ts`: Hook para acceder al contexto de autenticación. **Es normal que este hook se llame varias veces durante la carga inicial de la aplicación, ya que varios componentes (como `PrivateRoute`) lo utilizan y el estado de autenticación puede cambiar durante este proceso. En desarrollo, React StrictMode puede causar que los efectos se ejecuten dos veces.**
- `LoginForm.tsx`, `SignupForm.tsx`: Formularios desacoplados de la lógica de red.
- `PrivateRoute.tsx`: Componente para proteger rutas.

**Nota:** En el `AuthProvider.tsx`, el `useEffect` que guarda el usuario en `sessionStorage` puede ejecutarse dos veces en desarrollo debido a React StrictMode. Esto es normal y no indica un problema en el código.

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
- **Licencia:** MIT License

---

## Pendientes y recomendaciones

- Se han implementado refresh tokens para mejorar la seguridad.
- Se han implementado roles y permisos más granulares en el componente `PrivateRoute`.
- Se ha mejorado la experiencia de usuario en el manejo de errores.
- Documentar el flujo de recuperación de contraseña y validación de email.
- Mantener ejemplos de payloads y respuestas actualizados.
