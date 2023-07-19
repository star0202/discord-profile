FROM node:19-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm i

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
