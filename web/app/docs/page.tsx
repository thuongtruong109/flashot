import React from "react";
import { readFile } from "fs/promises";
import { join } from "path";
import Link from "next/link";
import {
  Download,
  Package,
  Terminal,
  Globe,
  FileText,
  Settings,
  ArrowRight,
  Zap,
} from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import CodeBlockWrapper from "@/components/CodeBlock";

const quickStartCards = [
  {
    title: "Installation",
    description: "Get started with Flashot in seconds",
    icon: Download,
    href: "/docs/installation",
    color: "from-green-500 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
  },
  {
    title: "NPM Package",
    description: "Use Flashot programmatically in your projects",
    icon: Package,
    href: "/docs/npm-usage",
    color: "from-orange-500 to-amber-600",
    bgColor: "from-orange-50 to-amber-50",
  },
  {
    title: "CLI Tool",
    description: "Command-line interface for quick generation",
    icon: Terminal,
    href: "/docs/cli-usage",
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-50 to-violet-50",
  },
  {
    title: "REST API",
    description: "HTTP API for integration and automation",
    icon: Globe,
    href: "/docs/api-reference",
    color: "from-cyan-500 to-teal-600",
    bgColor: "from-cyan-50 to-teal-50",
  },
  {
    title: "Examples",
    description: "Real-world examples and use cases",
    icon: FileText,
    href: "/docs/examples",
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-50 to-rose-50",
  },
  {
    title: "Configuration",
    description: "Customize themes, languages, and output",
    icon: Settings,
    href: "/docs/configuration",
    color: "from-indigo-500 to-purple-600",
    bgColor: "from-indigo-50 to-purple-50",
  },
];

async function getDocContent() {
  try {
    const docsPath = join(process.cwd(), "..", "docs", "README.md");
    const content = await readFile(docsPath, "utf8");
    return content;
  } catch (error) {
    console.error("Error reading docs:", error);
    return null;
  }
}

export default async function DocsPage() {
  const content = await getDocContent();

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-3 py-4 lg:py-6">
        <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3 px-4">
          <div className="flex items-center space-x-1.5 px-2.5 lg:px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/40 dark:to-emerald-950/40 border border-green-200/50 dark:border-green-800/50 rounded-full">
            <Zap className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-700 dark:text-green-300">
              Fast & Easy
            </span>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 lg:px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-950/40 dark:to-cyan-950/40 border border-blue-200/50 dark:border-blue-800/50 rounded-full">
            <Package className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
              Multiple Formats
            </span>
          </div>
          <div className="flex items-center space-x-1.5 px-2.5 lg:px-3 py-1.5 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-950/40 dark:to-violet-950/40 border border-purple-200/50 dark:border-purple-800/50 rounded-full">
            <Settings className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
              Highly Customizable
            </span>
          </div>
        </div>

        <p className="text-base lg:text-lg text-slate-600 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed px-4">
          Transform your code into beautiful, shareable images with powerful
          customization options. Perfect for social media, documentation, and
          presentations.
        </p>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-4">
        {quickStartCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className={`group block p-3 lg:p-4 bg-gradient-to-br ${card.bgColor} dark:from-gray-900/80 dark:to-gray-800/80 hover:shadow-lg transition-all duration-300 rounded-lg lg:rounded-xl border border-slate-200/50 dark:border-gray-700/50 hover:border-slate-300/50 dark:hover:border-gray-600/50 hover:-translate-y-0.5`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`p-1.5 bg-gradient-to-br ${card.color} rounded-lg group-hover:scale-105 transition-transform duration-200 shadow-sm`}
              >
                <card.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-gray-100 mb-1.5 group-hover:text-slate-700 dark:group-hover:text-gray-200 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs lg:text-sm text-slate-600 dark:text-gray-200 mb-2 leading-relaxed">
                  {card.description}
                </p>
                <div className="flex items-center text-xs font-medium text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-200 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Documentation Content */}
      {content && (
        <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-slate-200 dark:border-slate-700">
          <MarkdownRenderer content={content} />
        </div>
      )}

      {/* Fallback Content */}
      {!content && (
        <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-slate-200 dark:border-gray-700">
          <div className="text-center space-y-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                📚 Documentation content is loading... Please make sure the docs
                folder exists.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 text-left">
              <div className="p-3 lg:p-4 bg-slate-50 dark:bg-gray-800/50 rounded-lg border border-slate-200 dark:border-gray-700">
                <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    🚀
                  </span>
                  Quick Start
                </h3>
                <CodeBlockWrapper
                  code={`# Install globally
npm install -g flashot

# Generate image
flashot "console.log('Hello!');" -l javascript`}
                >
                  <pre className="text-xs bg-slate-900 dark:bg-gray-950 text-slate-100 p-2 lg:p-3 rounded overflow-x-auto border border-slate-700 dark:border-gray-800">
                    {`# Install globally
npm install -g flashot

# Generate image
flashot "console.log('Hello!');" -l javascript`}
                  </pre>
                </CodeBlockWrapper>
              </div>

              <div className="p-3 lg:p-4 bg-slate-50 dark:bg-gray-800/50 rounded-lg border border-slate-200 dark:border-gray-700">
                <h3 className="text-sm lg:text-base font-semibold text-slate-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    📦
                  </span>
                  NPM Usage
                </h3>
                <CodeBlockWrapper
                  code={`const flashot = require('flashot');

flashot.generateImage({
  code: 'console.log("Hello!");',
  language: 'javascript'
});`}
                >
                  <pre className="text-xs bg-slate-900 dark:bg-gray-950 text-slate-100 p-2 lg:p-3 rounded overflow-x-auto border border-slate-700 dark:border-gray-800">
                    {`const flashot = require('flashot');

flashot.generateImage({
  code: 'console.log("Hello!");',
  language: 'javascript'
});`}
                  </pre>
                </CodeBlockWrapper>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
