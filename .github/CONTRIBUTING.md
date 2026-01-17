# Contributing to Flashot

Thank you for your interest in contributing! This guide covers setup, development, testing, building, and publishing.

## 🛠️ Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thuongtruong109/flashot.git
   cd flashot
   ```

2. **Install dependencies:**

   ```bash
   bun install
   # or
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure Git hooks (recommended):**

   ```bash
   bunx lefthook install
   ```

4. **Prerequisites for Desktop App (Tauri):**
   - [Node.js](https://nodejs.org/) (version 18 or higher)
   - [Rust](https://rustup.rs/) (latest stable)
   - [Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites)

## 🚀 Run

- **Start development server (watch mode):**

  ```bash
  bun run dev
  ```

- **Start Tauri development (desktop app):**
  ```bash
  bun run tauri dev
  ```

## 🧪 Test

- **Run all tests:**

  ```bash
  bun test
  ```

- **Interactive test UI:**

  ```bash
  bun test:ui
  ```

- **Coverage report:**
  ```bash
  bun test:coverage
  ```

## 🏁 Benchmark

```bash
bun bench
```

## 🏗️ Build

- **Build with tsdown (default):**

  ```bash
  bun run build
  ```

- **Build with Vite:**

  ```bash
  bun run build:vite
  ```

- **Build Tauri desktop app:**
  ```bash
  bun run tauri build
  ```

## 🧹 Lint & Format

- **Lint code:**

  ```bash
  bun run lint
  ```

- **Auto-fix lint issues:**

  ```bash
  bun run lint:fix
  ```

- **Biome checks:**

  ```bash
  bun run biome
  ```

- **Auto-fix Biome issues:**
  ```bash
  bun run biome:fix
  ```

## 📦 Publish

1. **Update version:**

   ```bash
   npm version patch|minor|major
   ```

2. **Build the library:**

   ```bash
   bun run build
   ```

3. **Publish to npm:**
   ```bash
   npm publish
   ```

## ✅ Quality Checks

- **Run all checks:**

  ```bash
  bun run check
  ```

- **Auto-fix all issues:**
  ```bash
  bun run check:fix
  ```

## 💡 Tips

- Ensure all tests and checks pass before submitting a PR.
- Follow code style enforced by Biome and ESLint.

## 🤝 Need Help?

Open an [issue](https://github.com/thuongtruong109/flashot/issues/new/choose), or [discussions](https://github.com/thuongtruong109/flashot/discussions/new/choose) on GitHub if you need assistance.
