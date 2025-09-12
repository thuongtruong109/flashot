# Configuration Guide

Complete guide to configuring Flashot for optimal results across all usage methods (NPM, CLI, API).

## 📋 Configuration Overview

Flashot offers extensive customization options to generate beautiful code images. This guide covers all available configuration options, their usage, and best practices.

## ⚙️ Core Configuration Options

### Language Configuration

```javascript
// NPM Package
const options = {
  lang: "typescript", // Programming language for syntax highlighting
};

// Supported languages
const languages = [
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
  "dockerfile",
];
```

```bash
# CLI
flashot code 'console.log("test");' --lang typescript
```

```json
// API
{
  "code": "const greeting: string = 'Hello';",
  "options": {
    "lang": "typescript"
  }
}
```

### Theme Configuration

```javascript
// NPM Package - Popular themes
const themeOptions = [
  "github-dark", // GitHub's dark theme (recommended)
  "github-light", // GitHub's light theme
  "dracula", // Popular Dracula theme
  "monokai", // Classic Monokai
  "nord", // Arctic-inspired theme
  "one-dark-pro", // Atom One Dark Pro
  "solarized-dark", // Solarized dark variant
  "solarized-light", // Solarized light variant
  "material-theme", // Material design theme
  "atom-one-dark", // Atom One Dark
  "atom-one-light", // Atom One Light
  "vs-code-dark", // VS Code dark theme
  "vs-code-light", // VS Code light theme
];

const options = {
  theme: "dracula",
};
```

```bash
# CLI
flashot code 'print("Hello")' --theme dracula
```

## 🖼️ Output Format Configuration

### Format Options

```javascript
// NPM Package
const formatOptions = {
  format: "webp", // png, jpeg, webp, avif
  quality: 95, // 1-100, only for JPEG
};
```

### Format Comparison

| Format   | Pros                          | Cons                          | Best For                             |
| -------- | ----------------------------- | ----------------------------- | ------------------------------------ |
| **WebP** | Small size, good quality      | Limited older browser support | Web usage, fast loading              |
| **PNG**  | Lossless, universal support   | Larger file size              | High quality, transparency           |
| **JPEG** | Small size, universal support | Lossy compression             | Photos, when transparency not needed |
| **AVIF** | Excellent compression         | Very limited support          | Cutting-edge web projects            |

```bash
# CLI format examples
flashot code 'test' --format webp --quality 90
flashot code 'test' --format png
flashot code 'test' --format jpeg --quality 85
```

## 🎨 Visual Styling Configuration

### Basic Styling

```javascript
// NPM Package
const options = {
  style: {
    padding: 30, // Padding around code (pixels)
    borderRadius: 12, // Border radius (pixels)
  },
  bg: "#1e1e2e", // Background color (hex, rgb, named)
  width: 800, // Image width (pixels)
  height: 600, // Image height (pixels)
  gap: 1.5, // Line spacing multiplier
};
```

```bash
# CLI styling
flashot code 'test' \\
  --style-padding 40 \\
  --style-border-radius 15 \\
  --bg "#2d3748" \\
  --width 1000 \\
  --height 700 \\
  --gap 2
```

### Advanced Styling Examples

#### Minimal Style

```javascript
const minimalStyle = {
  style: {
    padding: 15,
    borderRadius: 4,
  },
  bg: "transparent",
  gap: 1,
};
```

#### Card Style

```javascript
const cardStyle = {
  style: {
    padding: 40,
    borderRadius: 16,
  },
  bg: "#ffffff",
  gap: 1.2,
};
```

#### Presentation Style

```javascript
const presentationStyle = {
  style: {
    padding: 60,
    borderRadius: 20,
  },
  width: 1920,
  height: 1080,
  gap: 1.5,
};
```

## 🔢 Line Numbers Configuration

### Basic Line Numbers

```javascript
// NPM Package
const options = {
  lineNumbers: {
    enabled: true, // Show line numbers
    startFrom: 1, // Starting line number
    color: "#6e7681", // Line number color
    marginRight: 16, // Space between numbers and code
  },
};
```

```bash
# CLI line numbers
flashot code 'function test() { return true; }' \\
  --line-numbers-enabled \\
  --line-numbers-start-from 10 \\
  --line-numbers-color "#ff6b6b" \\
  --line-numbers-margin-right 20
```

