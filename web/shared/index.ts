import type { CodeSettings } from "@/types";

export const _VERSION = "v1.4.4";

export const _PLAYGROUND_SETTINGS_TAB = {
  VIEW: "View",
  THEME: "Theme",
  MAKEUP: "Makeup",
} as const;

export const DEFAULT_CODE_SETTINGS: CodeSettings = {
  language: "javascript",
  theme: "dracula",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  showBackground: true,
  padding: 30,
  borderRadius: 10,
  showWindowHeader: true,
  windowHeaderAlign: "left",
  fontFamily: "Fira Code",
  fontSize: 14,
  showTrafficLights: true,
  showTrafficLightsColor: true,
  showFileName: true,
  fileName: "index",
  fileNameOpacity: 0.5,
  fileNameFontWeight: 400,
  fileNameFontSize: 13,
  showLineCount: false,
  lineCountOpacity: 0.5,
  lineCountFontWeight: 400,
  lineCountFontSize: 13,
  exportFormat: "webp",
  width: undefined,
  height: undefined,
  wordWrap: false,
  showCaption: false,
  captionText: "Figure: Sample code snippet",
  captionStyle: "normal",
  captionOpacity: 0.5,
  captionPosition: "bottom",
  showLineNumbers: true,
  lineNumberOpacity: 0.5,
  lineNumberBorder: false,
  lineNumberTextAlign: "center",
};
