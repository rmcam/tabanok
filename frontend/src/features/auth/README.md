# useAuth Hook y AuthContext

Este archivo contiene el hook `useAuth` y el contexto `AuthContext` para la gestión de la autenticación en la aplicación.

## AuthContext

`AuthContext` es un contexto de React que proporciona información sobre el estado de autenticación del usuario, incluyendo el usuario actual y las funciones para iniciar sesión, registrarse y cerrar sesión.

## useAuth Hook

El hook `useAuth` permite acceder fácilmente al contexto de autenticación desde cualquier componente.  Devuelve un objeto con las siguientes propiedades:

- `user`: Un objeto `User` que representa al usuario actual, o `null` si no hay un usuario conectado.
- `signin`: Una función asíncrona para iniciar sesión. Recibe un objeto `SigninData` como argumento.
- `signup`: Una función asíncrona para registrarse. Recibe un objeto `SignupData` como argumento.
- `logout`: Una función para cerrar sesión.
- `token`: El token de autenticación del usuario.

**Importante:** El hook `useAuth` debe usarse dentro de un componente `<AuthProvider>`.  Si se usa fuera de este componente, lanzará un error.

**Ejemplo de uso:**

```typescript
import { useAuth } from './useAuth';

const MyComponent = () => {
  const { user, signin, signup, logout, token } = useAuth();

  // ... tu código aquí ...
};
```

**Manejo de errores:**

El hook lanza un error si se intenta usar fuera del contexto de un `AuthProvider`.  Asegúrate de que tu componente esté envuelto correctamente.
