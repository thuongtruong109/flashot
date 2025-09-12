# NPM Package Usage Guide

Learn how to use Flashot as a library in your Node.js, Bun, or Deno projects.

## 🚀 Quick Start

### Basic Usage

```javascript
import { writeFile } from "node:fs/promises";
import { codeToImg } from "flashot";

// Generate image from code string
const buffer = await codeToImg('console.log("Hello, World!");');
await writeFile("hello-world.webp", buffer);
```

### TypeScript Usage

```typescript
import { writeFile } from "node:fs/promises";
import { codeToImg, type ThemeOptions } from "flashot";

const options: ThemeOptions = {
  lang: "typescript",
  theme: "github-dark",
  format: "png",
};

const buffer = await codeToImg(
  "const greeting: string = 'Hello, TypeScript!';",
  options
);
await writeFile("typescript-example.png", buffer);
```

## 📚 Core Functions

Flashot provides four main functions for different input types:

### 1. `codeToImg()` - Inline Code

Convert code strings directly to images:

```javascript
import { codeToImg } from "flashot";

// Simple usage
const buffer = await codeToImg('console.log("Hello!");');

// With options
const buffer = await codeToImg('console.log("Hello!");', {
  lang: "javascript",
  theme: "dracula",
  format: "png",
  style: {
    padding: 30,
    borderRadius: 10,
  },
});
```

### 2. `pathToImg()` - File Paths

Convert local files to images:

```javascript
import { pathToImg } from "flashot";

// Convert a local file
const buffer = await pathToImg("../package.json", {
  lang: "json",
  theme: "github-dark",
});

// Convert TypeScript file
const buffer = await pathToImg("./src/index.ts", {
  lang: "typescript",
  lineNumbers: {
    enabled: true,
    startFrom: 1,
  },
});
```

### 3. `urlToImg()` - Remote URLs

Fetch and convert code from URLs:

```javascript
import { urlToImg } from "flashot";

// Convert from GitHub raw URL
const buffer = await urlToImg(
  "https://raw.githubusercontent.com/user/repo/main/index.js",
  {
    lang: "javascript",
    theme: "monokai",
  }
);

// Convert from any text URL
const buffer = await urlToImg("https://example.com/code.py", {
  lang: "python",
  format: "webp",
});
```

### 4. `bufferToImg()` - Hex Buffers

Convert hex buffer strings to images:

```javascript
import { bufferToImg } from "flashot";

const hexString = "636F6E736F6C652E6C6F67282248656C6C6F2122293B"; // "console.log('Hello!');"
const buffer = await bufferToImg(hexString, {
  lang: "javascript",
  theme: "nord",
});
```

## ⚙️ Configuration Options

### Basic Options

```javascript
const options = {
  lang: "javascript", // Programming language
  theme: "github-dark", // Color theme
  format: "webp", // Output format (png, jpeg, webp, avif)
  quality: 100, // Image quality (1-100, JPEG only)
  font: "custom-font-url", // Custom font URL or buffer
};
```

### Style Customization

```javascript
const options = {
  style: {
    padding: 25, // Padding around code
    borderRadius: 8, // Border radius in pixels
    backgroundColor: "#1e1e1e", // Background color (overrides theme)
    // Additional CSS-like properties supported
  },
};
```

### Line Numbers

```javascript
const options = {
  lineNumbers: {
    enabled: true, // Show line numbers
    startFrom: 1, // Starting line number
    color: "#7b7f8b", // Line number color
    marginRight: 16, // Space between numbers and code
  },
};
```

### Line Highlighting

```javascript
const options = {
  highlight: {
    enabled: true, // Enable line highlighting
    backgroundColor: "#347faa23", // Highlight background color
    borderRadius: 4, // Highlight border radius
    at: 5, // Line to start highlighting (1-based)
    depth: 3, // Number of lines to highlight
  },
};
```

### Image Dimensions

```javascript
const options = {
  width: 800, // Image width in pixels
  height: 600, // Image height in pixels
  gap: 1.5, // Line spacing multiplier
};
```

## 🎨 Themes and Languages

### Popular Themes

```javascript
// Dark themes
const themes = [
  "github-dark",
  "dracula",
  "one-dark-pro",
  "monokai",
  "nord",
  "material-theme-darker",
];

// Light themes
const lightThemes = [
  "github-light",
  "solarized-light",
  "material-theme-lighter",
  "one-light",
];
```

### Supported Languages

```javascript
// Popular languages
const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
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

## 📁 Real-World Examples

### Documentation Generator

```javascript
import { writeFile } from "node:fs/promises";
import { codeToImg } from "flashot";

async function generateDocImage(code, filename, lang = "javascript") {
  const buffer = await codeToImg(code, {
    lang,
    theme: "github-dark",
    format: "png",
    style: {
      padding: 30,
      borderRadius: 12,
    },
    lineNumbers: {
      enabled: true,
      color: "#6e7681",
    },
  });

  await writeFile(`docs/images/${filename}.png`, buffer);
  console.log(`✅ Generated ${filename}.png`);
}

// Generate multiple examples
await generateDocImage(
  `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
`,
  "fibonacci-example"
);
```

### Blog Post Generator

```javascript
import { codeToImg } from "flashot";

