# --- Stage 1: build ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Генеруємо Prisma Client під час білду, а не в рантаймі
RUN npx prisma generate
RUN npm run build

# --- Stage 2: production ---
FROM node:20-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

# Prisma CLI потрібен у рантаймі для міграцій, тому ставимо його окремо
RUN npm install prisma --no-save

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma

EXPOSE 5000

# Перед стартом застосовуємо міграції, потім піднімаємо сервер
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/server.js"]
