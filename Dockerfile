FROM node:20-alpine as builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --ci --force

COPY . .
RUN npm run build

FROM node:20-alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start"]