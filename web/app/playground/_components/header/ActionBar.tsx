"use client";

import React, { useState, useRef, useEffect } from "react";
import CustomSelect from "@/app/playground/_components/base/Select";
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
  BookOpen,
  MoreHorizontal,
  CircleDotDashed,
  Share2,
} from "lucide-react";

interface ActionBarProps {
  onCopy: () => void;
  onDownload: (format?: string) => void;
  onShowSettings: () => void;
  onShowJSON: () => void;
  onShowTips: () => void;
  onShowGuide: () => void;
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
  onShowGuide,
  copySuccess,
  isGenerating,
  fileName,
  onFileNameChange,
  showSettingsPanel = false,
  className = "",
}) => {
  const [moreValue, setMoreValue] = useState<string>("");
  const moreOptions = [
    {
      value: "share",
      label: (
        <span className="flex items-center text-[13px] text-green-500">
          <Share2 className="size-3.5 mr-1" />
          Share
        </span>
      ),
    },
    {
      value: "report",
      label: (
        <span className="flex items-center text-[13px] text-indigo-500">
          <CircleDotDashed className="size-3.5 mr-1" />
          Report issue
        </span>
      ),
    },
  ];

  useEffect(() => {
    if (moreValue === "share") {
      (async () => {
        let shared = false;
        try {
          if (navigator.share) {
            await navigator.share({
              title: "Flashot - Code Screenshot",
              text: "Check out this beautiful code screenshot!",
              url: window.location.href,
            });
            shared = true;
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard");
            shared = true;
          }
        } catch {}
        if (shared) setMoreValue("");
      })();
    } else if (moreValue === "report") {
      window.open(
        "https://github.com/thuongtruong109/flashot/issues/new",
        "_blank"
      );
      setTimeout(() => setMoreValue(""), 100);
    }
  }, [moreValue]);

  const handleExportClick = () => {
    onDownload();
  };

  // Remove copy code button from header as requested
  // Filter out settings button on wide screens when settings panel is open
  const allButtons = [
    {
      icon: BookOpen,
      label: "Guide",
      onClick: onShowGuide,
      variant: "secondary" as const,
      color: "emerald",
      disabled: false,
    },
    {
      icon: Info,
      label: "Info",
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
    // Neumorphic-lite buttons
    const baseStyles =
      "group relative flex items-center space-x-1 px-3 py-1.5 rounded-xl transition-all duration-200 bg-gradient-to-b from-white to-gray-50 border border-white/50 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.04),inset_-2px_-2px_6px_rgba(255,255,255,0.9),6px_6px_14px_rgba(2,6,23,0.06),-6px_-6px_14px_rgba(255,255,255,0.9)] hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.06),inset_-2px_-2px_6px_rgba(255,255,255,1),8px_8px_18px_rgba(2,6,23,0.08),-6px_-6px_14px_rgba(255,255,255,1)]";

    if (disabled) {
      return `${baseStyles} bg-gray-100 text-gray-400 cursor-not-allowed shadow-none transform-none hover:scale-100`;
    }

    // More refined color palette with better contrast
    return `${baseStyles} text-gray-700 hover:text-gray-900`;
  };

  const colorMap = {
    amber: "text-amber-500 group-hover:text-amber-600",
    slate: "text-slate-500 group-hover:text-slate-600",
    emerald: "text-emerald-500 group-hover:text-emerald-600",
    blue: "text-blue-500 group-hover:text-blue-600",
  };

  const getIconStyles = (color: string, variant: "primary" | "secondary") => {
    return `size-3.5 transition-all duration-200 ${
      colorMap[color as keyof typeof colorMap] ||
      "text-gray-500 group-hover:text-gray-600"
    }`;
  };

  return (
    <div className={`flex flex-wrap items-center space-x-2 ${className}`}>
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center space-x-3">
        {/* More dropdown using CustomSelect */}
        <div style={{ maxWidth: 180 }}>
          <CustomSelect
            options={moreOptions}
            value={moreValue}
            onChange={setMoreValue}
            placeholder="More"
          />
        </div>

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
                className={`${getIconStyles(button.color, button.variant)}`}
              />
              <span
                className={`text-[13px] ${
                  colorMap[button.color as keyof typeof colorMap]
                }`}
              >
                {button.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Layout */}
      <div className="flex lg:hidden items-center space-x-2 flex-shrink-0">
        <div className="flex items-center space-x-1">
          <button
            onClick={onShowGuide}
            className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all"
          >
            <BookOpen className="w-3 h-3 text-emerald-500" />
          </button>

          <button
            onClick={onShowTips}
            className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all"
          >
            <Info className="w-3 h-3 text-amber-500" />
          </button>

          <button
            onClick={onShowJSON}
            className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all"
          >
            <FileText className="w-3 h-3 text-emerald-500" />
          </button>

          <button
            onClick={onShowSettings}
            className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all"
          >
            <Settings className="w-3 h-3 text-slate-500" />
          </button>
        </div>

        {/* Mobile Export Format Dropdown - REMOVED */}
      </div>
    </div>
  );
};

export default ActionBar;
