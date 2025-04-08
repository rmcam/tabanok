# Frontend Tabanok

Aplicación frontend construida con **Next.js 15**, **React 19**, **Tailwind CSS** y **TypeScript**.

## Estructura del proyecto

```
frontend/
├── app/                     # Rutas Next.js agrupadas
│   ├── (auth)/              # Rutas públicas de autenticación
│   ├── (protected)/         # Rutas protegidas para usuarios autenticados
│   ├── (admin)/             # Rutas administrativas
│   ├── layout.tsx           # Layout raíz
│   └── ...                  # Otras páginas y layouts
│
├── components/              # Componentes React reutilizables
│   ├── ui/                  # Componentes UI genéricos (botones, inputs, modales, formularios)
│   ├── auth/                # Componentes relacionados con autenticación
│   ├── gamification/        # Componentes de gamificación
│   ├── profile/             # Perfil de usuario
│   ├── layout/              # Layouts, barras laterales, navegación
│
├── hooks/                   # Hooks personalizados
│   ├── auth/                # Hooks relacionados con autenticación
│   ├── gamification/        # Hooks de gamificación
│
├── lib/                     # Funciones y utilidades
│   ├── auth/                # Lógica de autenticación
│   ├── gamification/        # Lógica de gamificación
│
├── actions/                 # Acciones del servidor (Server Actions)
│   ├── auth/                # Acciones relacionadas con autenticación
│   ├── gamification/        # Acciones de gamificación
│
├── docs/                    # Documentación del frontend
│
├── public/                  # Archivos estáticos
│
├── styles/                  # Estilos globales (si aplica)
│
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Tecnologías principales

- **Next.js 15** con App Router
- **React 19**
- **Tailwind CSS** para estilos
- **TypeScript**
- **NextAuth.js** para autenticación
- **Zod** para validaciones
- **React Hook Form** para formularios

## Scripts

Iniciar el servidor de desarrollo:

```bash
pnpm dev
# o
npm run dev
# o
yarn dev
# o
bun dev
```

Abrir en [http://localhost:3000](http://localhost:3000).

## Notas

- La estructura está pensada para escalar y mantener separadas las funcionalidades por dominio.
- Los imports usan alias `@/` configurado en `tsconfig.json`.
- Consultar la carpeta `docs/` para más detalles sobre flujos, arquitectura y pendientes.
