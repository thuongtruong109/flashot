"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
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
  Lightbulb,
  Mountain,
  TreePine,
  Waves,
  Flame,
  CloudMoon,
  CloudSun,
  Wind,
  Leaf,
  Feather,
} from "lucide-react";
import { ThemeName } from "@/types";
import { useLocalization } from "../LocalizationContext";

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
    label: "GitHub Dark",
    icon: <Github className="w-4 h-4 text-gray-700" />,
    colors: { bg: "#f6f8fa", fg: "#24292e", accent: "#d73a49" },
  },
  {
    value: "github-light",
    label: "GitHub Light",
    icon: <Github className="w-4 h-4 text-gray-400" />,
    colors: { bg: "#ffffff", fg: "#24292f", accent: "#cf222e" },
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
    colors: { bg: "#1e1e1e", fg: "#c5c8c6", accent: "#61afef" },
  },
  {
    value: "cobalt",
    label: "Cobalt",
    icon: <Waves className="w-4 h-4 text-blue-500" />,
    colors: { bg: "#002240", fg: "#ffffff", accent: "#ff9d00" },
  },
  {
    value: "night-owl",
    label: "Night Owl",
    icon: <Moon className="w-4 h-4 text-indigo-400" />,
    colors: { bg: "#011627", fg: "#d6deeb", accent: "#c792ea" },
  },
  {
    value: "palenight",
    label: "Palenight",
    icon: <CloudMoon className="w-4 h-4 text-purple-400" />,
    colors: { bg: "#292d3e", fg: "#a6accd", accent: "#c792ea" },
  },
  {
    value: "shades-of-purple",
    label: "Shades of Purple",
    icon: <Sparkles className="w-4 h-4 text-fuchsia-500" />,
    colors: { bg: "#2d2b55", fg: "#e3dfff", accent: "#ff7edb" },
  },
  {
    value: "ayu-dark",
    label: "Ayu Dark",
    icon: <Mountain className="w-4 h-4 text-orange-500" />,
    colors: { bg: "#0a0e14", fg: "#b3b1ad", accent: "#ff8f40" },
  },
  {
    value: "ayu-light",
    label: "Ayu Light",
    icon: <Mountain className="w-4 h-4 text-orange-300" />,
    colors: { bg: "#fafafa", fg: "#575f66", accent: "#fa8d3e" },
  },
  {
    value: "gruvbox-dark",
    label: "Gruvbox Dark",
    icon: <TreePine className="w-4 h-4 text-amber-600" />,
    colors: { bg: "#282828", fg: "#ebdbb2", accent: "#fb4934" },
  },
  {
    value: "gruvbox-light",
    label: "Gruvbox Light",
    icon: <TreePine className="w-4 h-4 text-amber-400" />,
    colors: { bg: "#fbf1c7", fg: "#3c3836", accent: "#9d0006" },
  },
  {
    value: "tokyo-night",
    label: "Tokyo Night",
    icon: <CloudMoon className="w-4 h-4 text-indigo-500" />,
    colors: { bg: "#1a1b26", fg: "#c0caf5", accent: "#bb9af7" },
  },
  {
    value: "tokyo-night-storm",
    label: "Tokyo Night Storm",
    icon: <CloudMoon className="w-4 h-4 text-blue-500" />,
    colors: { bg: "#24283b", fg: "#c0caf5", accent: "#bb9af7" },
  },
  {
    value: "tokyo-night-light",
    label: "Tokyo Night Light",
    icon: <CloudSun className="w-4 h-4 text-blue-400" />,
    colors: { bg: "#d5d6db", fg: "#343b58", accent: "#5a4a78" },
  },
  {
    value: "catppuccin-mocha",
    label: "Catppuccin Mocha",
    icon: <Coffee className="w-4 h-4 text-purple-400" />,
    colors: { bg: "#1e1e2e", fg: "#cdd6f4", accent: "#cba6f7" },
  },
  {
    value: "catppuccin-latte",
    label: "Catppuccin Latte",
    icon: <Coffee className="w-4 h-4 text-purple-300" />,
    colors: { bg: "#eff1f5", fg: "#4c4f69", accent: "#8839ef" },
  },
  {
    value: "synthwave-84",
    label: "Synthwave '84",
    icon: <Flame className="w-4 h-4 text-pink-500" />,
    colors: { bg: "#262335", fg: "#f8f8f2", accent: "#ff7edb" },
  },
  {
    value: "panda-syntax",
    label: "Panda",
    icon: <Feather className="w-4 h-4 text-cyan-400" />,
    colors: { bg: "#292a2b", fg: "#e6e6e6", accent: "#ff75b5" },
  },
];

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange,
}) => {
  const { t } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  // Set position using useLayoutEffect
  useLayoutEffect(() => {
    if (!isOpen) {
      setMounted(false);
      return;
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
      setTimeout(() => setMounted(true), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleClose = () => {
    setMounted(false);
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const DropdownPortal = () => {
    if (typeof window === "undefined" || !isOpen) return null;

    return createPortal(
      <div
        ref={dropdownRef}
        data-dropdown-type="theme-selector"
        className={`bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-2xl shadow-2xl dark:shadow-gray-900/50 max-h-96 overflow-y-auto custom-scrollbar transition-all duration-200 ease-out ${
          mounted && !isClosing ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{
          position: "fixed",
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: Math.min(dropdownPosition.width, 260),
          zIndex: 99999,
          transformOrigin: "top center",
        }}
      >
        <div className="p-2">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => {
                onThemeChange(theme.value);
                handleClose();
              }}
              className={`w-full flex items-center justify-between space-x-2 px-3 py-2 text-sm text-left rounded-xl transition-all duration-200 group mb-0.5 ${
                selectedTheme === theme.value
                  ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-900/30 dark:to-blue-800/30 border border-blue-200/50 dark:border-blue-700/50 shadow-sm"
                  : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 dark:hover:from-gray-700/30 dark:hover:to-gray-700/20 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">{theme.icon}</div>
                <span
                  className={`font-medium transition-colors text-xs ${
                    selectedTheme === theme.value
                      ? "text-blue-700 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                  }`}
                >
                  {theme.label}
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="flex space-x-0.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full border border-gray-200 dark:border-gray-600"
                    style={{ backgroundColor: theme.colors.bg }}
                  />
                  <div
                    className="w-2.5 h-2.5 rounded-full border border-gray-200 dark:border-gray-600"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>
                {selectedTheme === theme.value && (
                  <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
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
        {t("settingsPanel.theme.colorTheme")}
      </label>

      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gradient-to-r from-white/80 via-white/70 to-white/80 dark:from-gray-800/60 dark:via-gray-800/40 dark:to-gray-800/60 backdrop-blur-sm hover:bg-gradient-to-r hover:from-white/90 hover:via-white/80 hover:to-white/90 dark:hover:from-gray-800/80 dark:hover:via-gray-800/60 dark:hover:to-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 hover:border-gray-300/80 dark:hover:border-gray-600/80 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/60 transition-all duration-200 font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center justify-between shadow-sm hover:shadow-md hover:shadow-gray-200/40 dark:hover:shadow-gray-900/40 group"
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
                className="w-3 h-3 rounded-full border border-gray-300/60 dark:border-gray-600/60 group-hover:border-gray-400/70 dark:group-hover:border-gray-500/70 transition-colors"
                style={{ backgroundColor: selectedThemeObj?.colors.bg }}
              />
              <div
                className="w-3 h-3 rounded-full border border-gray-300/60 dark:border-gray-600/60 group-hover:border-gray-400/70 dark:group-hover:border-gray-500/70 transition-colors"
                style={{ backgroundColor: selectedThemeObj?.colors.accent }}
              />
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-all duration-200 group-hover:scale-110 ${
                isOpen
                  ? "rotate-180 text-blue-500 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
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
