"use client";

import React from "react";
import { Play } from "lucide-react";

interface DemoSectionProps {
  activeDemo: number;
  setActiveDemo: (index: number) => void;
}

const DemoSection: React.FC<DemoSectionProps> = ({
  activeDemo,
  setActiveDemo,
}) => {
  // Theme background helpers
  const getThemeBackground = (theme: string) => {
    switch (theme) {
      case "monokai":
        return "from-gray-900 via-slate-900 to-gray-800";
      case "nord":
        return "from-slate-800 via-slate-700 to-blue-900";
      case "one-dark":
        return "from-gray-900 via-gray-800 to-slate-900";
      case "dracula":
        return "from-purple-900 via-gray-900 to-pink-900";
      default:
        return "from-gray-900 via-gray-800 to-gray-900";
    }
  };

  const getThemeTextColor = (theme: string) => {
    switch (theme) {
      case "monokai":
        return "text-orange-200";
      case "nord":
        return "text-blue-200";
      case "one-dark":
        return "text-blue-200";
      case "dracula":
        return "text-purple-200";
      default:
        return "text-gray-400";
    }
  };

  const getThemeCodeColor = (theme: string) => {
    switch (theme) {
      case "monokai":
        return "text-orange-100";
      case "nord":
        return "text-blue-100";
      case "one-dark":
        return "text-blue-100";
      case "dracula":
        return "text-purple-100";
      default:
        return "text-gray-100";
    }
  };

  const codeExamples = [
    {
      title: "Inline Code",
      code: `import { writeFile } from "node:fs/promises";
import { codeToImg } from "flashot";

const buffer = await codeToImg('console.log("hello, world!");', {
  theme: "monokai",
  format: "png",
  style: { borderRadius: 16, padding: 24 }
});
await writeFile("inline.png", buffer);`,
      language: "javascript",
      bgTheme: "from-pink-900/20 via-red-900/20 to-orange-900/20",
    },
    {
      title: "File Path",
      code: `import { writeFile } from "node:fs/promises";
import { pathToImg } from "flashot";

const img = await pathToImg("../package.json", {
  theme: "nord",
  format: "webp",
  style: { borderRadius: 12, padding: 30 }
});
await writeFile("path.webp", img);`,
      language: "typescript",
      bgTheme: "from-cyan-900/20 via-blue-900/20 to-indigo-900/20",
    },
    {
      title: "URL Content",
      code: `import { writeFile } from "node:fs/promises";
import { urlToImg } from "flashot";

const buffer = await urlToImg("https://api.example.com/data", {
  format: "png",
  theme: "one-dark",
  lineNumbers: { enabled: true }
});
await writeFile("url.png", buffer);`,
      language: "typescript",
      bgTheme: "from-blue-900/20 via-purple-900/20 to-violet-900/20",
    },
    {
      title: "Buffer",
      code: `import { writeFile } from "node:fs/promises";
import { bufferToImg } from "flashot";

const buffer = "<Buffer 54 68 69 73 20...>";
const img = await bufferToImg(buffer, {
  lang: "json",
  theme: "dracula",
  quality: 100,
  lineNumbers: { enabled: true }
});
await writeFile("buffer.png", img);`,
      language: "typescript",
      bgTheme: "from-purple-900/20 via-pink-900/20 to-rose-900/20",
    },
  ];

  const usageExamples = [
    {
      title: "Inline Code",
      description: "Generate images from code strings with modern themes",
      code: `const buffer = await codeToImg('console.log("hello!");', {
  theme: "monokai"
});`,
      theme: "monokai",
      bgGradient: "from-pink-500/10 to-red-500/10",
    },
    {
      title: "File Path",
      description: "Convert files with beautiful styling options",
      code: `const img = await pathToImg("./src/index.js", {
  theme: "nord"
});`,
      theme: "nord",
      bgGradient: "from-cyan-500/10 to-blue-500/10",
    },
    {
      title: "URL Content",
      description: "Fetch remote content with dark themes",
      code: `const img = await urlToImg("https://api.example.com", {
  theme: "one-dark"
});`,
      theme: "one-dark",
      bgGradient: "from-blue-500/10 to-purple-500/10",
    },
    {
      title: "Buffer Input",
      description: "Process buffers with vibrant color schemes",
      code: `const img = await bufferToImg(buffer, {
  theme: "dracula"
});`,
      theme: "dracula",
      bgGradient: "from-purple-500/10 to-pink-500/10",
    },
  ];

  return (
    <section className={`container mx-auto px-6 pb-4 relative overflow-hidden`}>
      {/* Dynamic Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br rounded-xl opacity-50 transition-all duration-700 ease-in-out`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/5 to-black/20" />

      <div className="max-w-5xl mx-auto relative z-10 pt-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
          {/* Code Input */}
          <div className="space-y-4">
            <div className="flex gap-1 flex-wrap">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDemo(index)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-300 ${
                    activeDemo === index
                      ? "text-white border border-white/20"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  {activeDemo === index && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-r rounded-md -z-10 transition-all duration-300`}
                    />
                  )}
                  <span className="relative z-10">{example.title}</span>
                </button>
              ))}
            </div>

            <div className="bg-gray-900/50 border border-white/[0.08] rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-red-400/80 rounded-full" />
                <div className="w-2 h-2 bg-yellow-400/80 rounded-full" />
                <div className="w-2 h-2 bg-green-400/80 rounded-full" />
                <span className="ml-2 text-white/50 text-xs font-mono">
                  {codeExamples[activeDemo].language} • input.
                  {codeExamples[activeDemo].language === "javascript"
                    ? "js"
                    : "ts"}
                </span>
                <div className="ml-auto">
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${codeExamples[activeDemo].bgTheme}`}
                  />
                </div>
              </div>
              <pre className="text-xs text-white/90 font-mono leading-relaxed overflow-x-auto">
                <code>{codeExamples[activeDemo].code}</code>
              </pre>
            </div>

            <button
              className={`group flex items-center gap-2 px-4 py-2 bg-gradient-to-r border border-white/20 text-white text-xs font-medium rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 backdrop-blur-sm`}
            >
              <Play className="w-3 h-3 group-hover:scale-110 transition-transform" />
              Generate Image
              <div className="flex items-center gap-1 text-green-400 transition-all duration-200">
                ~ 135ms
              </div>
            </button>
          </div>
        </div>

        {/* Usage Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {usageExamples.map((example, index) => (
            <div
              key={index}
              className="relative group bg-white/[0.02] border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300 overflow-hidden"
            >
              {/* Theme gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${example.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-white text-sm">
                    {example.title}
                  </h4>
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${example.bgGradient} opacity-60`}
                  />
                </div>

                <p className="text-white/50 text-xs mb-3 leading-relaxed">
                  {example.description}
                </p>

                <div className="space-y-2">
                  <code className="text-[10px] text-blue-300 bg-white/[0.03] rounded p-2 block overflow-x-auto">
                    {example.code}
                  </code>

                  <div className="flex items-center gap-1 text-[10px] text-white/40">
                    <span>🎨</span>
                    <span>{example.theme}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
