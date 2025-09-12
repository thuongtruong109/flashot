import React from "react";
import { readFile } from "fs/promises";
import { join } from "path";
import MarkdownRenderer from "../../components/MarkdownRenderer";

async function getDocContent() {
  try {
    const docsPath = join(process.cwd(), "..", "docs", "examples.md");
    const content = await readFile(docsPath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading examples docs:", error);
    return `# Examples

Unable to load the examples guide. Please check that the docs/examples.md file exists.

## Quick Example

\`\`\`javascript
const flashot = require('flashot');

// Basic usage
const config = {
  code: 'console.log("Hello World!");',
  language: 'javascript',
  theme: 'dracula'
};

flashot.generateImage(config)
  .then(buffer => console.log('Generated!'))
  .catch(err => console.error(err));
\`\`\`

[View More Examples on GitHub](https://github.com/thuongtruong109/flashot/tree/main/examples)
`;
  }
}

export default async function ExamplesPage() {
  const content = await getDocContent();

  return <MarkdownRenderer content={content} />;
}