### Line Number Styling Examples

#### Subtle Numbers

```javascript
const subtleNumbers = {
  lineNumbers: {
    enabled: true,
    color: "#484f58", // Muted gray
    marginRight: 12,
  },
};
```

#### Highlighted Numbers

```javascript
const highlightedNumbers = {
  lineNumbers: {
    enabled: true,
    color: "#58a6ff", // Bright blue
    marginRight: 20,
  },
};
```

#### Code Review Style

```javascript
const codeReviewStyle = {
  lineNumbers: {
    enabled: true,
    startFrom: 45, // Start from specific line
    color: "#f85149", // Red for attention
    marginRight: 16,
  },
};
```

## 🔆 Line Highlighting Configuration

### Basic Highlighting

```javascript
// NPM Package
const options = {
  highlight: {
    enabled: true,
    backgroundColor: "#347faa23", // Semi-transparent blue
    borderRadius: 4, // Highlight border radius
    at: 5, // Line to start highlighting (1-based)
    depth: 3, // Number of lines to highlight
  },
};
```

```bash
# CLI highlighting
flashot code 'function example() {
  const a = 1;
  const b = 2;
  return a + b;
}' \\
  --highlight-enabled \\
  --highlight-at 2 \\
  --highlight-depth 2 \\
  --highlight-background-color "#ffd60a30" \\
  --highlight-border-radius 6
```

### Highlighting Patterns

#### Error Highlighting

```javascript
const errorHighlight = {
  highlight: {
    enabled: true,
    backgroundColor: "#f8514920", // Red with transparency
    borderRadius: 4,
    at: 3,
    depth: 1,
  },
};
```

#### Success Highlighting

```javascript
const successHighlight = {
  highlight: {
    enabled: true,
    backgroundColor: "#40c05720", // Green with transparency
    borderRadius: 6,
    at: 1,
    depth: 2,
  },
};
```

#### Multi-section Highlighting

```javascript
const multiHighlight = {
  highlight: {
    enabled: true,
    backgroundColor: "#e879f920", // Purple with transparency
    borderRadius: 8,
    at: 5,
    depth: 4,
  },
};
```

## 🔤 Font Configuration

### Built-in Fonts

```javascript
// NPM Package - Popular coding fonts
const fontOptions = {
  // JetBrains Mono (default)
  font: "https://fonts.bunny.net/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2",

  // Ubuntu Sans Mono
  font: "https://fonts.bunny.net/ubuntu-sans-mono/files/ubuntu-sans-mono-latin-400-normal.woff2",

  // Fira Code
  font: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700",

  // Source Code Pro
  font: "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700",
};
```

### Custom Font Loading

```javascript
import { readFile } from "node:fs/promises";

// Load local font file
const fontBuffer = await readFile("./fonts/CustomFont.woff2");

const options = {
  font: fontBuffer, // Use font buffer directly
};
```

```bash
# CLI with custom font
flashot code 'console.log("Custom font");' \\
  --font "https://fonts.googleapis.com/css2?family=Roboto+Mono"
```

## 📐 Dimension Configuration

### Responsive Dimensions

```javascript
// NPM Package - Different screen sizes
const mobileOptions = {
  width: 375,
  height: 667,
  style: { padding: 20 },
};

const tabletOptions = {
  width: 768,
  height: 1024,
  style: { padding: 30 },
};

const desktopOptions = {
  width: 1200,
  height: 800,
  style: { padding: 40 },
};

const presentationOptions = {
  width: 1920,
  height: 1080,
  style: { padding: 80 },
};
```

### Social Media Optimized

```javascript
// Twitter/X optimal
const twitterOptions = {
  width: 1200,
  height: 675, // 16:9 aspect ratio
  style: { padding: 50 },
};

// Instagram post
const instagramOptions = {
  width: 1080,
  height: 1080, // 1:1 aspect ratio
  style: { padding: 60 },
};

// LinkedIn post
const linkedinOptions = {
  width: 1200,
  height: 627, // ~1.91:1 aspect ratio
  style: { padding: 45 },
};
```

## 🔧 Advanced Configuration Patterns

### Theme-based Configuration

