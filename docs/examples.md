# Examples & Demos

Explore practical examples and demos showcasing Flashot's capabilities across different use cases and environments.

## 🚀 Quick Start Examples

### Basic Usage

```javascript
import { writeFile } from "node:fs/promises";
import { codeToImg } from "flashot";

// Simple "Hello World" example
const buffer = await codeToImg('console.log("Hello, World!");');
await writeFile("hello-world.webp", buffer);
```

### With Custom Styling

```javascript
import { codeToImg } from "flashot";

const styledCode = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
`;

const buffer = await codeToImg(styledCode, {
  lang: "javascript",
  theme: "dracula",
  format: "png",
  style: {
    padding: 30,
    borderRadius: 12,
  },
  lineNumbers: {
    enabled: true,
    color: "#6272a4",
  },
  highlight: {
    enabled: true,
    at: 2,
    depth: 3,
    backgroundColor: "#ff79c630",
  },
});

await writeFile("fibonacci-example.png", buffer);
```

## 🌐 Web Framework Examples

### Express.js Server

```javascript
// server.js
import express from "express";
import { codeToImg } from "flashot";

const app = express();
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const { code, language = "javascript", theme = "github-dark" } = req.body;

    const buffer = await codeToImg(code, {
      lang: language,
      theme,
      format: "png",
      style: { padding: 20 },
    });

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", "attachment; filename=code.png");
    res.send(buffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
```

### Next.js API Route

```javascript
// pages/api/code-to-image.js
import { codeToImg } from "flashot";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, options = {} } = req.body;

  try {
    const defaultOptions = {
      lang: "javascript",
      theme: "github-dark",
      format: "webp",
      quality: 90,
      ...options,
    };

    const buffer = await codeToImg(code, defaultOptions);

    res.setHeader("Content-Type", `image/${defaultOptions.format}`);
    res.setHeader("Cache-Control", "public, max-age=86400"); // 24 hours
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### React Component

```jsx
// components/CodeImageGenerator.jsx
import { useState } from "react";

export default function CodeImageGenerator() {
  const [code, setCode] = useState('console.log("Hello, React!");');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/code-to-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          options: {
            lang: "javascript",
            theme: "github-dark",
            format: "png",
          },
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      }
    } catch (error) {
      console.error("Failed to generate image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="code-generator">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={50}
        placeholder="Enter your code here..."
      />
      <br />
      <button onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {imageUrl && (
        <div>
          <h3>Generated Image:</h3>
          <img
            src={imageUrl}
            alt="Generated code"
            style={{ maxWidth: "100%" }}
          />
          <br />
          <a href={imageUrl} download="code.png">
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}
```

## 🎯 Use Case Examples

### Documentation Generator

```javascript
// scripts/generate-docs.js
import { writeFile, readFile, readdir } from "node:fs/promises";
import { pathToImg, codeToImg } from "flashot";
import path from "path";

async function generateDocImages() {
  const examples = [
    {
      name: "basic-usage",
      code: `
import { codeToImg } from "flashot";

const buffer = await codeToImg('console.log("Hello!");');
await writeFile("output.png", buffer);
      `,
      lang: "javascript",
    },
    {
      name: "typescript-example",
      code: `
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
      `,
      lang: "typescript",
    },
    {
      name: "python-example",
      code: `
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Generate first 10 fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
      `,
      lang: "python",
    },
  ];

  const baseOptions = {
    theme: "github-dark",
    format: "png",
    style: {
      padding: 25,
      borderRadius: 8,
    },
    lineNumbers: {
      enabled: true,
      marginRight: 16,
    },
  };

  for (const example of examples) {
    console.log(`Generating ${example.name}...`);

    const buffer = await codeToImg(example.code.trim(), {
      ...baseOptions,
      lang: example.lang,
    });

    await writeFile(`docs/images/${example.name}.png`, buffer);
    console.log(`✅ Generated docs/images/${example.name}.png`);
  }
}

generateDocImages().catch(console.error);
```

### Social Media Code Sharing

```javascript
// social-share.js
import { codeToImg } from "flashot";

async function createSocialCodePost(code, title = "Code Snippet") {
  const buffer = await codeToImg(code, {
    lang: "javascript",
    theme: "dracula",
    format: "png",
    width: 1200, // Twitter optimal width
    style: {
      padding: 40,
      borderRadius: 16,
    },
    lineNumbers: {
      enabled: true,
      color: "#6272a4",
      marginRight: 20,
    },
  });

  await writeFile(
    `social-posts/${title.replace(/\\s+/g, "-").toLowerCase()}.png`,
    buffer
  );
  console.log(`✅ Social media image created: ${title}`);
}

// Create multiple social posts
const snippets = [
  {
    title: "Array Destructuring",
    code: `
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]
    `,
  },
  {
    title: "Async Await Pattern",
    code: `
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
    `,
  },
];

for (const snippet of snippets) {
  await createSocialCodePost(snippet.code.trim(), snippet.title);
}
```

