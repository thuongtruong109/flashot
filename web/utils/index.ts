import {
  SyntaxMatch,
  SupportedLanguage,
  SyntaxTheme,
  ThemeName,
} from "@/types";

export const themes: Record<ThemeName, SyntaxTheme> = {
  dark: {
    background: "#1e1e1e",
    foreground: "#d4d4d4",
    comment: "#6a9955",
    keyword: "#569cd6",
    string: "#ce9178",
    number: "#b5cea8",
    function: "#dcdcaa",
    operator: "#d4d4d4",
    parameter: "#9cdcfe",
    property: "#9cdcfe",
    className: "#4ec9b0",
  },
  light: {
    background: "#ffffff",
    foreground: "#000000",
    comment: "#008000",
    keyword: "#0000ff",
    string: "#a31515",
    number: "#098658",
    function: "#795e26",
    operator: "#000000",
    parameter: "#001080",
    property: "#001080",
    className: "#267f99",
  },
  monokai: {
    background: "#272822",
    foreground: "#f8f8f2",
    comment: "#75715e",
    keyword: "#f92672",
    string: "#e6db74",
    number: "#ae81ff",
    function: "#a6e22e",
    operator: "#f92672",
    parameter: "#fd971f",
    property: "#66d9ef",
    className: "#a6e22e",
  },
  github: {
    background: "#f6f8fa",
    foreground: "#24292e",
    comment: "#6a737d",
    keyword: "#d73a49",
    string: "#032f62",
    number: "#005cc5",
    function: "#6f42c1",
    operator: "#d73a49",
    parameter: "#e36209",
    property: "#005cc5",
    className: "#6f42c1",
  },
  dracula: {
    background: "#282a36",
    foreground: "#f8f8f2",
    comment: "#6272a4",
    keyword: "#ff79c6",
    string: "#f1fa8c",
    number: "#bd93f9",
    function: "#50fa7b",
    operator: "#ff79c6",
    parameter: "#ffb86c",
    property: "#8be9fd",
    className: "#8be9fd",
  },
  nord: {
    background: "#2e3440",
    foreground: "#d8dee9",
    comment: "#616e88",
    keyword: "#81a1c1",
    string: "#a3be8c",
    number: "#b48ead",
    function: "#88c0d0",
    operator: "#81a1c1",
    parameter: "#d08770",
    property: "#8fbcbb",
    className: "#88c0d0",
  },
  "solarized-dark": {
    background: "#002b36",
    foreground: "#839496",
    comment: "#586e75",
    keyword: "#268bd2",
    string: "#2aa198",
    number: "#d33682",
    function: "#b58900",
    operator: "#859900",
    parameter: "#cb4b16",
    property: "#2aa198",
    className: "#b58900",
  },
  "solarized-light": {
    background: "#fdf6e3",
    foreground: "#657b83",
    comment: "#93a1a1",
    keyword: "#268bd2",
    string: "#2aa198",
    number: "#d33682",
    function: "#b58900",
    operator: "#859900",
    parameter: "#cb4b16",
    property: "#2aa198",
    className: "#b58900",
  },
  material: {
    background: "#263238",
    foreground: "#eeffff",
    comment: "#546e7a",
    keyword: "#c792ea",
    string: "#c3e88d",
    number: "#f78c6c",
    function: "#82aaff",
    operator: "#89ddff",
    parameter: "#ffcb6b",
    property: "#89ddff",
    className: "#ffcb6b",
  },
  "one-dark": {
    background: "#282c34",
    foreground: "#abb2bf",
    comment: "#5c6370",
    keyword: "#c678dd",
    string: "#98c379",
    number: "#d19a66",
    function: "#61afef",
    operator: "#56b6c2",
    parameter: "#e06c75",
    property: "#56b6c2",
    className: "#e5c07b",
  },
  "tomorrow-night": {
    background: "#1d1f21",
    foreground: "#c5c8c6",
    comment: "#969896",
    keyword: "#b294bb",
    string: "#b5bd68",
    number: "#de935f",
    function: "#81a2be",
    operator: "#8abeb7",
    parameter: "#f0c674",
    property: "#8abeb7",
    className: "#81a2be",
  },
  "atom-dark": {
    background: "#1e1e1e",
    foreground: "#c5c8c6",
    comment: "#7c7c7c",
    keyword: "#c678dd",
    string: "#98c379",
    number: "#d19a66",
    function: "#61afef",
    operator: "#56b6c2",
    parameter: "#e5c07b",
    property: "#56b6c2",
    className: "#e5c07b",
  },
  "github-light": {
    background: "#ffffff",
    foreground: "#24292f",
    comment: "#6e7781",
    keyword: "#cf222e",
    string: "#0a3069",
    number: "#0550ae",
    function: "#8250df",
    operator: "#cf222e",
    parameter: "#953800",
    property: "#0550ae",
    className: "#8250df",
  },
  cobalt: {
    background: "#002240",
    foreground: "#ffffff",
    comment: "#0088ff",
    keyword: "#ff9d00",
    string: "#3ad900",
    number: "#ff628c",
    function: "#ffee80",
    operator: "#ff9d00",
    parameter: "#ff9d00",
    property: "#80ffbb",
    className: "#ffee80",
  },
  "night-owl": {
    background: "#011627",
    foreground: "#d6deeb",
    comment: "#637777",
    keyword: "#c792ea",
    string: "#ecc48d",
    number: "#f78c6c",
    function: "#82aaff",
    operator: "#c792ea",
    parameter: "#d7dbe0",
    property: "#7fdbca",
    className: "#ffcb8b",
  },
  palenight: {
    background: "#292d3e",
    foreground: "#a6accd",
    comment: "#676e95",
    keyword: "#c792ea",
    string: "#c3e88d",
    number: "#f78c6c",
    function: "#82aaff",
    operator: "#89ddff",
    parameter: "#f07178",
    property: "#89ddff",
    className: "#ffcb6b",
  },
  "shades-of-purple": {
    background: "#2d2b55",
    foreground: "#e3dfff",
    comment: "#b362ff",
    keyword: "#ff7edb",
    string: "#a5ff90",
    number: "#ff628c",
    function: "#fad000",
    operator: "#ff7edb",
    parameter: "#fb9e00",
    property: "#80ffbb",
    className: "#fad000",
  },
  "ayu-dark": {
    background: "#0a0e14",
    foreground: "#b3b1ad",
    comment: "#626a73",
    keyword: "#ff8f40",
    string: "#aad94c",
    number: "#d2a6ff",
    function: "#ffb454",
    operator: "#f29668",
    parameter: "#e6b673",
    property: "#59c2ff",
    className: "#59c2ff",
  },
  "ayu-light": {
    background: "#fafafa",
    foreground: "#575f66",
    comment: "#abb0b6",
    keyword: "#fa8d3e",
    string: "#86b300",
    number: "#a37acc",
    function: "#f2ae49",
    operator: "#ed9366",
    parameter: "#e6ba7e",
    property: "#55b4d4",
    className: "#55b4d4",
  },
  "gruvbox-dark": {
    background: "#282828",
    foreground: "#ebdbb2",
    comment: "#928374",
    keyword: "#fb4934",
    string: "#b8bb26",
    number: "#d3869b",
    function: "#8ec07c",
    operator: "#fe8019",
    parameter: "#fabd2f",
    property: "#83a598",
    className: "#8ec07c",
  },
  "gruvbox-light": {
    background: "#fbf1c7",
    foreground: "#3c3836",
    comment: "#928374",
    keyword: "#9d0006",
    string: "#79740e",
    number: "#8f3f71",
    function: "#427b58",
    operator: "#af3a03",
    parameter: "#b57614",
    property: "#076678",
    className: "#427b58",
  },
  "tokyo-night": {
    background: "#1a1b26",
    foreground: "#c0caf5",
    comment: "#565f89",
    keyword: "#bb9af7",
    string: "#9ece6a",
    number: "#ff9e64",
    function: "#7aa2f7",
    operator: "#89ddff",
    parameter: "#e0af68",
    property: "#7dcfff",
    className: "#7aa2f7",
  },
  "tokyo-night-storm": {
    background: "#24283b",
    foreground: "#c0caf5",
    comment: "#565f89",
    keyword: "#bb9af7",
    string: "#9ece6a",
    number: "#ff9e64",
    function: "#7aa2f7",
    operator: "#89ddff",
    parameter: "#e0af68",
    property: "#7dcfff",
    className: "#2ac3de",
  },
  "tokyo-night-light": {
    background: "#d5d6db",
    foreground: "#343b58",
    comment: "#9699a3",
    keyword: "#5a4a78",
    string: "#485e30",
    number: "#965027",
    function: "#34548a",
    operator: "#166775",
    parameter: "#8f5e15",
    property: "#0f4b6e",
    className: "#34548a",
  },
  "catppuccin-mocha": {
    background: "#1e1e2e",
    foreground: "#cdd6f4",
    comment: "#6c7086",
    keyword: "#cba6f7",
    string: "#a6e3a1",
    number: "#fab387",
    function: "#89b4fa",
    operator: "#94e2d5",
    parameter: "#f9e2af",
    property: "#89dceb",
    className: "#89b4fa",
  },
  "catppuccin-latte": {
    background: "#eff1f5",
    foreground: "#4c4f69",
    comment: "#9ca0b0",
    keyword: "#8839ef",
    string: "#40a02b",
    number: "#fe640b",
    function: "#1e66f5",
    operator: "#179299",
    parameter: "#df8e1d",
    property: "#04a5e5",
    className: "#1e66f5",
  },
  "synthwave-84": {
    background: "#262335",
    foreground: "#f8f8f2",
    comment: "#848bbd",
    keyword: "#ff7edb",
    string: "#f97e72",
    number: "#ff8b39",
    function: "#fede5d",
    operator: "#ff7edb",
    parameter: "#fdca49",
    property: "#36f9f6",
    className: "#fede5d",
  },
  "panda-syntax": {
    background: "#292a2b",
    foreground: "#e6e6e6",
    comment: "#676b79",
    keyword: "#ff75b5",
    string: "#19f9d8",
    number: "#ffb86c",
    function: "#6fc1ff",
    operator: "#ff9ac1",
    parameter: "#ffb86c",
    property: "#19f9d8",
    className: "#6fc1ff",
  },
};

