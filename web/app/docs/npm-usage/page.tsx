import React from "react";
import { readFile } from "fs/promises";
import { join } from "path";
import MarkdownRenderer from "../../components/MarkdownRenderer";

async function getDocContent() {
  try {
    const docsPath = join(process.cwd(), "..", "docs", "npm-usage.md");
    const content = await readFile(docsPath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading npm-usage docs:", error);
    return `# NPM Package Usage Guide

Unable to load the NPM usage guide. Please check that the docs/npm-usage.md file exists.

## Quick Start

\`\`\`javascript
import { writeFile } from "node:fs/promises";
import { codeToImg } from "flashot";

const buffer = await codeToImg('console.log("Hello, World!");');
await writeFile("hello-world.webp", buffer);
\`\`\`

[View on GitHub](https://github.com/thuongtruong109/flashot)
`;
  }
}

export default async function NpmUsagePage() {
  const content = await getDocContent();

  return <MarkdownRenderer content={content} />;
}
