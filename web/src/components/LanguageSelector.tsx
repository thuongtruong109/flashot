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
    icon: <Code className="w-4 h-4 text-yellow-600" />,
    category: "Popular",
  },
  {
    value: "typescript",
    label: "TypeScript",
    icon: <Code className="w-4 h-4 text-blue-600" />,
    category: "Popular",
  },
  {
    value: "python",
    label: "Python",
    icon: <Code className="w-4 h-4 text-green-600" />,
    category: "Popular",
  },
  {
    value: "java",
    label: "Java",
    icon: <Code className="w-4 h-4 text-red-600" />,
    category: "Popular",
  },
  {
    value: "cpp",
    label: "C++",
    icon: <Code className="w-4 h-4 text-blue-700" />,
    category: "Popular",
  },
  {
    value: "c",
    label: "C",
    icon: <Code className="w-4 h-4 text-gray-600" />,
    category: "Popular",
  },
  {
    value: "csharp",
    label: "C#",
    icon: <Code className="w-4 h-4 text-purple-600" />,
    category: "Popular",
  },
  {
    value: "php",
    label: "PHP",
    icon: <Code className="w-4 h-4 text-indigo-600" />,
    category: "Popular",
  },
  {
    value: "ruby",
    label: "Ruby",
    icon: <Code className="w-4 h-4 text-red-500" />,
    category: "System",
  },
  {
    value: "go",
    label: "Go",
    icon: <Code className="w-4 h-4 text-cyan-600" />,
    category: "System",
  },
  {
    value: "rust",
    label: "Rust",
    icon: <Code className="w-4 h-4 text-orange-600" />,
    category: "System",
  },
  {
    value: "swift",
    label: "Swift",
    icon: <Code className="w-4 h-4 text-orange-500" />,
    category: "System",
  },
  {
    value: "kotlin",
    label: "Kotlin",
    icon: <Code className="w-4 h-4 text-purple-500" />,
    category: "System",
  },
  {
    value: "scala",
    label: "Scala",
    icon: <Code className="w-4 h-4 text-red-700" />,
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
    icon: <Braces className="w-4 h-4 text-blue-500" />,
    category: "Web",
  },
  {
    value: "scss",
    label: "SCSS",
    icon: <Braces className="w-4 h-4 text-pink-500" />,
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
    icon: <FileText className="w-4 h-4 text-green-600" />,
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

  const categories = {
    Popular: supportedLanguages.filter((lang) => lang.category === "Popular"),
    System: supportedLanguages.filter((lang) => lang.category === "System"),
    Web: supportedLanguages.filter((lang) => lang.category === "Web"),
    Config: supportedLanguages.filter((lang) => lang.category === "Config"),
  };

  const DropdownPortal = () => {
    if (typeof window === "undefined" || !isOpen) return null;

    return createPortal(
      <div
        ref={dropdownRef}
        className="bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto"
        style={{
          position: "fixed",
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width,
          zIndex: 99999,
        }}
      >
        {supportedLanguages.map((lang) => (
          <button
            key={lang.value}
            onClick={() => {
              onLanguageChange(lang.value);
              setIsOpen(false);
            }}
            className="w-full flex items-center space-x-2.5 px-2.5 py-2 text-sm text-left hover:bg-blue-50/60 rounded-lg transition-all duration-150 group"
          >
            {lang.icon}
            <span className="font-medium text-gray-900 group-hover:text-blue-700">
              {lang.label}
            </span>
          </button>
        ))}
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
        <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
          <Code className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
          Programming Language
        </label>

        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white/90 hover:bg-white border border-gray-200/60 hover:border-gray-300/80 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 flex items-center justify-between shadow-sm hover:shadow group"
          >
            <div className="flex items-center space-x-2.5">
              {selectedLang?.icon}
              <span className="text-sm">{selectedLang?.label}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <DropdownPortal />
    </>
  );
};

export default LanguageSelector;
