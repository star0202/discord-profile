FROM node:19-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm i --frozen-lockfile

COPY tsconfig.json ./
COPY src src

RUN pnpm build

FROM node:19-alpine

WORKDIR /app

COPY --from=builder /app ./

RUN corepack enable

CMD ["pnpm", "start"]
