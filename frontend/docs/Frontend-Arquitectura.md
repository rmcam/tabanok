## Componente HomePage

El componente `HomePage` es la página principal de la plataforma Tabanok. Muestra las características de la plataforma, testimonios e información de contacto.

### Secciones

*   **Sección Hero:** Muestra un título, descripción, imagen de fondo y botones de acción.
*   **Sección de Características:** Destaca las principales características de la plataforma (Lecciones Interactivas, Gamificación, Seguimiento de Progreso) con iconos y descripciones.
*   **Sección de Lecciones Destacadas:** Muestra una lista de lecciones destacadas con enlaces para verlas y un botón para ver todas las lecciones.
*   **Sección de Testimonios:** Muestra testimonios de usuarios.
*   **Sección de Preguntas Frecuentes:** Muestra una lista de preguntas frecuentes y sus respuestas.
*   **Sección de Contacto:** Muestra un formulario de contacto.
*   **Footer:** Muestra un texto de copyright.
*   **Integración de Modales de Autenticación:** Utiliza el componente `AuthModals` para mostrar los modales de inicio de sesión, registro y recuperación de contraseña. El botón "Comienza ahora" en la sección Hero está configurado para abrir directamente el modal de registro.
*   Se ha modificado la lógica en `HeroSection.tsx` para que el botón "Comienza ahora" (y otros botones con `action='openSignupModal'`) utilicen la propiedad `action` en lugar del texto del `label` para desencadenar la apertura del modal de registro, mejorando la flexibilidad y mantenibilidad. Los disparadores por defecto de `AuthModals` están ocultos (`showDefaultTriggers={false}`).

### Mejoras recientes

*   Se eliminó la sección FAQ duplicada.
*   Se cambió el fondo de la sección de contacto a blanco.
*   Se cambió el color del enlace de contacto a `k-azul-500`.
*   Se aumentó el padding vertical del footer a `py-2`.
*   Se mejoró la responsividad de las imágenes en la sección de Lecciones Destacadas.
*   Se centralizó la lógica de las tarjetas de la sección Hero.
*   Se utilizó un componente reutilizable para las tarjetas de características.
*   Se mejoró la accesibilidad de las imágenes en la sección de Lecciones Destacadas.
*   Se implementó la funcionalidad de "Ver todas las lecciones".
*   Se agregaron imágenes a los testimonios.
*   Se ha añadido la funcionalidad de autoplay al carrusel de testimonios utilizando el plugin `embla-carousel-autoplay`.
*   Se corrigió la estructura del carrusel principal para que el enlace no envuelva toda la tarjeta `HeroSection`, permitiendo que los botones internos sean interactivos.
*   Se ajustó el diseño de la sección de lecciones destacadas para utilizar una cuadrícula responsiva en lugar de desplazamiento horizontal en pantallas pequeñas.
*   Se corrigió un error de tipo en `heroCards.ts` relacionado con la propiedad `action` en los datos de las tarjetas.
*   Se ha asegurado la consistencia de la estructura de datos en `heroCardsData` añadiendo el campo `buttons: []` a todos los elementos.
*   Se ha simplificado la lógica de color de los indicadores del carrusel para usar un color para el indicador activo y otro para los inactivos.
*   Se ha eliminado el borde amarillo de las tarjetas de testimonios.
*   Se ha ajustado el espaciado vertical entre las secciones principales de la página a `py-12`.
*   Se ha intentado corregir el comportamiento del carrusel para evitar cambios de tamaño al añadir una altura fija (`h-[500px]`) al contenedor del carrusel y asegurar que los elementos internos ocupen esa altura (`h-full`).
*   Se ha creado un nuevo componente `FeaturedLessonCard` (`src/components/home/components/FeaturedLessonCard.tsx`) para encapsular la lógica de visualización de las tarjetas de lecciones destacadas y se ha integrado en `HomePage.tsx`.

### Mejoras de Diseño y Estilo (Multicolor Kamëntsá)

Se han aplicado mejoras de diseño y estilo en `HomePage.tsx` y `HeroSection.tsx` para incorporar elementos multicolor inspirados en el arte Kamëntsá. Esto incluye:

*   Colores de iconos y bordes en las tarjetas de características.
*   Colores de indicadores del carrusel principal (activo e inactivos).
*   Color del título de las lecciones destacadas al pasar el ratón.
*   Borde de color en las tarjetas de testimonios.
*   Superposición de color en la imagen de fondo de la sección principal.
*   Borde de color en la imagen principal de la sección principal.

### Carrusel Interactivo

Se ha implementado un carrusel interactivo en la HeroSection para mostrar diferentes tarjetas de `heroCardsData` con transiciones suaves y controles de navegación. El carrusel incluye indicadores interactivos que permiten al usuario navegar directamente a una tarjeta específica.

