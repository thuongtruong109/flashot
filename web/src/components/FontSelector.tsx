"use client";

import React from "react";
import { Type } from "lucide-react";

interface FontSelectorProps {
  selectedFont: string;
  onFontChange: (fontFamily: string) => void;
  fontSize: number;
  onFontSizeChange: (fontSize: number) => void;
}

const fontFamilies = [
  // Monospace Fonts (Popular for coding)
  {
    name: "Fira Code",
    label: "Fira Code",
    category: "popular",
    hasLigatures: true,
  },
  { name: "Monaco", label: "Monaco", category: "popular", hasLigatures: false },
  {
    name: "Consolas",
    label: "Consolas",
    category: "popular",
    hasLigatures: false,
  },
  { name: "Menlo", label: "Menlo", category: "popular", hasLigatures: false },

  // Modern Coding Fonts
  {
    name: "JetBrains Mono",
    label: "JetBrains Mono",
    category: "modern",
    hasLigatures: true,
  },
  {
    name: "Source Code Pro",
    label: "Source Code Pro",
    category: "modern",
    hasLigatures: false,
  },
  { name: "Hack", label: "Hack", category: "modern", hasLigatures: false },
  {
    name: "Cascadia Code",
    label: "Cascadia Code",
    category: "modern",
    hasLigatures: true,
  },
  {
    name: "Victor Mono",
    label: "Victor Mono",
    category: "modern",
    hasLigatures: true,
  },
  {
    name: "Operator Mono",
    label: "Operator Mono",
    category: "modern",
    hasLigatures: true,
  },

  // Classic Fonts
  {
    name: "Courier New",
    label: "Courier New",
    category: "classic",
    hasLigatures: false,
  },
  { name: "Monaco", label: "Monaco", category: "classic", hasLigatures: false },
  {
    name: "Lucida Console",
    label: "Lucida Console",
    category: "classic",
    hasLigatures: false,
  },
  {
    name: "DejaVu Sans Mono",
    label: "DejaVu Sans Mono",
    category: "classic",
    hasLigatures: false,
  },

  // System Defaults
  {
    name: "monospace",
    label: "System Monospace",
    category: "system",
    hasLigatures: false,
  },
  {
    name: "ui-monospace",
    label: "UI Monospace",
    category: "system",
    hasLigatures: false,
  },
];

const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  onFontChange,
  fontSize,
  onFontSizeChange,
}) => {
  const popularFonts = fontFamilies.filter(
    (font) => font.category === "popular"
  );

  return (
    <div className="space-y-4">
      {/* Font Family */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
        <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
          <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-2"></span>
          Font Family
        </label>

        <div className="space-y-3">
          {/* Popular Fonts Quick Select */}
          <div className="grid grid-cols-2 gap-2">
            {popularFonts.map((font) => (
              <button
                key={font.name}
                onClick={() => onFontChange(font.name)}
                className={`p-3 rounded-lg text-left border-2 transition-all duration-200 ${
                  selectedFont === font.name
                    ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50/50"
                    : "border-gray-200/50 hover:border-gray-300 bg-white/50"
                }`}
              >
                <div
                  className="text-sm font-medium mb-1"
                  style={{ fontFamily: font.name }}
                >
                  Code()
                </div>
                <div className="text-xs text-gray-600 flex items-center justify-between">
                  <span>{font.label}</span>
                  {font.hasLigatures && (
                    <span className="text-xs bg-green-100 text-green-700 px-1 rounded">
                      ≠≥
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Full Font Dropdown */}
          <select
            value={selectedFont}
            onChange={(e) => onFontChange(e.target.value)}
            className="w-full bg-white/80 border border-gray-200/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium text-gray-700"
          >
            <optgroup label="🔥 Popular Coding Fonts">
              {fontFamilies
                .filter((f) => f.category === "popular")
                .map((font) => (
                  <option
                    key={font.name}
                    value={font.name}
                    style={{ fontFamily: font.name }}
                  >
                    {font.label} {font.hasLigatures ? "≠≥" : ""}
                  </option>
                ))}
            </optgroup>
            <optgroup label="⚡ Modern Fonts">
              {fontFamilies
                .filter((f) => f.category === "modern")
                .map((font) => (
                  <option
                    key={font.name}
                    value={font.name}
                    style={{ fontFamily: font.name }}
                  >
                    {font.label} {font.hasLigatures ? "≠≥" : ""}
                  </option>
                ))}
            </optgroup>
            <optgroup label="📚 Classic Fonts">
              {fontFamilies
                .filter((f) => f.category === "classic")
                .map((font) => (
                  <option
                    key={font.name}
                    value={font.name}
                    style={{ fontFamily: font.name }}
                  >
                    {font.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="🖥️ System Fonts">
              {fontFamilies
                .filter((f) => f.category === "system")
                .map((font) => (
                  <option key={font.name} value={font.name}>
                    {font.label}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Font Size */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
        <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></span>
            Font Size
          </div>
          <span className="text-xs bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-bold">
            {fontSize}px
          </span>
        </label>

        <div className="space-y-3">
          {/* Quick Size Buttons */}
          <div className="flex space-x-2">
            {[12, 14, 16, 18, 20].map((size) => (
              <button
                key={size}
                onClick={() => onFontSizeChange(size)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  fontSize === size
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "bg-white/80 text-gray-700 hover:bg-white/90"
                }`}
              >
                {size}px
              </button>
            ))}
          </div>

          {/* Font Size Slider */}
          <input
            type="range"
            min="10"
            max="32"
            value={fontSize}
            onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
};

export default FontSelector;
