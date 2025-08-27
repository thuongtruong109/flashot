<div align="center">

<picture>
    <source media="(prefers-color-scheme: dark)" srcset="./public/banner_dark.png">
    <img alt="Line banner" src="./public/banner_light.png">
</picture>

![CI status](https://img.shields.io/github/actions/workflow/status/thuongtruong109/flashot/ci.yml?branch=main&label=ci&logo=github&style=flat&colorA=080f12&colorB=1fa669)
[![Npm version](https://img.shields.io/npm/v/flashot?style=flat&label=version&colorA=080f12&colorB=1fa669&logo=npm)](https://npmjs.com/package/flashot)
[![Npm downloads](https://img.shields.io/npm/dm/flashot?style=flat&logo=npm&colorA=080f12&colorB=1fa669)](https://npmjs.com/package/flashot)
[![JSDocs](https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&logo=javascript&colorA=080f12&colorB=1fa669)](https://www.jsdocs.io/package/vite-unbundled)
![Code size](https://img.shields.io/github/languages/code-size/thuongtruong109/flashot?style=flat&logo=bun&colorA=080f12&colorB=1fa669)
[![License](https://img.shields.io/github/license/thuongtruong109/flashot.svg?style=flat&colorA=080f12&colorB=1fa669)](https://github.com/antfu/vite-unbundled/blob/main/LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-1fa669?logo=githubsponsors&labelColor=080f12)](https://github.com/sponsors/thuongtruong109)

Flashot is the **blazing-fast image generation tool** for code snippets, designed for flawless experience and speed.

</div>

<div align="center">

**Super fast:** (generated in **~135ms**)

  <img src="./test/.snapshot/demo.webp" alt="Example output" />
</div>

## ✨ Features

- 💻 **Inline code support:** Easily convert inline code snippets to images
- 🌐 **URL support:** Fetch code snippets directly from URLs
- 🎨 **Customizable styles:** Choose from various options to match your style
- 🖼️ **High-quality output:** Generates crisp and clear images which keep the original code's formatting intact
- ⚡ **Blazing fast:** Optimized for speed, ensuring quick image generation
- 🛠️ **Easy to use:** Easy to integrate into your projects with a simple API
- 🪓 **Multi-format support:** Generate images in various formats (PNG, JPEG, WebP)
- 🔷 **TypeScript support:** Fully typed for better developer experience
- 🔍 **Extensive testing:** Thoroughly tested with a comprehensive suite of unit tests
- 🔋 **Easy integration:** Simple API for seamless integration into your projects
- 📦 **Lightweight:** Minimal dependencies to keep your project lean
- 📏 **Line numbers:** Support for displaying & customizing line numbers
- 🗂️ **Cache management:** Efficiently handles caching for improved performance (render, tokens, sizes, fonts)

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

## 🪔 Usage Example

##### For inline code

```js
import { writeFile } from "node:fs/promises";
import { codeToImg } from "flashot";

const buffer = await codeToImg('console.log("hello, world!");', {
  /* add more options*/
});
await writeFile("output.webp", buffer);
```

##### For url has raw content

```js
import { writeFile } from "node:fs/promises";
import { urlToImg } from "flashot";

const buffer = await urlToImg(
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  {
    /* add more options*/
    format: OutputFormat.Png,
  }
);
await writeFile("output.png", buffer);
```

Then you can use the `buffer` to display the image or send it in a response.

## ⚙️ API Options (default is not needed)

```js
const defaultOptions = {
  lang: "ts", // default is javascript
  theme: "ayu-dark", // default is github-dark
  font: "https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2", // default is bunny.net/jetbrains-mono.
  format: OutputFormat.Png, // default is OutputFormat.Webp (options: OutputFormat.Png, OutputFormat.Jpeg, OutputFormat.Webp)
  quality: 100, // default is 100 (1-100), only applies to JPEG formats
  width: 800, // default is system's width
  height: 400, // default is system's height
  bg: "transparent", // default is system's background
  gap: 1, // gap between lines (default is 1)
  style: {
    borderRadius: 10, // default is 8
    padding: 30, // default is 25
    // ... more custom styles
  },
  lineNumbers: {
    enabled: false,
    startFrom: 1,
    color: "#7b7f8b",
    marginRight: 0,
  },
};
```

| Option        | Description                                                                              | Default                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `lang`        | Code language ([supported](https://shiki.style/languages))                               | `"js"`                                                                                                 |
| `theme`       | Rendering theme ([supported](https://shiki.style/themes))                                | `"github-dark"`                                                                                        |
| `font`        | Font for rendering (URL or ArrayBuffer)                                                  | [`Jetbrains Mono`](https://fonts.bunny.net/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2) |
| `format`      | Output image format (`OutputFormat.Png`, `OutputFormat.Jpeg`, `OutputFormat.Webp`)       | `OutputFormat.Webp`                                                                                    |
| `quality`     | Image quality (1-100) for JPEG formats                                                   | `100`                                                                                                  |
| `width`       | Image width                                                                              | System default                                                                                         |
| `height`      | Image height                                                                             | System default                                                                                         |
| `bg`          | Background color                                                                         | Theme's background                                                                                     |
| `gap`         | Gap between lines                                                                        | `1`                                                                                                    |
| `style`       | Additional container styles ([docs](https://takumi.kane.tw/docs/deep-dives/stylesheets)) | `{ borderRadius: 8, padding: 25 }`                                                                     |
| `lineNumbers` | Line number styles                                                                       | `{ enabled: false, color: '#7b7f8b', marginRight: 0 }`                                                 |

## 📚 Technologies

- ⚡ **[Bun](https://bun.sh)** - Fast all-in-one JavaScript runtime and toolkit
- 🏗️ **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development with strict mode enabled
- 📦 **[Vite](https://vitejs.dev/)** - Lightning-fast build tool with optimized bundling
- 🧪 **[Vitest](https://vitest.dev/)** - Blazing fast unit testing & interactive test UI framework
- 🎨 **[Shiki](https://github.com/shikijs/shiki)** and **[Takumi](https://github.com/kane50613/takumi)** - Render container highlight
- 📝 **[Biome](https://biomejs.dev/)** - Fast formatter and linter for consistent code style
- 🚀 **Dual Module Support** - ESM and CommonJS output with proper type definitions
- 🔥 **[ESLint](https://eslint.org/)** - Advanced linting with TypeScript and SonarJS rules
- 🧩 **[Lefthook](https://github.com/evilmartians/lefthook)** and **[Commitlint](https://commitlint.js.org/)** - Automated Git hooks for linting and formatting
- 🛠️ **[Tinybench](https://github.com/tinybench/tinybench)** - A tiny benchmarking library for measuring performance

## 🧪 Code Coverage

| File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| --------- | ------- | -------- | ------- | ------- | ----------------- |
| All files | 99.17   | 81.25    | 100     | 99.17   |
| core.ts   | 100     | 100      | 100     | 100     |
| index.ts  | 100     | 100      | 100     | 100     |
| shared.ts | 100     | 100      | 100     | 100     |
| utils.ts  | 98.36   | 78.57    | 100     | 98.36   | 67                |

![Coverage](./public/coverage.png)

## 🏁 Benchmarks

| No  | Task name               | Latency avg (ns)   | Latency med (ns)      | Throughput avg (ops/s) | Throughput med (ops/s) | Samples |
| --- | ----------------------- | ------------------ | --------------------- | ---------------------- | ---------------------- | ------- |
| 0   | small code (10 lines)   | 201215722 ± 4.80%  | 186069100 ± 8369100   | 5 ± 3.54%              | 5 ± 0                  | 64      |
| 1   | medium code (100 lines) | 349906927 ± 6.43%  | 317186800 ± 6326800   | 3 ± 3.95%              | 3 ± 0                  | 64      |
| 2   | large code (1000 lines) | 1726190939 ± 0.46% | 1715535300 ± 13138650 | 1 ± 0.45%              | 1 ± 0                  | 64      |

## 🤝 Contributing

Contributions are welcome! This starter kit uses:

- Automated code formatting and linting
- Comprehensive test coverage requirements

Please ensure all tests pass and code quality checks succeed before submitting a PR.

> Check [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for more information.

## 📄 License

[MIT License](./LICENSE) - [Tran Nguyen Thuong Truong](mailto:thuongtruongofficial@gmail.com)

<!-- https://github.com/pi0/shiki-image -->
<!-- https://github.com/bunup/bunup -->
<!-- https://github.com/pedro199288/bun-library-starter -->
<!-- https://stackblitz.com/github/rolldown/tsdown-starter-stackblitz?file=tsconfig.json -->