async function createBlogCodeImage(code, title) {
  return await codeToImg(code, {
    lang: "javascript",
    theme: "dracula",
    format: "webp",
    quality: 95,
    style: {
      padding: 40,
      borderRadius: 16,
    },
    lineNumbers: {
      enabled: true,
      marginRight: 20,
    },
    highlight: {
      enabled: true,
      at: 3,
      depth: 2,
      backgroundColor: "#ff79c630",
    },
  });
}
```

### Batch Processing

```javascript
import { readdir } from "node:fs/promises";
import { pathToImg } from "flashot";

async function processCodeFiles(directory) {
  const files = await readdir(directory);
  const codeFiles = files.filter((f) => f.endsWith(".js") || f.endsWith(".ts"));

  for (const file of codeFiles) {
    const buffer = await pathToImg(`${directory}/${file}`, {
      lang: file.endsWith(".ts") ? "typescript" : "javascript",
      theme: "one-dark-pro",
      format: "png",
      lineNumbers: { enabled: true },
    });

    await writeFile(`images/${file}.png`, buffer);
    console.log(`✅ Processed ${file}`);
  }
}

await processCodeFiles("./src");
```

## 🔧 Advanced Usage

### Custom Font Loading

```javascript
import { readFile } from "node:fs/promises";
import { codeToImg } from "flashot";

// Load custom font from file
const fontBuffer = await readFile("./fonts/custom-font.woff2");

const buffer = await codeToImg(code, {
  font: fontBuffer, // Use custom font buffer
  // ... other options
});

// Or use font URL
const buffer2 = await codeToImg(code, {
  font: "https://fonts.googleapis.com/css2?family=Fira+Code",
  // ... other options
});
```

### Error Handling

```javascript
import { codeToImg } from "flashot";

try {
  const buffer = await codeToImg(code, options);
  await writeFile("output.png", buffer);
} catch (error) {
  if (error.message.includes("language")) {
    console.error("Unsupported language specified");
  } else if (error.message.includes("theme")) {
    console.error("Invalid theme name");
  } else {
    console.error("Image generation failed:", error.message);
  }
}
```

### Performance Optimization

```javascript
import { codeToImg } from "flashot";

// Reuse options for better performance
const baseOptions = {
  theme: "github-dark",
  format: "webp",
  quality: 85,
  style: { padding: 25 },
};

// Generate multiple images with consistent styling
const codes = ["code1", "code2", "code3"];
const promises = codes.map((code, i) =>
  codeToImg(code, { ...baseOptions, lang: "javascript" }).then((buffer) =>
    writeFile(`output-${i}.webp`, buffer)
  )
);

await Promise.all(promises);
```

## 🧪 Testing

### Unit Testing with Jest

```javascript
import { codeToImg } from "flashot";

describe("Flashot Integration", () => {
  test("should generate image buffer", async () => {
    const buffer = await codeToImg('console.log("test");');
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  test("should respect format option", async () => {
    const pngBuffer = await codeToImg("test", { format: "png" });
    const webpBuffer = await codeToImg("test", { format: "webp" });

    // PNG starts with specific bytes
    expect(pngBuffer.subarray(0, 4)).toEqual(
      Buffer.from([0x89, 0x50, 0x4e, 0x47])
    );
  });
});
```

## 🔗 Framework Integration

### Express.js Endpoint

```javascript
import express from "express";
import { codeToImg } from "flashot";

const app = express();
app.use(express.json());

app.post("/generate-image", async (req, res) => {
  try {
    const { code, options = {} } = req.body;
    const buffer = await codeToImg(code, options);

    res.setHeader("Content-Type", `image/${options.format || "webp"}`);
    res.send(buffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000);
```

### Next.js API Route

```javascript
// pages/api/code-image.js
import { codeToImg } from "flashot";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { code, options } = req.body;
    const buffer = await codeToImg(code, options);

    res.setHeader("Content-Type", `image/${options?.format || "webp"}`);
    res.send(buffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
```

## 💡 Tips and Best Practices

### 1. Choose the Right Format

- **WebP**: Best compression, modern browsers
- **PNG**: Lossless, universal support
- **JPEG**: Smaller files, acceptable quality loss
- **AVIF**: Best compression, limited support

### 2. Optimize Performance

- Reuse option objects when generating multiple images
- Use appropriate image dimensions (avoid unnecessarily large images)
- Cache font loading for repeated use

### 3. Handle Edge Cases

- Validate input code before processing
- Set reasonable timeouts for URL fetching
- Handle network errors gracefully

### 4. Accessibility

- Provide alt text when using generated images
- Ensure sufficient contrast in custom themes
- Consider providing text alternatives

## 📊 Bundle Analysis

When using Flashot in web applications:

```javascript
// Tree-shaking friendly imports
import { codeToImg } from "flashot"; // Only imports what you need

// Avoid importing everything
// import * as flashot from "flashot"; // Imports entire library
```

## 🔗 Next Steps

- [CLI Usage Guide](./cli-usage.md) - Learn the command-line interface
- [API Reference](./api-reference.md) - Complete API documentation
- [Configuration Guide](./configuration.md) - Detailed options reference
- [Examples](./examples.md) - More practical examples
