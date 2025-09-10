"use client";

import React from "react";
import { ThemeName } from "@/types";

interface ThemeSelectorProps {
  selectedTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

const themes: {
  value: ThemeName;
  label: string;
  colors: { bg: string; fg: string; accent: string };
}[] = [
  {
    value: "dark",
    label: "🌙 Dark",
    colors: { bg: "#1e1e1e", fg: "#d4d4d4", accent: "#569cd6" },
  },
  {
    value: "light",
    label: "☀️ Light",
    colors: { bg: "#ffffff", fg: "#333333", accent: "#0000ff" },
  },
  {
    value: "monokai",
    label: "🎨 Monokai",
    colors: { bg: "#272822", fg: "#f8f8f2", accent: "#f92672" },
  },
  {
    value: "github",
    label: "🐙 GitHub",
    colors: { bg: "#f6f8fa", fg: "#24292e", accent: "#d73a49" },
  },
  {
    value: "dracula",
    label: "🧛 Dracula",
    colors: { bg: "#282a36", fg: "#f8f8f2", accent: "#bd93f9" },
  },
  {
    value: "nord",
    label: "🏔️ Nord",
    colors: { bg: "#2e3440", fg: "#d8dee9", accent: "#88c0d0" },
  },
  {
    value: "solarized-dark",
    label: "🌅 Solarized Dark",
    colors: { bg: "#002b36", fg: "#839496", accent: "#268bd2" },
  },
  {
    value: "solarized-light",
    label: "🌞 Solarized Light",
    colors: { bg: "#fdf6e3", fg: "#657b83", accent: "#268bd2" },
  },
  {
    value: "material",
    label: "📐 Material",
    colors: { bg: "#263238", fg: "#eeffff", accent: "#82aaff" },
  },
  {
    value: "one-dark",
    label: "⚫ One Dark",
    colors: { bg: "#282c34", fg: "#abb2bf", accent: "#61afef" },
  },
  {
    value: "tomorrow-night",
    label: "🌃 Tomorrow Night",
    colors: { bg: "#1d1f21", fg: "#c5c8c6", accent: "#81a2be" },
  },
  {
    value: "atom-dark",
    label: "⚛️ Atom Dark",
    colors: { bg: "#1e1e1e", fg: "#ffffff", accent: "#61dafb" },
  },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange,
}) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
      <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
        <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></span>
        Code Theme
      </label>

      <select
        value={selectedTheme}
        onChange={(e) => onThemeChange(e.target.value as ThemeName)}
        className="space-y-3 w-full bg-white/80 border border-gray-200/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium text-gray-700"
      >
        <optgroup label="🎨 Popular Themes">
          {themes.slice(0, 4).map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </optgroup>
        <optgroup label="✨ Premium Themes">
          {themes.slice(4, 8).map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </optgroup>
        <optgroup label="🚀 Developer Favorites">
          {themes.slice(8).map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default ThemeSelector;
