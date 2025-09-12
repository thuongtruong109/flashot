# API Reference

Complete REST API documentation for the Flashot image generation service.

## 🌐 Base URL

```
http://localhost:8080
```

When deployed, replace with your actual domain or IP address.

## 📋 Endpoints Overview

| Method | Endpoint   | Description                           | Input Type  |
| ------ | ---------- | ------------------------------------- | ----------- |
| `POST` | `/`        | Convert code string to image          | Inline code |
| `POST` | `/url`     | Convert code from URL to image        | Remote URL  |
| `POST` | `/file`    | Convert code from file path to image  | File path   |
| `POST` | `/buffer`  | Convert code from hex buffer to image | Hex buffer  |
| `GET`  | `/options` | Get available options and defaults    | -           |
| `GET`  | `/health`  | Health check endpoint                 | -           |

## 🚀 Core Endpoints

### POST `/` - Convert Code String

Generate an image from inline code string.

**Request Body:**

```json
{
  "code": "console.log('Hello, World!');",
  "options": {
    "lang": "javascript",
    "theme": "github-dark",
    "format": "png",
    "style": {
      "padding": 30,
      "borderRadius": 12
    },
    "lineNumbers": {
      "enabled": true,
      "color": "#7b7f8b"
    }
  }
}
```

**Response:**

- **Content-Type**: `image/png`, `image/jpeg`, `image/webp`, or `image/avif`
- **Content-Disposition**: `attachment; filename="flashot-code.{ext}"`
- **Body**: Binary image data

**Example with curl:**

```bash
curl -X POST http://localhost:8080/ \\
  -H "Content-Type: application/json" \\
  -d '{
    "code": "function greet(name) { return `Hello, ${name}!`; }",
    "options": {
      "lang": "javascript",
      "theme": "dracula",
      "format": "png"
    }
  }' \\
  --output hello-function.png
```

**Example with JavaScript:**

```javascript
const response = await fetch("http://localhost:8080/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    code: 'const greeting = "Hello, API!";\\nconsole.log(greeting);',
    options: {
      lang: "javascript",
      theme: "github-dark",
      format: "webp",
      lineNumbers: { enabled: true },
    },
  }),
});

if (response.ok) {
  const blob = await response.blob();
  // Handle the image blob
}
```

### POST `/url` - Convert from URL

Generate an image from code fetched from a URL.

**Request Body:**

```json
{
  "url": "https://raw.githubusercontent.com/user/repo/main/index.js",
  "options": {
    "lang": "javascript",
    "theme": "monokai",
    "format": "webp"
  }
}
```

**Response:** Same as `/` endpoint

**Example:**

```bash
curl -X POST http://localhost:8080/url \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://raw.githubusercontent.com/microsoft/vscode/main/package.json",
    "options": {
      "lang": "json",
      "theme": "github-light",
      "format": "png",
      "lineNumbers": { "enabled": true }
    }
  }' \\
  --output vscode-package.png
```

### POST `/file` - Convert from File Path

Generate an image from a local file path (server-side file system).

**Request Body:**

```json
{
  "path": "../package.json",
  "options": {
    "lang": "json",
    "theme": "nord",
    "format": "png"
  }
}
```

**Response:** Same as `/` endpoint

**Example:**

```bash
curl -X POST http://localhost:8080/file \\
  -H "Content-Type: application/json" \\
  -d '{
    "path": "./src/index.ts",
    "options": {
      "lang": "typescript",
      "theme": "one-dark-pro",
      "format": "webp",
      "lineNumbers": { "enabled": true }
    }
  }' \\
  --output index-ts.webp
```

### POST `/buffer` - Convert from Hex Buffer

Generate an image from a hex buffer string.

**Request Body:**

```json
{
  "buffer": "636F6E736F6C652E6C6F67282248656C6C6F2122293B",
  "options": {
    "lang": "javascript",
    "theme": "dracula",
    "format": "png"
  }
}
```

**Response:** Same as `/` endpoint

**Example:**

```bash
# Hex for: console.log("Hello!");
curl -X POST http://localhost:8080/buffer \\
  -H "Content-Type: application/json" \\
  -d '{
    "buffer": "636F6E736F6C652E6C6F67282248656C6C6F2122293B",
    "options": {
      "lang": "javascript",
      "theme": "github-dark"
    }
  }' \\
  --output buffer-hello.webp
```

## ℹ️ Information Endpoints

### GET `/options` - Available Options

Get all available configuration options, supported languages, themes, and defaults.

**Response:**

