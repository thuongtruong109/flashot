"use client";

import React, { useState, useRef, useEffect } from "react";
import CustomSelect from "@/app/playground/_components/base/Select";
import {
  Download,
  Settings,
  FileText,
  Info,
  Check,
  Loader2,
  Code2,
  BookOpen,
  CircleDotDashed,
  Share2,
  Moon,
  Sun,
  Image as ImageIcon,
  Keyboard,
} from "lucide-react";

interface ActionBarProps {
  onCopy: () => void;
  onDownload: (format?: string) => void;
  onShowSettings: () => void;
  onShowJSON: () => void;
  onShowTips: () => void;
  onShowGuide: () => void;
  onShowShortcuts?: () => void;
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
  onShowShortcuts,
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
          Info
        </span>
      ),
    },
    {
      value: "share",
      label: (
        <span className="flex items-center text-[13px] text-green-500">
          <Share2 className="size-3.5 mr-1" />
          Share page
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
      icon: ImageIcon,
      color: "text-blue-500",
    },
    {
      value: "jpg",
      label: "JPG",
      icon: ImageIcon,
      color: "text-orange-500",
    },
    {
      value: "webp",
      label: "WEBP",
      icon: ImageIcon,
      color: "text-purple-500",
    },
    {
      value: "avif",
      label: "AVIF",
      icon: ImageIcon,
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
    // Refined clean style - giảm padding, shadow, translate
    const baseStyles =
      "group relative flex items-center space-x-1.5 px-2.5 rounded-lg transition-all duration-200 " +
      "bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl " +
      "border border-white/60 dark:border-gray-700/60 " +
      "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.5)_inset] " +
      "dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,0.1)_inset] " +
      "hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15),0_1px_2px_rgba(255,255,255,0.6)_inset] " +
      "dark:hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.15)_inset] " +
      "hover:bg-white/80 dark:hover:bg-gray-800/80 " +
      "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/50 before:to-transparent before:opacity-60 dark:before:from-white/10 " +
      "after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-black/5 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity";

    if (disabled) {
      return `${baseStyles} opacity-50 cursor-not-allowed hover:translate-y-0`;
    }

    return `${baseStyles} text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white`;
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
    return `size-3.5 transition-all duration-200 relative z-10 ${
      colorMap[color as keyof typeof colorMap] ||
      "text-gray-600 dark:text-gray-300"
    }`;
  };

  return (
    <div className={`flex flex-wrap items-center space-x-2 ${className}`}>
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center space-x-3">
        {/* Export Button with Format Selector */}
        <div className="flex items-stretch" data-tour="export-button">
          <button
            onClick={handleExportClick}
            disabled={isGenerating}
            className="group relative flex items-center space-x-1 px-3 h-[1.94rem] rounded-l-lg bg-gradient-to-r from-emerald-500/80 to-green-500/80 hover:from-emerald-600/90 hover:to-green-600/90 dark:from-emerald-600/40 dark:to-green-600/40 dark:hover:from-emerald-700/80 dark:hover:to-green-700/80 backdrop-blur-md border border-emerald-400/50 dark:border-emerald-700/50 border-r-0 shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.35)] dark:shadow-[0_8px_32px_0_rgba(16,185,129,0.15)] dark:hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isGenerating ? (
              <Loader2 className="size-3.5 text-white animate-spin" />
            ) : exportFormat === "original" ? (
              <Code2 className="size-3.5 text-white drop-shadow-sm" />
            ) : exportFormat === "plain" ? (
              <FileText className="size-3.5 text-white drop-shadow-sm" />
            ) : (
              <ImageIcon className="size-3.5 text-white drop-shadow-sm" />
            )}
            <span className="text-[13px] text-white font-medium drop-shadow-sm">
              {isGenerating ? "Exporting..." : `Export`}
            </span>
          </button>

          <div className="[&>div>button]:h-[1.94rem] [&>div>button]:pl-0 [&_svg]:!text-white [&>div>button]:border-l [&>div>button]:rounded-l-none [&>div>button]:rounded-r-lg [&>div>button]:bg-gradient-to-r [&>div>button]:from-green-500/80 [&>div>button]:to-emerald-500/80 [&>div>button]:hover:from-green-600/90 [&>div>button]:hover:to-emerald-600/90 [&>div>button]:dark:from-green-600/40 [&>div>button]:dark:to-emerald-600/40 [&>div>button]:dark:hover:from-green-700/80 [&>div>button]:dark:hover:to-emerald-700/80 [&>div>button]:backdrop-blur-md [&>div>button]:border-emerald-400/50 [&>div>button]:dark:border-emerald-700/50 [&>div>button]:shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] [&>div>button]:hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.35)] [&>div>button]:dark:shadow-[0_8px_32px_0_rgba(16,185,129,0.15)] [&>div>button]:dark:hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] [&>div>button]:min-w-0 [&>div>button]:px-2 [&>div>button]:transition-all">
            <CustomSelect
              align="right"
              options={exportOptions.map((opt, index) => {
                const Icon = opt.icon;
                const isSelected = exportFormat === opt.value;
                const showDivider = opt.value === "original";
                return {
                  value: opt.value,
                  label: (
                    <div>
                      {showDivider && (
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-1.5 -mx-2" />
                      )}
                      <span
                        className={`flex items-center space-x-2 text-xs ${
                          isSelected
                            ? "text-emerald-700 dark:text-emerald-400 font-semibold"
                            : ""
                        }`}
                      >
                        <Icon
                          className={`size-3.5 ${
                            isSelected
                              ? "text-emerald-600 dark:text-emerald-400"
                              : opt.color
                          }`}
                        />
                        <span className="flex-1">{opt.label}</span>
                        {isSelected && (
                          <Check className="size-3.5 text-emerald-600 dark:text-emerald-400 ml-auto" />
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

        {/* Shortcuts Button */}
        {onShowShortcuts && (
          <button
            onClick={onShowShortcuts}
            data-tour="shortcuts-button"
            className={`${getButtonStyles(
              "secondary",
              "purple",
              false
            )} h-[1.95rem]`}
            title="Keyboard Shortcuts (Press ?)"
          >
            <Keyboard className={getIconStyles("purple", "secondary")} />
            <span className="text-[13px] relative z-10 font-medium">
              Shortcuts
            </span>
          </button>
        )}

        {/* More Menu Button */}
        <div className="relative" data-tour="more-menu">
          <div className="[&>div>button]:min-w-[100px] [&>div>button]:px-2.5 [&>div>button]:py-2 [&>div>button]:rounded-lg [&>div>button]:bg-white/70 [&>div>button]:dark:bg-gray-800/70 [&>div>button]:backdrop-blur-xl [&>div>button]:border [&>div>button]:border-white/60 [&>div>button]:dark:border-gray-700/60 [&>div>button]:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.5)_inset] [&>div>button]:hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15),0_1px_2px_rgba(255,255,255,0.6)_inset] [&>div>button]:transition-all [&>div>button>span]:!flex [&>div>button>span]:!items-center [&>div>button>span]:!gap-1.5">
            <CustomSelect
              options={moreOptions.map((opt) => ({
                value: opt.value,
                label: opt.label,
              }))}
              value=""
              onChange={handleMoreOptionSelect}
              placeholder=""
            />
            {/* Custom placeholder overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center px-3">
              <div className="flex items-center gap-1.5 text-[13px] text-gray-700 dark:text-gray-200 relative z-10">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                  <circle cx="5" cy="12" r="2" className="fill-blue-500" />
                  <circle cx="12" cy="12" r="2" className="fill-purple-500" />
                  <circle cx="19" cy="12" r="2" className="fill-pink-500" />
                </svg>
                More
              </div>
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          data-tour="dark-mode-toggle"
          className={`${getButtonStyles(
            "secondary",
            "purple",
            false
          )} h-[1.85rem]`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <Sun className={getIconStyles("amber", "secondary")} />
          ) : (
            <Moon className={getIconStyles("purple", "secondary")} />
          )}
        </button>
      </div>

      {/* Mobile Layout */}
      <div className="flex lg:hidden items-center space-x-2 flex-shrink-0">
        {/* Mobile Export Button */}
        <button
          onClick={handleExportClick}
          disabled={isGenerating}
          className="p-2.5 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 dark:from-emerald-600/70 dark:to-green-600/70 dark:hover:from-emerald-700/80 dark:hover:to-green-700/80 rounded-xl shadow-[0_8px_32px_0_rgba(16,185,129,0.15)] hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] dark:shadow-[0_8px_32px_0_rgba(16,185,129,0.15)] dark:hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.25)] transition-all disabled:opacity-50 backdrop-blur-sm"
        >
          {isGenerating ? (
            <Loader2 className="w-3 h-3 text-white animate-spin" />
          ) : exportFormat === "original" ? (
            <Code2 className="w-3 h-3 text-white" />
          ) : exportFormat === "plain" ? (
            <FileText className="w-3 h-3 text-white" />
          ) : (
            <ImageIcon className="w-3 h-3 text-white" />
          )}
        </button>

        <div className="flex items-center space-x-1">
          <button
            onClick={onShowSettings}
            className="p-2.5 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md border border-white/60 dark:border-gray-700/60 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] dark:hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] transition-all"
          >
            <Settings className="w-3 h-3 text-gray-700 dark:text-gray-300" />
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
