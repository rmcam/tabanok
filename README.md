# 🌿 Proyecto Tabanok — Monorepo

Repositorio **monorepo** para **Tabanok**, plataforma de revitalización lingüística con:

- 🚀 **Backend:** NestJS + PostgreSQL
- 🎨 **Frontend:** React + Vite
- 🐳 **Docker** para entorno unificado y reproducible

---

## 📁 Estructura del proyecto

```
/
├── backend/          # API NestJS, base de datos, seeders
├── frontend/         # App React + Vite
├── packages/         # Paquetes compartidos
├── docs/             # Documentación
├── .env.example      # Variables de entorno (plantilla)
├── docker-compose.yml
├── README.md
└── ...
```

---

## ⚙️ Instalación rápida

Requisitos: [pnpm](https://pnpm.io/) y Docker

```bash
pnpm install
```

---

## 🐳 Levantar todo con Docker

Levanta **base de datos**, **backend** y **frontend** con un solo comando:

```bash
docker-compose up --build
```

- La base de datos estará accesible en **localhost:5433**
- Las credenciales y configuración están en el archivo `.env` (usa `.env.example` como plantilla)

---

## 🗄️ Conexión a PostgreSQL (ej. pgAdmin)

- **Host:** `localhost`
- **Puerto:** `5433`
- **Usuario, contraseña y base:** consultar `.env`
- **SSL mode:** `disable`

---

## 🧑‍💻 Comandos útiles (sin Docker)

- Backend en modo desarrollo:

```bash
pnpm --filter backend dev
```

- Frontend en modo desarrollo:

```bash
pnpm --filter frontend dev
```

- Ejecutar tests:

```bash
pnpm -r test
```

- Lint:

```bash
pnpm -r lint
```

- Build:

```bash
pnpm -r build
```

---

## ➕ Agregar dependencias

- Solo backend:

```bash
pnpm add <paquete> --filter backend
```

- Solo frontend:

```bash
pnpm add <paquete> --filter frontend
```

- Dependencia compartida:

```bash
pnpm add -D <paquete>
```

---

## 📚 Documentación

Revisa la carpeta `docs/` para:

- Arquitectura
- Estado del proyecto
- Instrucciones de desarrollo

---

## 📝 Licencia

[Pendiente]
