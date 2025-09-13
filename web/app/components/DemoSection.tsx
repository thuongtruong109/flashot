"use client";

import React from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  lang: "json",
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
  format: "jpeg",
  theme: "one-dark",
  lineNumbers: { enabled: true }
});
await writeFile("url.jpeg", buffer);`,
      language: "typescript",
      bgTheme: "from-blue-900/20 via-purple-900/20 to-violet-900/20",
    },
    {
      title: "Buffer",
      code: `import { writeFile } from "node:fs/promises";
import { bufferToImg } from "flashot";

const buffer = "<Buffer 54 68 69 73 20...>";
const img = await bufferToImg(buffer, {
  theme: "dracula",
  quality: 100,
  lineNumbers: { enabled: true }
});
await writeFile("buffer.png", img);`,
      language: "typescript",
      bgTheme: "from-purple-900/20 via-pink-900/20 to-rose-900/20",
    },
  ];

  return (
    <motion.section
      className={`container mx-auto px-6 pb-4 overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto relative grid lg:grid-cols-2 gap-8 items-start">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-1 flex-wrap">
            {codeExamples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveDemo(index)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-md ${
                  activeDemo === index
                    ? "text-white border border-white/20"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true }}
              >
                {activeDemo === index && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r rounded-md -z-10 transition-all duration-300`}
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{example.title}</span>
              </motion.button>
            ))}
          </div>

          <motion.div
            className="bg-gray-900/50 border border-white/[0.08] rounded-xl p-4 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="w-2 h-2 bg-red-400/80 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 bg-yellow-400/80 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div
                className="w-2 h-2 bg-green-400/80 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
              <span className="ml-2 text-white/50 text-xs font-mono">
                index.
                {codeExamples[activeDemo].language === "javascript"
                  ? "js"
                  : "ts"}
              </span>
              <div className="ml-auto">
                <motion.div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${codeExamples[activeDemo].bgTheme}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeDemo}
                className="text-xs text-white/90 font-mono leading-relaxed overflow-x-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <code>{codeExamples[activeDemo].code}</code>
              </motion.pre>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className={`group flex items-center w-fit gap-2 px-4 py-2 bg-gradient-to-r border border-white/20 text-white text-xs font-medium rounded-lg backdrop-blur-sm`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Play className="w-3 h-3" />
            </motion.div>
            Generate Image
            <motion.div
              className="flex items-center gap-1 text-green-400 transition-all duration-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ~ 135ms
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DemoSection;
