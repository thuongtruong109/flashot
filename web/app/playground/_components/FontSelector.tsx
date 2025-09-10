"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Type, ChevronDown } from "lucide-react";

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (fontFamily: string) => void;
}

const fontFamilies = [
  // Monospace Fonts (Popular for coding)
  {
    name: "Fira Code",
    label: "Fira Code",
    category: "popular",
    hasLigatures: true,
    icon: "💎",
  },
  {
    name: "Monaco",
    label: "Monaco",
    category: "popular",
    hasLigatures: false,
    icon: "🔤",
  },
  {
    name: "Consolas",
    label: "Consolas",
    category: "popular",
    hasLigatures: false,
    icon: "🔠",
  },
  {
    name: "Menlo",
    label: "Menlo",
    category: "popular",
    hasLigatures: false,
    icon: "📝",
  },

  // Modern Coding Fonts
  {
    name: "JetBrains Mono",
    label: "JetBrains Mono",
    category: "modern",
    hasLigatures: true,
    icon: "✨",
  },
  {
    name: "Source Code Pro",
    label: "Source Code Pro",
    category: "modern",
    hasLigatures: false,
    icon: "📊",
  },
  {
    name: "Hack",
    label: "Hack",
    category: "modern",
    hasLigatures: false,
    icon: "⚡",
  },
  {
    name: "Cascadia Code",
    label: "Cascadia Code",
    category: "modern",
    hasLigatures: true,
    icon: "🌊",
  },
  {
    name: "Victor Mono",
    label: "Victor Mono",
    category: "modern",
    hasLigatures: true,
    icon: "🏆",
  },
  {
    name: "Operator Mono",
    label: "Operator Mono",
    category: "modern",
    hasLigatures: true,
    icon: "🔧",
  },

  // Classic Fonts
  {
    name: "Courier New",
    label: "Courier New",
    category: "classic",
    hasLigatures: false,
    icon: "📨",
  },
  {
    name: "Monaco",
    label: "Monaco",
    category: "classic",
    hasLigatures: false,
    icon: "🎮",
  },
  {
    name: "Lucida Console",
    label: "Lucida Console",
    category: "classic",
    hasLigatures: false,
    icon: "🖥️",
  },
  {
    name: "DejaVu Sans Mono",
    label: "DejaVu Sans Mono",
    category: "classic",
    hasLigatures: false,
    icon: "👁️",
  },

  // System Defaults
  {
    name: "monospace",
    label: "System Monospace",
    category: "system",
    hasLigatures: false,
    icon: "⌨️",
  },
  {
    name: "ui-monospace",
    label: "UI Monospace",
    category: "system",
    hasLigatures: false,
    icon: "🖱️",
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

    // Group fonts by category
    const categories = {
      popular: fontFamilies.filter((font) => font.category === "popular"),
      modern: fontFamilies.filter((font) => font.category === "modern"),
      classic: fontFamilies.filter((font) => font.category === "classic"),
      system: fontFamilies.filter((font) => font.category === "system"),
    };

    const categoryLabels = {
      popular: "Popular Coding Fonts",
      modern: "Modern Fonts",
      classic: "Classic Fonts",
      system: "System Fonts",
    };

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
        {Object.entries(categories).map(([category, fonts]) => (
          <div key={category} className="py-1">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </div>
            {fonts.map((font) => (
              <button
                key={font.name}
                onClick={() => {
                  onFontChange(font.name);
                  setIsOpen(false);
                }}
                className="w-full flex items-center space-x-2.5 px-3 py-2 text-sm text-left hover:bg-blue-50/60 rounded-lg transition-all group"
              >
                <div className="flex-shrink-0 text-lg">{font.icon}</div>
                <div className="flex flex-col">
                  <span
                    className="font-medium text-gray-900 group-hover:text-blue-700"
                    style={{ fontFamily: font.name }}
                  >
                    {font.label}
                  </span>
                  {font.hasLigatures && (
                    <span className="text-xs text-gray-500">
                      With ligatures
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
        <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
          <Type className="w-3.5 h-3.5 text-green-600 mr-1.5" />
          Font Family
        </label>

        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white/90 hover:bg-white border border-gray-200/60 hover:border-gray-300/80 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 flex items-center justify-between shadow-sm hover:shadow group"
          >
            <div className="flex items-center space-x-2.5">
              <span className="text-lg">{selectedFontObj?.icon}</span>
              <span className="text-sm" style={{ fontFamily: selectedFont }}>
                {selectedFontObj?.label}
                {selectedFontObj?.hasLigatures && " (ligatures)"}
              </span>
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

export default FontSelector;
