"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Code,
  FileText,
  Database,
  Terminal,
  Settings,
  Globe,
  Braces,
  ChevronDown,
  Zap,
  Coffee,
  Cpu,
  Hash,
  Layers,
  Palette,
  FileCode,
  Box,
  Shield,
  Sparkles,
} from "lucide-react";
import { SupportedLanguage } from "@/types";

interface LanguageSelectorProps {
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
}

const supportedLanguages: {
  value: SupportedLanguage;
  label: string;
  icon: React.ReactNode;
  category: string;
}[] = [
  {
    value: "javascript",
    label: "JavaScript",
    icon: <Zap className="w-4 h-4 text-yellow-500" />,
    category: "Popular",
  },
  {
    value: "typescript",
    label: "TypeScript",
    icon: <Sparkles className="w-4 h-4 text-blue-500" />,
    category: "Popular",
  },
  {
    value: "python",
    label: "Python",
    icon: <Code className="w-4 h-4 text-green-500" />,
    category: "Popular",
  },
  {
    value: "java",
    label: "Java",
    icon: <Coffee className="w-4 h-4 text-orange-600" />,
    category: "Popular",
  },
  {
    value: "cpp",
    label: "C++",
    icon: <Cpu className="w-4 h-4 text-blue-600" />,
    category: "Popular",
  },
  {
    value: "c",
    label: "C",
    icon: <Terminal className="w-4 h-4 text-gray-600" />,
    category: "Popular",
  },
  {
    value: "csharp",
    label: "C#",
    icon: <Hash className="w-4 h-4 text-purple-600" />,
    category: "Popular",
  },
  {
    value: "php",
    label: "PHP",
    icon: <Globe className="w-4 h-4 text-indigo-600" />,
    category: "Popular",
  },
  {
    value: "ruby",
    label: "Ruby",
    icon: <Box className="w-4 h-4 text-red-500" />,
    category: "System",
  },
  {
    value: "go",
    label: "Go",
    icon: <Zap className="w-4 h-4 text-cyan-600" />,
    category: "System",
  },
  {
    value: "rust",
    label: "Rust",
    icon: <Shield className="w-4 h-4 text-orange-600" />,
    category: "System",
  },
  {
    value: "swift",
    label: "Swift",
    icon: <Sparkles className="w-4 h-4 text-orange-500" />,
    category: "System",
  },
  {
    value: "kotlin",
    label: "Kotlin",
    icon: <Layers className="w-4 h-4 text-purple-500" />,
    category: "System",
  },
  {
    value: "scala",
    label: "Scala",
    icon: <Coffee className="w-4 h-4 text-red-600" />,
    category: "System",
  },
  {
    value: "html",
    label: "HTML",
    icon: <Globe className="w-4 h-4 text-orange-600" />,
    category: "Web",
  },
  {
    value: "css",
    label: "CSS",
    icon: <Palette className="w-4 h-4 text-blue-500" />,
    category: "Web",
  },
  {
    value: "scss",
    label: "SCSS",
    icon: <Palette className="w-4 h-4 text-pink-500" />,
    category: "Web",
  },
  {
    value: "json",
    label: "JSON",
    icon: <Braces className="w-4 h-4 text-yellow-600" />,
    category: "Config",
  },
  {
    value: "xml",
    label: "XML",
    icon: <FileCode className="w-4 h-4 text-green-600" />,
    category: "Config",
  },
  {
    value: "yaml",
    label: "YAML",
    icon: <Settings className="w-4 h-4 text-blue-600" />,
    category: "Config",
  },
  {
    value: "sql",
    label: "SQL",
    icon: <Database className="w-4 h-4 text-blue-700" />,
    category: "Config",
  },
  {
    value: "shell",
    label: "Shell",
    icon: <Terminal className="w-4 h-4 text-green-700" />,
    category: "Config",
  },
  {
    value: "powershell",
    label: "PowerShell",
    icon: <Terminal className="w-4 h-4 text-blue-700" />,
    category: "Config",
  },
  {
    value: "dockerfile",
    label: "Dockerfile",
    icon: <Settings className="w-4 h-4 text-blue-500" />,
    category: "Config",
  },
  {
    value: "markdown",
    label: "Markdown",
    icon: <FileText className="w-4 h-4 text-gray-600" />,
    category: "Config",
  },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedLang = supportedLanguages.find(
    (lang) => lang.value === selectedLanguage
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const DropdownPortal = () => {
    if (typeof window === "undefined" || !isOpen) return null;

    return createPortal(
      <div
        ref={dropdownRef}
        data-dropdown-type="language-selector"
        className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl max-h-96 overflow-y-auto custom-scrollbar"
        style={{
          position: "fixed",
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: Math.min(dropdownPosition.width, 260),
          zIndex: 99999,
        }}
      >
        <div className="p-3">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => {
                onLanguageChange(lang.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between space-x-3 px-4 py-3 text-sm text-left rounded-xl transition-all duration-200 group mb-1 ${
                selectedLanguage === lang.value
                  ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200/50 shadow-sm"
                  : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">{lang.icon}</div>
                <span
                  className={`font-medium transition-colors ${
                    selectedLanguage === lang.value
                      ? "text-blue-700"
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  {lang.label}
                </span>
              </div>
              {selectedLanguage === lang.value && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div>
      <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
        <Code className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
        Programming Language
      </label>

      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-white/95 to-gray-50/95 hover:from-white hover:to-gray-50 border border-gray-200/60 rounded-lg px-3 py-2 transition-all duration-300 font-medium text-gray-700 hover:text-gray-900 flex items-center justify-between shadow-sm hover:shadow group backdrop-blur-sm"
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">{selectedLang?.icon}</div>
          <span className="text-sm">{selectedLang?.label}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110 ${
            isOpen ? "rotate-180 text-blue-500" : ""
          }`}
        />
      </button>

      <DropdownPortal />
    </div>
  );
};

export default LanguageSelector;
