"use client";

import React from "react";
import {
  Info,
  Download,
  Code2,
  Sparkles,
  Zap,
  Heart,
  Target,
  Trophy,
} from "lucide-react";
import Modal from "@/app/playground/_components/base/Modal";

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TipsModal: React.FC<TipsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Information & Quick Start"
      icon={<Info className="w-7 h-7 text-blue-600" />}
      maxWidth="6xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-x divide-gray-200 dark:divide-gray-700">
        {/* Left Side - About Section */}
        <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                About Flashot
              </h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-blue-600 dark:text-blue-400">
                Flashot
              </strong>{" "}
              is a powerful, modern web application designed to help developers
              create stunning, professional code screenshots in seconds. Whether
              you&apos;re creating documentation, tutorials, social media posts,
              or presentations, Flashot makes your code look amazing.
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Key Features
              </h4>
            </div>
            <div className="space-y-2">
              {[
                { icon: "🎨", text: "50+ beautiful syntax themes" },
                { icon: "💻", text: "25+ programming languages supported" },
                {
                  icon: "🖼️",
                  text: "Multiple export formats (PNG, JPG, WebP, AVIF)",
                },
                { icon: "✨", text: "Real-time preview with live editing" },
                {
                  icon: "🎯",
                  text: "Precise controls for padding, shadows, borders",
                },
                { icon: "📐", text: "Customizable dimensions and scaling" },
                {
                  icon: "🪟",
                  text: "Window controls (macOS & Windows styles)",
                },
                { icon: "💾", text: "Save and load custom templates" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <span className="text-base flex-shrink-0">
                    {feature.icon}
                  </span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Trophy className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Why Flashot?
              </h4>
            </div>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Lightning Fast
                    </strong>
                    <p className="text-xs mt-0.5">
                      Generate high-quality screenshots instantly with zero lag
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-start space-x-2">
                  <Heart className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Developer Friendly
                    </strong>
                    <p className="text-xs mt-0.5">
                      Intuitive interface with keyboard shortcuts and smart
                      defaults
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">
                      Highly Customizable
                    </strong>
                    <p className="text-xs mt-0.5">
                      Every aspect is configurable - make it truly yours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Code2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Contribute
              </h4>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                The project is Open Source and{" "}
                <a
                  href="https://github.com/thuongtruong109/flashot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline decoration-2 underline-offset-2"
                >
                  available on GitHub
                </a>
                .
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                If you have any questions or feedback, please
                <a
                  href="mailto:thuongtruongofficial@gmail.com"
                  className="ml-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline decoration-2 underline-offset-2"
                >
                  send us an email
                </a>
                .
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-600 dark:text-gray-400">
              Made with <Heart className="w-3 h-3 inline text-red-500" /> by
              Thuong Truong, for everyone
            </p>
          </div>
        </div>

        {/* Right Side - Info Section */}
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Quick Start Guide
              </h3>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 dark:bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Click on the code area</strong> to start editing
                    your code directly
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 dark:bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Customize appearance</strong> using the Settings
                    panel (themes, fonts, backgrounds)
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
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Download className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Export Formats
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-colors">
                <h5 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                  🖼️ PNG
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  High quality with transparency
                </p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-colors">
                <h5 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                  📸 JPG
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Compressed, solid background
                </p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-colors">
                <h5 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                  🚀 WebP
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Modern, great compression
                </p>
              </div>
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-colors">
                <h5 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                  ⚡ AVIF
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Next-gen, smallest size
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Code2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
                25+ Supported Languages
              </h4>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-3 border border-gray-200/50 dark:border-gray-700/50 max-h-48 overflow-y-auto enhanced-scrollbar-light dark:enhanced-scrollbar-dark">
              <div className="grid grid-cols-4 gap-2 text-xs">
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
                    className="flex items-center space-x-1 px-2 py-1.5 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 rounded-md transition-colors"
                  >
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {lang}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-lg">💡</span>
              <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">
                Pro Tips & Best Practices
              </h4>
            </div>
            <div className="space-y-2">
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
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg p-3 border border-yellow-200/50 dark:border-yellow-800/50 hover:border-orange-300/50 dark:hover:border-orange-700/50 transition-colors"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-base flex-shrink-0">{tip.icon}</span>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 text-xs mb-0.5">
                        {tip.title}
                      </h5>
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
      </div>
    </Modal>
  );
};

export default TipsModal;