```json
{
  "languages": [
    "javascript",
    "typescript",
    "python",
    "java",
    "c",
    "cpp",
    "csharp",
    "go",
    "rust",
    "php",
    "ruby",
    "kotlin",
    "swift",
    "dart",
    "scala",
    "html",
    "css",
    "scss",
    "json",
    "xml",
    "yaml",
    "markdown",
    "sql",
    "bash",
    "powershell",
    "dockerfile"
  ],
  "themes": [
    "github-dark",
    "github-light",
    "dracula",
    "monokai",
    "nord",
    "one-dark-pro",
    "solarized-dark",
    "solarized-light",
    "material-theme",
    "atom-one-dark",
    "vs-code-dark"
  ],
  "formats": ["png", "jpeg", "webp", "avif"],
  "fonts": {
    "JetBrainsMono": "https://fonts.bunny.net/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",
    "UbuntuSansMono": "https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2"
  },
  "defaultOptions": {
    "lang": "js",
    "theme": "dracula",
    "format": "webp",
    "quality": 100,
    "style": {
      "padding": 25,
      "borderRadius": 8
    },
    "lineNumbers": {
      "enabled": false,
      "startFrom": 1,
      "color": "#7b7f8b"
    }
  }
}
```

**Example:**

```bash
curl http://localhost:8080/options | jq '.'
```

### GET `/health` - Health Check

Check API service health and status.

**Response:**

```json
{
  "status": "healthy",
  "service": "flashot-api",
  "timestamp": "2024-12-19T10:30:00.000Z"
}
```

**Example:**

```bash
curl http://localhost:8080/health
```

## ⚙️ Configuration Options

### Complete Options Schema

```typescript
interface FlashotOptions {
  // Language and theme
  lang?: string; // Programming language
  theme?: string; // Color theme
  font?: string | Buffer; // Font URL or buffer

  // Output format
  format?: "png" | "jpeg" | "webp" | "avif";
  quality?: number; // 1-100, JPEG only

  // Image dimensions
  width?: number; // Image width in pixels
  height?: number; // Image height in pixels
  gap?: number; // Line spacing

  // Background
  bg?: string; // Background color

  // Styling
  style?: {
    padding?: number; // Padding around code
    borderRadius?: number; // Border radius in pixels
  };

  // Line numbers
  lineNumbers?: {
    enabled?: boolean; // Show line numbers
    startFrom?: number; // Starting line number
    color?: string; // Line number color
    marginRight?: number; // Space after numbers
  };

  // Line highlighting
  highlight?: {
    enabled?: boolean; // Enable highlighting
    backgroundColor?: string; // Highlight color
    borderRadius?: number; // Highlight border radius
    at?: number; // Line to start highlighting
    depth?: number; // Number of lines to highlight
  };
}
```

### Option Examples

#### Basic Options

```json
{
  "lang": "javascript",
  "theme": "github-dark",
  "format": "png"
}
```

#### Advanced Styling

```json
{
  "lang": "typescript",
  "theme": "dracula",
  "format": "webp",
  "quality": 95,
  "style": {
    "padding": 40,
    "borderRadius": 16
  },
  "lineNumbers": {
    "enabled": true,
    "startFrom": 1,
    "color": "#6272a4",
    "marginRight": 20
  },
  "highlight": {
    "enabled": true,
    "backgroundColor": "#ff79c630",
    "borderRadius": 4,
    "at": 5,
    "depth": 3
  }
}
```

#### Custom Dimensions

```json
{
  "width": 1200,
  "height": 800,
  "gap": 1.5,
  "bg": "#1e1e2e"
}
```

## 🎨 Supported Languages

### Programming Languages

- **JavaScript**: `javascript`, `js`
- **TypeScript**: `typescript`, `ts`
- **Python**: `python`, `py`
- **Java**: `java`
- **C/C++**: `c`, `cpp`, `c++`
- **C#**: `csharp`, `cs`
- **Go**: `go`
- **Rust**: `rust`, `rs`
- **PHP**: `php`
- **Ruby**: `ruby`, `rb`
- **Kotlin**: `kotlin`, `kt`
- **Swift**: `swift`
- **Dart**: `dart`
- **Scala**: `scala`

### Web Technologies

- **HTML**: `html`
- **CSS**: `css`
- **SCSS**: `scss`, `sass`
- **Less**: `less`

### Data Formats

- **JSON**: `json`
- **XML**: `xml`
- **YAML**: `yaml`, `yml`
- **TOML**: `toml`
- **Markdown**: `markdown`, `md`

### Database & Shell

- **SQL**: `sql`
- **Bash**: `bash`, `shell`, `sh`
- **PowerShell**: `powershell`, `ps1`
- **Dockerfile**: `dockerfile`

## 🎨 Supported Themes

### Dark Themes

