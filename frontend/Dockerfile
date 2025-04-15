# Etapa de build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY frontend/package.json ./frontend/package.json
COPY frontend/tsconfig.json ./frontend/tsconfig.json
COPY frontend/tsconfig.app.json ./frontend/tsconfig.app.json
COPY frontend/tsconfig.node.json ./frontend/tsconfig.node.json
COPY frontend/vite.config.ts ./frontend/vite.config.ts
COPY frontend/index.html ./frontend/index.html
COPY frontend/src ./frontend/src
COPY frontend/public ./frontend/public

RUN npm install -g pnpm && pnpm install --no-frozen-lockfile
RUN pnpm --filter frontend build

# Etapa de producción: nginx para servir archivos estáticos
FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/frontend/dist .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