export const backgrounds = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "#1a1a1a",
  "#ffffff",
];

export const supportedLanguages: { value: SupportedLanguage; label: string }[] =
  [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "scala", label: "Scala" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "scss", label: "SCSS" },
    { value: "json", label: "JSON" },
    { value: "xml", label: "XML" },
    { value: "yaml", label: "YAML" },
    { value: "sql", label: "SQL" },
    { value: "shell", label: "Shell" },
    { value: "powershell", label: "PowerShell" },
    { value: "dockerfile", label: "Dockerfile" },
    { value: "markdown", label: "Markdown" },
  ];

export const fontFamilies = [
  "Fira Code",
  "JetBrains Mono",
  "Source Code Pro",
  "Monaco",
  "Consolas",
  "Menlo",
  "Hack",
  "Cascadia Code",
  "Victor Mono",
  "Operator Mono",
  "Courier New",
  "Lucida Console",
  "DejaVu Sans Mono",
  "monospace",
];

export const escapeHtml = (text: string): string => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    // Server-side fallback
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

export const syntaxHighlight = (
  code: string,
  lang: SupportedLanguage,
  theme?: SyntaxTheme
): string => {
  const getPatternsByLanguage = (language: SupportedLanguage) => {
    const common = [
      { type: "comment" as const, regex: /\/\*[\s\S]*?\*\/|\/\/.*$/gm },
      { type: "string" as const, regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g },
      { type: "number" as const, regex: /\b(\d+(?:\.\d+)?)\b/g },
    ];

    const languagePatterns: Record<SupportedLanguage, any[]> = {
      javascript: [
        { type: "comment" as const, regex: /\/\*[\s\S]*?\*\/|\/\/.*$/gm },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        {
          type: "keyword" as const,
          regex:
            /\b(function|const|let|var|if|else|for|while|return|class|extends|import|export|from|async|await|try|catch|finally|new|this|typeof|instanceof|break|continue|switch|case|default|do)\b/g,
        },
        { type: "number" as const, regex: /\b(\d+(?:\.\d+)?)\b/g },
        {
          type: "className" as const,
          regex: /\b([A-Z]\w*)(?=\s*[{(.]|\s+extends)/g,
        },
        { type: "function" as const, regex: /\b([a-z_$][\w$]*)(?=\s*\()/gi },
        { type: "property" as const, regex: /\.([a-z_$][\w$]*)/gi },
      ],
      typescript: [
        { type: "comment" as const, regex: /\/\*[\s\S]*?\*\/|\/\/.*$/gm },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        {
          type: "keyword" as const,
          regex:
            /\b(function|const|let|var|if|else|for|while|return|class|extends|import|export|from|async|await|try|catch|finally|new|this|typeof|instanceof|interface|type|enum|public|private|protected|readonly|break|continue|switch|case|default|do|implements|namespace|module|declare)\b/g,
        },
        { type: "number" as const, regex: /\b(\d+(?:\.\d+)?)\b/g },
        {
          type: "className" as const,
          regex: /\b([A-Z]\w*)(?=\s*[{(<.]|\s+extends|\s+implements)/g,
        },
        { type: "function" as const, regex: /\b([a-z_$][\w$]*)(?=\s*[<(])/gi },
        { type: "property" as const, regex: /\.([a-z_$][\w$]*)/gi },
      ],
      python: [
        { type: "comment" as const, regex: /#.*$/gm },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        {
          type: "keyword" as const,
          regex:
            /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|lambda|and|or|not|is|in|None|True|False)\b/g,
        },
        { type: "number" as const, regex: /\b(\d+(?:\.\d+)?)\b/g },
        { type: "function" as const, regex: /\b(\w+)(?=\s*\()/g },
      ],
      java: [
        ...common,
        {
          type: "keyword" as const,
          regex:
            /\b(public|private|protected|static|final|class|interface|extends|implements|if|else|for|while|return|new|this|super|import|package|try|catch|finally|throw|throws)\b/g,
        },
        { type: "function" as const, regex: /\b(\w+)(?=\s*\()/g },
      ],
      cpp: [
        ...common,
        {
          type: "keyword" as const,
          regex:
            /\b(#include|#define|int|float|double|char|void|if|else|for|while|return|class|public|private|protected|namespace|using|std|cout|cin|endl)\b/g,
        },
        { type: "function" as const, regex: /\b(\w+)(?=\s*\()/g },
      ],
      c: [
        ...common,
        {
          type: "keyword" as const,
          regex:
            /\b(#include|#define|int|float|double|char|void|if|else|for|while|return|struct|typedef|printf|scanf)\b/g,
        },
        { type: "function" as const, regex: /\b(\w+)(?=\s*\()/g },
      ],
      html: [
        { type: "comment" as const, regex: /<!--[\s\S]*?-->/g },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        { type: "keyword" as const, regex: /<\/?[\w\s="/.':;#-\/\?]+>/g },
      ],
      css: [
        { type: "comment" as const, regex: /\/\*[\s\S]*?\*\//g },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        { type: "keyword" as const, regex: /[\w-]+(?=\s*:)/g },
        {
          type: "number" as const,
          regex: /\b(\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|pt|pc|in|cm|mm)?)\b/g,
        },
      ],
      json: [
        { type: "string" as const, regex: /("[^"]*")/g },
        { type: "number" as const, regex: /\b(\d+(?:\.\d+)?)\b/g },
        { type: "keyword" as const, regex: /\b(true|false|null)\b/g },
      ],
      // Add fallback for other languages
      php: [
        ...common,
        {
          type: "keyword" as const,
          regex:
            /\b(function|class|if|else|for|while|return|public|private|protected|static|extends|implements|namespace|use|try|catch|finally|throw|echo|print|var|const)\b/g,
        },
      ],
      ruby: [
        { type: "comment" as const, regex: /#.*$/gm },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        {
          type: "keyword" as const,
          regex:
            /\b(def|class|if|elsif|else|for|while|return|require|include|module|end|do|begin|rescue|ensure|yield|and|or|not|nil|true|false)\b/g,
        },
      ],
      go: [
        ...common,
        {
          type: "keyword" as const,
          regex:
            /\b(func|package|import|if|else|for|while|return|var|const|type|struct|interface|go|defer|select|switch|case|default|range|make|new|chan|map)\b/g,
        },
      ],
      rust: [
        ...common,
        {
          type: "keyword" as const,
          regex:
            /\b(fn|let|mut|if|else|for|while|return|struct|enum|impl|trait|pub|use|mod|crate|match|Some|None|Ok|Err|Result|Option)\b/g,
        },
      ],
      swift: [
        ...common,
        {
          type: "keyword" as const,
          regex:
            /\b(func|class|struct|if|else|for|while|return|var|let|import|public|private|internal|fileprivate|override|static|final|protocol|extension|enum|case|default|switch|guard|defer)\b/g,
        },
      ],
      kotlin: [
        ...common,
        {
          type: "keyword" as const,
          regex:
            /\b(fun|class|if|else|for|while|return|val|var|import|public|private|internal|protected|override|open|final|abstract|interface|enum|object|companion|data|sealed)\b/g,
        },
      ],
      scala: [
        ...common,
        {
          type: "keyword" as const,
          regex:
            /\b(def|class|object|if|else|for|while|return|val|var|import|public|private|protected|override|abstract|final|sealed|case|match|try|catch|finally|throw|extends|with|trait)\b/g,
        },
      ],
      csharp: [
        ...common,
        {
          type: "keyword" as const,
          regex:
            /\b(class|interface|if|else|for|while|return|public|private|protected|static|readonly|const|override|virtual|abstract|sealed|using|namespace|try|catch|finally|throw|new|this|base)\b/g,
        },
      ],
      scss: [
        { type: "comment" as const, regex: /\/\*[\s\S]*?\*\/|\/\/.*$/gm },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        { type: "keyword" as const, regex: /[\w-]+(?=\s*:)/g },
      ],
      xml: [
        { type: "comment" as const, regex: /<!--[\s\S]*?-->/g },
        { type: "keyword" as const, regex: /<\/?[\w\s="/.':;#-\/\?]+>/g },
      ],
      yaml: [
        { type: "comment" as const, regex: /#.*$/gm },
        { type: "keyword" as const, regex: /^[\s]*[\w-]+(?=\s*:)/gm },
      ],
      sql: [
        { type: "comment" as const, regex: /--.*$/gm },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        {
          type: "keyword" as const,
          regex:
            /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|TABLE|INDEX|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|ORDER|BY|GROUP|HAVING|UNION|ALL|DISTINCT|LIMIT|OFFSET)\b/gi,
        },
      ],
      shell: [
        { type: "comment" as const, regex: /#.*$/gm },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        {
          type: "keyword" as const,
          regex:
            /\b(echo|cd|ls|pwd|mkdir|rmdir|rm|cp|mv|grep|find|sed|awk|sort|uniq|head|tail|cat|less|more|chmod|chown|sudo|su|ps|kill|jobs|bg|fg|nohup|crontab|which|whereis|locate|man|history|alias|unalias|export|env|set|unset|source|bash|sh|zsh|fish)\b/g,
        },
      ],
      powershell: [
        { type: "comment" as const, regex: /#.*$/gm },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        {
          type: "keyword" as const,
          regex:
            /\b(Get-|Set-|New-|Remove-|Clear-|Add-|Copy-|Move-|Rename-|Test-|Start-|Stop-|Restart-|Suspend-|Resume-|Wait-|Write-|Read-|Select-|Where-|ForEach-|Sort-|Group-|Measure-|Compare-|Tee-|Out-|Export-|Import-|ConvertTo-|ConvertFrom-|if|else|elseif|switch|for|foreach|while|do|until|break|continue|return|function|param|begin|process|end|try|catch|finally|throw)\b/gi,
        },
      ],
      dockerfile: [
        { type: "comment" as const, regex: /#.*$/gm },
        {
          type: "string" as const,
          regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
        },
        {
          type: "keyword" as const,
          regex:
            /\b(FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/gi,
        },
      ],
      markdown: [
        { type: "comment" as const, regex: /<!--[\s\S]*?-->/g },
        { type: "keyword" as const, regex: /^#{1,6}\s.*/gm },
        { type: "string" as const, regex: /\*\*.*?\*\*|__.*?__|`.*?`/g },
      ],
    };

    return languagePatterns[language] || common;
  };

  const patterns = getPatternsByLanguage(lang);

  // Find all matches for each pattern
  const allMatches: SyntaxMatch[] = [];
  patterns.forEach((pattern) => {
    let match;
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
    while ((match = regex.exec(code)) !== null) {
      allMatches.push({
        type: pattern.type,
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
      });
    }
  });

  // Sort matches by start position
  allMatches.sort((a, b) => a.start - b.start);

  // Remove overlapping matches (keep the first one)
  const nonOverlapping: SyntaxMatch[] = [];
  allMatches.forEach((match) => {
    const isOverlapping = nonOverlapping.some(
      (existing) =>
        (match.start >= existing.start && match.start < existing.end) ||
        (match.end > existing.start && match.end <= existing.end)
    );
    if (!isOverlapping) {
      nonOverlapping.push(match);
    }
  });

  // Build the highlighted code with theme colors
  let result = "";
  let lastIndex = 0;

  nonOverlapping.forEach((match) => {
    // Add text before the match
    result += escapeHtml(code.slice(lastIndex, match.start));
    // Add the highlighted match with theme color
    const color = theme ? theme[match.type] || theme.foreground : undefined;
    const style = color ? ` style="color: ${color}"` : "";
    result += `<span class="syntax-${match.type}"${style}>${escapeHtml(
      match.text
    )}</span>`;
    lastIndex = match.end;
  });

  // Add remaining text
  result += escapeHtml(code.slice(lastIndex));

  return result;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      console.warn("Clipboard API not available");
      return false;
    }
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

export const getFileExtension = (language: string): string => {
  const extensions: Record<string, string> = {
    javascript: "js",
    typescript: "ts",
    python: "py",
    java: "java",
    cpp: "cpp",
    c: "c",
    csharp: "cs",
    php: "php",
    ruby: "rb",
    go: "go",
    rust: "rs",
    swift: "swift",
    kotlin: "kt",
    scala: "scala",
    html: "html",
    css: "css",
    scss: "scss",
    json: "json",
    xml: "xml",
    yaml: "yml",
    markdown: "md",
    sql: "sql",
    shell: "sh",
    powershell: "ps1",
    dockerfile: "dockerfile",
  };
  return extensions[language] || "txt";
};

// Re-export transparent grid utilities
export {
  generateTransparentGrid,
  transparentGridPatterns,
  getTransparentGridCSS,
} from "./transparentGrid";
