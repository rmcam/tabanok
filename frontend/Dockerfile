# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar lockfile global y package.json del frontend
COPY pnpm-lock.yaml ./
COPY frontend/package.json ./

# Instalar pnpm y dependencias del frontend
RUN npm install -g pnpm \
  && pnpm install --filter frontend --no-frozen-lockfile

# Copiar el código fuente del frontend
COPY frontend ./

# Build del frontend
RUN pnpm --filter frontend build

# Etapa de producción
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g pnpm

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --prod --filter frontend --no-frozen-lockfile

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["pnpm", "start"]
