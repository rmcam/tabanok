# Flujos de trabajo: Testing, Despliegue y Contribución

---

## Testing y cobertura

- Ejecutar todos los tests con:

  ```bash
  pnpm --filter backend test
  pnpm --filter frontend test
  ```

- Generar reporte de cobertura en backend:

  ```bash
  pnpm --filter backend test:cov
  ```

- Revisar el reporte generado en `coverage/` para identificar archivos con baja cobertura.

- Añadir tests para cubrir casos no probados, priorizando módulos críticos.

- Mantener una cobertura mínima del 80% en backend y frontend.

---

## Despliegue

- El pipeline CI/CD ejecuta lint, tests y build automáticamente en cada push a `main`.

- Para producción, se recomienda automatizar el despliegue con scripts o integraciones (ej. Vercel, Railway, servidores propios).

- Paso futuro: agregar scripts automáticos de despliegue en el pipeline.

---

## Contribución

- Crear una rama a partir de `main`.

- Realizar cambios y asegurarse que lint y tests pasen localmente.

- Generar cobertura y mejorarla si es posible.

- Crear un Pull Request describiendo claramente los cambios.

- Esperar revisión y merge.

---

## Próximos pasos

- Automatizar despliegues a producción.
- Mejorar cobertura de tests en el frontend.
- Documentar nuevas funcionalidades y mejoras.

Ver próximos pasos en [`docs/Pendientes.md`](./Pendientes.md).
- **Licencia:** MIT License
