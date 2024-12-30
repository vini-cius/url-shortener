FROM node:22 as builder

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN pnpm i

COPY . .

RUN pnpm run build

ARG SENTRY_ENABLED

ENV SENTRY_ENABLED=${SENTRY_ENABLED}

RUN echo $SENTRY_ENABLED

RUN if [ "$SENTRY_ENABLED" = "true" ]; then pnpm run sentry:sourcemaps; fi

FROM node:22

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000

CMD ["pnpm", "run", "start:migrate:prod"]
