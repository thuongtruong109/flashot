"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Type,
  ChevronDown,
  Zap,
  Code,
  Terminal,
  FileText,
  Star,
  Monitor,
  Crown,
  Sparkles,
  Wrench,
  Mail,
  Gamepad2,
  Box,
  Search,
  Layers,
} from "lucide-react";

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (fontFamily: string) => void;
}

const fontFamilies = [
  {
    name: "Fira Code",
    label: "Fira Code",
    category: "popular",
    icon: <Crown className="w-4 h-4 text-purple-500" />,
  },
  {
    name: "Monaco",
    label: "Monaco",
    category: "popular",
    icon: <Monitor className="w-4 h-4 text-blue-500" />,
  },
  {
    name: "Consolas",
    label: "Consolas",
    category: "popular",
    icon: <Terminal className="w-4 h-4 text-green-500" />,
  },
  {
    name: "Menlo",
    label: "Menlo",
    category: "popular",
    icon: <FileText className="w-4 h-4 text-gray-500" />,
  },
  {
    name: "JetBrains Mono",
    label: "JetBrains Mono",
    category: "modern",
    icon: <Sparkles className="w-4 h-4 text-yellow-500" />,
  },
  {
    name: "Source Code Pro",
    label: "Source Code Pro",
    category: "modern",
    icon: <Code className="w-4 h-4 text-blue-600" />,
  },
  {
    name: "Hack",
    label: "Hack",
    category: "modern",
    icon: <Zap className="w-4 h-4 text-orange-500" />,
  },
  {
    name: "Cascadia Code",
    label: "Cascadia Code",
    category: "modern",
    icon: <Layers className="w-4 h-4 text-cyan-500" />,
  },
  {
    name: "Victor Mono",
    label: "Victor Mono",
    category: "modern",
    icon: <Star className="w-4 h-4 text-yellow-600" />,
  },
  {
    name: "Operator Mono",
    label: "Operator Mono",
    category: "modern",
    icon: <Wrench className="w-4 h-4 text-red-500" />,
  },
  {
    name: "Courier New",
    label: "Courier New",
    category: "classic",
    icon: <Mail className="w-4 h-4 text-green-600" />,
  },
  {
    name: "Lucida Console",
    label: "Lucida Console",
    category: "classic",
    icon: <Monitor className="w-4 h-4 text-gray-600" />,
  },
  {
    name: "DejaVu Sans Mono",
    label: "DejaVu Sans Mono",
    category: "classic",
    icon: <Search className="w-4 h-4 text-teal-500" />,
  },
  {
    name: "monospace",
    label: "System Monospace",
    category: "system",
    icon: <Terminal className="w-4 h-4 text-gray-700" />,
  },
  {
    name: "ui-monospace",
    label: "UI Monospace",
    category: "system",
    icon: <Box className="w-4 h-4 text-slate-500" />,
  },
];

const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  onFontChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedFontObj = fontFamilies.find(
    (font) => font.name === selectedFont
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
        data-dropdown-type="font-selector"
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl dark:shadow-gray-900/50 max-h-96 overflow-y-auto custom-scrollbar"
        style={{
          position: "fixed",
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: Math.min(dropdownPosition.width, 260),
          zIndex: 99999,
        }}
      >
        <div className="p-3">
          {fontFamilies.map((font) => (
            <button
              key={font.name}
              onClick={() => {
                onFontChange(font.name);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between space-x-3 px-4 py-3 text-sm text-left rounded-xl transition-all duration-200 group mb-1 ${
                selectedFont === font.name
                  ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200/50 dark:border-blue-700/50 shadow-sm"
                  : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 dark:hover:from-gray-700/30 dark:hover:to-gray-700/20 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">{font.icon}</div>
                <span
                  className={`font-medium transition-colors ${
                    selectedFont === font.name
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                  }`}
                  style={{ fontFamily: font.name }}
                >
                  {font.label}
                </span>
              </div>
              {selectedFont === font.name && (
                <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
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
        <Type className="w-3.5 h-3.5 text-green-600 mr-1.5" />
        Font Family
      </label>

      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gradient-to-r from-white/80 via-white/70 to-white/80 dark:from-gray-800/60 dark:via-gray-800/40 dark:to-gray-800/60 backdrop-blur-sm hover:bg-gradient-to-r hover:from-white/90 hover:via-white/80 hover:to-white/90 dark:hover:from-gray-800/80 dark:hover:via-gray-800/60 dark:hover:to-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300/80 dark:hover:border-gray-600/80 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 transition-all duration-200 font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-between shadow-sm hover:shadow-md hover:shadow-gray-200/40 dark:hover:shadow-gray-900/40 group"
        >
          <div className="flex items-center space-x-3">
            <div className="text-base group-hover:scale-110 transition-transform duration-200">
              {selectedFontObj?.icon}
            </div>
            <span className="text-sm" style={{ fontFamily: selectedFont }}>
              {selectedFontObj?.label}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-all duration-200 group-hover:scale-110 ${
              isOpen
                ? "rotate-180 text-blue-500 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            }`}
          />
        </button>
      </div>

      <DropdownPortal />
    </div>
  );
};

export default FontSelector;
