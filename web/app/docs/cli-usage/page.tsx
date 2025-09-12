import React from "react";
import { readFile } from "fs/promises";
import { join } from "path";
import MarkdownRenderer from "../../components/MarkdownRenderer";

async function getDocContent() {
  try {
    const docsPath = join(process.cwd(), "..", "docs", "cli-usage.md");
    const content = await readFile(docsPath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading cli-usage docs:", error);
    return `# CLI Usage Guide

Unable to load the CLI usage guide. Please check that the docs/cli-usage.md file exists.

## Quick Start

\`\`\`bash
# Global installation
npm install -g flashot

# Basic usage
flashot code 'console.log("Hello, CLI!");' --output hello.png
\`\`\`

[View on GitHub](https://github.com/thuongtruong109/flashot)
`;
  }
}

export default async function CliUsagePage() {
  const content = await getDocContent();

  return <MarkdownRenderer content={content} />;
}
