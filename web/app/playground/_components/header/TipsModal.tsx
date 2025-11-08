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
import { useLocalization } from "../../LocalizationContext";

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TipsModal: React.FC<TipsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLocalization();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("tipsModal.title")}
      icon={
        <div className="p-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md">
          <Info className="w-3.5 h-3.5 text-white" />
        </div>
      }
      maxWidth="6xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-x divide-gray-200 dark:divide-gray-700">
        {/* Left Side - About Section */}
        <div className="p-4 space-y-4 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <div>
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                {t("tipsModal.about.title")}
              </h3>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-blue-600 dark:text-blue-400">
                {t("header.brand")}
              </strong>{" "}
              {t("tipsModal.about.description")}
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {t("tipsModal.about.keyFeaturesTitle")}
              </h4>
            </div>
            <div className="space-y-1.5">
              {t("tipsModal.about.features").map(
                (feature: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 text-xs text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-sm flex-shrink-0">
                      {["🎨", "💻", "🖼️", "✨", "🎯", "📐", "🪟", "💾"][index]}
                    </span>
                    <span>{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {t("tipsModal.about.whyTitle")}
              </h4>
            </div>
            <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
              {t("tipsModal.about.whyItems").map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-2 border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex items-start space-x-2">
                    {index === 0 && (
                      <Zap className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    )}
                    {index === 1 && (
                      <Heart className="w-3.5 h-3.5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    {index === 2 && (
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <strong className="text-xs text-gray-900 dark:text-gray-100">
                        {item.title}
                      </strong>
                      <p className="text-[11px] mt-0.5">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Code2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {t("tipsModal.about.contributeTitle")}
              </h4>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-2 border border-gray-200/50 dark:border-gray-700/50">
              <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                {t("tipsModal.about.contributeText")}{" "}
                <a
                  href="https://github.com/thuongtruong109/flashot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline decoration-2 underline-offset-2"
                >
                  {t("tipsModal.about.githubLink")}
                </a>
                .
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-300">
                {t("tipsModal.about.feedbackText")}
                <a
                  href="mailto:thuongtruongofficial@gmail.com"
                  className="ml-1.5 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline decoration-2 underline-offset-2"
                >
                  {t("tipsModal.about.emailText")}
                </a>
                .
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-[11px] text-center text-gray-600 dark:text-gray-400">
              {t("tipsModal.about.madeWith")}{" "}
              <Heart className="w-3 h-3 inline text-red-500" />{" "}
              {t("tipsModal.about.madeBy")}
            </p>
          </div>
        </div>

        {/* Right Side - Info Section */}
        <div className="p-4 space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                {t("tipsModal.quickStart.title")}
              </h3>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-2.5 border border-blue-200/50 dark:border-blue-800/50">
              <div className="space-y-2">
                {t("tipsModal.quickStart.steps").map(
                  (step: any, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div
                        className={`w-5 h-5 ${
                          index === 0
                            ? "bg-blue-500 dark:bg-blue-600"
                            : index === 1
                            ? "bg-purple-500 dark:bg-purple-600"
                            : "bg-green-500 dark:bg-green-600"
                        } text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5`}
                      >
                        {index + 1}
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        <strong>{step.title}</strong> {step.description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Download className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {t("tipsModal.exportFormats.title")}
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["png", "jpg", "webp", "avif"].map((format, index) => (
                <div
                  key={format}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-2 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-colors"
                >
                  <h5 className="font-semibold text-gray-900 dark:text-gray-100 text-xs mb-0.5">
                    {["🖼️", "📸", "🚀", "⚡"][index]}{" "}
                    {t(`tipsModal.exportFormats.${format}.name`)}
                  </h5>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400">
                    {t(`tipsModal.exportFormats.${format}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Code2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {t("tipsModal.languages.title")}
              </h4>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-2.5 border border-gray-200/50 dark:border-gray-700/50 max-h-48 overflow-y-auto enhanced-scrollbar-light dark:enhanced-scrollbar-dark">
              <div className="grid grid-cols-4 gap-1.5 text-[11px]">
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
                {t("tipsModal.proTips.title")}
              </h4>
            </div>
            <div className="space-y-2">
              {t("tipsModal.proTips.tips").map((tip: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-lg p-3 border border-yellow-200/50 dark:border-yellow-800/50 hover:border-orange-300/50 dark:hover:border-orange-700/50 transition-colors"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-base flex-shrink-0">
                      {["📏", "🎨", "📐", "💾", "🪟", "🔍"][index]}
                    </span>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 text-xs mb-0.5">
                        {tip.title}
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {tip.description}
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
