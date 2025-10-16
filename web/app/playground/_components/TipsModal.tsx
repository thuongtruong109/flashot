"use client";

import React from "react";
import { Info, Keyboard, Download, Code2 } from "lucide-react";
import Modal from "./base/Modal";

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TipsModal: React.FC<TipsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Quick Start"
      icon={<Info className="w-7 h-7 text-blue-600" />}
      maxWidth="2xl"
    >
      <div className="p-4 space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/50">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 dark:bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Click on the code area</strong> to start editing your
                code directly
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 dark:bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Customize appearance</strong> using the Settings panel
                (themes, fonts, backgrounds)
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 dark:bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Export your image</strong> in multiple formats (PNG,
                JPG, WebP, AVIF)
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-7 h-7 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 rounded-lg flex items-center justify-center mr-3">
              <Keyboard className="w-4 h-4 text-white" />
            </div>
            Keyboard Shortcuts
          </h3>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-3 space-y-2 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Click to edit code
              </span>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                  Click
                </kbd>
              </div>
            </div>
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Toggle fullscreen
              </span>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                  F11
                </kbd>
              </div>
            </div>
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Exit editing
              </span>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                  Esc
                </kbd>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  or
                </span>
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                  Ctrl + Enter
                </kbd>
              </div>
            </div>
            <div className="flex items-center justify-between py-1.5 px-2 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Indent/Unindent
              </span>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                  Tab
                </kbd>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  /
                </span>
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                  Shift + Tab
                </kbd>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-7 h-7 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600 rounded-lg flex items-center justify-center mr-3">
              <Download className="w-4 h-4 text-white" />
            </div>
            Export Formats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-colors">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🖼️ PNG
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                High quality with transparency support
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-colors">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                📸 JPG
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Compressed with solid background
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-colors">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🚀 WebP
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Modern format, great compression
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-colors">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                ⚡ AVIF
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Next-gen format, smallest size
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 rounded-lg flex items-center justify-center mr-3">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            25+ Supported Languages
          </h3>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-gray-200/50 dark:border-gray-700/50">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {[
                "🟨 JavaScript",
                "🔷 TypeScript",
                "🐍 Python",
                "☕ Java",
                "⚡ C++",
                "🔷 C#",
                "🐘 PHP",
                "💎 Ruby",
                "🐹 Go",
                "🦀 Rust",
                "🍎 Swift",
                "🤖 Kotlin",
                "🔴 HTML",
                "🎨 CSS",
                "📋 JSON",
                "📄 XML",
                "🗄️ SQL",
                "🐚 Bash",
                "⚛️ React",
                "🌟 Vue",
                "📝 Markdown",
                "🔧 YAML",
                "🐳 Dockerfile",
                "⚙️ Config",
                "🎯 Dart",
              ].map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-md transition-colors"
                >
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {lang}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <div className="w-7 h-7 bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">💡</span>
            </div>
            Pro Tips & Best Practices
          </h3>
          <div className="space-y-3">
            {[
              {
                icon: "📏",
                title: "Use line numbers",
                desc: "Perfect for code documentation and tutorials",
              },
              {
                icon: "🎨",
                title: "Try different themes",
                desc: "Match your brand or presentation style",
              },
              {
                icon: "📐",
                title: "Adjust padding",
                desc: "Better framing for social media posts",
              },
              {
                icon: "💾",
                title: "Save as JSON",
                desc: "Backup and share your favorite configurations",
              },
              {
                icon: "🪟",
                title: "Window controls",
                desc: "Authentic editor look for presentations",
              },
              {
                icon: "🔍",
                title: "Fullscreen mode",
                desc: "Focus on editing with distraction-free view",
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg p-4 border border-yellow-200/50 dark:border-yellow-800/50 hover:border-orange-300/50 dark:hover:border-orange-700/50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-lg flex-shrink-0">{tip.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TipsModal;
