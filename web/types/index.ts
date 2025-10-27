export interface SyntaxTheme {
  background: string;
  foreground: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  function: string;
  operator: string;
  parameter?: string; // Color for function parameters
  property?: string; // Color for object properties
  className?: string; // Color for class names
  variable?: string; // Color for variables
}

export interface HighlightRange {
  id: string;
  startLine: number;
  endLine: number;
  color: string;
  type?: "add" | "remove" | "change" | "neutral";
}

export interface WatermarkSettings {
  enabled: boolean;
  type: "text" | "image"; // Type of watermark
  text: string;
  imageUrl?: string; // URL or data URL for image
  opacity: number;
  color: string;
  x: number; // Position in pixels from left
  y: number; // Position in pixels from top
  rotation: number; // Rotation in degrees
  fontSize?: number;
  fontWeight?: number;
  imageWidth?: number; // Width for image watermark in pixels
  imageHeight?: number; // Height for image watermark in pixels
}

export interface CodeSettings {
  language: string;
  theme: string;
  background: string;
  showBackground: boolean;
  gradientAngle?: number; // Angle for gradient backgrounds (0-360deg)
  padding: number;
  borderRadius: number;
  frameBorderRadius?: number;
  codeBorderRadius?: number;
  showWindowHeader: boolean;
  windowHeaderAlign?: "left" | "right";
  showTrafficLights?: boolean;
  showTrafficLightsColor?: boolean;
  fileName: string;
  fontFamily: string;
  fontSize: number;
  showLineCount?: boolean;
  showFileName?: boolean;
  exportFormat?: "png" | "jpg" | "webp" | "avif" | "svg" | "original" | "plain";
  width?: number;
  height?: number;
  wordWrap?: boolean;
  showCaption?: boolean;
  captionText?: string;
  captionStyle?: "italic" | "normal";
  captionOpacity?: number;
  captionPosition?: "top" | "bottom" | "left" | "right";
  fileNameOpacity?: number;
  fileNameFontSize?: number;
  fileNameAlign?: "left" | "center";
  lineCountOpacity?: number;
  fileNameFontWeight?: number;
  lineCountFontSize?: number;
  lineCountFontWeight?: number;
  showLineNumbers?: boolean;
  lineNumberOpacity?: number;
  lineNumberBorder?: boolean;
  lineNumberTextAlign?: "left" | "center" | "right";
  highlights?: HighlightRange[];
  watermark?: WatermarkSettings;

  // Border customization
  borderOffset?: number;
  borderStyle?: "solid" | "dashed" | "dotted" | "double" | "none";
  borderWidth?: number;
  borderOpacity?: number;
  borderColor?: string;

  // Header customization
  headerGap?: number; // Gap/spacing between header and code area in pixels
  showHeaderBorder?: boolean; // Show/hide border between header and code
  headerBorderColor?: string; // Color of the header border

  // Image filters
  imageFilters?: {
    grayscale?: number; // 0-100
    sepia?: number; // 0-100
    blur?: number; // 0-10
    brightness?: number; // 0-200
    contrast?: number; // 0-200
    saturate?: number; // 0-200
    hueRotate?: number; // 0-360
    invert?: number; // 0-100
  };
}

export interface SyntaxMatch {
  type:
    | "comment"
    | "string"
    | "keyword"
    | "number"
    | "function"
    | "operator"
    | "parameter"
    | "property"
    | "className";
  start: number;
  end: number;
  text: string;
}

export type SupportedLanguage =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp"
  | "c"
  | "csharp"
  | "php"
  | "ruby"
  | "go"
  | "rust"
  | "swift"
  | "kotlin"
  | "scala"
  | "html"
  | "css"
  | "scss"
  | "json"
  | "xml"
  | "yaml"
  | "sql"
  | "shell"
  | "powershell"
  | "dockerfile"
  | "markdown"
  | "plaintext";

export type ThemeName =
  | "dark"
  | "light"
  | "monokai"
  | "github"
  | "dracula"
  | "nord"
  | "solarized-dark"
  | "solarized-light"
  | "material"
  | "one-dark"
  | "tomorrow-night"
  | "atom-dark"
  | "github-light"
  | "cobalt"
  | "night-owl"
  | "palenight"
  | "shades-of-purple"
  | "ayu-dark"
  | "ayu-light"
  | "gruvbox-dark"
  | "gruvbox-light"
  | "tokyo-night"
  | "tokyo-night-storm"
  | "tokyo-night-light"
  | "catppuccin-mocha"
  | "catppuccin-latte"
  | "synthwave-84"
  | "panda-syntax";
