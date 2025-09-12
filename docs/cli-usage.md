# CLI Usage Guide

Master the Flashot command-line interface for rapid code-to-image generation from your terminal.

## 🚀 Quick Start

### Installation

```bash
npm install -g flashot
```

### Basic Usage

```bash
flashot code 'console.log("Hello, World!");' --output hello.png
```

## 📋 Commands Overview

Flashot CLI provides four main commands for different input sources:

| Command  | Description                | Example                                     |
| -------- | -------------------------- | ------------------------------------------- |
| `code`   | Convert inline code string | `flashot code 'console.log("test");'`       |
| `file`   | Convert local file         | `flashot file package.json`                 |
| `url`    | Convert code from URL      | `flashot url "https://example.com/code.js"` |
| `buffer` | Convert hex buffer string  | `flashot buffer "48656c6c6f"`               |

### Global Options

```bash
flashot --version          # Show version
flashot --help             # Show help
flashot [command] --help   # Show command-specific help
```

## 🛠️ Command Details

### 1. `code` - Inline Code

Convert code strings directly to images:

```bash
# Basic usage
flashot code 'console.log("Hello, CLI!");'

# With custom options
flashot code 'function test() { return "styled"; }' \\
  --lang javascript \\
  --theme dracula \\
  --output my-function.png
```

**Example: Multi-line code**

```bash
flashot code 'function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));' \\
  --lang javascript \\
  --theme github-dark \\
  --line-numbers-enabled \\
  --output fibonacci.webp
```

### 2. `file` - Local Files

Convert local files to images:

```bash
# Convert package.json
flashot file package.json --lang json --output package.png

# Convert TypeScript file
flashot file src/index.ts --lang typescript --theme nord

# Convert with relative path
flashot file ../utils/helper.js --theme monokai --output helper.webp
```

**Example: Batch processing**

```bash
# Process multiple files
for file in src/*.js; do
  flashot file "$file" --lang javascript --theme github-dark --output "images/$(basename "$file").png"
done
```

### 3. `url` - Remote URLs

Fetch and convert code from URLs:

```bash
# GitHub raw file
flashot url "https://raw.githubusercontent.com/user/repo/main/index.js" \\
  --lang javascript \\
  --output remote-code.png

# Any text URL
flashot url "https://example.com/api/code" \\
  --lang python \\
  --theme dracula
```

**Example: Documentation from GitHub**

```bash
flashot url "https://raw.githubusercontent.com/microsoft/vscode/main/package.json" \\
  --lang json \\
  --theme github-light \\
  --style-padding 30 \\
  --output vscode-package.png
```

### 4. `buffer` - Hex Buffers

Convert hex buffer strings to images:

```bash
# Basic hex buffer (represents "Hello!")
flashot buffer "48656c6c6f21" \\
  --lang text \\
  --output buffer-hello.png

# JavaScript code as hex
flashot buffer "636F6E736F6C652E6C6F67282248656C6C6F2122293B" \\
  --lang javascript \\
  --theme monokai
```

## ⚙️ Complete Options Reference

### Output Options

```bash
-o, --output <file>                    # Output file path (default: "tmp.webp")
-F, --format <format>                  # Image format: png, jpeg, webp, avif (default: "webp")
-q, --quality <percent>                # JPEG quality 1-100 (default: "100")
```

### Language & Theme

```bash
-l, --lang <language>                  # Programming language (default: "js")
-t, --theme <theme>                    # Syntax theme (default: "dracula")
-f, --font <font>                      # Font URL or path (default: JetBrains Mono)
```

### Image Dimensions

```bash
-W, --width <pixels>                   # Image width (auto by default)
-H, --height <pixels>                  # Image height (auto by default)
-g, --gap <pixels>                     # Line spacing (default: "1")
```

### Styling

```bash
-p, --style-padding <pixels>           # Padding around code (default: "25")
-r, --style-border-radius <pixels>     # Border radius (default: "8")
-b, --bg <color>                       # Background color (theme default)
```

### Line Numbers

```bash
-L, --line-numbers-enabled             # Enable line numbers (default: false)
--line-numbers-start-from <number>     # Starting line number (default: "1")
--line-numbers-color <color>           # Line number color (default: "#7b7f8b")
--line-numbers-margin-right <pixels>   # Margin after line numbers (default: "0")
```

### Line Highlighting

