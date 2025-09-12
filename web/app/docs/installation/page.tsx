import React from "react";
import { readFile } from "fs/promises";
import { join } from "path";
import MarkdownRenderer from "../../components/MarkdownRenderer";

async function getDocContent() {
  try {
    const docsPath = join(process.cwd(), "..", "docs", "installation.md");
    const content = await readFile(docsPath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading installation docs:", error);
    return `# Installation Guide

Unable to load the installation guide. Please check that the docs/installation.md file exists.

## Quick Installation

\`\`\`bash
# NPM Package
npm install flashot

# CLI Tool
npm install -g flashot

# Docker
docker pull ghcr.io/thuongtruong109/flashot-api:latest
\`\`\`

[View on GitHub](https://github.com/thuongtruong109/flashot)
`;
  }
}

export default async function InstallationPage() {
  const content = await getDocContent();

  return <MarkdownRenderer content={content} />;
}
