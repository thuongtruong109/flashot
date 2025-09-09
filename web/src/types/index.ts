export interface Theme {
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
  | "html"
  | "css";

export type ThemeName = "dark" | "light" | "monokai" | "github";
