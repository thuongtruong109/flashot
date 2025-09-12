# Installation Guide

This guide covers all the different ways to install and use Flashot in your projects.

## 📦 NPM Package Installation

### Prerequisites

- Node.js 16+ or Bun 1.0+
- npm, yarn, pnpm, or bun package manager

### Install as a Dependency

Choose your preferred package manager:

```bash
# NPM
npm install flashot

# Yarn
yarn add flashot

# PNPM
pnpm add flashot

# Bun
bun install flashot
```

### Install as a Development Dependency

If you only need Flashot for development tasks:

```bash
# NPM
npm install --save-dev flashot

# Yarn
yarn add --dev flashot

# PNPM
pnpm add --save-dev flashot

# Bun
bun install --dev flashot
```

## 🛠️ CLI Installation

### Global Installation

Install Flashot globally to use it as a command-line tool:

```bash
npm install -g flashot
```

### Verify Installation

Check that the CLI is installed correctly:

```bash
flashot --version
flashot --help
```

### Local Project Installation

You can also install the CLI locally in a project:

```bash
npm install flashot
npx flashot --help
```

## 🌐 JSR (JavaScript Registry) Installation

Flashot is also available on JSR for modern JavaScript runtimes:

```bash
# Deno
deno add jsr:@thuongtruong109/flashot

# Node.js with JSR
npx jsr add @thuongtruong/flashot
```

## 🐳 Docker Installation

### Pull Pre-built Image

```bash
# From GitHub Container Registry (recommended)
docker pull ghcr.io/thuongtruong109/flashot-api:latest

# From Docker Hub
docker pull thuongtruong109/flashot-api:latest
```

### Run Container

```bash
docker run -p 8080:8080 ghcr.io/thuongtruong109/flashot-api:latest
```

### Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: "3.8"
services:
  flashot-api:
    image: ghcr.io/thuongtruong109/flashot-api:latest
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
```

Run with Docker Compose:

```bash
docker-compose up -d
```

## 🚀 Quick Start Verification

### Test NPM Package

Create a test file `test.js`:

```javascript
import { writeFile } from "node:fs/promises";
import { codeToImg } from "flashot";

const buffer = await codeToImg('console.log("Hello, Flashot!");');
await writeFile("test-output.webp", buffer);
console.log("✅ Image generated successfully!");
```

Run the test:

```bash
node test.js
```

### Test CLI

```bash
flashot code 'console.log("Hello, CLI!");' --output hello-cli.webp
```

### Test API (Docker)

```bash
curl -X POST http://localhost:8080/ \
  -H "Content-Type: application/json" \
  -d '{"code": "console.log(\"Hello, API!\");"}' \
  --output hello-api.webp
```

## 🔧 Environment-Specific Setup

### Node.js Projects

```json
{
  "dependencies": {
    "flashot": "^1.4.4"
  },
  "type": "module"
}
```

### TypeScript Projects

Flashot includes full TypeScript definitions:

```typescript
import { codeToImg, type ThemeOptions } from "flashot";

const options: ThemeOptions = {
  lang: "typescript",
  theme: "github-dark",
};

const buffer = await codeToImg("const hello = 'world';", options);
```

### Bun Projects

Flashot works seamlessly with Bun:

```javascript
import { codeToImg } from "flashot";

const buffer = await codeToImg('console.log("Hello from Bun!");');
await Bun.write("bun-output.webp", buffer);
```

### Deno Projects

```typescript
import { codeToImg } from "jsr:@thuongtruong109/flashot";

const buffer = await codeToImg('console.log("Hello from Deno!");');
await Deno.writeFile("deno-output.webp", buffer);
```

## ⚙️ Configuration

### Package.json Scripts

Add convenient scripts to your `package.json`:

```json
{
  "scripts": {
    "generate-images": "flashot code 'your-code-here' --output generated.webp",
    "doc-images": "node scripts/generate-doc-images.js"
  }
}
```

### Environment Variables

For API usage, you can set default options via environment variables:

```bash
export FLASHOT_THEME=github-dark
export FLASHOT_FORMAT=png
export FLASHOT_QUALITY=90
```

## 🔍 Troubleshooting

### Common Issues

#### Module Not Found

```bash
# Clear cache and reinstall
npm cache clean --force
npm install flashot
```

#### Permission Errors (Global CLI)

```bash
# Use npx instead of global install
npx flashot code 'console.log("test");'

# Or fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

#### TypeScript Errors

```bash
# Install type definitions
npm install --save-dev @types/node
```

### Version Compatibility

| Flashot Version | Node.js | Bun  | Deno  |
| --------------- | ------- | ---- | ----- |
| 1.4.x           | 16+     | 1.0+ | 1.30+ |
| 1.3.x           | 14+     | 0.8+ | 1.25+ |

## 📊 Bundle Size

Flashot is designed to be lightweight:

- **Package size**: ~2.1MB
- **Bundle size**: ~450KB (minified)
- **Tree-shakeable**: ✅ Yes
- **Dependencies**: Minimal, only essential packages

## 🔗 Next Steps

Now that you have Flashot installed, check out:

- [NPM Usage Guide](./npm-usage.md) - Learn how to use Flashot as a library
- [CLI Usage Guide](./cli-usage.md) - Master the command-line interface
- [Examples](./examples.md) - See practical examples and use cases
- [Configuration](./configuration.md) - Explore all available options

## 💡 Need Help?

- [GitHub Issues](https://github.com/thuongtruong109/flashot/issues) - Report bugs or request features
- [GitHub Discussions](https://github.com/thuongtruong109/flashot/discussions) - Ask questions and get help
- [Examples Repository](https://github.com/thuongtruong109/flashot/tree/main/examples) - Real-world examples
