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
    textColor: "group-hover:text-green-700 dark:group-hover:text-green-300",
  },
  {
    title: "NPM Package",
    description: "Use Flashot programmatically in your projects",
    icon: Package,
    href: "/docs/npm-usage",
    color: "from-orange-500 to-amber-600",
    bgColor: "from-orange-50 to-amber-50",
    textColor: "group-hover:text-orange-700 dark:group-hover:text-orange-300",
  },
  {
    title: "CLI Tool",
    description: "Command-line interface for quick generation",
    icon: Terminal,
    href: "/docs/cli-usage",
    color: "from-purple-500 to-violet-600",
    bgColor: "from-purple-50 to-violet-50",
    textColor: "group-hover:text-purple-700 dark:group-hover:text-purple-300",
  },
  {
    title: "REST API",
    description: "HTTP API for integration and automation",
    icon: Globe,
    href: "/docs/api-reference",
    color: "from-cyan-500 to-teal-600",
    bgColor: "from-cyan-50 to-teal-50",
    textColor: "group-hover:text-cyan-700 dark:group-hover:text-cyan-300",
  },
  {
    title: "Examples",
    description: "Real-world examples and use cases",
    icon: FileText,
    href: "/docs/examples",
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-50 to-rose-50",
    textColor: "group-hover:text-pink-700 dark:group-hover:text-pink-300",
  },
  {
    title: "Configuration",
    description: "Customize themes, languages, and output",
    icon: Settings,
    href: "/docs/configuration",
    color: "from-indigo-500 to-purple-600",
    bgColor: "from-indigo-50 to-purple-50",
    textColor: "group-hover:text-indigo-700 dark:group-hover:text-indigo-300",
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
    <div className="space-y-6 lg:space-y-8 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white/30 to-slate-100/50 dark:from-slate-950/50 dark:via-slate-900/30 dark:to-slate-800/50 grid-background-subtle rounded-3xl"></div>

      <div className="relative text-center space-y-4 py-6 lg:py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-[8px_8px_16px_rgba(0,0,0,0.08),-8px_-8px_16px_rgba(255,255,255,0.8)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)] border border-slate-200/50 dark:border-slate-700/50">
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-4">
              Documentation
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3 mb-4">
              <div className="flex items-center space-x-1.5 px-3 py-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.05)] border border-green-200/30 dark:border-green-800/30">
                <div className="p-1 bg-gradient-to-br from-green-400 to-emerald-500 rounded-md shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                  Fast & Easy
                </span>
              </div>

              <div className="flex items-center space-x-1.5 px-3 py-2 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.05)] border border-blue-200/30 dark:border-blue-800/30">
                <div className="p-1 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-md shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
                  <Package className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  Multiple Formats
                </span>
              </div>

              <div className="flex items-center space-x-1.5 px-3 py-2 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.9)] dark:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,0.05)] border border-purple-200/30 dark:border-purple-800/30">
                <div className="p-1 bg-gradient-to-br from-purple-400 to-violet-500 rounded-md shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
                  <Settings className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-medium text-purple-700 dark:text-purple-300">
                  Highly Customizable
                </span>
              </div>
            </div>

            <p className="text-sm lg:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Transform your code into beautiful, shareable images with powerful
              customization options. Perfect for social media, documentation,
              and presentations.
            </p>
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 px-4">
        {quickStartCards.map((card, index) => (
          <Link
            key={card.title}
            href={card.href}
            className={`group block relative transform transition-all duration-300 hover:scale-105`}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div
              className={`h-full bg-gradient-to-br ${card.bgColor} dark:from-slate-800/50 dark:to-slate-900/70 backdrop-blur-sm rounded-2xl p-4 lg:p-5 shadow-[12px_12px_24px_rgba(0,0,0,0.08),-12px_-12px_24px_rgba(255,255,255,0.9)] dark:shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.02)] border border-slate-200/40 dark:border-slate-700/40 hover:shadow-[16px_16px_32px_rgba(0,0,0,0.12),-16px_-16px_32px_rgba(255,255,255,0.95)] dark:hover:shadow-[16px_16px_32px_rgba(0,0,0,0.5),-16px_-16px_32px_rgba(255,255,255,0.03)] transition-all duration-500 relative overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} opacity-50 dark:opacity-20`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`relative p-2 bg-gradient-to-br ${card.color} rounded-xl shadow-[6px_6px_12px_rgba(0,0,0,0.15),-6px_-6px_12px_rgba(255,255,255,0.7)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.4)] group-hover:shadow-[8px_8px_16px_rgba(0,0,0,0.2),-8px_-8px_16px_rgba(255,255,255,0.8)] dark:group-hover:shadow-[8px_8px_16px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-110`}
                    >
                      <card.icon className="w-5 h-5 text-white relative z-10" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`text-base lg:text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 ${card.textColor}`}
                      >
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <div className="hidden group-hover:inline-flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                    <span className="hidden lg:inline">Learn more</span>
                    <ArrowRight className="w-3 h-3 lg:ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
                  {card.description}
                </p>
              </div>

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </Link>
        ))}
      </div>

      {content && (
        <div className="relative mt-8 lg:mt-12">
          <div className="bg-gradient-to-br from-slate-50/80 to-white/60 dark:from-slate-900/40 dark:to-slate-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-[12px_12px_24px_rgba(0,0,0,0.08),-12px_-12px_24px_rgba(255,255,255,0.9)] dark:shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.02)] border border-slate-200/40 dark:border-slate-700/40">
            <div className="border-t border-slate-200/60 dark:border-slate-700/60 pt-6">
              <MarkdownRenderer content={content} />
            </div>
          </div>
        </div>
      )}

      {!content && (
        <div className="relative mt-8 lg:mt-12">
          <div className="bg-gradient-to-br from-slate-50/80 to-white/60 dark:from-slate-900/40 dark:to-slate-800/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-[12px_12px_24px_rgba(0,0,0,0.08),-12px_-12px_24px_rgba(255,255,255,0.9)] dark:shadow-[12px_12px_24px_rgba(0,0,0,0.4),-12px_-12px_24px_rgba(255,255,255,0.02)] border border-slate-200/40 dark:border-slate-700/40">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-3 bg-gradient-to-br from-amber-50/90 to-orange-50/70 dark:from-amber-950/30 dark:to-orange-950/40 rounded-xl shadow-[inset_4px_4px_8px_rgba(0,0,0,0.06),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] dark:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.05)] border border-amber-200/40 dark:border-amber-800/40">
                <div className="w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full animate-pulse shadow-[2px_2px_4px_rgba(0,0,0,0.1)]"></div>
                <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
                  📚 Documentation content is loading...
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 text-left">
                <div className="bg-gradient-to-br from-slate-100/60 to-slate-50/80 dark:from-slate-800/60 dark:to-slate-900/40 rounded-xl p-4 lg:p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.06),-8px_-8px_16px_rgba(255,255,255,0.8)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)] border border-slate-200/40 dark:border-slate-700/40">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.15)]">
                      <span className="text-white text-xs font-bold">🚀</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      Quick Start
                    </h3>
                  </div>

                  <CodeBlockWrapper
                    code={`# Install globally
npm install -g flashot

# Generate image
flashot "console.log('Hello!');" -l javascript`}
                  >
                    <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-3 lg:p-4 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] border border-slate-700/50">
                      <pre className="text-xs lg:text-sm text-slate-100 overflow-x-auto custom-scrollbar">
                        {`# Install globally
npm install -g flashot

# Generate image
flashot "console.log('Hello!');" -l javascript`}
                      </pre>
                    </div>
                  </CodeBlockWrapper>
                </div>

                <div className="bg-gradient-to-br from-slate-100/60 to-slate-50/80 dark:from-slate-800/60 dark:to-slate-900/40 rounded-xl p-4 lg:p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.06),-8px_-8px_16px_rgba(255,255,255,0.8)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.02)] border border-slate-200/40 dark:border-slate-700/40">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg shadow-[4px_4px_8px_rgba(0,0,0,0.15)]">
                      <span className="text-white text-xs font-bold">📦</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      NPM Usage
                    </h3>
                  </div>

                  <CodeBlockWrapper
                    code={`const flashot = require('flashot');

flashot.generateImage({
  code: 'console.log("Hello!");',
  language: 'javascript'
});`}
                  >
                    <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-3 lg:p-4 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3)] border border-slate-700/50">
                      <pre className="text-xs lg:text-sm text-slate-100 overflow-x-auto custom-scrollbar">
                        {`const flashot = require('flashot');

flashot.generateImage({
  code: 'console.log("Hello!");',
  language: 'javascript'
});`}
                      </pre>
                    </div>
                  </CodeBlockWrapper>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