### Code Tutorial Generator

```javascript
// tutorial-generator.js
import { codeToImg } from "flashot";

async function createTutorialStep(step, code, highlights = []) {
  const buffer = await codeToImg(code, {
    lang: "javascript",
    theme: "one-dark-pro",
    format: "webp",
    quality: 95,
    style: {
      padding: 35,
      borderRadius: 12,
    },
    lineNumbers: {
      enabled: true,
      startFrom: 1,
      marginRight: 20,
    },
    highlight:
      highlights.length > 0
        ? {
            enabled: true,
            at: highlights[0],
            depth: highlights.length,
            backgroundColor: "#61dafb30",
            borderRadius: 4,
          }
        : { enabled: false },
  });

  await writeFile(`tutorial/step-${step}.webp`, buffer);
  console.log(`✅ Created tutorial step ${step}`);
}

// React tutorial steps
const tutorialSteps = [
  {
    step: 1,
    code: `
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
    `,
    highlights: [2], // Highlight the return statement
  },
  {
    step: 2,
    code: `
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
    `,
    highlights: [7, 8, 9, 10, 11], // Highlight the App component
  },
];

for (const { step, code, highlights } of tutorialSteps) {
  await createTutorialStep(step, code.trim(), highlights);
}
```

## 🛠️ CLI Examples

### Basic CLI Usage

```bash
# Generate image from inline code
flashot code 'console.log("Hello, CLI!");' --output hello.png

# Convert a file
flashot file package.json --lang json --theme github-dark --output package.png

# Fetch from URL
flashot url "https://raw.githubusercontent.com/user/repo/main/index.js" --output remote-code.png

# With custom styling
flashot code 'function test() { return "styled"; }' \\
  --theme dracula \\
  --format webp \\
  --style-padding 40 \\
  --style-border-radius 15 \\
  --line-numbers-enabled \\
  --output styled-example.webp
```

### Batch Processing Script

```bash
#!/bin/bash
# generate-all-examples.sh

# Create output directory
mkdir -p generated-images

# Generate examples with different themes
themes=("github-dark" "dracula" "monokai" "nord" "one-dark-pro")
code='function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}'

for theme in "${themes[@]}"; do
  echo "Generating example with $theme theme..."
  flashot code "$code" \\
    --theme "$theme" \\
    --lang javascript \\
    --format png \\
    --line-numbers-enabled \\
    --style-padding 30 \\
    --output "generated-images/fibonacci-$theme.png"
done

echo "✅ All examples generated!"
```

## 🎨 Visual Examples

### Different Themes Comparison

```javascript
// theme-comparison.js
import { codeToImg } from "flashot";

const sampleCode = `
class Calculator {
  constructor() {
    this.result = 0;
  }

  add(value) {
    this.result += value;
    return this;
  }

  multiply(value) {
    this.result *= value;
    return this;
  }

  getResult() {
    return this.result;
  }
}

const calc = new Calculator();
const result = calc.add(10).multiply(2).getResult();
console.log(result); // 20
`;

const themes = [
  "github-dark",
  "github-light",
  "dracula",
  "monokai",
  "nord",
  "one-dark-pro",
  "solarized-dark",
  "material-theme-darker",
];

for (const theme of themes) {
  const buffer = await codeToImg(sampleCode, {
    lang: "javascript",
    theme,
    format: "png",
    style: { padding: 25, borderRadius: 8 },
    lineNumbers: { enabled: true },
  });

  await writeFile(`examples/themes/${theme}.png`, buffer);
  console.log(`✅ Generated ${theme} example`);
}
```

### Language Showcase

```javascript
// language-showcase.js
import { codeToImg } from "flashot";

const examples = {
  javascript: `
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

console.log(greet("World"));
  `,
  typescript: `
interface Person {
  name: string;
  age: number;
}

const greet = (person: Person): string => {
  return \`Hello, \${person.name}!\`;
};
  `,
  python: `
def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))
  `,
  rust: `
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Sum: {}", sum);
}
  `,
  go: `
package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    sum := 0
    for _, num := range numbers {
        sum += num
    }
    fmt.Printf("Sum: %d\\n", sum)
}
  `,
};

