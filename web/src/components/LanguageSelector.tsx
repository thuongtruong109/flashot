"use client";

import React from "react";
import { Code } from "lucide-react";
import { SupportedLanguage } from "@/types";

interface LanguageSelectorProps {
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

const supportedLanguages: {
  value: SupportedLanguage;
  label: string;
  icon: string;
}[] = [
  { value: "javascript", label: "JavaScript", icon: "🟨" },
  { value: "typescript", label: "TypeScript", icon: "🔷" },
  { value: "python", label: "Python", icon: "🐍" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "cpp", label: "C++", icon: "⚡" },
  { value: "c", label: "C", icon: "🔧" },
  { value: "csharp", label: "C#", icon: "🟣" },
  { value: "php", label: "PHP", icon: "🐘" },
  { value: "ruby", label: "Ruby", icon: "💎" },
  { value: "go", label: "Go", icon: "🔵" },
  { value: "rust", label: "Rust", icon: "🦀" },
  { value: "swift", label: "Swift", icon: "🦉" },
  { value: "kotlin", label: "Kotlin", icon: "🟠" },
  { value: "scala", label: "Scala", icon: "🔴" },
  { value: "html", label: "HTML", icon: "🌐" },
  { value: "css", label: "CSS", icon: "🎨" },
  { value: "scss", label: "SCSS", icon: "💅" },
  { value: "json", label: "JSON", icon: "📋" },
  { value: "xml", label: "XML", icon: "📄" },
  { value: "yaml", label: "YAML", icon: "⚙️" },
  { value: "sql", label: "SQL", icon: "🗃️" },
  { value: "shell", label: "Shell", icon: "🐚" },
  { value: "powershell", label: "PowerShell", icon: "💙" },
  { value: "dockerfile", label: "Dockerfile", icon: "🐋" },
  { value: "markdown", label: "Markdown", icon: "📝" },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
      <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></span>
        Programming Language
      </label>

      <div className="space-y-2">
        {/* Popular Languages - Quick Select */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {supportedLanguages.slice(0, 8).map((lang) => (
            <button
              key={lang.value}
              onClick={() => onLanguageChange(lang.value)}
              className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center space-y-1 ${
                selectedLanguage === lang.value
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200/50"
              }`}
            >
              <span className="text-lg">{lang.icon}</span>
              <span className="truncate w-full text-center">
                {lang.label.split(" ")[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Full Language Dropdown */}
        <select
          value={selectedLanguage}
          onChange={(e) =>
            onLanguageChange(e.target.value as SupportedLanguage)
          }
          className="w-full bg-white/80 border border-gray-200/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium text-gray-700"
        >
          <optgroup label="🔥 Popular Languages">
            {supportedLanguages.slice(0, 8).map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.icon} {lang.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="⚡ System Languages">
            {supportedLanguages.slice(8, 14).map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.icon} {lang.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="🌐 Web Technologies">
            {supportedLanguages.slice(14, 19).map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.icon} {lang.label}
              </option>
            ))}
          </optgroup>
          <optgroup label="⚙️ Configuration & Others">
            {supportedLanguages.slice(19).map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.icon} {lang.label}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector;
