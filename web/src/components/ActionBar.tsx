"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Download,
  Copy,
  Settings,
  FileText,
  Info,
  Check,
  Loader2,
  Palette,
  Code2,
  Sparkles,
  Zap,
  ChevronDown,
  Edit2,
} from "lucide-react";

interface ActionBarProps {
  onCopy: () => void;
  onDownload: (format?: string) => void;
  onShowSettings: () => void;
  onShowJSON: () => void;
  onShowTips: () => void;
  copySuccess: boolean;
  isGenerating: boolean;
  fileName: string;
  onFileNameChange: (fileName: string) => void;
  showSettingsPanel?: boolean;
  className?: string;
}

const ActionBar: React.FC<ActionBarProps> = ({
  onCopy,
  onDownload,
  onShowSettings,
  onShowJSON,
  onShowTips,
  copySuccess,
  isGenerating,
  fileName,
  onFileNameChange,
  showSettingsPanel = false,
  className = "",
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  const exportFormats = [
    {
      value: "png",
      label: "PNG",
      icon: "🖼️",
    },
    {
      value: "jpg",
      label: "JPG",
      icon: "📷",
    },
    {
      value: "webp",
      label: "WebP",
      icon: "🚀",
    },
    {
      value: "avif",
      label: "AVIF",
      icon: "⚡",
    },
    {
      value: "svg",
      label: "SVG",
      icon: "🔧",
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        exportMenuRef.current &&
        !exportMenuRef.current.contains(event.target as Node)
      ) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleExportClick = (format: string) => {
    onDownload(format);
    setShowExportMenu(false);
  };

  // Remove copy code button from header as requested
  // Filter out settings button on wide screens when settings panel is open
  const allButtons = [
    {
      icon: Info,
      label: "Help",
      onClick: onShowTips,
      variant: "secondary" as const,
      color: "amber",
      disabled: false,
    },
    {
      icon: FileText,
      label: "Data",
      onClick: onShowJSON,
      variant: "secondary" as const,
      color: "emerald",
      disabled: false,
    },
    {
      icon: Settings,
      label: "Settings",
      onClick: onShowSettings,
      variant: "secondary" as const,
      color: "slate",
      disabled: false,
    },
  ];

  // Filter the settings button on desktop screens when appropriate
  const buttons = allButtons.filter((button) => {
    // Don't show settings button on desktop (lg screens) as it will always be open
    const isSettingsButton = button.icon === Settings;
    return !isSettingsButton || window.innerWidth < 1024;
  });

  const getButtonStyles = (
    variant: "primary" | "secondary",
    color: string,
    disabled: boolean
  ) => {
    // Smaller, more refined buttons with Tailwind vibe
    const baseStyles =
      "group relative flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm shadow-sm transform hover:scale-[1.02] active:scale-[0.98]";

    if (disabled) {
      return `${baseStyles} bg-gray-100 text-gray-400 cursor-not-allowed shadow-none transform-none hover:scale-100`;
    }

    // More refined color palette with better contrast
    return `${baseStyles} bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-200 shadow-sm`;
  };

  const getIconStyles = (color: string, variant: "primary" | "secondary") => {
    const colorMap = {
      amber: "text-amber-500 group-hover:text-amber-600",
      slate: "text-slate-500 group-hover:text-slate-600",
      emerald: "text-emerald-500 group-hover:text-emerald-600",
      blue: "text-blue-500 group-hover:text-blue-600",
    };

    return `w-4 h-4 transition-all duration-200 ${
      colorMap[color as keyof typeof colorMap] ||
      "text-gray-500 group-hover:text-gray-600"
    }`;
  };

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center space-x-3">
        {buttons.map((button, index) => {
          const Icon = button.icon;
          return (
            <button
              key={index}
              onClick={button.onClick}
              disabled={button.disabled}
              className={getButtonStyles(
                button.variant,
                button.color,
                button.disabled
              )}
            >
              <Icon
                className={`${getIconStyles(button.color, button.variant)} ${
                  button.disabled && button.icon === Loader2
                    ? "animate-spin"
                    : ""
                }`}
              />
              <span className="font-medium">{button.label}</span>
            </button>
          );
        })}

        {/* Export Button with Dropdown */}
        <div className="relative" ref={exportMenuRef}>
          <div className="flex">
            {/* Main Export Button - More eye-friendly gradient */}
            <button
              onClick={() => handleExportClick("png")}
              disabled={isGenerating}
              className="group relative flex items-center space-x-2 px-4 py-2 rounded-l-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:hover:scale-100"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="font-medium">
                {isGenerating ? "Generating..." : "Export"}
              </span>
            </button>

            {/* Dropdown Toggle */}
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isGenerating}
              className="group relative px-2 py-2 rounded-r-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white transition-all duration-200 shadow-sm hover:shadow-md border-l border-blue-400/30 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:hover:scale-100"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showExportMenu ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Export Format Dropdown */}
          {showExportMenu && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg z-[100] overflow-hidden">
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide px-3 py-2 mb-1">
                  Export Formats
                </div>
                {exportFormats.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => handleExportClick(format.value)}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 text-left hover:bg-gray-50 rounded-lg transition-all group"
                  >
                    <div className="flex-shrink-0 text-lg">{format.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-700">
                        {format.label}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex lg:hidden items-center space-x-2 w-full">
        {/* Primary action with dropdown for mobile */}
        <div className="w-auto relative" ref={exportMenuRef}>
          <div className="flex">
            <button
              onClick={() => handleExportClick("png")}
              disabled={isGenerating}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-l-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isGenerating ? "Generating..." : "Export"}</span>
            </button>

            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isGenerating}
              className="px-3 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-r-lg transition-all duration-200 shadow-sm hover:shadow-md border-l border-blue-400/30"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showExportMenu ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile Export Format Dropdown */}
          {showExportMenu && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg z-[100] overflow-hidden">
              <div className="p-2">
                {/* File Name Section for Mobile */}

                {exportFormats.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => handleExportClick(format.value)}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 text-left hover:bg-gray-50 rounded-lg transition-all group"
                  >
                    <div className="flex-shrink-0 text-lg">{format.icon}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-700">
                        {format.label}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Secondary actions - Compact - Remove copy button */}
        <div className="flex items-center space-x-1">
          <button
            onClick={onShowTips}
            className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all"
          >
            <Info className="w-4 h-4 text-amber-500" />
          </button>

          <button
            onClick={onShowJSON}
            className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all"
          >
            <FileText className="w-4 h-4 text-emerald-500" />
          </button>

          <button
            onClick={onShowSettings}
            className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all"
          >
            <Settings className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Floating Action Sparkle Effect */}
      <div className="absolute -top-1 -right-1 pointer-events-none">
        <Sparkles className="w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
      </div>
    </div>
  );
};

export default ActionBar;
