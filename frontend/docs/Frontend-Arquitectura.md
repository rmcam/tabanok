## Componente HomePage

El componente `HomePage` es la página principal de la plataforma Tabanok. Muestra las características de la plataforma, testimonios e información de contacto.

### Secciones

*   **Sección Hero:** Utiliza un carrusel para mostrar características clave y llamadas a la acción.
*   **Sección de Características:** Destaca las principales características de la plataforma (Lecciones Interactivas, Gamificación, Seguimiento de Progreso) con iconos.
*   **Sección de Lecciones Destacadas:** Muestra una lista de lecciones destacadas con enlaces para verlas.
*   **Sección de Testimonios:** Muestra testimonios de usuarios sin imágenes.
*   **Sección de Contacto:** Proporciona un formulario de contacto y un enlace de correo electrónico.
*   **Footer:** Muestra un texto de copyright.
*   **Integración de Modales de Autenticación:** Utiliza el componente `AuthModals` para mostrar los modales de inicio de sesión, registro y recuperación de contraseña. El botón "Comienza ahora" en la sección Hero está configurado para abrir directamente el modal de registro. Los disparadores por defecto de `AuthModals` están ocultos (`showDefaultTriggers={false}`).

### Data Structures

*   `testimonials`: An array of objects containing user testimonials.
*   `featuredLessons`: An array of objects containing information about featured lessons.
*   `heroCards`: An array of objects containing information displayed in the hero carousel.

```
src/
├── App.tsx         # Componente principal
├── main.tsx        # Punto de entrada
├── assets/         # Archivos estáticos
├── components/     # Componentes React
│   ├── ui/         # Componentes UI genéricos (shadcn/ui y personalizados)
│   ├── auth/       # Componentes específicos de autenticación (formularios)
│   ├── common/      # Componentes comunes reutilizables (Modal, AuthModals, PrivateRoute, etc.)
│   ├── dashboard/   # Componentes del dashboard
│   ├── general/     # Componentes generales (ej. layout de página)
│   ├── home/        # Componentes de la página de inicio
│   └── navigation/  # Componentes de navegación
├── lib/            # Lógica de negocio genérica
├── hooks/          # Hooks React genéricos
├── auth/          # Autenticación
│   ├── hooks/     # Hooks React para autenticación
│   │   ├── useAuth.ts # Hook para la autenticación
│   │   └── useAuthService.ts # Hook para el servicio de autenticación
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

Los **hooks** gestionan la lógica de consumo del backend y estado (ej. `useAuth` para manejar login/signup). Los **componentes** usan estos hooks para mostrar datos y gestionar la UI (ej. `SignupForm` usa `useAuth`).

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
- `SidebarMenuButton`: A button for a sidebar menu item. Se ha añadido `focus-visible:outline-none` para mejorar la accesibilidad.
- `SidebarMenuAction`: An action for a sidebar menu item.
- `SidebarRail`: A rail for toggling the sidebar.

The `AppSidebar` component in `src/components/navigation/app-sidebar.tsx` defines the structure and content of the application's sidebar. It now includes the following:

- A search input for searching the application.
- A button to trigger a toast notification.
- The following groups:
    - Application: Contains the main navigation items. The items are now rendered using the `ApplicationMenuItems` component in `src/components/ApplicationMenuItems.tsx`, making it easier to add or remove items.
    - Administración: Contains items related to administration tasks, such as managing users and roles.
    - Configuración: Contains items related to application settings, such as general settings and appearance.

---

Última actualización: 21/4/2025, 10:50:00 p. m. (America/Bogota, UTC-5:00)

-   `SignupForm.tsx`: Implementa un formulario de varios pasos con validación utilizando el hook `useFormValidation`.
-   `SigninForm.tsx`: Implementa un formulario con validación utilizando el hook `useFormValidation`.
