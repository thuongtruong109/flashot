# Flashot Documentation

Welcome to the comprehensive documentation for **Flashot** - the blazing-fast image generation tool for code snippets with elegant design and flawless performance.

## 📚 Documentation Structure

### Quick Start

- [Installation](./installation.md) - Get started with Flashot in minutes
- [Quick Examples](./examples.md) - Jump right in with practical examples

### Usage Guides

- [NPM Package Usage](./npm-usage.md) - Use Flashot as a library in your projects
- [CLI Usage](./cli-usage.md) - Command-line interface guide
- [API Reference](./api-reference.md) - REST API endpoints and usage

### Configuration

- [Options & Configuration](./configuration.md) - Comprehensive options guide
- [Themes & Languages](./themes-languages.md) - Supported themes and programming languages
- [Advanced Usage](./advanced.md) - Performance tips and advanced features

### Deployment

- [Docker Deployment](./docker.md) - Deploy with Docker and Docker Compose
- [Production Setup](./production.md) - Best practices for production environments

### Development

- [Contributing](./contributing.md) - How to contribute to Flashot
- [Architecture](./architecture.md) - Technical architecture and design decisions

## 🚀 What is Flashot?

Flashot is a powerful tool that converts code snippets into beautiful, shareable images with syntax highlighting. It's designed to be:

- **⚡ Blazing Fast**: Generates images in ~135ms
- **🎨 Beautiful**: Professional syntax highlighting with multiple themes
- **🔧 Flexible**: Multiple input methods (code, files, URLs, buffers)
- **📦 Lightweight**: Minimal dependencies
- **🛠️ Easy to Use**: Simple API for seamless integration

## 📦 Installation Options

### NPM Package

```bash
npm install flashot
```

### CLI Tool

```bash
npm install -g flashot
```

### Docker

```bash
docker pull ghcr.io/thuongtruong109/flashot-api:latest
```

## 🎯 Use Cases

- **Documentation**: Create beautiful code examples for README files
- **Social Media**: Share code snippets on Twitter, LinkedIn, or blogs
- **Presentations**: Generate images for slides and presentations
- **Tutorials**: Create visual code examples for educational content
- **API Integration**: Programmatically generate code images in your applications

## 🌟 Key Features

- 🖥️ **Multiple Interfaces**: CLI, NPM package, and REST API
- 📥 **Flexible Input**: Inline code, file paths, URLs, and buffers
- 🎨 **Rich Customization**: 25+ themes, custom fonts, line numbers
- 📦 **Multiple Formats**: PNG, JPEG, WebP, AVIF output
- 🔍 **Syntax Highlighting**: Support for 25+ programming languages
- ⚡ **High Performance**: Optimized rendering with caching
- 🛠️ **Easy Integration**: TypeScript support with comprehensive API

## 📖 Quick Example

```javascript
import { writeFile } from "node:fs/promises";
import { codeToImg } from "flashot";

const buffer = await codeToImg('console.log("Hello, World!");', {
  lang: "javascript",
  theme: "github-dark",
  format: "png",
});

await writeFile("hello-world.png", buffer);
```

## 🔗 Quick Links

- [GitHub Repository](https://github.com/thuongtruong109/flashot)
- [NPM Package](https://npmjs.com/package/flashot)
- [JSR Package](https://jsr.io/@thuongtruong/flashot)
- [API Documentation](./api-reference.md)
- [CLI Guide](./cli-usage.md)

## 🤝 Getting Help

- [GitHub Issues](https://github.com/thuongtruong109/flashot/issues) - Bug reports and feature requests
- [GitHub Discussions](https://github.com/thuongtruong109/flashot/discussions) - Questions and community support
- [Contributing Guide](./contributing.md) - How to contribute to the project

## 📄 License

Flashot is released under the [MIT License](https://github.com/thuongtruong109/flashot/blob/main/LICENSE).

---

**Ready to get started?** Check out our [Installation Guide](./installation.md) or jump straight to [Examples](./examples.md)!
