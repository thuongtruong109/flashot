import React from "react";
import { readFile } from "fs/promises";
import { join } from "path";
import MarkdownRenderer from "@/components/MarkdownRenderer";

async function getDocContent() {
  try {
    const docsPath = join(process.cwd(), "..", "docs", "README.md");
    const content = await readFile(docsPath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading docs:", error);
    return `# Documentation Not Found

Unable to load the documentation content. Please make sure the docs folder exists and contains the README.md file.

## Available Sections

- [Installation](/docs/installation)
- [NPM Usage](/docs/npm-usage)
- [CLI Usage](/docs/cli-usage)
- [API Reference](/docs/api-reference)
- [Examples](/docs/examples)
- [Configuration](/docs/configuration)
`;
  }
}

export default async function DocsPage() {
  const content = await getDocContent();

  return <MarkdownRenderer content={content} />;
}
