<div align="center">

<picture>
    <source media="(prefers-color-scheme: dark)" srcset="./public/banner_dark.png">
    <img alt="Line banner" src="./public/banner_light.png">
</picture>

![CI status](https://img.shields.io/github/actions/workflow/status/thuongtruong109/flashot/ci.yml?branch=main&label=ci&logo=github&style=flat&colorA=080f12&colorB=1fa669)
[![Npm version](https://img.shields.io/npm/v/flashot?style=flat&label=version&colorA=080f12&colorB=1fa669&logo=npm)](https://npmjs.com/package/flashot)
[![Npm downloads](https://img.shields.io/npm/dm/flashot?style=flat&colorA=080f12&colorB=1fa669)](https://npmjs.com/package/flashot)
![Code size](https://img.shields.io/github/languages/code-size/thuongtruong109/flashot?style=flat&colorA=080f12&colorB=1fa669)
[![JSDocs](https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669)](https://www.jsdocs.io/package/vite-unbundled)
[![License](https://img.shields.io/github/license/thuongtruong109/flashot.svg?style=flat&colorA=080f12&colorB=1fa669)](https://github.com/antfu/vite-unbundled/blob/main/LICENSE)

Flashot is the **blazing-fast image generation tool** for code snippets, designed for flawless experience and speed.

</div>

<div align="center">

**Super fast:** (generated in **~135ms**)

  <img src="./test/.snapshot/demo.png" alt="Example output" />
</div>

## 📦 Installation

```bash
bun install flashot
```

```bash
npm install flashot
```

```bash
yarn add flashot
```

```bash
pnpm add flashot
```

## ✨ Usage Example

```js
import { writeFile } from "node:fs/promises";
import { c2i } from "flashot";

const buffer = await c2i('console.log("hello, world!");');
await writeFile("image.png", buffer);
```

## ⚙️ API Options (default is not needed)

```js
const defaultOptions = {
  lang: "ts", // default is javascript
  theme: "ayu-dark", // default is dracula
  font: "https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2", // custom font
  width: 800, // default is auto
  height: 400, // default is auto
  backgroundColor: "transparent", // default is theme's background
  gap: 1, // gap between lines (default is 1)
  style: {
    borderRadius: 10, // default is 8
    padding: 30, // default is 25
    // ... more custom styles
  },
};

const buffer = await c2i('console.log("hello, world!");', defaultOptions);
```

| Option   | Description                                                                              | Default              |
| -------- | ---------------------------------------------------------------------------------------- | -------------------- |
| `lang`   | Code language ([supported](https://shiki.style/languages))                               | `"typescript"`       |
| `theme`  | Rendering theme ([supported](https://shiki.style/themes))                                | `"github-dark"`      |
| `style`  | Additional container styles ([docs](https://takumi.kane.tw/docs/deep-dives/stylesheets)) | `{}`                 |
| `font`   | Font for rendering (URL or ArrayBuffer)                                                  | System default       |
| `width`  | Image width                                                                              | `(columns + 2) * 10` |
| `height` | Image height                                                                             | `(lines + 2) * 20`   |

## 🚀 Features

- **[Bun](https://bun.sh)** - Fast all-in-one JavaScript runtime and toolkit
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development with strict mode enabled
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool with optimized bundling
- **[Vitest](https://vitest.dev/)** - Blazing fast unit testing framework
- **[shiki](https://github.com/shikijs/shiki)** and **[takumi](https://github.com/kane50613/takumi)**
- **Dual Module Support** - ESM and CommonJS output with proper type definitions
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter for consistent code style
- **[ESLint](https://eslint.org/)** - Advanced linting with TypeScript and SonarJS rules
- **Git Hooks** - Automated quality checks via Lefthook and Commitlint
- **Watch Mode** - Hot rebuild during development
- **Test Coverage** - Built-in coverage reporting with v8
- **UI Testing** - Interactive test UI with `@vitest/ui`
- **Pre-commit Hooks** - Automatic linting and formatting on commit
- **Pre-push Validation** - Full build and test suite before pushing

## 🧪 Code Coverage

| File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| --------- | ------- | -------- | ------- | ------- | ----------------- |
| All files | 98.52   | 87.5     | 100     | 98.52   |
| index.ts  | 98.52   | 87.5     | 100     | 98.52   | 65                |

![Coverage](./public/coverage.png)

## 🤝 Contributing

Contributions are welcome! This starter kit uses:

- Automated code formatting and linting
- Comprehensive test coverage requirements

Please ensure all tests pass and code quality checks succeed before submitting a PR.

> Check [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for more information.

## 📄 License

[MIT License](./LICENSE) - [Tran Nguyen Thuong Truong](mailto:thuongtruongofficial@gmail.com)

<!-- https://github.com/bunup/bunup -->
<!-- https://github.com/pedro199288/bun-library-starter -->