```bash
--highlight-enabled                    # Enable line highlighting (default: false)
--highlight-background-color <color>   # Highlight background (default: "#347faa23")
--highlight-border-radius <pixels>     # Highlight border radius (default: "0")
--highlight-at <line>                  # Line to highlight (default: "1")
--highlight-depth <number>             # Number of lines to highlight (default: "1")
```

### Debug Options

```bash
-v, --verbose                          # Enable verbose output
-h, --help                             # Show help information
```

## 🎨 Practical Examples

### Documentation Images

```bash
# Create a beautiful API example
flashot code 'async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}' \\
  --lang javascript \\
  --theme github-dark \\
  --format png \\
  --style-padding 40 \\
  --style-border-radius 12 \\
  --line-numbers-enabled \\
  --output api-example.png
```

### Social Media Posts

```bash
# Twitter-optimized code image
flashot code 'const tips = [
  "Use const for constants",
  "Prefer async/await over callbacks",
  "Always handle errors gracefully"
];

tips.forEach(tip => console.log(`💡 ${tip}`));' \\
  --lang javascript \\
  --theme dracula \\
  --format webp \\
  --width 1200 \\
  --style-padding 50 \\
  --line-numbers-enabled \\
  --highlight-enabled \\
  --highlight-at 5 \\
  --highlight-depth 1 \\
  --output social-tips.webp
```

### Tutorial Screenshots

```bash
# Step-by-step tutorial
flashot code 'function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}' \\
  --lang javascript \\
  --theme one-dark-pro \\
  --line-numbers-enabled \\
  --highlight-enabled \\
  --highlight-at 3 \\
  --highlight-depth 3 \\
  --highlight-background-color "#61dafb30" \\
  --style-padding 35 \\
  --output tutorial-debounce.png
```

### Configuration Files

```bash
# Beautiful config file display
flashot file .eslintrc.json \\
  --lang json \\
  --theme material-theme-darker \\
  --format png \\
  --style-padding 30 \\
  --line-numbers-enabled \\
  --line-numbers-color "#82aaff" \\
  --output eslint-config.png
```

## 📁 Batch Processing Scripts

### Process All Files in Directory

```bash
#!/bin/bash
# generate-code-images.sh

THEME="github-dark"
OUTPUT_DIR="generated-images"
mkdir -p "$OUTPUT_DIR"

# Process JavaScript files
for file in src/*.js; do
  if [ -f "$file" ]; then
    filename=$(basename "$file" .js)
    echo "Processing $file..."
    flashot file "$file" \\
      --lang javascript \\
      --theme "$THEME" \\
      --format png \\
      --line-numbers-enabled \\
      --style-padding 25 \\
      --output "$OUTPUT_DIR/${filename}.png"
  fi
done

echo "✅ All JavaScript files processed!"
```

### Generate Multiple Themes

```bash
#!/bin/bash
# theme-comparison.sh

CODE='function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));'

THEMES=("github-dark" "dracula" "monokai" "nord" "one-dark-pro")

for theme in "${THEMES[@]}"; do
  echo "Generating $theme theme..."
  flashot code "$CODE" \\
    --lang javascript \\
    --theme "$theme" \\
    --format png \\
    --line-numbers-enabled \\
    --style-padding 30 \\
    --output "themes/example-$theme.png"
done

echo "✅ Theme comparison images generated!"
```

### Automated Documentation

```bash
#!/bin/bash
# auto-docs.sh

# Generate README code examples
flashot code 'import { codeToImg } from "flashot";

const buffer = await codeToImg("console.log(\\"Hello!\\");");
await writeFile("output.png", buffer);' \\
  --lang javascript \\
  --theme github-dark \\
  --format webp \\
  --line-numbers-enabled \\
  --output docs/readme-example.webp

# Generate CLI usage example
flashot code 'flashot code "console.log(\\"Hello, CLI!\\");" --output hello.png' \\
  --lang bash \\
  --theme terminal \\
  --format png \\
  --style-padding 20 \\
  --bg "#0d1117" \\
  --output docs/cli-example.png

echo "✅ Documentation images updated!"
```

## 🔧 Advanced Usage

### Custom Fonts

```bash
# Use Google Fonts
flashot code 'const code = "beautiful";' \\
  --font "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700" \\
  --lang javascript \\
  --output custom-font.png

# Use local font file
flashot code 'print("Custom font example")' \\
  --font "./fonts/UbuntuMono-Regular.ttf" \\
  --lang python \\
  --output local-font.png
```