```javascript
// NPM Package - Configuration sets for different themes
const configurations = {
  dark: {
    theme: "github-dark",
    bg: "#0d1117",
    lineNumbers: {
      enabled: true,
      color: "#7d8590",
    },
    highlight: {
      backgroundColor: "#388bfd30",
    },
  },

  light: {
    theme: "github-light",
    bg: "#ffffff",
    lineNumbers: {
      enabled: true,
      color: "#656d76",
    },
    highlight: {
      backgroundColor: "#0969da20",
    },
  },

  neon: {
    theme: "synthwave-84",
    bg: "#2a0845",
    lineNumbers: {
      enabled: true,
      color: "#ff6ac1",
    },
    highlight: {
      backgroundColor: "#f92aad30",
    },
  },
};
```

### Language-specific Configuration

```javascript
// NPM Package - Different settings per language
const languageConfigs = {
  javascript: {
    lang: "javascript",
    theme: "atom-one-dark",
    lineNumbers: { enabled: true },
  },

  python: {
    lang: "python",
    theme: "monokai",
    gap: 1.3,
    lineNumbers: { enabled: true, marginRight: 20 },
  },

  json: {
    lang: "json",
    theme: "github-light",
    style: { padding: 20 },
    lineNumbers: { enabled: false },
  },

  markdown: {
    lang: "markdown",
    theme: "github-light",
    gap: 1.4,
    lineNumbers: { enabled: false },
  },
};
```

### Use-case Specific Configuration

```javascript
// NPM Package - Configurations for different scenarios
const useCaseConfigs = {
  documentation: {
    theme: "github-light",
    format: "png",
    style: { padding: 30, borderRadius: 8 },
    lineNumbers: { enabled: true },
    width: 800,
  },

  socialMedia: {
    theme: "dracula",
    format: "webp",
    quality: 95,
    style: { padding: 50, borderRadius: 16 },
    lineNumbers: { enabled: true, color: "#6272a4" },
    width: 1200,
    height: 675,
  },

  presentation: {
    theme: "one-dark-pro",
    format: "png",
    style: { padding: 80, borderRadius: 20 },
    lineNumbers: { enabled: true, marginRight: 30 },
    width: 1920,
    height: 1080,
    gap: 1.6,
  },

  tutorial: {
    theme: "github-dark",
    format: "webp",
    style: { padding: 35, borderRadius: 12 },
    lineNumbers: { enabled: true },
    highlight: { enabled: true, borderRadius: 6 },
    width: 1000,
  },
};
```

## 🌐 Environment-specific Configuration

### Development vs Production

```javascript
// NPM Package
const config = {
  development: {
    format: "png", // Lossless for development
    quality: 100,
    verbose: true,
  },

  production: {
    format: "webp", // Optimized for production
    quality: 90,
    verbose: false,
  },
};

const environment = process.env.NODE_ENV || "development";
const options = config[environment];
```

### API Environment Configuration

```javascript
// Different API configurations
const apiConfigs = {
  local: {
    baseURL: "http://localhost:8080",
    timeout: 30000,
  },

  staging: {
    baseURL: "https://api-staging.example.com",
    timeout: 15000,
  },

  production: {
    baseURL: "https://api.example.com",
    timeout: 10000,
  },
};
```

## 📁 Configuration Files

### Package.json Configuration

```json
{
  "flashot": {
    "defaultTheme": "github-dark",
    "defaultFormat": "webp",
    "defaultOptions": {
      "style": {
        "padding": 30,
        "borderRadius": 12
      },
      "lineNumbers": {
        "enabled": true,
        "color": "#7d8590"
      }
    }
  }
}
```

### Configuration File Loading

```javascript
// NPM Package - Load from config file
import { readFile } from "node:fs/promises";

async function loadConfig() {
  try {
    const configFile = await readFile("./flashot.config.json", "utf8");
    return JSON.parse(configFile);
  } catch (error) {
    return {}; // Return empty object if no config file
  }
}

const userConfig = await loadConfig();
const options = {
  ...defaultOptions,
  ...userConfig,
};
```

### Environment Variables

```bash
# Set default options via environment variables
export FLASHOT_THEME="dracula"
export FLASHOT_FORMAT="webp"
export FLASHOT_QUALITY="90"
export FLASHOT_PADDING="25"
export FLASHOT_LINE_NUMBERS="true"
```

