import { SyntaxMatch, SupportedLanguage, Theme, ThemeName } from "@/types";

export const themes: Record<ThemeName, Theme> = {
  dark: {
    background: "#1e1e1e",
    foreground: "#d4d4d4",
    comment: "#6a9955",
    keyword: "#569cd6",
    string: "#ce9178",
    number: "#b5cea8",
    function: "#dcdcaa",
    operator: "#d4d4d4",
  },
  light: {
    background: "#ffffff",
    foreground: "#333333",
    comment: "#008000",
    keyword: "#0000ff",
    string: "#a31515",
    number: "#098658",
    function: "#795e26",
    operator: "#333333",
  },
  monokai: {
    background: "#272822",
    foreground: "#f8f8f2",
    comment: "#75715e",
    keyword: "#f92672",
    string: "#e6db74",
    number: "#ae81ff",
    function: "#a6e22e",
    operator: "#f8f8f2",
  },
  github: {
    background: "#f6f8fa",
    foreground: "#24292e",
    comment: "#6a737d",
    keyword: "#d73a49",
    string: "#032f62",
    number: "#005cc5",
    function: "#6f42c1",
    operator: "#24292e",
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
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
  ];

export const fontFamilies = ["Fira Code", "Monaco", "Consolas", "Courier New"];

export const escapeHtml = (text: string): string => {
  if (typeof window === "undefined") {
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
  lang: SupportedLanguage
): string => {
  if (lang === "javascript" || lang === "typescript") {
    // Create an array to store tokens with their types
    const currentIndex = 0;

    // Tokenize the code
    const patterns = [
      { type: "comment" as const, regex: /\/\*[\s\S]*?\*\/|\/\/.*$/gm },
      { type: "string" as const, regex: /(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g },
      {
        type: "keyword" as const,
        regex:
          /\b(function|const|let|var|if|else|for|while|return|class|extends|import|export|from|async|await|try|catch|finally)\b/g,
      },
      { type: "number" as const, regex: /\b(\d+(?:\.\d+)?)\b/g },
      { type: "function" as const, regex: /\b(\w+)(?=\s*\()/g },
    ];

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

    // Build the highlighted code
    let result = "";
    let lastIndex = 0;

    nonOverlapping.forEach((match) => {
      // Add text before the match
      result += escapeHtml(code.slice(lastIndex, match.start));
      // Add the highlighted match
      result += `<span class="syntax-${match.type}">${escapeHtml(
        match.text
      )}</span>`;
      lastIndex = match.end;
    });

    // Add remaining text
    result += escapeHtml(code.slice(lastIndex));

    return result;
  }
  return escapeHtml(code);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
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
