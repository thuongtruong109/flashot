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
  const handleExportClick = () => {
    onDownload();
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
    return (
      !isSettingsButton ||
      (typeof window !== "undefined" && window.innerWidth < 1024)
    );
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

        {/* Simple Export Button */}
        <button
          onClick={() => handleExportClick()}
          disabled={isGenerating}
          className="group relative flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:hover:scale-100"
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
      </div>

      {/* Mobile Layout */}
      <div className="flex lg:hidden items-center space-x-2 flex-shrink-0">
        {/* Simple Export Button for mobile */}
        <button
          onClick={() => handleExportClick()}
          disabled={isGenerating}
          className="flex items-center justify-center min-h-max space-x-1.5 p-3 sm:py-2 bg-none sm:bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-blue-500 sm:text-white rounded-lg transition-all duration-200 text-sm shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300"
        >
          {isGenerating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          <span className="hidden sm:block">
            {isGenerating ? "Generating..." : "Export"}
          </span>
        </button>

        {/* Secondary actions for mobile */}
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

        {/* Mobile Export Format Dropdown - REMOVED */}
      </div>
    </div>
  );
};

export default ActionBar;
