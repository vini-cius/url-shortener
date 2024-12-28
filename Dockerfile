FROM node:22.12.0-slim

USER node

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /home/node/app

COPY package*.json ./
COPY ./prisma prisma

RUN pnpm install

COPY . .

RUN npx prisma generate

CMD [ "pnpm", "start" ]
