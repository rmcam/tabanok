# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY ./frontend/pnpm-lock.yaml ./
COPY ./frontend/package.json ./

# Instalar pnpm y dependencias
RUN npm install -g pnpm \
  && pnpm install --frozen-lockfile

# Copiar el resto del código del frontend
COPY ./frontend ./

# Build de Next.js
RUN pnpm build

# Etapa de producción
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g pnpm

# Copiar package.json y pnpm-lock.yaml para instalar solo dependencias de producción
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --prod --frozen-lockfile

# Copiar la build y archivos necesarios
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["pnpm", "start"]
