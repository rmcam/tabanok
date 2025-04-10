# Instrucciones para Desarrollo en Tabanok

---

## Requisitos previos

- Node.js >= 18.19.0
- pnpm >= 8.x
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
  pnpm --filter backend dev
  ```

- **Frontend:**

  ```bash
  pnpm --filter frontend dev
  ```
  (Acceder en http://localhost:3000)

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
  pnpm -r test
  ```

- Cobertura:

  ```bash
  pnpm --filter backend test:cov
  ```

---

## Linting y formateo

- Lint en todos los paquetes:

  ```bash
  pnpm -r lint
  ```

- Formatear con Prettier:

  ```bash
  pnpm exec prettier --write .
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

## Objetivos actuales

- Mejorar accesibilidad del frontend.
- Integrar control ortográfico y gramatical avanzado.
- Mejorar cobertura de tests.
- Configurar CI/CD y automatizar despliegues.
