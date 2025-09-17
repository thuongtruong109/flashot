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
import ThemeSection from "./setting/ThemeSection";
import ViewSection from "./setting/ViewSection";
import CaptionSection from "./setting/CaptionSection";
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
import FileSection from "./setting/FileSection";
import CustomSelect from "./base/Select";
import { _PLAYGROUND_SETTINGS_TAB } from "@/shared";
import SizeSection from "./setting/SizeSection";

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
                          <MessageSquare className="size-3" />{" "}
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
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.FILE && (
                <FileSection
                  settings={settings}
                  onUpdateSetting={onUpdateSetting}
                />
              )}
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.SIZE && (
                <SizeSection
                  settings={settings}
                  onUpdateSetting={onUpdateSetting}
                />
              )}
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.THEME && (
                <ThemeSection
                  settings={settings}
                  onUpdateSetting={onUpdateSetting}
                  handleLanguageChange={handleLanguageChange}
                />
              )}
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.VIEW && (
                <ViewSection
                  settings={settings}
                  fileName={fileName}
                  showLineNumbers={showLineNumbers}
                  onUpdateSetting={onUpdateSetting}
                  onToggleLineNumbers={onToggleLineNumbers}
                  onFileNameChange={onFileNameChange}
                />
              )}
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.CAPTION && (
                <CaptionSection
                  settings={settings}
                  onUpdateSetting={onUpdateSetting}
                />
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
