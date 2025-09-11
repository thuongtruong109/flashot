# Use the official Bun image as base for better performance
FROM oven/bun:1 as base

# Set working directory
WORKDIR /app

# Install system dependencies for font handling and image processing
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    fonts-dejavu-core \
    fontconfig \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Create production stage
FROM oven/bun:1-slim as production

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    fonts-dejavu-core \
    fontconfig \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy built application and dependencies from base stage
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Create non-root user for security
RUN groupadd -r flashot && useradd -r -g flashot flashot
RUN chown -R flashot:flashot /app
USER flashot

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD bun --version && curl -f http://localhost:8080/health || exit 1

# Start the application
CMD ["bun", "run", "dist/index.js"]
