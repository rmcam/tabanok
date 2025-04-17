# Arquitectura Frontend Tabanok

## Tecnologías principales

- **React**
- **Vite** como bundler
- **TypeScript**
- **Three.js** para animaciones 3D
- **Tailwind CSS** para estilos

## Organización general

El frontend está organizado por **dominios funcionales** y **tipos de componentes** para facilitar la escalabilidad y el mantenimiento.

### Estructura de carpetas

```
src/
├── App.tsx         # Componente principal
├── main.tsx        # Punto de entrada
├── assets/         # Archivos estáticos
├── components/     # Componentes React
│   ├── ui/         # Componentes UI genéricos y reutilizables (Atomic Design)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── auth/       # Componentes relacionados con autenticación
│   ├── gamification/   # Componentes de gamificación
│   ├── profile/    # Perfil de usuario
│   └── layout/     # Layouts, barras laterales, navegación
├── features/       # Funcionalidades específicas
│   ├── auth/       # Autenticación
│   │   ├── components/ # Componentes React
│   │   ├── hooks/      # Hooks React
│   │   └── lib/        # Lógica de negocio
│   ├── gamification/   # Gamificación
│   │   ├── components/ # Componentes React
│   │   ├── hooks/      # Hooks React
│   │   └── lib/        # Lógica de negocio
├── hooks/          # Hooks React genéricos
├── lib/            # Lógica de negocio genérica
├── styles/         # Estilos CSS
│   ├── components/ # Estilos para componentes
│   ├── base/       # Estilos base (reset, tipografía)
│   └── utils/      # Mixins, variables
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

## Notas para desarrollo

- Mantener la separación por dominios.
- Reutilizar componentes UI cuando sea posible.
- Documentar nuevos hooks, componentes y acciones.
- Actualizar esta documentación cuando se hagan cambios estructurales.

---

## Integración con Backend

El frontend consume el backend mediante un **cliente Axios centralizado** ubicado en:

- `src/lib/api.ts`

Este cliente:

- Usa la URL base configurada en `VITE_API_URL`.
- Añade automáticamente el token JWT a las peticiones, obteniéndolo del usuario almacenado en sessionStorage.
- Permite interceptar y manejar errores globales.

### Hooks para consumir el backend

Se han implementado hooks específicos para interactuar con los endpoints del backend, ubicados en:

- `src/features/auth/useAuth.ts` — signin, logout, estado autenticado
- `src/features/dictionary/hooks/useSearch.ts` — búsqueda de términos
- `src/features/dictionary/hooks/useEntry.ts` — detalle de una entrada
- `src/features/dictionary/hooks/useCategories.ts` — categorías
- `src/features/dictionary/hooks/useVariations.ts` — variaciones dialectales (ahora usa la ruta `/vocabulary`)
- `src/features/gamification/hooks/useGamification.ts` - Gamificación

### Componentes que usan estos hooks

- `src/features/auth/components/LoginForm.tsx` — formulario de login
- `src/features/dictionary/components/SearchView.tsx` — vista de búsqueda
- `src/features/dictionary/components/EntryDetail.tsx` — detalle de entrada
- `src/features/dictionary/components/CategoriesList.tsx` — listado de categorías
- `src/features/dictionary/components/VariationsList.tsx` — listado de variaciones dialectales
- `src/features/gamification/components/Leaderboard.tsx` - Leaderboard
- `src/features/gamification/components/CulturalAchievement.tsx` - Cultural Achievement
- `src/features/gamification/components/Mentor.tsx` - Mentor
- `src/features/gamification/components/MissionTemplate.tsx` - Mission Template (Funcionalidad de misiones eliminada)


### Flujo general

Los **hooks** gestionan la lógica de consumo del backend y estado.  
Los **componentes** usan estos hooks para mostrar datos y gestionar la UI.  
Esto permite una integración **modular, escalable y segura**.

### Buenas prácticas

- Crear hooks para cada nuevo endpoint o conjunto de endpoints
- Crear componentes que usen estos hooks para mostrar datos
- Mantener la separación por dominios funcionales
- Documentar cualquier nuevo hook o componente
- Actualizar esta sección cuando se agreguen nuevas integraciones

---

## Licencia

MIT License
