import React from "react";
import { readFile } from "fs/promises";
import { join } from "path";
import MarkdownRenderer from "../../components/MarkdownRenderer";

async function getDocContent() {
  try {
    const docsPath = join(process.cwd(), "..", "docs", "api-reference.md");
    const content = await readFile(docsPath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading api-reference docs:", error);
    return `# API Reference

Unable to load the API reference guide. Please check that the docs/api-reference.md file exists.

## Quick Start

\`\`\`bash
# Start the API server
docker run -p 8080:8080 ghcr.io/thuongtruong109/flashot-api:latest

# Test the API
curl -X POST http://localhost:8080/ \\
  -H "Content-Type: application/json" \\
  -d '{"code": "console.log(\\"Hello, API!\\");"}' \\
  --output hello-api.webp
\`\`\`

[View on GitHub](https://github.com/thuongtruong109/flashot)
`;
  }
}

export default async function ApiReferencePage() {
  const content = await getDocContent();

  return <MarkdownRenderer content={content} />;
}
