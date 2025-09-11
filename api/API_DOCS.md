# Flashot API Documentation

A REST API for converting code to beautiful images with syntax highlighting.

## Base URL

```
http://localhost:8080
```

## Endpoints

### 1. Convert Code String to Image

**POST** `/`

Convert a code string directly to an image.

#### Request Body

```json
{
  "code": "console.log('Hello, World!');",
  "options": {
    "lang": "javascript",
    "theme": "github-dark",
    "format": "png",
    "quality": 100,
    "style": {
      "padding": 25,
      "borderRadius": 8
    },
    "lineNumbers": {
      "enabled": true,
      "startFrom": 1,
      "color": "#7b7f8b"
    }
  }
}
```

#### Response

Returns the generated image as binary data with appropriate headers.

---

### 2. Convert Code from URL to Image

**POST** `/url`

Fetch code from a URL and convert it to an image.

#### Request Body

```json
{
  "url": "https://raw.githubusercontent.com/user/repo/main/file.js",
  "options": {
    "lang": "javascript",
    "theme": "dracula",
    "format": "webp"
  }
}
```

#### Response

Returns the generated image as binary data.

---

### 3. Convert Code from File Path to Image

**POST** `/file`

Read code from a local file path and convert it to an image.

#### Request Body

```json
{
  "path": "../package.json",
  "options": {
    "lang": "json",
    "theme": "monokai",
    "format": "png"
  }
}
```

#### Response

Returns the generated image as binary data.

---

### 4. Convert Code from Hex Buffer to Image

**POST** `/buffer`

Convert a hex-encoded buffer containing code to an image.

#### Request Body

```json
{
  "buffer": "636f6e736f6c652e6c6f672827486565c6c6f27293b",
  "options": {
    "lang": "javascript",
    "theme": "nord"
  }
}
```

#### Response

Returns the generated image as binary data.

---

### 5. Get Available Options

**GET** `/options`

Get all available configuration options, themes, languages, and default values.

#### Response

```json
{
  "languages": ["javascript", "typescript", "python", "java", "..."],
  "themes": ["github-dark", "github-light", "dracula", "monokai", "..."],
  "formats": ["png", "jpeg", "webp", "avif"],
  "fonts": {
    "JetBrainsMono": "https://fonts.bunny.net/jetbrains-mono/...",
    "UbuntuSansMono": "https://fonts.bunny.net/ubuntu-sans-mono/...",
    "Abeezee": "https://fonts.bunny.net/abeezee/..."
  },
  "defaultOptions": {
    "lang": "js",
    "theme": "dracula",
    "format": "webp",
    "quality": 100,
    "...": "..."
  }
}
```

---

### 6. Health Check

**GET** `/health`

Check if the API is running properly.

#### Response

```json
{
  "status": "healthy",
  "service": "flashot-api",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Options Reference

### ThemeOptions

| Option    | Type               | Default       | Description                                  |
| --------- | ------------------ | ------------- | -------------------------------------------- |
| `lang`    | string             | `"js"`        | Programming language for syntax highlighting |
| `theme`   | string             | `"dracula"`   | Color theme for syntax highlighting          |
| `font`    | string/ArrayBuffer | JetBrainsMono | Font URL or buffer                           |
| `format`  | string             | `"webp"`      | Output format: png, jpeg, webp, avif         |
| `quality` | number             | `100`         | Image quality (1-100)                        |
| `width`   | number             | `0`           | Fixed width (0 = auto)                       |
| `height`  | number             | `0`           | Fixed height (0 = auto)                      |
| `bg`      | string             | `"null"`      | Background color                             |
| `gap`     | number             | `1`           | Gap between elements                         |

### Style Options

| Option         | Type   | Default | Description                       |
| -------------- | ------ | ------- | --------------------------------- |
| `padding`      | number | `25`    | Padding around the code           |
| `borderRadius` | number | `8`     | Border radius for rounded corners |

### Line Numbers Options

| Option        | Type    | Default     | Description                   |
| ------------- | ------- | ----------- | ----------------------------- |
| `enabled`     | boolean | `false`     | Show line numbers             |
| `startFrom`   | number  | `1`         | Starting line number          |
| `color`       | string  | `"#7b7f8b"` | Line number color             |
| `marginRight` | number  | `0`         | Right margin for line numbers |

### Highlight Options

| Option            | Type    | Default       | Description                  |
| ----------------- | ------- | ------------- | ---------------------------- |
| `enabled`         | boolean | `false`       | Enable line highlighting     |
| `backgroundColor` | string  | `"#347faa23"` | Highlight background color   |
| `borderRadius`    | number  | `0`           | Highlight border radius      |
| `at`              | number  | `1`           | Line number to highlight     |
| `depth`           | number  | `1`           | Number of lines to highlight |

## Example Usage

### JavaScript/Node.js

```javascript
const response = await fetch("http://localhost:8080/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    code: 'const hello = "Hello, World!";',
    options: {
      lang: "javascript",
      theme: "github-dark",
      format: "png",
    },
  }),
});

const imageBuffer = await response.arrayBuffer();
// Save or use the image buffer
```

### Python

```python
import requests

response = requests.post('http://localhost:8080/', json={
    'code': 'print("Hello, World!")',
    'options': {
        'lang': 'python',
        'theme': 'monokai',
        'format': 'png'
    }
})

with open('output.png', 'wb') as f:
    f.write(response.content)
```

### cURL

```bash
curl -X POST http://localhost:8080/ \
  -H "Content-Type: application/json" \
  -d '{
    "code": "console.log(\"Hello, World!\");",
    "options": {
      "lang": "javascript",
      "theme": "github-dark",
      "format": "png"
    }
  }' \
  --output code-image.png
```

## Error Responses

All endpoints return error responses in JSON format:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:

- `400` - Bad Request (missing required parameters)
- `500` - Internal Server Error (processing failed)

## Performance Notes

- Images are generated in ~135ms on average
- Supports caching for better performance
- Multiple output formats with quality control
- Optimized for high throughput
