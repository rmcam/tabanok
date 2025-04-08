# Monorepo Tabanok

Repositorio monorepo para el proyecto Tabanok, que incluye backend (NestJS) y frontend (Next.js).

---

## Estructura del monorepo

```
/
├── backend/          # API NestJS, base de datos, seeders
├── frontend/         # Aplicación Next.js
├── node_modules/     # Dependencias instaladas
├── package.json      # Dependencias y scripts comunes
├── pnpm-workspace.yaml
├── .gitignore
├── README.md
└── docs/             # Documentación adicional
```

---

## Instalación

Requiere **pnpm** (https://pnpm.io/)

```bash
pnpm install
```

---

## Comandos útiles

- Levantar backend en modo desarrollo:
  ```bash
  pnpm --filter backend dev
  ```
- Levantar frontend en modo desarrollo:
  ```bash
  pnpm --filter frontend dev
  ```
- Ejecutar tests en todos los paquetes:
  ```bash
  pnpm -r test
  ```
- Lint en todos los paquetes:
  ```bash
  pnpm -r lint
  ```
- Build de todos los paquetes:
  ```bash
  pnpm -r build
  ```

---

## Agregar dependencias

- **Solo para backend:**
  ```bash
  pnpm add <paquete> --filter backend
  ```
- **Solo para frontend:**
  ```bash
  pnpm add <paquete> --filter frontend
  ```
- **Dependencia compartida (raíz):**
  ```bash
  pnpm add -D <paquete>
  ```

---

## Documentación adicional

Ver la carpeta `docs/` para:
- Arquitectura
- Estado del proyecto
- Instrucciones de desarrollo

---

## Licencia

[Pendiente]