const baseOptions = {
  theme: "github-dark",
  format: "png",
  style: { padding: 25, borderRadius: 8 },
  lineNumbers: { enabled: true },
};

for (const [lang, code] of Object.entries(examples)) {
  const buffer = await codeToImg(code.trim(), {
    ...baseOptions,
    lang,
  });

  await writeFile(`examples/languages/${lang}.png`, buffer);
  console.log(`✅ Generated ${lang} example`);
}
```

## 🔧 Advanced Examples

### Custom Font Usage

```javascript
// custom-font-example.js
import { readFile } from "node:fs/promises";
import { codeToImg } from "flashot";

// Using a local font file
const fontBuffer = await readFile("./fonts/FiraCode-Regular.woff2");

const buffer = await codeToImg(
  `
const code = "beautiful";
const font = "FiraCode";
console.log(\`\${code} with \${font}\`);
`,
  {
    font: fontBuffer,
    lang: "javascript",
    theme: "dracula",
    format: "png",
  }
);

await writeFile("custom-font-example.png", buffer);

// Using a web font URL
const buffer2 = await codeToImg("console.log('Web font example');", {
  font: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700",
  lang: "javascript",
  theme: "github-dark",
});

await writeFile("web-font-example.png", buffer2);
```

### Performance Benchmarking

```javascript
// benchmark.js
import { codeToImg } from "flashot";

async function benchmarkGeneration() {
  const code = `
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
}

const unsorted = [64, 34, 25, 12, 22, 11, 90];
const sorted = quickSort(unsorted);
console.log(sorted);
  `;

  const iterations = 10;
  const times = [];

  console.log(`Running ${iterations} iterations...`);

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();

    await codeToImg(code, {
      lang: "javascript",
      theme: "github-dark",
      format: "webp",
    });

    const end = performance.now();
    const time = end - start;
    times.push(time);

    console.log(`Iteration ${i + 1}: ${time.toFixed(2)}ms`);
  }

  const average = times.reduce((a, b) => a + b, 0) / times.length;
  const min = Math.min(...times);
  const max = Math.max(...times);

  console.log("\\n📊 Benchmark Results:");
  console.log(`Average: ${average.toFixed(2)}ms`);
  console.log(`Min: ${min.toFixed(2)}ms`);
  console.log(`Max: ${max.toFixed(2)}ms`);
}

benchmarkGeneration();
```

## 🌟 Creative Examples

### Animated Code Reveal

```javascript
// animated-reveal.js
import { codeToImg } from "flashot";

const fullCode = `
function createAnimation() {
  const element = document.querySelector('.target');

  element.style.transform = 'translateX(0)';
  element.style.opacity = '1';
  element.style.transition = 'all 0.3s ease';

  return element;
}

createAnimation();
`;

// Generate frames for animation
const lines = fullCode.trim().split("\\n");
for (let i = 1; i <= lines.length; i++) {
  const partialCode = lines.slice(0, i).join("\\n");

  const buffer = await codeToImg(partialCode, {
    lang: "javascript",
    theme: "dracula",
    format: "png",
    style: { padding: 30 },
    lineNumbers: { enabled: true },
    highlight: {
      enabled: true,
      at: i,
      depth: 1,
      backgroundColor: "#ff79c640",
    },
  });

  await writeFile(
    `animation/frame-${i.toString().padStart(2, "0")}.png`,
    buffer
  );
}

console.log("✅ Animation frames generated!");
```

### Code Diff Visualization

```javascript
// diff-visualization.js
import { codeToImg } from "flashot";

const beforeCode = `
function calculate(a, b) {
  let result = a + b;
  console.log(result);
  return result;
}
`;

const afterCode = `
function calculate(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }

  const result = a + b;
  console.log(\`Result: \${result}\`);
  return result;
}
`;

// Generate "before" image
const beforeBuffer = await codeToImg(beforeCode, {
  lang: "javascript",
  theme: "github-light",
  format: "png",
  style: { padding: 25, backgroundColor: "#fff5f5" }, // Light red background
  lineNumbers: { enabled: true },
});

// Generate "after" image
const afterBuffer = await codeToImg(afterCode, {
  lang: "javascript",
  theme: "github-light",
  format: "png",
  style: { padding: 25, backgroundColor: "#f0fff4" }, // Light green background
  lineNumbers: { enabled: true },
  highlight: {
    enabled: true,
    at: 2,
    depth: 4,
    backgroundColor: "#22c55e30",
  },
});

