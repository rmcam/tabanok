# Arquitectura Frontend Tabanok

## Tecnologías principales

- **React**
- **Vite** como bundler
- **TypeScript**
- **Three.js** para animaciones 3D
- **Tailwind CSS** para estilos
- **unplugin-vue-components** para la importación automática de componentes
- **Sonner** para notificaciones

## Organización general

El frontend está organizado por **dominios funcionales** y **tipos de componentes** para facilitar la escalabilidad y el mantenimiento.

### Estructura de carpetas

```
src/
├── App.tsx         # Componente principal
├── main.tsx        # Punto de entrada
├── assets/         # Archivos estáticos
├── components/     # Componentes React
│   ├── ui/         # Componentes UI genéricos
│   ├── auth/       # Componentes de autenticación
│   ├── gamification/   # Componentes de gamificación
│   ├── profile/    # Perfil de usuario
│   ├── dashboard/  # Componentes del dashboard
│   ├── common/    # Componentes comunes
│   └── layout/     # Layouts
│   ├── dashboard/  # Componentes del dashboard
├── lib/            # Lógica de negocio genérica
├── hooks/          # Hooks React genéricos
├── auth/          # Autenticación
│   └── hooks/     # Hooks React para autenticación
├── styles/         # Estilos CSS
└── ...             # Otros archivos

public/             # Archivos estáticos
```

### Convenciones

- **Alias `@/`**: configurado en `vite.config.ts` para importar desde la raíz del frontend.
- **Componentes UI**: deben ser lo más genéricos posible y ubicarse en `components/ui/`.
- **Componentes específicos**: se agrupan por dominio funcional.
- **Hooks**: generales o específicos, organizados en subcarpetas.
- **Lógica de negocio**: en `lib/`, separada por dominio.

### Ventajas

- Facilita la escalabilidad y el trabajo en equipo.
- Permite identificar rápidamente dónde agregar o modificar funcionalidades.
- Separa claramente UI genérica de lógica y componentes específicos.

---

## Integración con Backend

El frontend consume el backend mediante un **cliente Axios centralizado** ubicado en `src/lib/api.ts`.

### Hooks para consumir el backend

- `src/auth/hooks/useAuth.ts` — Autenticación
- `src/features/dictionary/hooks/` — Diccionario
- `src/features/gamification/hooks/useGamification.ts` - Gamificación

Los **hooks** gestionan la lógica de consumo del backend y estado. Los **componentes** usan estos hooks para mostrar datos y gestionar la UI.

---

### Sidebar Component

The `Sidebar` component provides a composable, themeable, and customizable sidebar. It includes the following features:

- **Collapsible SidebarGroup:** The `SidebarGroup` components are now collapsible, allowing users to expand and collapse sections of the sidebar to better organize content.
- **SidebarMenuAction:** Each `SidebarMenuItem` now includes a `SidebarMenuAction` component, which allows users to perform actions on the menu item, such as editing or deleting.
- **SidebarRail:** A `SidebarRail` component has been added to the main layout, providing a convenient way for users to toggle the sidebar open and closed.
- **Theming:** The sidebar's appearance can be customized using CSS variables, allowing for easy integration with the application's overall theme.

The `Sidebar` component is built using the following components from `src/components/ui/sidebar.tsx`:

- `SidebarProvider`: Provides the sidebar context to the other components.
- `Sidebar`: The main sidebar container.
- `SidebarHeader`: A sticky header for the sidebar.
- `SidebarContent`: The scrollable content of the sidebar.
- `SidebarGroup`: A section within the sidebar content.
- `SidebarGroupLabel`: A label for a sidebar group.
- `SidebarGroupContent`: The content of a sidebar group.
- `SidebarMenu`: A menu within a sidebar group.
- `SidebarMenuItem`: An item in a sidebar menu.
- `SidebarMenuButton`: A button for a sidebar menu item.
- `SidebarMenuAction`: An action for a sidebar menu item.
- `SidebarRail`: A rail for toggling the sidebar.

The `AppSidebar` component in `src/components/app-sidebar.tsx` defines the structure and content of the application's sidebar. It now includes the following:

- A search input for searching the application.
- A button to trigger a toast notification.
- The following groups:
    - Application: Contains the main navigation items. The items are now rendered using the `ApplicationMenuItems` component in `src/components/ApplicationMenuItems.tsx`, making it easier to add or remove items.
    - Administración: Contains items related to administration tasks, such as managing users and roles.
    - Configuración: Contains items related to application settings, such as general settings and appearance.

---

Última actualización: 20/4/2025, 2:46:00 p. m. (America/Bogota, UTC-5:00)
