<div align="center">

<picture>
    <source media="(prefers-color-scheme: dark)" srcset="./public/banner_dark.png">
    <img alt="Line banner" src="./public/banner_light.png">
</picture>

![CI status](https://img.shields.io/github/actions/workflow/status/thuongtruong109/flashot/ci.yml?branch=main&label=ci&logo=github&style=flat&colorA=080f12&colorB=1fa669)
[![Npm version](https://img.shields.io/npm/v/flashot?style=flat&label=version&colorA=080f12&colorB=1fa669&logo=npm)](https://npmjs.com/package/flashot)
[![Npm downloads](https://img.shields.io/npm/dm/flashot?style=flat&logo=jsr&colorA=080f12&colorB=1fa669)](https://npmjs.com/package/flashot)
[![JSDocs](https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&logo=javascript&colorA=080f12&colorB=1fa669)](https://www.jsdocs.io/package/vite-unbundled)
![Code size](https://img.shields.io/github/languages/code-size/thuongtruong109/flashot?style=flat&logo=bun&colorA=080f12&colorB=1fa669)
[![License](https://img.shields.io/github/license/thuongtruong109/flashot.svg?style=flat&colorA=080f12&colorB=1fa669)](https://github.com/antfu/vite-unbundled/blob/main/LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-1fa669?logo=githubsponsors&labelColor=080f12)](https://github.com/sponsors/thuongtruong109)

Flashot is the **blazing-fast image generation tool** for code snippets, designed for flawless experience and speed.

</div>

<div align="center">

**Super fast:** (generated in **~135ms**)

  <img src="./test/.snapshot/demo.png" alt="Example output" />
</div>

## ✨ Features

- 💻 **Inline code support:** Easily convert inline code snippets to images
- 🌐 **URL support:** Fetch code snippets directly from URLs
- 🎨 **Customizable themes:** Choose from various themes to match your style
- 🖼️ **High-quality output:** Generates crisp and clear images which keep the original code's formatting intact
- ⚡ **Blazing fast:** Optimized for speed, ensuring quick image generation
- 🛠️ **Flexible API:** Easy to integrate into your projects with a simple API

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
import { c2i } from "flashot";

const buffer = await c2i('console.log("hello, world!");', {
  /* add more options*/
});
await writeFile("output.png", buffer);
```

##### For url has raw content

```js
import { writeFile } from "node:fs/promises";
import { urlToImg } from "flashot";

const buffer = await urlToImg(
  "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  {
    /* add more options*/
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
  font: "https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2", // custom font
  width: 800, // default is auto
  height: 400, // default is auto
  bg: "transparent", // default is theme's background
  gap: 1, // gap between lines (default is 1)
  style: {
    borderRadius: 10, // default is 8
    padding: 30, // default is 25
    // ... more custom styles
  },
};
```

| Option   | Description                                                                              | Default                                                                                            |
| -------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `lang`   | Code language ([supported](https://shiki.style/languages))                               | `"js"`                                                                                             |
| `theme`  | Rendering theme ([supported](https://shiki.style/themes))                                | `"github-dark"`                                                                                    |
| `font`   | Font for rendering (URL or ArrayBuffer)                                                  | [`ubuntu`](https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2) |
| `width`  | Image width                                                                              | System default                                                                                     |
| `height` | Image height                                                                             | System default                                                                                     |
| `bg`     | Background color                                                                         | Theme's background                                                                                 |
| `gap`    | Gap between lines                                                                        | `1`                                                                                                |
| `style`  | Additional container styles ([docs](https://takumi.kane.tw/docs/deep-dives/stylesheets)) | `{ borderRadius: 8, padding: 25 }`                                                                 |

## 📚 Technologies

- ⚡ **[Bun](https://bun.sh)** - Fast all-in-one JavaScript runtime and toolkit
- 🏗️ **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development with strict mode enabled
- 📦 **[Vite](https://vitejs.dev/)** - Lightning-fast build tool with optimized bundling
- 🔋 **[Vitest](https://vitest.dev/)** - Blazing fast unit testing & interactive test UI framework
- 🪓 **[shiki](https://github.com/shikijs/shiki)** and **[takumi](https://github.com/kane50613/takumi)**
- 📝 **[Biome](https://biomejs.dev/)** - Fast formatter and linter for consistent code style
- 🚀 **Dual Module Support** - ESM and CommonJS output with proper type definitions
- 🔥 **[ESLint](https://eslint.org/)** - Advanced linting with TypeScript and SonarJS rules
- 🧩 **[Lefthook](https://github.com/evilmartians/lefthook)** and **[Commitlint](https://commitlint.js.org/)** - Automated Git hooks for linting and formatting

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

<!-- https://github.com/pi0/shiki-image -->
<!-- https://github.com/bunup/bunup -->
<!-- https://github.com/pedro199288/bun-library-starter -->
