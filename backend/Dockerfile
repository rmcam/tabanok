# Etapa 1: build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar lockfile desde raíz del monorepo y package.json del backend
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY backend/package.json ./package.json

RUN npm install -g pnpm && pnpm install --no-frozen-lockfile --filter backend...

# Copiar solo el código fuente del backend
COPY backend/src ./src
COPY backend/tsconfig.json ./tsconfig.json
COPY backend/tsconfig.build.json ./tsconfig.build.json
COPY backend/nest-cli.json ./nest-cli.json

RUN pnpm --filter backend build

# Etapa 2: producción
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
