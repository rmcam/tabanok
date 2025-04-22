# Instrucciones para Desarrollo en Tabanok

---

## Requisitos previos

- Node.js >= 18.19.0
- npm >= 8.x
- Docker (opcional, para base de datos y entorno unificado)

---

## Instalación

```bash
pnpm install
```

---

## Levantar entorno de desarrollo

- **Backend:**

  ```bash
  pnpm run --filter backend dev
  ```

- **Frontend:**

  ```bash
  pnpm run --filter frontend dev
  ```

  (Acceder en http://localhost:3000)

  **Nota:** Si estás ejecutando el frontend localmente, asegúrate de que la variable `VITE_API_URL` en el archivo `.env` esté configurada como `http://localhost:8000`.

- **Base de datos, backend y frontend con Docker Compose:**

  ```bash
  docker-compose up --build
  ```

  - La base de datos estará accesible en **localhost:5433**
  - Las credenciales y configuración se encuentran en el archivo `.env`
  - Para conectarte con pgAdmin, usa **SSL mode: disable** y base de mantenimiento según `.env`

---

## Testing

- Ejecutar todos los tests:

  ```bash
  pnpm run test
  ```

- Cobertura:

  ```bash
  pnpm run --filter backend test:cov
  ```

---

## Linting y formateo

- Lint en todos los paquetes:

  ```bash
  npm run lint
  ```

- Formatear con Prettier:

  ```bash
  npm exec prettier --write .
  ```

---

## Buenas prácticas generales

- Centralizar dependencias y configuración en la raíz.
- Mantener documentación actualizada en `docs/`.
- Escribir y mantener tests con buena cobertura.
- Usar commits claros y descriptivos.
- Revisar advertencias y actualizar dependencias obsoletas.
- Sincronizar con el equipo antes de cambios mayores.
- Usar el paquete común para tipos y utilidades compartidas.

## Variables de Entorno

Consultar la documentación del backend y el archivo `docs/Codigos.md` para más detalles sobre las variables de entorno.

---

## Comandos para Ejecutar Migraciones

```bash
pnpm typeorm migration:run -d src/data-source.ts
```

---

Última actualización: 20/4/2025, 2:00:00 a. m. (America/Bogota, UTC-5:00)
