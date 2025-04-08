# Flujo de Autenticación y Protección de Rutas en Tabanok Frontend

---

## Resumen

Este documento describe cómo está implementada la autenticación en el frontend de Tabanok usando **Auth.js v5 beta** (antes NextAuth.js), siguiendo buenas prácticas recomendadas.

---

## Proveedores configurados

- **GitHub OAuth**
- **Credenciales (email y contraseña)**, que delegan en el backend (`/auth/signin`)

Configurados en [`frontend/auth.config.ts`](../frontend/auth.config.ts), con secretos y URLs en variables de entorno:

- `GITHUB_ID`
- `GITHUB_SECRET`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_BACKEND_URL`

---

## Protección de rutas sensibles

- **No se usan middlewares globales.**
- Se protege el grupo de rutas `/app/(protected)/` mediante su layout:

```tsx
// frontend/app/(protected)/layout.tsx
const session = await getServerSession(authConfig);
if (!session) redirect("/login");
```

- Esto asegura que cualquier página dentro de `(protected)/` requiera sesión válida.
- Las rutas públicas (login, registro, landing) están en `(auth)/` o fuera de `(protected)/`.

---

## Redirecciones personalizadas

Configuradas en `auth.config.ts`:

```ts
pages: {
  signIn: "/login",
  signOut: "/logout",
  error: "/login?error=true",
  verifyRequest: "/verify-request",
  newUser: "/welcome",
}
```

---

## Uso en componentes cliente

- Se usa `useSession()` desde `"next-auth/react"` para condicionar la UI según el estado de sesión.
- Ejemplo en `NavUser`:

```tsx
const { data: session } = useSession();
if (session) {
  // Mostrar avatar, nombre, opciones
} else {
  // Mostrar botón login o UI para invitados
}
```

---

## Variables sensibles y secretos

Todos los secretos y URLs sensibles están en variables de entorno, **no en el código fuente**.

---

## Buenas prácticas aplicadas

- Protección de rutas con `getServerSession()` en layouts, no con middlewares.
- Redirecciones configuradas para flujos claros.
- Uso de `useSession()` en componentes cliente.
- Código tipado con TypeScript.
- Accesibilidad mejorada (landmarks, roles, ARIA).
- Dependencias revisadas y actualizadas.
- Documentación clara del flujo auth.

---

## Pendientes y recomendaciones

- Migrar a versión estable de Auth.js v5 cuando esté disponible.
- Continuar pruebas de accesibilidad con lectores de pantalla.
- Revisar y mejorar UI para estados sin sesión.
- Mantener secretos fuera del código fuente.
