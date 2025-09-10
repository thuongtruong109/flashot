"use client";

import React from "react";

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
}) => {
  const popularFonts = fontFamilies.filter(
    (font) => font.category === "popular"
  );

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
      <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-2"></span>
        Font Family
      </label>

      <select
        value={selectedFont}
        onChange={(e) => onFontChange(e.target.value)}
        className="space-y-3 w-full bg-white/80 border border-gray-200/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium text-gray-700"
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
  );
};

export default FontSelector;
