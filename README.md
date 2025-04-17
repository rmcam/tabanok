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
- Flujos de usuario
- Accesibilidad
- Gamificación
- Validación lingüística


---

## 🚀 Despliegue en Render.com

### Configuración recomendada para monorepo

- **Root Directory:** `.`
- **Docker Build Context Directory:** `.`
- **Dockerfile Path:** `backend/Dockerfile`
- **Docker Command:** *(vacío, usa el del Dockerfile)*
- **Secret Files:** sube tu `.env` si quieres
- **Health Check Path:** `/api/health` (o el que uses)
- **Auto-Deploy:** activado

Render usará todo el monorepo como contexto, permitiendo que el Dockerfile copie cualquier archivo necesario.

### Migraciones automáticas

El backend está configurado para ejecutar automáticamente las migraciones de la base de datos al iniciar, sin necesidad de comandos manuales ni pasos de pago.

### Solución al error de conexión a la base de datos

Se ha resuelto un error de conexión a la base de datos en el backend. El error "client password must be a string" se solucionó extrayendo la contraseña de la `DATABASE_URL` y pasándola como una opción separada a TypeORM.

### Adición del middleware `serve-favicon`

Se ha agregado el middleware `serve-favicon` al backend para servir el archivo `favicon.ico`. Se ha creado el directorio `public` y se ha agregado un archivo `favicon.ico` por defecto a este directorio.

### Variables de entorno

Puedes subir un archivo `.env` como Secret File o configurar variables manualmente en Render.


## 📝 Licencia

MIT License

---

##  Contribuciones

Las contribuciones son bienvenidas. Por favor, revisa la guía de contribuciones en la carpeta `docs/`.