await writeFile("diff-before.png", beforeBuffer);
await writeFile("diff-after.png", afterBuffer);
console.log("✅ Diff visualization created!");
```

## 🔗 Integration Examples

### GitHub Actions Workflow

```yaml
# .github/workflows/generate-docs.yml
name: Generate Documentation Images

on:
  push:
    paths: ["docs/code-examples/**"]

jobs:
  generate-images:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm install flashot

      - name: Generate documentation images
        run: |
          node -e "
          import { readdirSync } from 'fs';
          import { pathToImg } from 'flashot';

          const files = readdirSync('docs/code-examples');
          for (const file of files) {
            if (file.endsWith('.js')) {
              const buffer = await pathToImg(\`docs/code-examples/\${file}\`, {
                lang: 'javascript',
                theme: 'github-dark',
                format: 'png'
              });
              await writeFile(\`docs/images/\${file}.png\`, buffer);
            }
          }
          "

      - name: Commit generated images
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/images/
          git commit -m "Update documentation images" || exit 0
          git push
```

### VS Code Extension

```javascript
// extension.js (VS Code extension)
const vscode = require('vscode');
const { codeToImg } = require('flashot');

function activate(context) {
  const disposable = vscode.commands.registerCommand('flashot.generateImage', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('No active editor found');
      return;
    }

    const selection = editor.selection;
    const code = editor.document.getText(selection.isEmpty ? undefined : selection);
    const language = editor.document.languageId;

    try {
      const buffer = await codeToImg(code, {
        lang: language,
        theme: 'github-dark',
        format: 'png',
        lineNumbers: { enabled: true }
      });

      const uri = await vscode.window.showSaveDialog({
        defaultUri: vscode.Uri.file('code-snippet.png'),
        filters: { 'Images': ['png'] }
      });

      if (uri) {
        await vscode.workspace.fs.writeFile(uri, buffer);
        vscode.window.showInformationMessage('Code image generated successfully!');
      }
    } catch (error) {
      vscode.window.showErrorMessage(\`Failed to generate image: \${error.message}\`);
    }
  });

  context.subscriptions.push(disposable);
}

module.exports = { activate };
```

## 📱 Frontend Examples

### Vue.js Component

```vue
<!-- CodeImageGenerator.vue -->
<template>
  <div class="code-image-generator">
    <div class="editor-section">
      <label for="code-input">Enter your code:</label>
      <textarea
        id="code-input"
        v-model="code"
        rows="15"
        cols="60"
        placeholder="Enter your code here..."
      ></textarea>

      <div class="options">
        <select v-model="selectedLanguage">
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <select v-model="selectedTheme">
          <option value="github-dark">GitHub Dark</option>
          <option value="dracula">Dracula</option>
          <option value="monokai">Monokai</option>
          <option value="nord">Nord</option>
        </select>

        <button @click="generateImage" :disabled="loading">
          {{ loading ? "Generating..." : "Generate Image" }}
        </button>
      </div>
    </div>

    <div v-if="imageUrl" class="result-section">
      <h3>Generated Image:</h3>
      <img :src="imageUrl" alt="Generated code" />
      <div class="download-section">
        <a :href="imageUrl" :download="\`code-\${Date.now()}.png\`">
          Download Image
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CodeImageGenerator",
  data() {
    return {
      code: 'console.log("Hello, Vue!");',
      selectedLanguage: "javascript",
      selectedTheme: "github-dark",
      imageUrl: null,
      loading: false,
    };
  },
  methods: {
    async generateImage() {
      this.loading = true;
      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: this.code,
            options: {
              lang: this.selectedLanguage,
              theme: this.selectedTheme,
              format: "png",
              lineNumbers: { enabled: true },
            },
          }),
        });

        if (response.ok) {
          const blob = await response.blob();
          this.imageUrl = URL.createObjectURL(blob);
        } else {
          throw new Error("Failed to generate image");
        }
      } catch (error) {
        console.error("Error generating image:", error);
        alert("Failed to generate image. Please try again.");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.code-image-generator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.editor-section {
  margin-bottom: 30px;
}

textarea {
  width: 100%;
  font-family: "Monaco", "Menlo", monospace;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
}

.options {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.result-section img {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.download-section {
  margin-top: 15px;
}
</style>
```

These examples demonstrate the versatility and power of Flashot across different environments and use cases. Each example can be adapted and extended based on your specific needs.

## 🔗 Next Steps

- [CLI Usage Guide](./cli-usage.md) - Learn command-line usage
- [API Reference](./api-reference.md) - Complete API documentation
- [Configuration Guide](./configuration.md) - Detailed options reference
- [Advanced Usage](./advanced.md) - Performance tips and best practices
