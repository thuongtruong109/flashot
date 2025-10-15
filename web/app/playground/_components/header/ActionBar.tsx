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
  Moon,
  Sun,
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
  showJSONPanel?: boolean;
  className?: string;
  settings?: any;
  onUpdateSetting?: <K extends keyof any>(key: K, value: any) => void;
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
  showJSONPanel = false,
  className = "",
  settings,
  onUpdateSetting,
}) => {
  const [moreValue, setMoreValue] = useState<string>("_placeholder_");
  const [exportFormat, setExportFormat] = useState<string>(
    settings?.exportFormat || "webp"
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const isDark = savedMode === "true" || (!savedMode && prefersDark);
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", String(newMode));
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  // Sync exportFormat with settings
  useEffect(() => {
    if (settings?.exportFormat) {
      setExportFormat(settings.exportFormat);
    }
  }, [settings?.exportFormat]);

  const moreOptions = [
    {
      value: "guide",
      label: (
        <span className="flex items-center text-[13px] text-emerald-500">
          <BookOpen className="size-3.5 mr-1" />
          Guide
        </span>
      ),
    },
    {
      value: "info",
      label: (
        <span className="flex items-center text-[13px] text-amber-500">
          <Info className="size-3.5 mr-1" />
          Info & Tips
        </span>
      ),
    },
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

  const exportOptions = [
    {
      value: "png",
      label: "PNG",
      icon: Download,
      color: "text-blue-500",
    },
    {
      value: "jpg",
      label: "JPG",
      icon: Download,
      color: "text-orange-500",
    },
    {
      value: "webp",
      label: "WEBP",
      icon: Download,
      color: "text-purple-500",
    },
    {
      value: "avif",
      label: "AVIF",
      icon: Download,
      color: "text-pink-500",
    },
    {
      value: "original",
      label: "Original",
      icon: Code2,
      color: "text-emerald-500",
    },
    {
      value: "plain",
      label: "Plain Text",
      icon: FileText,
      color: "text-slate-500",
    },
  ];

  // Sync exportFormat with settings
  useEffect(() => {
    if (settings?.exportFormat) {
      setExportFormat(settings.exportFormat);
    }
  }, [settings?.exportFormat]);

  const handleMoreOptionSelect = (value: string) => {
    if (value === "guide") {
      onShowGuide();
    } else if (value === "info") {
      onShowTips();
    } else if (value === "share") {
      (async () => {
        try {
          if (navigator.share) {
            await navigator.share({
              title: "Flashot - Code Screenshot",
              text: "Check out this beautiful code screenshot!",
              url: window.location.href,
            });
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard");
          }
        } catch {}
      })();
    } else if (value === "report") {
      window.open(
        "https://github.com/thuongtruong109/flashot/issues/new/choose",
        "_blank"
      );
    }
  };

  const handleExportClick = () => {
    onDownload(exportFormat);
  };

  const handleFormatSelect = (format: string) => {
    setExportFormat(format);
    if (onUpdateSetting) {
      onUpdateSetting("exportFormat", format as any);
    }
  };

  // Remove Info button from main buttons list
  const allButtons: any[] = [];

  // Always show all buttons (settings button will be added separately at the end)
  const buttons = allButtons;

  const getButtonStyles = (
    variant: "primary" | "secondary",
    color: string,
    disabled: boolean
  ) => {
    // 3D Glassy vibe style
    const baseStyles =
      "group relative flex items-center space-x-1 px-3 py-1.5 rounded-xl transition-all duration-300 bg-gradient-to-br from-white/60 via-white/40 to-white/20 backdrop-blur-lg border border-white/80 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.16),0_6px_12px_-2px_rgba(0,0,0,0.12),inset_0_2px_6px_rgba(255,255,255,1),inset_0_-2px_6px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]";

    if (disabled) {
      return `${baseStyles} opacity-50 cursor-not-allowed hover:translate-y-0 hover:scale-100`;
    }

    return `${baseStyles} text-gray-700 hover:text-gray-900`;
  };

  const colorMap = {
    amber: "text-amber-500 group-hover:text-amber-600",
    slate: "text-slate-500 group-hover:text-slate-600",
    emerald: "text-emerald-500 group-hover:text-emerald-600",
    blue: "text-blue-500 group-hover:text-blue-600",
    purple: "text-purple-500 group-hover:text-purple-600",
    orange: "text-orange-500 group-hover:text-orange-600",
  };

  const getIconStyles = (color: string, variant: "primary" | "secondary") => {
    return `size-3.5 transition-all duration-300 drop-shadow-[0_3px_6px_rgba(0,0,0,0.2)] group-hover:drop-shadow-[0_6px_12px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:rotate-3 ${
      colorMap[color as keyof typeof colorMap] ||
      "text-gray-500 group-hover:text-gray-600"
    }`;
  };

  return (
    <div className={`flex flex-wrap items-center space-x-2 ${className}`}>
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center space-x-3">
        {/* Individual Menu Items on Desktop */}
        <button
          onClick={() => handleMoreOptionSelect("guide")}
          className={getButtonStyles("secondary", "emerald", false)}
          title="View Guide"
        >
          <BookOpen className={getIconStyles("emerald", "secondary")} />
          <span className="text-[13px]">Guide</span>
        </button>

        <button
          onClick={() => handleMoreOptionSelect("info")}
          className={getButtonStyles("secondary", "amber", false)}
          title="Info & Tips"
        >
          <Info className={getIconStyles("amber", "secondary")} />
          <span className="text-[13px]">Tips</span>
        </button>

        <button
          onClick={() => handleMoreOptionSelect("share")}
          className={getButtonStyles("secondary", "emerald", false)}
          title="Share"
        >
          <Share2 className={getIconStyles("emerald", "secondary")} />
          <span className="text-[13px]">Share</span>
        </button>

        <button
          onClick={() => handleMoreOptionSelect("report")}
          className={getButtonStyles("secondary", "blue", false)}
          title="Report Issue"
        >
          <CircleDotDashed className={getIconStyles("blue", "secondary")} />
          <span className="text-[13px]">Report</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={getButtonStyles("secondary", "slate", false)}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <Sun className={getIconStyles("amber", "secondary")} />
          ) : (
            <Moon className={getIconStyles("slate", "secondary")} />
          )}
          <span className="text-[13px]">{isDarkMode ? "Light" : "Dark"}</span>
        </button>

        {/* Export Button with Format Selector */}
        <div className="flex items-stretch">
          <button
            onClick={handleExportClick}
            disabled={isGenerating}
            className="group relative flex items-center space-x-1 px-3 h-8 rounded-l-xl bg-gradient-to-r from-emerald-400/80 to-green-400/80 hover:from-emerald-500/90 hover:to-green-500/90 backdrop-blur-md border border-emerald-300/50 border-r-0 shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <Loader2 className="size-3.5 text-white animate-spin" />
            ) : (
              <Download className="size-3.5 text-white drop-shadow-sm" />
            )}
            <span className="text-[13px] text-white font-medium drop-shadow-sm">
              {isGenerating ? "Exporting..." : `Export`}
            </span>
          </button>

          <div className="[&>div>button]:h-8 [&>div>button]:pl-0 [&_svg]:!text-white [&>div>button]:rounded-l-none [&>div>button]:rounded-r-xl [&>div>button]:border-l-0 [&>div>button]:bg-gradient-to-r [&>div>button]:from-green-400 [&>div>button]:to-emerald-400 [&>div>button]:hover:from-green-500 [&>div>button]:hover:to-emerald-500 [&>div>button]:backdrop-blur-md [&>div>button]:border-emerald-300 [&>div>button]:shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] [&>div>button]:hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.35)] [&>div>button]:min-w-0 [&>div>button]:px-2">
            <CustomSelect
              options={exportOptions.map((opt, index) => {
                const Icon = opt.icon;
                const isSelected = exportFormat === opt.value;
                const showDivider = opt.value === "original";
                return {
                  value: opt.value,
                  label: (
                    <div>
                      {showDivider && (
                        <div className="h-px bg-gray-200 my-1 -mx-2" />
                      )}
                      <span
                        className={`flex items-center space-x-2 text-xs ${
                          isSelected ? "text-emerald-700 font-semibold" : ""
                        }`}
                      >
                        <Icon
                          className={`size-3.5 ${
                            isSelected ? "text-emerald-600" : opt.color
                          }`}
                        />
                        <span className="flex-1">{opt.label}</span>
                        {isSelected && (
                          <Check className="size-3.5 text-emerald-600 ml-auto" />
                        )}
                      </span>
                    </div>
                  ),
                };
              })}
              value=""
              onChange={handleFormatSelect}
              placeholder={""}
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex lg:hidden items-center space-x-2 flex-shrink-0">
        {/* Mobile Export Button */}
        <button
          onClick={handleExportClick}
          disabled={isGenerating}
          className="p-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] transition-all disabled:opacity-50 backdrop-blur-sm"
        >
          {isGenerating ? (
            <Loader2 className="w-3 h-3 text-white animate-spin" />
          ) : (
            <Download className="w-3 h-3 text-white" />
          )}
        </button>

        <div className="flex items-center space-x-1">
          <button
            onClick={onShowSettings}
            className="p-2.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] transition-all"
          >
            <Settings className="w-3 h-3 text-slate-500" />
          </button>

          {/* Mobile More Menu */}
          <div className="relative">
            <div className="[&>div>button]:p-2 [&>div>button]:bg-white/40 [&>div>button]:backdrop-blur-md [&>div>button]:border [&>div>button]:border-white/60 [&>div>button]:rounded-xl [&>div>button]:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] [&>div>button]:hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] [&>div>button]:min-w-0 [&>div>button]:px-2 [&>div>button]:py-2.5">
              <CustomSelect
                options={moreOptions.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                }))}
                value=""
                onChange={(value) => {
                  handleMoreOptionSelect(value);
                }}
                placeholder="•••"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