*   Se añadió un efecto de "card hover" a las Lecciones Destacadas para hacerlas más interactivas.
*   Se implementó un efecto de desplazamiento suave al hacer clic en los enlaces "Ver lección" y "Ver todas las lecciones" utilizando `react-router-hash-link`.
*   Se centralizó la lógica de las tarjetas de la sección Hero, obteniendo los datos directamente desde `heroCards.ts`.

### Carga Dinámica de Lecciones Destacadas

Se ha implementado la carga dinámica de las lecciones destacadas desde la API del backend. El componente `HomePage` utiliza el hook `useEffect` para realizar una solicitud a la API y obtener las lecciones destacadas. La URL de la API se obtiene desde la variable de entorno `VITE_API_URL`.
*   Se eliminó la dependencia del archivo JSON `public/heroCards.json`.
*   Se implementó una animación de aparición gradual (fade-in) al cargar la página.
*   Se agregó un efecto parallax a la sección del Hero (`src/components/home/components/HeroSection.tsx`).
    *   Se ajustó la opacidad del fondo negro para que la imagen sea más visible.
    *   Se alineó verticalmente el contenido del Hero Section para que esté centrado.
*   Se reemplazó el carrusel de testimonios con uno que tiene una animación de aparición gradual.
*   Se añadió un efecto de desplazamiento horizontal a la sección de "Lecciones Destacadas".
    *   Se añadió un espacio entre las tarjetas.
    *   Se aumentó el tamaño de la imagen y el texto.
*   Se modificaron los colores de los botones (`src/components/ui/button.tsx`) para que tengan un color más acorde a la paleta de colores de la cultura Kamëntsá.
*   Se alinearon los campos del formulario y se aumentó el tamaño del texto en `src/components/home/components/ContactForm.tsx`.

### Data Structures

*   `testimonials`: An array of objects containing user testimonials.
*   `featuredLessons`: An array of objects containing information about featured lessons.
*   `heroCardsData`: An array of objects containing information displayed in the hero carousel.

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
│   ├── context/   # Contexto de autenticación
│   │   └── authContext.ts # Contexto y tipo AuthContextType
│   │   └── authProvider.tsx # Proveedor AuthProvider
│   ├── hooks/     # Hooks React para autenticación (useAuthService, useAuth)
│   │   └── useAuthService.ts # Hook para el servicio de autenticación
├── styles/         # Estilos CSS
└── ...             # Otros archivos

public/             # Archivos estáticos
```

### Convenciones

- **Alias `@/`**: configurado en `vite.config.ts` para importar desde la raíz del frontend.
- **Componentes UI**: deben ser lo más genérico posible y ubicarse en `components/ui/`.
- **Componentes específicos**: se agrupan por dominio funcional.
- **Hooks**: generales o específicos, organizados en subcarpetas. El hook `useAuth` ahora se exporta desde el contexto de autenticación.
- **Lógica de negocio**: en `lib/`, separada por dominio.

### Ventajas

- Facilita la escalabilidad y el trabajo en equipo.
- Permite identificar rápidamente dónde agregar o modificar funcionalidades.
- Separa claramente UI genérica de lógica y componentes específicos.

---

## Integración con Backend

El frontend consume el backend mediante un **cliente Axios centralizado** ubicado en `src/lib/api.ts`.

### Hooks para consumir el backend

- `src/auth/hooks/useAuth.ts` (a través del hook `useAuth`) — Autenticación
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

Última actualización: 23/4/2025, 2:28:00 p. m. (America/Bogota, UTC-5:00)

-   `SignupForm.tsx`: Implementa un formulario de varios pasos con **indicador de progreso** y **validación por pasos**. Utiliza el hook `useFormValidation`, incluye **feedback visual de error** en los inputs, y ahora utiliza el hook `useAuth` para realizar la operación de registro y manejar la navegación. Se ha refactorizado para **eliminar estados locales redundantes** y utilizar el estado de carga del contexto (`signingUp`).
-   `SigninForm.tsx`: Implementa un formulario con validación utilizando el hook `useFormValidation`, incluye **feedback visual de error** en los inputs, y ahora utiliza el hook `useAuth` para realizar la operación de inicio de sesión y manejar la navegación. Se ha refactorizado para utilizar el estado de carga del contexto (`signingIn`).
-   `ForgotPasswordForm.tsx`: Implementa un formulario con validación básica, incluye **feedback visual de error** en el input, y ahora utiliza el hook `useAuth` para realizar la operación de recuperación de contraseña. Se ha refactorizado para utilizar el estado de carga del contexto (`requestingPasswordReset`).

---

Última actualización: 23/4/2025, 3:35:00 p. m. (America/Bogota, UTC-5:00)
