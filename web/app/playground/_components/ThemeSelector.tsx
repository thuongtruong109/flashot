"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Palette,
  ChevronDown,
  Moon,
  Sun,
  Sparkles,
  Github,
  Zap,
  Snowflake,
  Sunrise,
  Sunset,
  Layers,
  Eye,
  Coffee,
  Stars,
} from "lucide-react";
import { ThemeName } from "@/types";

interface ThemeSelectorProps {
  selectedTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

const themes: {
  value: ThemeName;
  label: string;
  colors: { bg: string; fg: string; accent: string };
  icon: React.ReactNode;
}[] = [
  {
    value: "dark",
    label: "Dark",
    icon: <Moon className="w-4 h-4 text-slate-600" />,
    colors: { bg: "#1e1e1e", fg: "#d4d4d4", accent: "#569cd6" },
  },
  {
    value: "light",
    label: "Light",
    icon: <Sun className="w-4 h-4 text-yellow-500" />,
    colors: { bg: "#ffffff", fg: "#333333", accent: "#0000ff" },
  },
  {
    value: "monokai",
    label: "Monokai",
    icon: <Sparkles className="w-4 h-4 text-purple-500" />,
    colors: { bg: "#272822", fg: "#f8f8f2", accent: "#f92672" },
  },
  {
    value: "github",
    label: "GitHub",
    icon: <Github className="w-4 h-4 text-gray-700" />,
    colors: { bg: "#f6f8fa", fg: "#24292e", accent: "#d73a49" },
  },
  {
    value: "dracula",
    label: "Dracula",
    icon: <Zap className="w-4 h-4 text-purple-400" />,
    colors: { bg: "#282a36", fg: "#f8f8f2", accent: "#bd93f9" },
  },
  {
    value: "nord",
    label: "Nord",
    icon: <Snowflake className="w-4 h-4 text-blue-400" />,
    colors: { bg: "#2e3440", fg: "#d8dee9", accent: "#88c0d0" },
  },
  {
    value: "solarized-dark",
    label: "Solarized Dark",
    icon: <Sunrise className="w-4 h-4 text-orange-600" />,
    colors: { bg: "#002b36", fg: "#839496", accent: "#268bd2" },
  },
  {
    value: "solarized-light",
    label: "Solarized Light",
    icon: <Sunset className="w-4 h-4 text-yellow-400" />,
    colors: { bg: "#fdf6e3", fg: "#657b83", accent: "#268bd2" },
  },
  {
    value: "material",
    label: "Material",
    icon: <Layers className="w-4 h-4 text-teal-500" />,
    colors: { bg: "#263238", fg: "#eeffff", accent: "#82aaff" },
  },
  {
    value: "one-dark",
    label: "One Dark",
    icon: <Eye className="w-4 h-4 text-indigo-500" />,
    colors: { bg: "#282c34", fg: "#abb2bf", accent: "#61afef" },
  },
  {
    value: "tomorrow-night",
    label: "Tomorrow Night",
    icon: <Stars className="w-4 h-4 text-blue-300" />,
    colors: { bg: "#1d1f21", fg: "#c5c8c6", accent: "#81a2be" },
  },
  {
    value: "atom-dark",
    label: "Atom Dark",
    icon: <Coffee className="w-4 h-4 text-green-400" />,
    colors: { bg: "#1e1e1e", fg: "#ffffff", accent: "#61dafb" },
  },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedThemeObj = themes.find(
    (theme) => theme.value === selectedTheme
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
        data-dropdown-type="theme-selector"
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
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => {
                onThemeChange(theme.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between space-x-3 px-4 py-3 text-sm text-left rounded-xl transition-all duration-200 group mb-1 ${
                selectedTheme === theme.value
                  ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200/50 shadow-sm"
                  : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">{theme.icon}</div>
                <span
                  className={`font-medium transition-colors ${
                    selectedTheme === theme.value
                      ? "text-blue-700"
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  {theme.label}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: theme.colors.bg }}
                  />
                  <div
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>
                {selectedTheme === theme.value && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
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
        <Palette className="w-3.5 h-3.5 text-purple-600 mr-1.5" />
        Code Theme
      </label>

      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gradient-to-r from-white/80 via-white/70 to-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-white/90 hover:via-white/80 hover:to-white/90 border border-gray-200/60 hover:border-gray-300/80 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 flex items-center justify-between shadow-sm hover:shadow-md hover:shadow-gray-200/40 group"
        >
          <div className="flex items-center space-x-3">
            <div className="text-base group-hover:scale-110 transition-transform duration-200">
              {selectedThemeObj?.icon}
            </div>
            <span className="text-sm">{selectedThemeObj?.label}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div
                className="w-3 h-3 rounded-full border border-gray-300/60 group-hover:border-gray-400/70 transition-colors"
                style={{ backgroundColor: selectedThemeObj?.colors.bg }}
              />
              <div
                className="w-3 h-3 rounded-full border border-gray-300/60 group-hover:border-gray-400/70 transition-colors"
                style={{ backgroundColor: selectedThemeObj?.colors.accent }}
              />
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-all duration-200 group-hover:scale-110 ${
                isOpen
                  ? "rotate-180 text-blue-500"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            />
          </div>
        </button>
      </div>

      <DropdownPortal />
    </div>
  );
};

export default ThemeSelector;
