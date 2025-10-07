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
  className = "",
  settings,
  onUpdateSetting,
}) => {
  const [moreValue, setMoreValue] = useState<string>("_placeholder_");
  const [exportFormat, setExportFormat] = useState<string>(
    settings?.exportFormat || "webp"
  );

  // Sync exportFormat with settings
  useEffect(() => {
    if (settings?.exportFormat) {
      setExportFormat(settings.exportFormat);
    }
  }, [settings?.exportFormat]);

  const moreOptions = [
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
    },
    {
      value: "jpg",
      label: "JPG",
      icon: Download,
    },
    {
      value: "webp",
      label: "WEBP",
      icon: Download,
    },
    {
      value: "avif",
      label: "AVIF",
      icon: Download,
    },
    {
      value: "original",
      label: "Original",
      icon: Code2,
    },
    {
      value: "plain",
      label: "Plain Text",
      icon: FileText,
    },
  ];

  // Sync exportFormat with settings
  useEffect(() => {
    if (settings?.exportFormat) {
      setExportFormat(settings.exportFormat);
    }
  }, [settings?.exportFormat]);

  const handleMoreOptionSelect = (value: string) => {
    if (value === "info") {
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
        "https://github.com/thuongtruong109/flashot/issues/new",
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
      icon: FileText,
      label: "Data",
      onClick: onShowJSON,
      variant: "secondary" as const,
      color: "emerald",
      disabled: false,
    },
  ];

  // Always show all buttons (settings button will be added separately at the end)
  const buttons = allButtons;

  const getButtonStyles = (
    variant: "primary" | "secondary",
    color: string,
    disabled: boolean
  ) => {
    // Modern glassmorphism style
    const baseStyles =
      "group relative flex items-center space-x-1 px-3 py-1.5 rounded-xl transition-all duration-300 bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] hover:bg-white/50 hover:border-white/80 hover:-translate-y-0.5";

    if (disabled) {
      return `${baseStyles} opacity-50 cursor-not-allowed hover:translate-y-0`;
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
    return `size-3.5 transition-all duration-200 ${
      colorMap[color as keyof typeof colorMap] ||
      "text-gray-500 group-hover:text-gray-600"
    }`;
  };

  return (
    <div className={`flex flex-wrap items-center space-x-2 ${className}`}>
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center space-x-3">
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
              options={exportOptions.map((opt) => ({
                value: opt.value,
                label: <span className="">{opt.label}</span>,
              }))}
              value=""
              onChange={handleFormatSelect}
              placeholder={""}
            />
          </div>
        </div>

        {/* More Dropdown Menu */}
        <CustomSelect
          options={moreOptions.map((opt) => ({
            value: opt.value,
            label: opt.label,
          }))}
          value=""
          onChange={(value) => {
            handleMoreOptionSelect(value);
          }}
          placeholder="More"
        />

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

        {/* Settings Button at the end */}
        <button
          onClick={onShowSettings}
          className={getButtonStyles("secondary", "slate", false)}
          title="Toggle settings panel"
        >
          <Settings className={`${getIconStyles("slate", "secondary")}`} />
          <span className={`text-[13px] ${colorMap.slate}`}>Settings</span>
        </button>
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
            onClick={onShowGuide}
            className="p-2.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] transition-all"
          >
            <BookOpen className="w-3 h-3 text-emerald-500" />
          </button>

          <button
            onClick={onShowTips}
            className="p-2.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] transition-all"
          >
            <Info className="w-3 h-3 text-amber-500" />
          </button>

          <button
            onClick={onShowJSON}
            className="p-2.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] transition-all"
          >
            <FileText className="w-3 h-3 text-emerald-500" />
          </button>

          <button
            onClick={onShowSettings}
            className="p-2.5 bg-white/40 backdrop-blur-md border border-white/60 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] transition-all"
          >
            <Settings className="w-3 h-3 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionBar;
