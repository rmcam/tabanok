# Arquitectura del Monorepo Tabanok

---

## Estructura general

```
/
├── backend/          # API REST con NestJS, conexión a base de datos, lógica de negocio
├── frontend/         # Aplicación React + Vite, UI, autenticación, consumo API
├── packages/common/  # Tipos y utilidades compartidas
├── docs/             # Documentación centralizada
├── package.json      # Dependencias y scripts comunes
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## Flujo general

- **Frontend** consume la API del **backend** para autenticación, datos y funcionalidades.
- **Backend** se conecta a la base de datos PostgreSQL y expone endpoints REST.
- **Paquete común** comparte tipos TypeScript y utilidades entre backend y frontend.
- **Docker Compose** levanta base de datos, backend y frontend con un solo comando.

---

## Tecnologías principales

- **Backend:** NestJS, TypeORM, PostgreSQL (en Docker, puerto 5433, configuración personalizada), JWT, Docker
- **Frontend:** React + Vite, TailwindCSS, Auth.js, react-i18next
- **Monorepo:** pnpm workspaces, lockfile único, variables centralizadas en `.env`
- **Testing:** Jest, Testing Library
- **Linting/Formateo:** ESLint, Prettier unificados
- **Internacionalización:** react-i18next
- **Validación:** Zod, LanguageTool (propuesta)

---

## Mejoras recientes

- Centralización de dependencias y configuración.
- Creación de paquete común para tipos y utilidades.
- Unificación de Docker Compose.
- Configuración base de TypeScript.
- Documentación centralizada y actualizada.

---

## Pendientes y mejoras futuras

- Mejorar cobertura de tests.
- Configurar CI/CD.
- Integrar control ortográfico y gramatical avanzado.
- Mejorar accesibilidad según WCAG 2.1.
- Automatizar despliegues.
