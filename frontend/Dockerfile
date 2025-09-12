FROM node:22-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json ./
RUN npm install

FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM nginx:alpine AS runner

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80