### Environment Variables

```bash
# Set default options via environment
export FLASHOT_THEME="dracula"
export FLASHOT_LANG="javascript"
export FLASHOT_FORMAT="webp"

# Now these become defaults
flashot code 'console.log("Using defaults");'
```

### Complex Highlighting

```bash
# Highlight multiple sections
flashot code 'class Calculator {
  constructor() {
    this.result = 0;
  }

  add(value) {
    this.result += value;
    return this;
  }

  getResult() {
    return this.result;
  }
}' \\
  --lang javascript \\
  --theme one-dark-pro \\
  --line-numbers-enabled \\
  --highlight-enabled \\
  --highlight-at 6 \\
  --highlight-depth 4 \\
  --highlight-background-color "#98c37930" \\
  --output calculator-class.png
```

## 🔍 Troubleshooting

### Common Issues

#### Command Not Found

```bash
# Make sure flashot is installed globally
npm list -g flashot

# Or use npx
npx flashot code 'console.log("test");'
```

#### Permission Errors

```bash
# Use npx instead of global install
npx flashot code 'test' --output ./test.png

# Or fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

#### Invalid Options

```bash
# Check available themes
flashot code 'test' --theme invalid-theme --verbose

# Check supported languages
flashot code 'test' --lang invalid-lang --verbose
```

#### Output Directory Issues

```bash
# Create output directory first
mkdir -p images/
flashot code 'test' --output images/test.png

# Use absolute paths
flashot code 'test' --output "$(pwd)/output.png"
```

### Debugging Tips

```bash
# Use verbose mode for debugging
flashot code 'console.log("debug");' --verbose

# Test with minimal options first
flashot code 'test'

# Check version and help
flashot --version
flashot --help
```

## 📊 Performance Tips

### Optimize for Speed

```bash
# Use WebP for smaller files and faster generation
flashot code 'test' --format webp

# Reduce quality for faster processing (JPEG only)
flashot code 'test' --format jpeg --quality 80

# Use smaller dimensions when possible
flashot code 'test' --width 800 --height 600
```

### Batch Optimization

```bash
# Process files in parallel
for file in src/*.js; do
  flashot file "$file" --output "images/$(basename "$file").png" &
done
wait
```

## 🌟 Creative Uses

### Code Art

```bash
# Create artistic code presentations
flashot code 'const art = {
  beauty: "in simplicity",
  code: "is poetry",
  function: (idea) => implementation
};' \\
  --lang javascript \\
  --theme synthwave-84 \\
  --format png \\
  --style-padding 60 \\
  --style-border-radius 20 \\
  --bg "linear-gradient(45deg, #ff006e, #8338ec)" \\
  --output code-art.png
```

### Code Slides

```bash
# Generate presentation slides
SLIDE_CODE='// Slide 1: Introduction
function introduction() {
  return "Welcome to Advanced JavaScript!";
}'

flashot code "$SLIDE_CODE" \\
  --lang javascript \\
  --theme github-dark \\
  --width 1920 \\
  --height 1080 \\
  --style-padding 100 \\
  --output slides/slide-01.png
```

## 🔗 Integration

### Makefile Integration

```makefile
# Makefile
docs-images:
	flashot file src/index.js --output docs/main-example.png
	flashot code 'const hello = "world";' --output docs/hello.png

clean-images:
	rm -rf docs/images/*.png

.PHONY: docs-images clean-images
```

### Package.json Scripts

```json
{
  "scripts": {
    "docs:images": "flashot file README.md --lang markdown --output docs/readme.png",
    "examples": "bash scripts/generate-examples.sh",
    "social": "flashot code 'console.log(\"Follow us!\");' --theme dracula --output social.png"
  }
}
```

### GitHub Actions

```yaml
# .github/workflows/docs.yml
- name: Generate code images
  run: |
    npm install -g flashot
    flashot file package.json --lang json --output docs/package.png
    flashot code 'console.log("CI/CD rocks!");' --output docs/ci-example.png
```

## 🔗 Next Steps

- [API Reference](./api-reference.md) - Complete REST API documentation
- [Configuration Guide](./configuration.md) - Detailed options reference
- [Examples](./examples.md) - More practical examples
- [Advanced Usage](./advanced.md) - Performance optimization and tips
