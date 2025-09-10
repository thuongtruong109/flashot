"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Palette, ChevronDown } from "lucide-react";
import { ThemeName } from "@/types";

interface ThemeSelectorProps {
  selectedTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}

const themes: {
  value: ThemeName;
  label: string;
  colors: { bg: string; fg: string; accent: string };
  icon: string;
}[] = [
  {
    value: "dark",
    label: "Dark",
    icon: "🌙",
    colors: { bg: "#1e1e1e", fg: "#d4d4d4", accent: "#569cd6" },
  },
  {
    value: "light",
    label: "Light",
    icon: "☀️",
    colors: { bg: "#ffffff", fg: "#333333", accent: "#0000ff" },
  },
  {
    value: "monokai",
    label: "Monokai",
    icon: "🎨",
    colors: { bg: "#272822", fg: "#f8f8f2", accent: "#f92672" },
  },
  {
    value: "github",
    label: "GitHub",
    icon: "🐙",
    colors: { bg: "#f6f8fa", fg: "#24292e", accent: "#d73a49" },
  },
  {
    value: "dracula",
    label: "Dracula",
    icon: "🧛",
    colors: { bg: "#282a36", fg: "#f8f8f2", accent: "#bd93f9" },
  },
  {
    value: "nord",
    label: "Nord",
    icon: "🏔️",
    colors: { bg: "#2e3440", fg: "#d8dee9", accent: "#88c0d0" },
  },
  {
    value: "solarized-dark",
    label: "Solarized Dark",
    icon: "🌅",
    colors: { bg: "#002b36", fg: "#839496", accent: "#268bd2" },
  },
  {
    value: "solarized-light",
    label: "Solarized Light",
    icon: "🌞",
    colors: { bg: "#fdf6e3", fg: "#657b83", accent: "#268bd2" },
  },
  {
    value: "material",
    label: "Material",
    icon: "📐",
    colors: { bg: "#263238", fg: "#eeffff", accent: "#82aaff" },
  },
  {
    value: "one-dark",
    label: "One Dark",
    icon: "⚫",
    colors: { bg: "#282c34", fg: "#abb2bf", accent: "#61afef" },
  },
  {
    value: "tomorrow-night",
    label: "Tomorrow Night",
    icon: "🌃",
    colors: { bg: "#1d1f21", fg: "#c5c8c6", accent: "#81a2be" },
  },
  {
    value: "atom-dark",
    label: "Atom Dark",
    icon: "⚛️",
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
        className="bg-white border border-gray-200 rounded-xl shadow-xl max-h-80 overflow-y-auto"
        style={{
          position: "fixed",
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width,
          zIndex: 99999,
        }}
      >
        {themes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => {
              onThemeChange(theme.value);
              setIsOpen(false);
            }}
            className="w-full flex items-center space-x-2.5 px-2.5 py-2 text-sm text-left hover:bg-blue-50/60 rounded-lg transition-all duration-150 group"
          >
            <span className="text-lg">{theme.icon}</span>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.colors.bg }}
              ></div>
              <span className="font-medium text-gray-900 group-hover:text-blue-700">
                {theme.label}
              </span>
            </div>
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
          <Palette className="w-3.5 h-3.5 text-purple-600 mr-1.5" />
          Code Theme
        </label>

        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="w-full bg-white/90 hover:bg-white border border-gray-200/60 hover:border-gray-300/80 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 flex items-center justify-between shadow-sm hover:shadow group"
          >
            <div className="flex items-center space-x-2.5">
              <span className="text-lg">{selectedThemeObj?.icon}</span>
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedThemeObj?.colors.bg }}
                ></div>
                <span className="text-sm">{selectedThemeObj?.label}</span>
              </div>
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

export default ThemeSelector;
