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

export interface CodeSettings {
  language: string;
  theme: string;
  background: string;
  showBackground: boolean;
  padding: number;
  borderRadius: number;
  showWindowControls: boolean;
  fontFamily: string;
  fontSize: number;
  showLineCount?: boolean;
  showFileName?: boolean;
  exportFormat?: "png" | "jpg" | "webp" | "avif" | "svg";
  width?: number;
  height?: number;
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
