FROM oven/bun:1 AS base

WORKDIR /app

RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    fonts-dejavu-core \
    fontconfig \
    && rm -rf /var/lib/apt/lists/*

COPY package.json bun.lockb* ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1-slim AS production

RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    fonts-dejavu-core \
    fontconfig \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

RUN groupadd -r flashot && useradd -r -g flashot flashot
RUN chown -R flashot:flashot /app
USER flashot

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD bun --version && curl -f http://localhost:8080/health || exit 1

CMD ["bun", "run", "dist/index.js"]