- `github-dark` - GitHub's dark theme
- `dracula` - Popular Dracula theme
- `monokai` - Classic Monokai
- `nord` - Arctic-inspired theme
- `one-dark-pro` - Atom One Dark Pro
- `solarized-dark` - Solarized dark variant
- `material-theme` - Material design theme
- `atom-one-dark` - Atom One Dark
- `vs-code-dark` - VS Code dark theme

### Light Themes

- `github-light` - GitHub's light theme
- `solarized-light` - Solarized light variant
- `atom-one-light` - Atom One Light
- `vs-code-light` - VS Code light theme

## 🔧 Error Handling

### Error Response Format

```json
{
  "error": "Error message description"
}
```

### Common Error Codes

| Status Code | Description           | Example Response                        |
| ----------- | --------------------- | --------------------------------------- |
| `400`       | Bad Request           | `{"error": "Code is required"}`         |
| `404`       | Not Found             | `{"error": "Endpoint not found"}`       |
| `500`       | Internal Server Error | `{"error": "Failed to generate image"}` |

### Error Examples

**Missing required field:**

```bash
curl -X POST http://localhost:8080/ \\
  -H "Content-Type: application/json" \\
  -d '{}'

# Response: 400 Bad Request
# {"error": "Code is required"}
```

**Invalid URL:**

```bash
curl -X POST http://localhost:8080/url \\
  -H "Content-Type: application/json" \\
  -d '{"url": "invalid-url"}'

# Response: 500 Internal Server Error
# {"error": "Failed to generate image from URL"}
```

## 📊 Performance

### Benchmarks

- **Average generation time**: ~135ms
- **Concurrent requests**: Supports multiple simultaneous requests
- **Memory usage**: Optimized with caching
- **File size**: WebP typically 30-50% smaller than PNG

### Optimization Tips

1. **Use WebP format** for smaller file sizes
2. **Set appropriate quality** for JPEG (80-95 for good balance)
3. **Limit image dimensions** to reasonable sizes
4. **Cache frequently used options** on client side

## 🔐 Security Considerations

### Input Validation

- Code content is sanitized before processing
- URL validation prevents SSRF attacks
- File path access is restricted to safe directories
- Buffer input is validated for proper hex format

### Rate Limiting

Consider implementing rate limiting in production:

```javascript
// Example rate limiting middleware
app.use(async (c, next) => {
  const clientIP = c.req.header("x-forwarded-for") || c.req.header("x-real-ip");
  // Implement rate limiting logic
  await next();
});
```

### Headers

The API sets appropriate security headers:

- `Content-Type` based on image format
- `Content-Disposition` for file downloads

## 🔗 Framework Integration Examples

### Express.js Proxy

```javascript
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/code-image", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8080/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      const buffer = await response.buffer();
      res.setHeader("Content-Type", response.headers.get("content-type"));
      res.send(buffer);
    } else {
      const error = await response.json();
      res.status(response.status).json(error);
    }
  } catch (error) {
    res.status(500).json({ error: "Proxy request failed" });
  }
});
```

### Next.js API Route

```javascript
// pages/api/generate-image.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("http://localhost:8080/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      const buffer = await response.buffer();
      const contentType = response.headers.get("content-type");

      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=3600");
      res.send(buffer);
    } else {
      const error = await response.json();
      res.status(response.status).json(error);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to generate image" });
  }
}
```

### React Hook

```javascript
import { useState, useCallback } from "react";

export const useFlashotAPI = (baseURL = "http://localhost:8080") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = useCallback(
    async (code, options = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseURL}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, options }),
        });

        if (response.ok) {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error);
        }
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [baseURL]
  );

  return { generateImage, loading, error };
};
```

## 🐳 Docker API Usage

### Run API Container

```bash
# Run the API server
docker run -p 8080:8080 ghcr.io/thuongtruong109/flashot-api:latest

# Test the API
curl -X POST http://localhost:8080/ \\
  -H "Content-Type: application/json" \\
  -d '{"code": "console.log(\"Docker works!\");"}' \\
  --output docker-test.webp
```

### Docker Compose Setup

```yaml
version: "3.8"
services:
  flashot-api:
    image: ghcr.io/thuongtruong109/flashot-api:latest
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - PORT=8080
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 📈 Monitoring

### Health Check Integration

```javascript
// Health check with additional metrics
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  });
});
```

### Logging

```javascript
// Request logging middleware
app.use(async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log(`${c.req.method} ${c.req.url} - ${duration}ms`);
});
```

## 🔗 Next Steps

- [CLI Usage Guide](./cli-usage.md) - Command-line interface
- [NPM Usage Guide](./npm-usage.md) - Library integration
- [Configuration Guide](./configuration.md) - Detailed options
- [Examples](./examples.md) - Practical implementation examples
