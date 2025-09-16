interface SettingsPanelProps {
  settings: CodeSettings;
  showLineNumbers: boolean;
  fileName: string;
  isVisible?: boolean;
  activeMenu?: string;
  onChangeActiveMenu?: (menu: string | undefined) => void;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
  onToggleLineNumbers: (value: boolean) => void;
  onFileNameChange: (fileName: string) => void;
  onToggleVisibility?: () => void;
}
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import { getFileExtension } from "@/utils";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";
import BackgroundSelector from "./BackgroundSelector";
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
  Image,
  Layers,
  Sun,
  Moon,
  WrapText,
  MessageSquare,
  AlignCenter,
  Loader2,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";
import CustomSelect from "./base/Select";
import { _PLAYGROUND_SETTINGS_TAB } from "@/shared";

const SettingsPanel = forwardRef<HTMLDivElement, SettingsPanelProps>(
  (
    {
      settings,
      showLineNumbers,
      fileName,
      isVisible = true,
      activeMenu = _PLAYGROUND_SETTINGS_TAB.FILE,
      onChangeActiveMenu,
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
    const [isExporting, setIsExporting] = useState(false);

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
          '[data-dropdown-type], [style*="z-index: 99999"], [style*="position: fixed"]'
        );
        const hasDropdowns = Array.from(dropdownElements).some(
          (el) =>
            el.hasAttribute("data-dropdown-type") ||
            (el.textContent && el.textContent.includes("Fira Code")) ||
            (el.textContent && el.textContent.includes("JavaScript")) ||
            (el.textContent && el.textContent.includes("Dark")) ||
            (el.textContent && el.textContent.includes("Light")) ||
            (el.textContent && el.textContent.includes("Monokai")) ||
            (el.textContent && el.textContent.includes("Dracula")) ||
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
          {/* Header with Close (mobile) */}
          <div className="flex items-center justify-between py-2 border-b border-white/30 bg-white/70 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="relative">
                <CustomSelect
                  options={[
                    {
                      value: _PLAYGROUND_SETTINGS_TAB.FILE,
                      label: (
                        <span className="flex items-center gap-1.5 text-yellow-600">
                          <Folder className="size-3" />{" "}
                          {_PLAYGROUND_SETTINGS_TAB.FILE}
                        </span>
                      ),
                    },
                    {
                      value: _PLAYGROUND_SETTINGS_TAB.SIZE,
                      label: (
                        <span className="flex items-center gap-1.5 text-green-600">
                          <Edit2 className="size-3" />{" "}
                          {_PLAYGROUND_SETTINGS_TAB.SIZE}
                        </span>
                      ),
                    },
                    {
                      value: _PLAYGROUND_SETTINGS_TAB.THEME,
                      label: (
                        <span className="flex items-center gap-1.5 text-purple-600">
                          <Palette className="size-3" />{" "}
                          {_PLAYGROUND_SETTINGS_TAB.THEME}
                        </span>
                      ),
                    },
                    {
                      value: _PLAYGROUND_SETTINGS_TAB.VIEW,
                      label: (
                        <span className="flex items-center gap-1.5 text-cyan-600">
                          <Layers className="size-3" />{" "}
                          {_PLAYGROUND_SETTINGS_TAB.VIEW}
                        </span>
                      ),
                    },
                    {
                      value: _PLAYGROUND_SETTINGS_TAB.CAPTION,
                      label: (
                        <span className="flex items-center gap-1.5 text-indigo-600">
                          <MessageSquare className="size-3" />
                          {_PLAYGROUND_SETTINGS_TAB.CAPTION}
                        </span>
                      ),
                    },
                  ]}
                  value={activeMenu}
                  onChange={(val) => onChangeActiveMenu?.(val)}
                  className="ml-2 text-xs w-36"
                />
              </div>
            </div>
            {/* Close button (mobile + desktop) */}
            <button
              type="button"
              onClick={() => onToggleVisibility?.()}
              aria-label="Toggle settings panel"
              className="text-slate-400 hover:text-gray-500 mr-2 bg-gradient-to-b from-white to-gray-50
      shadow-[inset_2px_2px_6px_rgba(0,0,0,0.04),inset_-2px_-2px_6px_rgba(255,255,255,0.9),6px_6px_14px_rgba(2,6,23,0.06),-6px_-6px_14px_rgba(255,255,255,0.9)]
      hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.06),inset_-2px_-2px_6px_rgba(255,255,255,1),8px_8px_18px_rgba(2,6,23,0.08),-6px_-6px_14px_rgba(255,255,255,1)]
      transition-all duration-200 rounded-md p-1.5"
            >
              <PanelRightOpen
                className={`size-[18px] transform ${
                  isVisible ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          {/* Scrollable Content */}
          <div
            className={`flex-1 overflow-x-hidden scroll-smooth settings-scrollbar transition-all duration-200 ${
              isDropdownOpen ? "overflow-y-hidden" : "overflow-y-auto"
            }`}
            style={{
              marginRight: isDropdownOpen ? "12px" : "0px",
            }}
          >
            <div className="p-3 space-y-4 divide-y [&>div]:py-2 divide-slate-200 divide-dashed">
              {/* File Section */}
              {(!activeMenu ||
                activeMenu === _PLAYGROUND_SETTINGS_TAB.FILE) && (
                <>
                  <div>
                    <label className="flex items-center justify-between cursor-pointer mb-3">
                      <div className="flex items-center gap-2">
                        <Folder
                          className={`size-4 transition-colors ${
                            settings.showFileName
                              ? "text-yellow-600 group-hover:text-yellow-700"
                              : "text-gray-400 group-hover:text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            settings.showFileName
                              ? "text-yellow-600 group-hover:text-yellow-700"
                              : "text-gray-500 group-hover:text-gray-700"
                          }`}
                        >
                          File display
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={settings.showFileName || false}
                          onChange={(e) =>
                            onUpdateSetting("showFileName", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div
                          className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                            settings.showFileName
                              ? "bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                              : ""
                          }`}
                        >
                          <svg
                            className={`size-3 text-yellow-700 font-bold transition-opacity duration-200 ${
                              settings.showFileName
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            fill="currentColor"
                            stroke="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                      </div>
                    </label>
                    <div className="flex items-center space-x-2">
                      {isEditingFileName ? (
                        <div className="flex-1 flex items-center space-x-1">
                          <input
                            ref={fileNameInputRef}
                            type="text"
                            value={tempFileName}
                            onChange={(e) =>
                              handleFileNameChange(e.target.value)
                            }
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
                          <Edit2 className="size-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Export Format Section (File) */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                      <Download className="w-3.5 h-3.5 text-green-600 mr-1.5" />
                      Export Format
                    </h4>
                    <div className="grid grid-cols-4 gap-2 my-4">
                      {["png", "jpg", "webp", "avif"].map((format) => (
                        <button
                          key={format}
                          onClick={() =>
                            onUpdateSetting(
                              "exportFormat",
                              format as "png" | "jpg" | "webp" | "avif"
                            )
                          }
                          className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
                            settings.exportFormat === format
                              ? "bg-green-500 text-white shadow-md"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {format}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          setIsExporting(true);
                          window.dispatchEvent(
                            new CustomEvent("flashot:export")
                          );
                          setTimeout(() => {
                            setIsExporting(false);
                          }, 2000);
                        }
                      }}
                      disabled={isExporting}
                      className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-xs font-semibold shadow-sm hover:shadow-md ${
                        isExporting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isExporting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      <span>{isExporting ? "Exporting..." : "Export"}</span>
                    </button>
                  </div>
                </>
              )}

              {/* Size section */}
              {(!activeMenu ||
                activeMenu === _PLAYGROUND_SETTINGS_TAB.SIZE) && (
                <>
                  <div>
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

                  {/* Padding (Edit) */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
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

                  {/* Border Radius (Edit) */}
                  <div>
                    <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
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
                          onUpdateSetting(
                            "borderRadius",
                            parseInt(e.target.value)
                          )
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

                  {/* Width (Edit) */}
                  <div>
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
                        disabled={!settings.width}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                          !settings.width
                            ? "text-gray-700 bg-gradient-to-b from-white to-gray-50 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.95)]"
                            : "text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md"
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

                  {/* Height (Edit) */}
                  <div>
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
                        disabled={!settings.height}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                          !settings.height
                            ? "text-gray-700 bg-gradient-to-b from-white to-gray-50 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.95)]"
                            : "text-white bg-gradient-to-r from-emerald-500 to-green-500 shadow-md"
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
                </>
              )}

              {/* Theme section */}
              {(!activeMenu ||
                activeMenu === _PLAYGROUND_SETTINGS_TAB.THEME) && (
                <>
                  <LanguageSelector
                    selectedLanguage={settings.language as SupportedLanguage}
                    onLanguageChange={handleLanguageChange}
                  />

                  <FontSelector
                    selectedFont={settings.fontFamily}
                    onFontChange={(fontFamily) =>
                      onUpdateSetting("fontFamily", fontFamily)
                    }
                  />

                  <div>
                    <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
                      <Layers className="w-3.5 h-3.5 text-purple-600 mr-1.5" />
                      Editor Theme
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
                        <div className="flex items-center justify-center space-x-1 py-1 bg-white rounded-md border shadow-xs group-hover:shadow-sm transition-shadow">
                          <Sun className="size-3 text-yellow-500" />
                          <span className="text-xs font-medium">Light</span>
                        </div>
                      </button>
                      <button
                        onClick={() => onUpdateSetting("theme", "dark")}
                        className={`flex-1 p-2 rounded-lg border transition-all duration-200 group ${
                          settings.theme === "dark"
                            ? "border-blue-500 bg-blue-50/80 shadow-sm"
                            : "border-gray-200/60 hover:border-gray-300/80 hover:bg-gray-50/50"
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-1 py-1 bg-gray-800 rounded-md border shadow-xs group-hover:shadow-sm transition-shadow">
                          <Moon className="size-3 text-blue-400" />
                          <span className="text-xs text-white font-medium">
                            Dark
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <ThemeSelector
                    selectedTheme={settings.theme as ThemeName}
                    onThemeChange={(theme) => onUpdateSetting("theme", theme)}
                  />

                  <div>
                    <label className="flex items-center justify-between cursor-pointer mb-4">
                      <div className="flex items-center gap-2">
                        <Palette
                          className={`size-4 transition-colors ${
                            settings.showBackground
                              ? "text-purple-600 group-hover:text-purple-700"
                              : "text-gray-400 group-hover:text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            settings.showBackground
                              ? "text-purple-600 group-hover:text-purple-700"
                              : "text-gray-500 group-hover:text-gray-700"
                          }`}
                        >
                          Background display
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={settings.showBackground}
                          onChange={(e) =>
                            onUpdateSetting("showBackground", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div
                          className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                            settings.showBackground
                              ? "bg-gradient-to-br from-purple-100 to-purple-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                              : ""
                          }`}
                        >
                          <svg
                            className={`size-3 text-purple-700 font-bold transition-opacity duration-200 ${
                              settings.showBackground
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            fill="currentColor"
                            stroke="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                      </div>
                    </label>
                    <BackgroundSelector
                      selectedBackground={settings.background}
                      onBackgroundChange={(background) =>
                        onUpdateSetting("background", background)
                      }
                    />
                  </div>
                </>
              )}

              {/* View section */}
              {(!activeMenu ||
                activeMenu === _PLAYGROUND_SETTINGS_TAB.VIEW) && (
                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-1.5">
                      <Monitor
                        className={`size-4 transition-colors ${
                          settings.showWindowControls
                            ? "text-blue-600 group-hover:text-blue-700"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          settings.showWindowControls
                            ? "text-blue-600 group-hover:text-blue-700"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                      >
                        Window Controls
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={settings.showWindowControls}
                        onChange={(e) =>
                          onUpdateSetting(
                            "showWindowControls",
                            e.target.checked
                          )
                        }
                        className="sr-only peer"
                      />
                      <div
                        className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                          settings.showWindowControls
                            ? "bg-gradient-to-br from-blue-100 to-blue-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                            : ""
                        }`}
                      >
                        <svg
                          className={`size-3 text-blue-700 font-bold transition-opacity duration-200 ${
                            settings.showWindowControls
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          fill="currentColor"
                          stroke="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-1.5">
                      <Hash
                        className={`size-4 transition-colors ${
                          showLineNumbers
                            ? "text-green-600 group-hover:text-green-700"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          showLineNumbers
                            ? "text-green-600 group-hover:text-green-700"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                      >
                        Line Numbers
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={showLineNumbers}
                        onChange={(e) => onToggleLineNumbers(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div
                        className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                          showLineNumbers
                            ? "bg-gradient-to-br from-green-100 to-green-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                            : ""
                        }`}
                      >
                        <svg
                          className={`size-3 text-green-700 font-bold transition-opacity duration-200 ${
                            showLineNumbers ? "opacity-100" : "opacity-0"
                          }`}
                          fill="currentColor"
                          stroke="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-1.5">
                      <BarChart3
                        className={`size-4 transition-colors ${
                          settings.showLineCount
                            ? "text-orange-600 group-hover:text-orange-700"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          settings.showLineCount
                            ? "text-orange-600 group-hover:text-orange-700"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                      >
                        Line Count
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={settings.showLineCount || false}
                        onChange={(e) =>
                          onUpdateSetting("showLineCount", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div
                        className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                          settings.showLineCount
                            ? "bg-gradient-to-br from-orange-100 to-orange-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                            : ""
                        }`}
                      >
                        <svg
                          className={`size-3 text-orange-700 font-bold transition-opacity duration-200 ${
                            settings.showLineCount ? "opacity-100" : "opacity-0"
                          }`}
                          fill="currentColor"
                          stroke="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-1.5">
                      <WrapText
                        className={`size-4 transition-colors ${
                          settings.wordWrap
                            ? "text-blue-600 group-hover:text-blue-700"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          settings.wordWrap
                            ? "text-blue-600 group-hover:text-blue-700"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                      >
                        Word Wrap
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={settings.wordWrap || false}
                        onChange={(e) =>
                          onUpdateSetting("wordWrap", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div
                        className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                          settings.wordWrap
                            ? "bg-gradient-to-br from-blue-100 to-blue-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                            : ""
                        }`}
                      >
                        <svg
                          className={`size-3 text-blue-700 font-bold transition-opacity duration-200 ${
                            settings.wordWrap ? "opacity-100" : "opacity-0"
                          }`}
                          fill="currentColor"
                          stroke="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
              )}

              {/* Caption section */}
              {(!activeMenu ||
                activeMenu === _PLAYGROUND_SETTINGS_TAB.CAPTION) && (
                <div className="space-y-6">
                  <label className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="size-4 text-indigo-600" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        Caption
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={settings.showCaption || false}
                        onChange={(e) =>
                          onUpdateSetting("showCaption", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div
                        className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                          settings.showCaption
                            ? "bg-gradient-to-br from-indigo-100 to-indigo-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                            : ""
                        }`}
                      >
                        <svg
                          className={`size-3 text-indigo-700 font-bold transition-opacity duration-200 ${
                            settings.showCaption ? "opacity-100" : "opacity-0"
                          }`}
                          fill="currentColor"
                          stroke="none"
                          viewBox="0 0 24 24"
                          strokeWidth="3"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                  </label>

                  <input
                    type="text"
                    value={settings.captionText || ""}
                    onChange={(e) =>
                      onUpdateSetting("captionText", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 text-sm border border-gray-300/60 hover:border-gray-400/80 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all duration-200"
                    placeholder="Enter figure caption..."
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onUpdateSetting("captionStyle", "normal")}
                      className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        (settings.captionStyle || "normal") === "normal"
                          ? "bg-indigo-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => onUpdateSetting("captionStyle", "italic")}
                      className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        settings.captionStyle === "italic"
                          ? "bg-indigo-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <em>Italic</em>
                    </button>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
                      <span>Opacity</span>
                      <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-bold">
                        {Math.round((settings.captionOpacity || 1) * 100)}%
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={settings.captionOpacity || 1}
                        onChange={(e) =>
                          onUpdateSetting(
                            "captionOpacity",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full h-1.5 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-lg appearance-none cursor-pointer
                                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                                  [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-purple-500
                                  [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                                  [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {["top", "bottom", "left", "right"].map((position) => (
                      <button
                        key={position}
                        onClick={() =>
                          onUpdateSetting(
                            "captionPosition",
                            position as "top" | "bottom" | "left" | "right"
                          )
                        }
                        className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
                          (settings.captionPosition || "bottom") === position
                            ? "bg-indigo-500 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {position}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
);

SettingsPanel.displayName = "SettingsPanel";

export default SettingsPanel;
