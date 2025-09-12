"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
  Settings,
  Edit2,
  Check,
  X,
  ChevronRight,
  FileText,
  Palette,
  Type,
  Move,
  CornerRightDown,
  Eye,
  Monitor,
  Hash,
  BarChart3,
  Folder,
  Paintbrush,
  Download,
} from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import { getFileExtension } from "@/utils";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";
import BackgroundSelector from "./BackgroundSelector";

interface SettingsPanelProps {
  settings: CodeSettings;
  showLineNumbers: boolean;
  fileName: string;
  isVisible?: boolean;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
  onToggleLineNumbers: (value: boolean) => void;
  onFileNameChange: (fileName: string) => void;
  onToggleVisibility?: () => void;
}

const SettingsPanel = forwardRef<HTMLDivElement, SettingsPanelProps>(
  (
    {
      settings,
      showLineNumbers,
      fileName,
      isVisible = true,
      onUpdateSetting,
      onToggleLineNumbers,
      onFileNameChange,
      onToggleVisibility,
    },
    ref
  ) => {
    const [isEditingFileName, setIsEditingFileName] = useState(false);
    const [tempFileName, setTempFileName] = useState(fileName);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [widthInput, setWidthInput] = useState(
      settings.width?.toString() || ""
    );
    const [heightInput, setHeightInput] = useState(
      settings.height?.toString() || ""
    );
    const fileNameInputRef = useRef<HTMLInputElement>(null);

    // Update temp filename when fileName prop changes
    useEffect(() => {
      setTempFileName(fileName);
    }, [fileName]);

    // Update width/height inputs when settings change
    useEffect(() => {
      setWidthInput(settings.width?.toString() || "");
    }, [settings.width]);

    useEffect(() => {
      setHeightInput(settings.height?.toString() || "");
    }, [settings.height]);

    // Handle language change and update filename extension
    const handleLanguageChange = (language: SupportedLanguage) => {
      onUpdateSetting("language", language);

      // Auto-update filename extension if not currently editing
      if (!isEditingFileName) {
        const nameWithoutExt = fileName.split(".")[0] || fileName;
        const newExtension = getFileExtension(language);
        const newFileName = `${nameWithoutExt}`;
        onFileNameChange(newFileName);
      }
    };

    // Auto-focus filename input when editing starts
    useEffect(() => {
      if (isEditingFileName && fileNameInputRef.current) {
        fileNameInputRef.current.focus();
        fileNameInputRef.current.select();
      }
    }, [isEditingFileName]);

    const handleFileNameEdit = () => {
      setIsEditingFileName(true);
    };

    // Auto-save filename on change
    const handleFileNameChange = (value: string) => {
      setTempFileName(value);
      // Always call onFileNameChange, even with empty string
      onFileNameChange(value.trim());
    };

    const handleFileNameKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Enter" || e.key === "Escape") {
        setIsEditingFileName(false);
      }
    };

    const handleFileNameBlur = () => {
      setIsEditingFileName(false);
      // Don't reset tempFileName - let it stay as user intended (even if empty)
      // The fileName prop will be updated through onFileNameChange calls
    };

    // Monitor for dropdown portals to disable scrolling
    useEffect(() => {
      const checkForDropdowns = () => {
        // Check for dropdown elements with high z-index (portal dropdowns)
        const dropdownElements = document.querySelectorAll(
          '[style*="z-index: 99999"], [style*="position: fixed"]'
        );
        const hasDropdowns = Array.from(dropdownElements).some(
          (el) =>
            (el.textContent && el.textContent.includes("Fira Code")) ||
            (el.textContent && el.textContent.includes("JavaScript")) ||
            (el.textContent && el.textContent.includes("Theme")) ||
            (el.textContent && el.textContent.includes("Background"))
        );
        setIsDropdownOpen(hasDropdowns);
      };

      // Check immediately
      checkForDropdowns();

      // Set up mutation observer to watch for DOM changes
      const observer = new MutationObserver(checkForDropdowns);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Also check on click events (for dropdown toggles)
      document.addEventListener("click", checkForDropdowns);

      return () => {
        observer.disconnect();
        document.removeEventListener("click", checkForDropdowns);
      };
    }, []);

    return (
      <>
        {/* Mobile Backdrop */}
        {isVisible && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => {
              // Only allow toggle on mobile screens
              if (window.innerWidth < 1024) {
                onToggleVisibility?.();
              }
            }}
          />
        )}

        {/* Settings Panel */}
        <div
          ref={ref}
          className={`
        ${isVisible ? "translate-x-0" : "translate-x-full"}
         w-80 lg:w-80 fixed lg:relative top-0 right-0 z-30
         h-[100vh] lg:max-h-[calc(100vh-60px)]
        bg-white/95 backdrop-blur-xl shadow-2xl
        border-l border-white/20
        transition-transform duration-300 ease-in-out
        overflow-hidden
        flex flex-col
      `}
        >
          {/* Scrollable Content */}
          <div
            className={`flex-1 overflow-x-hidden scroll-smooth settings-scrollbar ${
              isDropdownOpen ? "overflow-y-hidden" : "overflow-y-auto"
            }`}
          >
            <div className="p-3 pb-16 space-y-4">
              {/* File Name Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
                <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <FileText className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
                  File Name
                </h4>
                <div className="flex items-center space-x-2">
                  {isEditingFileName ? (
                    <div className="flex-1 flex items-center space-x-1">
                      <input
                        ref={fileNameInputRef}
                        type="text"
                        value={tempFileName}
                        onChange={(e) => handleFileNameChange(e.target.value)}
                        onKeyDown={handleFileNameKeyDown}
                        onBlur={handleFileNameBlur}
                        className="flex-1 px-2.5 py-1.5 text-sm border border-gray-300/60 hover:border-gray-400/80 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-all duration-200"
                        placeholder="Enter filename"
                      />
                      <span className="text-sm text-gray-500">
                        .{getFileExtension(settings.language)}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="flex-1 flex items-center space-x-2 group cursor-pointer px-2.5 py-1.5 rounded-md border border-gray-300/60 hover:border-gray-400/80"
                      onClick={handleFileNameEdit}
                    >
                      <span className="flex-1 text-sm font-medium text-gray-700 truncate group-hover:text-blue-600 transition-colors">
                        {fileName}.{getFileExtension(settings.language)}
                      </span>
                      <Edit2 className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  )}
                </div>
              </div>

              {/* Export Format Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
                <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <Download className="w-3.5 h-3.5 text-green-600 mr-1.5" />
                  Export Format
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {["png", "jpg", "webp", "avif"].map((format) => (
                    <button
                      key={format}
                      onClick={() =>
                        onUpdateSetting(
                          "exportFormat",
                          format as "png" | "jpg" | "webp" | "avif"
                        )
                      }
                      className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        settings.exportFormat === format
                          ? "bg-green-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selector Component */}
              <LanguageSelector
                selectedLanguage={settings.language as SupportedLanguage}
                onLanguageChange={handleLanguageChange}
              />

              {/* Background Theme Section */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
                <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                  <Palette className="w-3.5 h-3.5 text-purple-600 mr-1.5" />
                  Background Theme
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdateSetting("theme", "light")}
                    className={`flex-1 p-2 rounded-lg border transition-all duration-200 group ${
                      settings.theme === "light"
                        ? "border-blue-500 bg-blue-50/80 shadow-sm"
                        : "border-gray-200/60 hover:border-gray-300/80 hover:bg-gray-50/50"
                    }`}
                  >
                    <div className="w-full h-6 bg-white rounded border mb-1.5 shadow-xs group-hover:shadow-sm transition-shadow"></div>
                    <span className="text-xs font-medium">Light</span>
                  </button>
                  <button
                    onClick={() => onUpdateSetting("theme", "dark")}
                    className={`flex-1 p-2 rounded-lg border transition-all duration-200 group ${
                      settings.theme === "dark"
                        ? "border-blue-500 bg-blue-50/80 shadow-sm"
                        : "border-gray-200/60 hover:border-gray-300/80 hover:bg-gray-50/50"
                    }`}
                  >
                    <div className="w-full h-6 bg-gray-800 rounded border mb-1.5 shadow-xs group-hover:shadow-sm transition-shadow"></div>
                    <span className="text-xs font-medium">Dark</span>
                  </button>
                </div>
              </div>

              {/* Theme Selector Component */}
              <ThemeSelector
                selectedTheme={settings.theme as ThemeName}
                onThemeChange={(theme) => onUpdateSetting("theme", theme)}
              />

              {/* Font Selector Component */}
              <FontSelector
                selectedFont={settings.fontFamily}
                onFontChange={(fontFamily) =>
                  onUpdateSetting("fontFamily", fontFamily)
                }
              />

              {/* Font Size */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
                <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <Type className="w-3.5 h-3.5 text-orange-600 mr-1.5" />
                    Font Size
                  </div>
                  <span className="text-xs bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-bold">
                    {settings.fontSize}px
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="24"
                    value={settings.fontSize}
                    onChange={(e) =>
                      onUpdateSetting("fontSize", parseInt(e.target.value))
                    }
                    className="w-full h-1.5 bg-gradient-to-r from-orange-200 to-red-200 rounded-lg appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                          [&::-webkit-slider-thumb]:from-orange-500 [&::-webkit-slider-thumb]:to-red-500
                          [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                </div>
              </div>

              {/* Padding */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
                <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <Move className="w-3.5 h-3.5 text-pink-600 mr-1.5" />
                    Padding
                  </div>
                  <span className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-bold">
                    {settings.padding}px
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="64"
                    value={settings.padding}
                    onChange={(e) =>
                      onUpdateSetting("padding", parseInt(e.target.value))
                    }
                    className="w-full h-1.5 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                          [&::-webkit-slider-thumb]:from-pink-500 [&::-webkit-slider-thumb]:to-purple-500
                          [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                </div>
              </div>

              {/* Border Radius */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
                <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <CornerRightDown className="w-3.5 h-3.5 text-teal-600 mr-1.5" />
                    Border Radius
                  </div>
                  <span className="text-xs bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent font-bold">
                    {settings.borderRadius}px
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={settings.borderRadius}
                    onChange={(e) =>
                      onUpdateSetting("borderRadius", parseInt(e.target.value))
                    }
                    className="w-full h-1.5 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-lg appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                          [&::-webkit-slider-thumb]:from-teal-500 [&::-webkit-slider-thumb]:to-cyan-500
                          [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                </div>
              </div>

              {/* Shadow */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
                <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="w-3.5 h-3.5 text-purple-600 mr-1.5" />
                    Shadow
                  </div>
                  <span className="text-xs bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent font-bold">
                    {settings.shadow || 0}px
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={settings.shadow || 0}
                    onChange={(e) =>
                      onUpdateSetting("shadow", parseInt(e.target.value))
                    }
                    className="w-full h-1.5 bg-gradient-to-r from-purple-200 to-violet-200 rounded-lg appearance-none cursor-pointer
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                          [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-violet-500
                          [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                          [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                </div>
              </div>

              {/* Width */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
                <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <Move className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
                    Width
                  </div>
                  <span className="text-xs bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent font-bold">
                    {settings.width ? `${settings.width}px` : "Auto"}
                  </span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onUpdateSetting("width", undefined);
                      setWidthInput("");
                    }}
                    className={`px-2 py-1 text-xs rounded-md transition-colors ${
                      !settings.width
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    Auto
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="1200"
                    value={widthInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      setWidthInput(value);

                      if (value === "") {
                        onUpdateSetting("width", undefined);
                      } else {
                        const numValue = parseInt(value);
                        if (!isNaN(numValue) && numValue >= 0) {
                          onUpdateSetting("width", numValue);
                        }
                      }
                    }}
                    onBlur={() => {
                      // Ensure consistency on blur
                      if (widthInput === "") {
                        onUpdateSetting("width", undefined);
                      } else {
                        const numValue = parseInt(widthInput);
                        if (!isNaN(numValue) && numValue >= 0) {
                          onUpdateSetting("width", numValue);
                        } else {
                          setWidthInput(settings.width?.toString() || "");
                        }
                      }
                    }}
                    className="flex-1 px-2 py-1 text-xs rounded-md border border-gray-200"
                    placeholder="600"
                  />
                </div>
              </div>

              {/* Height */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-lg">
                <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="w-3.5 h-3.5 text-green-600 mr-1.5" />
                    Height
                  </div>
                  <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-bold">
                    {settings.height ? `${settings.height}px` : "Auto"}
                  </span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onUpdateSetting("height", undefined);
                      setHeightInput("");
                    }}
                    className={`px-2 py-1 text-xs rounded-md transition-colors ${
                      !settings.height
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    Auto
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="800"
                    value={heightInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      setHeightInput(value);

                      if (value === "") {
                        onUpdateSetting("height", undefined);
                      } else {
                        const numValue = parseInt(value);
                        if (!isNaN(numValue) && numValue >= 0) {
                          onUpdateSetting("height", numValue);
                        }
                      }
                    }}
                    onBlur={() => {
                      // Ensure consistency on blur
                      if (heightInput === "") {
                        onUpdateSetting("height", undefined);
                      } else {
                        const numValue = parseInt(heightInput);
                        if (!isNaN(numValue) && numValue >= 0) {
                          onUpdateSetting("height", numValue);
                        } else {
                          setHeightInput(settings.height?.toString() || "");
                        }
                      }
                    }}
                    className="flex-1 px-2 py-1 text-xs rounded-md border border-gray-200"
                    placeholder="400"
                  />
                </div>
              </div>

              {/* Display Options */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center">
                  <Eye className="w-3.5 h-3.5 text-indigo-600 mr-1.5" />
                  Display Options
                </h4>
                <div className="space-y-4">
                  <label className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Paintbrush className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        Show Background
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.showBackground}
                      onChange={(e) =>
                        onUpdateSetting("showBackground", e.target.checked)
                      }
                      className="w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500/40 border-gray-300 hover:border-gray-400 transition-all duration-200"
                    />
                  </label>

                  <label className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        Window Controls
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.showWindowControls}
                      onChange={(e) =>
                        onUpdateSetting("showWindowControls", e.target.checked)
                      }
                      className="w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500/40 border-gray-300 hover:border-gray-400 transition-all duration-200"
                    />
                  </label>

                  <label className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Hash className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        Line Numbers
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={showLineNumbers}
                      onChange={(e) => onToggleLineNumbers(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500/40 border-gray-300 hover:border-gray-400 transition-all duration-200"
                    />
                  </label>

                  <label className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        Line Count Display
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.showLineCount || false}
                      onChange={(e) =>
                        onUpdateSetting("showLineCount", e.target.checked)
                      }
                      className="w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500/40 border-gray-300 hover:border-gray-400 transition-all duration-200"
                    />
                  </label>

                  <label className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <Folder className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        File Name Display
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.showFileName || false}
                      onChange={(e) =>
                        onUpdateSetting("showFileName", e.target.checked)
                      }
                      className="w-4 h-4 rounded text-blue-600 focus:ring-2 focus:ring-blue-500/40 border-gray-300 hover:border-gray-400 transition-all duration-200"
                    />
                  </label>
                </div>
              </div>

              {/* Background Selector Component */}
              <BackgroundSelector
                selectedBackground={settings.background}
                onBackgroundChange={(background) =>
                  onUpdateSetting("background", background)
                }
                isVisible={settings.showBackground}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
);

SettingsPanel.displayName = "SettingsPanel";

export default SettingsPanel;