```javascript
// NPM Package - Read from environment
const envOptions = {
  theme: process.env.FLASHOT_THEME || "github-dark",
  format: process.env.FLASHOT_FORMAT || "webp",
  quality: parseInt(process.env.FLASHOT_QUALITY) || 100,
  style: {
    padding: parseInt(process.env.FLASHOT_PADDING) || 25,
  },
  lineNumbers: {
    enabled: process.env.FLASHOT_LINE_NUMBERS === "true",
  },
};
```

## 🎯 Configuration Best Practices

### Performance Optimization

```javascript
// NPM Package - Optimized for performance
const performanceConfig = {
  format: "webp", // Best compression
  quality: 85, // Good quality/size balance
  width: 1000, // Reasonable size
  gap: 1, // Minimal line spacing
  style: {
    padding: 25, // Moderate padding
  },
};
```

### Accessibility

```javascript
// NPM Package - Accessibility-focused
const accessibleConfig = {
  theme: "github-light", // High contrast
  lineNumbers: {
    enabled: true,
    color: "#24292f", // High contrast numbers
    marginRight: 20, // Clear separation
  },
  gap: 1.4, // Improved readability
  style: {
    padding: 30, // Adequate spacing
  },
};
```

### Consistency

```javascript
// NPM Package - Consistent branding
const brandConfig = {
  theme: "custom-brand-theme",
  bg: "#your-brand-color",
  style: {
    padding: 40,
    borderRadius: 12,
  },
  lineNumbers: {
    enabled: true,
    color: "#your-accent-color",
  },
  font: "your-brand-font-url",
};
```

## 🔍 Configuration Validation

### Input Validation

```javascript
// NPM Package - Validate configuration
function validateConfig(options) {
  const validFormats = ["png", "jpeg", "webp", "avif"];
  const validThemes = ["github-dark", "dracula" /* ... */];

  if (options.format && !validFormats.includes(options.format)) {
    throw new Error(`Invalid format: ${options.format}`);
  }

  if (options.theme && !validThemes.includes(options.theme)) {
    throw new Error(`Invalid theme: ${options.theme}`);
  }

  if (options.quality && (options.quality < 1 || options.quality > 100)) {
    throw new Error("Quality must be between 1 and 100");
  }

  return true;
}
```

### Configuration Testing

```javascript
// NPM Package - Test configurations
const testConfigs = [
  { theme: "github-dark", format: "png" },
  { theme: "dracula", format: "webp" },
  { theme: "monokai", format: "jpeg", quality: 90 },
];

for (const config of testConfigs) {
  try {
    const buffer = await codeToImg("console.log('test');", config);
    console.log(`✅ Config works: ${JSON.stringify(config)}`);
  } catch (error) {
    console.error(`❌ Config failed: ${JSON.stringify(config)}`, error);
  }
}
```

## 📊 Configuration Examples by Use Case

### Blog Post Images

```javascript
const blogConfig = {
  theme: "github-dark",
  format: "webp",
  quality: 90,
  width: 800,
  style: {
    padding: 30,
    borderRadius: 8,
  },
  lineNumbers: {
    enabled: true,
    marginRight: 16,
  },
};
```

### Social Media Cards

```javascript
const socialConfig = {
  theme: "dracula",
  format: "png",
  width: 1200,
  height: 630,
  style: {
    padding: 60,
    borderRadius: 20,
  },
  lineNumbers: {
    enabled: true,
    color: "#6272a4",
  },
  highlight: {
    enabled: true,
    backgroundColor: "#ff79c630",
  },
};
```

### Documentation Screenshots

```javascript
const docsConfig = {
  theme: "github-light",
  format: "png",
  style: {
    padding: 25,
    borderRadius: 6,
  },
  lineNumbers: {
    enabled: true,
    color: "#656d76",
  },
  bg: "#ffffff",
};
```

### Code Review Images

```javascript
const reviewConfig = {
  theme: "github-dark",
  format: "png",
  lineNumbers: {
    enabled: true,
    startFrom: 42,
    color: "#f85149",
  },
  highlight: {
    enabled: true,
    at: 3,
    depth: 2,
    backgroundColor: "#f8514920",
  },
};
```

## 🔗 Next Steps

- [NPM Usage Guide](./npm-usage.md) - Learn library integration
- [CLI Usage Guide](./cli-usage.md) - Master command-line usage
- [API Reference](./api-reference.md) - Complete API documentation
- [Examples](./examples.md) - Practical implementation examples
- [Advanced Usage](./advanced.md) - Performance tips and optimization
