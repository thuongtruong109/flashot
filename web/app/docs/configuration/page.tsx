import React from "react";
import { readFile } from "fs/promises";
import { join } from "path";
import MarkdownRenderer from "../../components/MarkdownRenderer";

async function getDocContent() {
  try {
    const docsPath = join(process.cwd(), "..", "docs", "configuration.md");
    const content = await readFile(docsPath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading configuration docs:", error);
    return `# Configuration

Unable to load the configuration guide. Please check that the docs/configuration.md file exists.

## Basic Configuration

\`\`\`javascript
const config = {
  // Code content
  code: 'console.log("Hello!");',

  // Language highlighting
  language: 'javascript',

  // Visual theme
  theme: 'dracula',

  // Output format
  format: 'webp'
};
\`\`\`

[View Full Configuration on GitHub](https://github.com/thuongtruong109/flashot)
`;
  }
}

export default async function ConfigurationPage() {
  const content = await getDocContent();

  return <MarkdownRenderer content={content} />;
}
