# Flashot API

## Overview

This project is a modern Node.js API built with Hono that integrates the Flashot package to convert code snippets into beautiful images with syntax highlighting. It provides multiple endpoints for different input methods and comprehensive configuration options.

## Features

- 🚀 **High Performance**: Built with Hono for blazing-fast API responses
- 🎨 **Multiple Input Methods**: Support for code strings, URLs, file paths, and hex buffers
- 🌈 **Rich Theming**: 25+ programming languages and multiple color themes
- 📸 **Multiple Formats**: Export as PNG, JPEG, WebP, or AVIF
- ⚙️ **Comprehensive Options**: Line numbers, highlighting, custom fonts, and more
- 🛡️ **Error Handling**: Robust error handling with detailed responses
- 📊 **Health Monitoring**: Built-in health check endpoint

## Project Structure

```
api/
├── src/
│   ├── index.ts          # Application entry point with Hono server
│   └── router.ts         # API routes for all Flashot operations
├── package.json          # NPM configuration and dependencies
├── tsconfig.json         # TypeScript configuration
├── API_DOCS.md          # Comprehensive API documentation
└── README.md            # This file
```

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build the project:**

   ```bash
   npm run build
   ```

3. **Start the server:**

   ```bash
   npm start
   ```

4. **Development mode (with hot reload):**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:8080`

## API Endpoints

### Core Endpoints

| Method | Endpoint   | Description                           |
| ------ | ---------- | ------------------------------------- |
| `POST` | `/`        | Convert code string to image          |
| `POST` | `/url`     | Convert code from URL to image        |
| `POST` | `/file`    | Convert code from file path to image  |
| `POST` | `/buffer`  | Convert code from hex buffer to image |
| `GET`  | `/options` | Get available options and defaults    |
| `GET`  | `/health`  | Health check endpoint                 |

### Quick Example

```bash
curl -X POST http://localhost:8080/
  -H "Content-Type: application/json"
  -d '{
    "code": "console.log("Hello, World!");",
    "options": {
      "lang": "javascript",
      "theme": "github-dark",
      "format": "png"
    }
  }'
  --output hello-world.png
```

## Configuration Options

The API supports extensive configuration through the `options` parameter:

```typescript
{
  lang: "javascript",           // Programming language
  theme: "github-dark",         // Color theme
  format: "webp",              // Output format (png, jpeg, webp, avif)
  quality: 100,                // Image quality (1-100)
  style: {
    padding: 25,               // Padding around code
    borderRadius: 8            // Border radius
  },
  lineNumbers: {
    enabled: true,             // Show line numbers
    startFrom: 1,              // Starting number
    color: "#7b7f8b"          // Number color
  },
  highlight: {
    enabled: true,             // Enable line highlighting
    at: 5,                     // Line to highlight
    depth: 2                   // Number of lines
  }
}
```

## Supported Languages

JavaScript, TypeScript, Python, Java, C, C++, C#, Go, Rust, PHP, Ruby, Kotlin, Swift, Dart, Scala, HTML, CSS, SCSS, JSON, XML, YAML, Markdown, SQL, Bash, PowerShell, Dockerfile, and more.

## Supported Themes

- GitHub Dark/Light
- Dracula
- Monokai
- Nord
- One Dark Pro
- Solarized Dark/Light
- Material Theme
- Atom One Dark/Light
- VS Code Dark/Light

## Examples

### Basic Code Conversion

```javascript
const response = await fetch("http://localhost:8080/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    code: 'function hello() { return "Hello, World!"; }',
    options: { lang: "javascript", theme: "dracula" },
  }),
});
```

### URL-based Conversion

```javascript
const response = await fetch("http://localhost:8080/url", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    url: "https://raw.githubusercontent.com/user/repo/main/file.js",
    options: { theme: "github-dark", format: "png" },
  }),
});
```

### File Path Conversion

```javascript
const response = await fetch("http://localhost:8080/file", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    path: "../package.json",
    options: { lang: "json", theme: "monokai" },
  }),
});
```

## Error Handling

The API returns JSON error responses with appropriate HTTP status codes:

```json
{
  "error": "Code is required"
}
```

## Performance

- Average image generation time: ~135ms
- Built-in caching for improved performance
- Optimized for high-throughput scenarios
- Support for multiple output formats

## Documentation

For detailed API documentation including all endpoints, parameters, and examples, see [API_DOCS.md](./API_DOCS.md).

## Development

### Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm run dev` - Development mode with hot reload
- `npm start` - Start the production server
- `npm run lint` - Run linting checks

### Dependencies

- **Hono**: Modern web framework for high performance
- **Flashot**: Core library for code-to-image conversion
- **TypeScript**: Type-safe development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
