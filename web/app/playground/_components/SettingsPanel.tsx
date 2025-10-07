interface SettingsPanelProps {
  settings: CodeSettings;
  fileName: string;
  isVisible?: boolean;
  activeMenu?: string;
  onChangeActiveMenu?: (menu: string | undefined) => void;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
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
import MakeupSection from "./setting/MakeupSection";
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
  AlignCenter,
  Loader2,
  PanelRightClose,
  PanelRightOpen,
  RotateCcw,
} from "lucide-react";
import CustomSelect from "./base/Select";
import { _PLAYGROUND_SETTINGS_TAB, DEFAULT_CODE_SETTINGS } from "@/shared";
import ViewSection from "./setting/ViewSection";

const SettingsPanel = forwardRef<HTMLDivElement, SettingsPanelProps>(
  (
    {
      settings,
      fileName,
      isVisible = true,
      activeMenu = _PLAYGROUND_SETTINGS_TAB.VIEW,
      onChangeActiveMenu,
      onUpdateSetting,
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

    useEffect(() => {
      setTempFileName(fileName);
    }, [fileName]);

    useEffect(() => {
      setWidthInput(settings.width?.toString() || "");
    }, [settings.width]);

    useEffect(() => {
      setHeightInput(settings.height?.toString() || "");
    }, [settings.height]);

    const handleLanguageChange = (language: SupportedLanguage) => {
      onUpdateSetting("language", language);

      if (!isEditingFileName) {
        const nameWithoutExt = fileName.split(".")[0] || fileName;
        const newFileName = `${nameWithoutExt}`;
        onFileNameChange(newFileName);
      }
    };

    useEffect(() => {
      if (isEditingFileName && fileNameInputRef.current) {
        fileNameInputRef.current.focus();
        fileNameInputRef.current.select();
      }
    }, [isEditingFileName]);

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

      checkForDropdowns();

      const observer = new MutationObserver(checkForDropdowns);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      document.addEventListener("click", checkForDropdowns);

      return () => {
        observer.disconnect();
        document.removeEventListener("click", checkForDropdowns);
      };
    }, []);

    const handleResetToDefaults = () => {
      Object.entries(DEFAULT_CODE_SETTINGS).forEach(([key, value]) => {
        onUpdateSetting(key as keyof CodeSettings, value);
      });
    };

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
        ${isVisible ? "translate-x-0 lg:w-80" : "translate-x-full lg:w-0"}
         w-80 fixed lg:relative top-0 right-0 z-30
         h-[100vh] lg:max-h-[calc(100vh-60px)]
        bg-white/95 backdrop-blur-xl shadow-2xl
        border-l border-white/20
        transition-all duration-300 ease-in-out
        overflow-hidden
        flex flex-col
      `}
        >
          {/* Header with Close (mobile) */}
          <div className="flex items-center justify-between py-2 border-b border-white/30 bg-white/70 backdrop-blur-md">
            <div className="relative">
              <CustomSelect
                options={[
                  {
                    value: _PLAYGROUND_SETTINGS_TAB.VIEW,
                    label: (
                      <span className="flex items-center gap-1.5 text-green-600">
                        <Layers className="size-3" />{" "}
                        {_PLAYGROUND_SETTINGS_TAB.VIEW}
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
                    value: _PLAYGROUND_SETTINGS_TAB.MAKEUP,
                    label: (
                      <span className="flex items-center gap-1.5 text-cyan-600">
                        <Move className="size-3" />{" "}
                        {_PLAYGROUND_SETTINGS_TAB.MAKEUP}
                      </span>
                    ),
                  },
                ]}
                value={activeMenu}
                onChange={(val) => onChangeActiveMenu?.(val)}
                className="ml-2 text-xs w-36"
              />
            </div>
            <button
              type="button"
              onClick={handleResetToDefaults}
              title="Reset to defaults"
              aria-label="Toggle settings panel"
              className="text-slate-500 hover:text-red-500 font-light bg-gradient-to-b from-white to-gray-50
      shadow-[inset_2px_2px_6px_rgba(0,0,0,0.04),inset_-2px_-2px_6px_rgba(255,255,255,0.9),6px_6px_14px_rgba(2,6,23,0.06),-6px_-6px_14px_rgba(255,255,255,0.9)]
      hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.06),inset_-2px_-2px_6px_rgba(255,255,255,1),8px_8px_18px_rgba(2,6,23,0.08),-6px_-6px_14px_rgba(255,255,255,1)]
      transition-all duration-200 rounded-lg px-3 py-2.5 mr-1 flex items-center space-x-1 text-sm"
            >
              <RotateCcw className="size-3" />
              {/* <span>Reset</span> */}
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
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.VIEW && (
                <ViewSection
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
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.MAKEUP && (
                <MakeupSection
                  settings={settings}
                  fileName={fileName}
                  onUpdateSetting={onUpdateSetting}
                  onFileNameChange={onFileNameChange}
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
