### 1. Watermark Support

Add optional watermarks to generated images for branding:

```bash
# src/types.d.ts
export type ThemeOptions = {
  # ...existing options
  watermark?: {
    text: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    opacity?: number;
    fontSize?: number;
    color?: string;
  };
};
```

### 2. Frame/Window Chrome

Add macOS/Windows/VS Code-style window frames:

```bash
# src/types.d.ts
export type ThemeOptions = {
  # ...existing options
  frame?: {
    type: 'macos' | 'windows' | 'vscode' | 'terminal';
    title?: string;
  };
};
```

## 3. SVG Export

Add vector format support for scalable images:

```bash
# src/types.d.ts
format?: OutputFormat.WebP | OutputFormat.Png | OutputFormat.Jpeg | OutputFormat.Svg;
```

### 4. Base64 Data URL Export

Direct base64 string output for web embedding:

```bash
# src/index.ts
export async function codeToDataUrl(
  code: string,
  options?: ThemeOptions,
): Promise<string>;
```

### 5. Configuration File Support

Support for config files (`.flashotrc.json`):

```bash
# src/config.ts
export async function loadConfig(configPath?: string): Promise<ThemeOptions>;
```
