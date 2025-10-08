export interface SyntaxTheme {
  background: string;
  foreground: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  function: string;
  operator: string;
}

export interface HighlightRange {
  id: string;
  startLine: number;
  endLine: number;
  color: string;
  type?: "add" | "remove" | "change" | "neutral";
}

export interface CodeSettings {
  language: string;
  theme: string;
  background: string;
  showBackground: boolean;
  padding: number;
  borderRadius: number;
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
  lineCountOpacity?: number;
  fileNameFontWeight?: number;
  lineCountFontSize?: number;
  lineCountFontWeight?: number;
  showLineNumbers?: boolean;
  lineNumberOpacity?: number;
  lineNumberBorder?: boolean;
  lineNumberTextAlign?: "left" | "center" | "right";
  highlights?: HighlightRange[];
}

export interface SyntaxMatch {
  type: "comment" | "string" | "keyword" | "number" | "function" | "operator";
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
  | "markdown";

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
  | "atom-dark";
