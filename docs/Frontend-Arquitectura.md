# Arquitectura Frontend Tabanok

## Tecnologías principales

- **Next.js 15** con App Router
- **React 19**
- **Tailwind CSS** para estilos
- **TypeScript**
- **NextAuth.js** para autenticación
- **Zod** para validaciones
- **React Hook Form** para formularios

## Organización general

El frontend está organizado por **dominios funcionales** y **tipos de componentes** para facilitar la escalabilidad y el mantenimiento.

### Estructura de carpetas

```
components/
├── ui/             # Componentes UI genéricos y reutilizables
├── auth/           # Componentes relacionados con autenticación
├── gamification/   # Componentes de gamificación
├── profile/        # Perfil de usuario
├── layout/         # Layouts, barras laterales, navegación

hooks/
├── auth/           # Hooks de autenticación
├── gamification/   # Hooks de gamificación

lib/
├── auth/           # Lógica de autenticación
├── gamification/   # Lógica de gamificación

actions/
├── auth/           # Acciones del servidor para auth
├── gamification/   # Acciones del servidor para gamificación

app/
├── (auth)/         # Rutas públicas (login, registro)
├── (protected)/    # Rutas protegidas para usuarios autenticados
├── (admin)/        # Rutas administrativas
├── layout.tsx      # Layout raíz
└── ...             # Otras páginas y layouts

docs/               # Documentación técnica del frontend
public/             # Archivos estáticos
```

### Convenciones

- **Alias `@/`**: configurado en `tsconfig.json` para importar desde la raíz del frontend.
- **Componentes UI**: deben ser lo más genéricos posible y ubicarse en `components/ui/`.
- **Componentes específicos**: se agrupan por dominio funcional.
- **Hooks**: generales o específicos, organizados en subcarpetas.
- **Lógica de negocio**: en `lib/`, separada por dominio.
- **Acciones del servidor**: en `actions/`, separadas por dominio.

### Ventajas

- Facilita la escalabilidad y el trabajo en equipo.
- Permite identificar rápidamente dónde agregar o modificar funcionalidades.
- Separa claramente UI genérica de lógica y componentes específicos.

## Notas para desarrollo

- Mantener la separación por dominios.
- Reutilizar componentes UI cuando sea posible.
- Documentar nuevos hooks, componentes y acciones.
- Actualizar esta documentación cuando se hagan cambios estructurales.
