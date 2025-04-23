# Integración de Hooks Personalizados (`useUnits`, `useAuth`)

---

## `useAuth`

El hook `useAuth` proporciona acceso al contexto de autenticación.

### Ubicación

`frontend/src/auth/hooks/useAuth.ts`

### Descripción

Este hook es el hook principal para consumir el `AuthContext` y proporciona acceso al estado de autenticación y las funciones relacionadas (inicio de sesión, registro, cierre de sesión, recuperación de contraseña). El estado de autenticación ahora se determina a través de la verificación de sesión con el backend utilizando cookies HttpOnly, en lugar de leer tokens directamente del almacenamiento local.

### Uso

```typescript
import { useAuth } from '../../auth/hooks/useAuth';

function MyComponent() {
  const { user, signin, signup, signout, forgotPassword, loading } = useAuth();

  // ...
}
```

### Retorno

El hook retorna un objeto con las siguientes propiedades:

-   `user`: El usuario autenticado (`User | null`).
-   `loading`: Un valor booleano que indica si la verificación de autenticación inicial está en curso.
-   `signingIn`: Un valor booleano que indica si la operación de inicio de sesión está en curso.
-   `signingUp`: Un valor booleano que indica si la operación de registro está en curso.
-   `requestingPasswordReset`: Un valor booleano que indica si la operación de solicitud de restablecimiento de contraseña está en curso.
-   `signin`: La función para iniciar sesión (`(data: SigninData) => Promise<boolean>`).
-   `signup`: La función para registrarse (`(data: SignupData) => Promise<boolean>`).
-   `signout`: La función para cerrar sesión (`() => void`).
-   `forgotPassword`: La función para solicitar restablecimiento de contraseña (`(email: string) => Promise<void>`).

### Ejemplo

```typescript
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = () => {
    signout();
    navigate('/'); // Redirigir después de cerrar sesión
  };

  return (
    <div>
      {user ? (
        <>
          <p>Bienvenido, {user.email}!</p> {/* Usar user.email ya que username no está en la interfaz User del contexto */}
          <button onClick={handleSignout}>Cerrar sesión</button>
        </>
      ) : (
        <p>Por favor, inicia sesión.</p>
      )}
    </div>
  );
}
```

## `useUnits`

El hook `useUnits` proporciona acceso a la lista de unidades del usuario autenticado.

### Ubicación

`frontend/src/hooks/useUnits.ts`

### Descripción

Este hook utiliza el hook `useAuth` (del contexto) para obtener el estado de autenticación y realizar una solicitud a la API para obtener la lista de unidades del usuario.

### Uso

```typescript
import useUnits from './useUnits';

function MyComponent() {
  const { units, loading, error } = useUnits();

  // ...
}
```

### Retorno

El hook retorna un objeto con las siguientes propiedades:

-   `units`: La lista de unidades del usuario.
-   `loading`: Un valor booleano que indica si la lista de unidades está cargando.
-   `error`: Un mensaje de error, si ocurre un error al cargar la lista de unidades.

### Ejemplo

```typescript
import useUnits from './useUnits';

function MyComponent() {
  const { units, loading, error } = useUnits();

  if (loading) {
    return <p>Cargando unidades...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {units.map((unit) => (
        <li key={unit.id}>{unit.name}</li>
      ))}
    </ul>
  );
}

---

Última actualización: 23/4/2025, 2:43:00 p. m. (America/Bogota, UTC-5:00)
