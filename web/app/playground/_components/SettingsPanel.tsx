"use client";

interface SettingsPanelProps {
  settings: CodeSettings;
  fileName: string;
  code: string;
  isVisible?: boolean;
  activeMenu?: string;
  highlightItemId?: string;
  onChangeActiveMenu?: (menu: string | undefined) => void;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K],
  ) => void;
  onFileNameChange: (fileName: string) => void;
  onCodeChange?: (code: string) => void;
  onToggleVisibility?: () => void;
  onImportTemplate?: (data: { code: string; settings: CodeSettings }) => void;
  onExportTemplate?: () => void;
  "data-tour"?: string;
}
import { CodeSettings, SupportedLanguage } from "@/types";
import ThemeSection from "@/app/playground/_components/setting/section/Theme";
import MakeupSection from "@/app/playground/_components/setting/section/Makeup";
import DecorateSection from "@/app/playground/_components/setting/section/Decorate";
import TemplateSection from "@/app/playground/_components/setting/section/Template";
import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
  Palette,
  Move,
  Layers,
  RotateCcw,
  FileJson,
  Stamp,
} from "lucide-react";
import CustomSelect from "./base/Select";
import { _PLAYGROUND_SETTINGS_TAB, DEFAULT_CODE_SETTINGS } from "@/shared";
import ViewSection from "./setting/section/View";
import { useLocalization } from "../LocalizationContext";

const SettingsPanel = forwardRef<HTMLDivElement, SettingsPanelProps>(
  (
    {
      settings,
      fileName,
      code,
      isVisible = true,
      activeMenu = _PLAYGROUND_SETTINGS_TAB.VIEW,
      highlightItemId,
      onChangeActiveMenu,
      onUpdateSetting,
      onFileNameChange,
      onCodeChange,
      onToggleVisibility,
      onImportTemplate,
      onExportTemplate,
      "data-tour": dataTour,
    },
    ref,
  ) => {
    const { t } = useLocalization();
    const [isEditingFileName, setIsEditingFileName] = useState(false);
    const [tempFileName, setTempFileName] = useState(fileName);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [widthInput, setWidthInput] = useState(
      settings.width?.toString() || "",
    );
    const [heightInput, setHeightInput] = useState(
      settings.height?.toString() || "",
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
          '[data-dropdown-type], [style*="z-index: 99999"], [style*="position: fixed"]',
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
            (el.textContent && el.textContent.includes("Background")),
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
          data-tour={dataTour}
          className={`
        ${isVisible ? "translate-x-0 lg:w-80" : "translate-x-full lg:w-0"}
        w-80 fixed lg:relative top-0 right-0 z-30
        h-[100vh] lg:max-h-[calc(100vh-3rem)]
        bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl shadow-2xl
        border-l border-white/20 dark:border-gray-700/30
        transition-all duration-300 ease-in-out
        overflow-hidden
        flex flex-col
      `}
        >
          {/* Header with Close (mobile) */}
          <div className="flex items-center justify-between py-2 border-b border-white/20 dark:border-gray-700/20 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl">
            <div className="relative">
              <CustomSelect
                options={[
                  {
                    value: _PLAYGROUND_SETTINGS_TAB.VIEW,
                    label: (
                      <span className="flex items-center gap-1.5 text-green-600">
                        <Layers className="size-3" />{" "}
                        {t("settingsPanel.tabs.view")}
                      </span>
                    ),
                  },
                  {
                    value: _PLAYGROUND_SETTINGS_TAB.THEME,
                    label: (
                      <span className="flex items-center gap-1.5 text-purple-600">
                        <Palette className="size-3" />{" "}
                        {t("settingsPanel.tabs.theme")}
                      </span>
                    ),
                  },
                  {
                    value: _PLAYGROUND_SETTINGS_TAB.MAKEUP,
                    label: (
                      <span className="flex items-center gap-1.5 text-cyan-600">
                        <Move className="size-3" />{" "}
                        {t("settingsPanel.tabs.makeup")}
                      </span>
                    ),
                  },
                  {
                    value: _PLAYGROUND_SETTINGS_TAB.DECORATE,
                    label: (
                      <span className="flex items-center gap-1.5 text-rose-600">
                        <Stamp className="size-3" />{" "}
                        {t("settingsPanel.tabs.decorate")}
                      </span>
                    ),
                  },
                  {
                    value: _PLAYGROUND_SETTINGS_TAB.TEMPLATE,
                    label: (
                      <span className="flex items-center gap-1.5 text-indigo-600">
                        <FileJson className="size-3" />{" "}
                        {t("settingsPanel.tabs.template")}
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
              title={t("settingsPanel.resetToDefaults")}
              aria-label={t("settingsPanel.resetToDefaults")}
              className="text-red-500 dark:text-red-400 font-light
      bg-white/70 dark:bg-gray-800/70 backdrop-blur-md
      shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.5)_inset]
      dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4),0_1px_1px_rgba(255,255,255,0.1)_inset]
      hover:shadow-[0_6px_20px_-6px_rgba(0,0,0,0.2),0_2px_2px_rgba(255,255,255,0.6)_inset]
      dark:hover:shadow-[0_6px_20px_-6px_rgba(0,0,0,0.5),0_2px_2px_rgba(255,255,255,0.15)_inset]
      transition-all duration-200 rounded-lg px-3 py-2.5 mr-1 flex items-center space-x-1 text-sm
      border border-white/60 dark:border-gray-700/60"
            >
              <RotateCcw className="size-3" />
              {/* <span>Reset</span> */}
            </button>
          </div>
          {/* Scrollable Content */}
          <div
            className={`flex-1 overflow-x-hidden scroll-smooth settings-scrollbar ${
              isDropdownOpen ? "overflow-y-hidden" : "overflow-y-auto"
            }`}
            style={{
              scrollbarGutter: "stable",
            }}
          >
            <div className="p-3 space-y-4 divide-y [&>div]:py-2 divide-slate-200 dark:divide-slate-700 divide-dashed">
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.VIEW && (
                <ViewSection
                  settings={settings}
                  onUpdateSetting={onUpdateSetting}
                  highlightItemId={highlightItemId}
                />
              )}
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.THEME && (
                <ThemeSection
                  settings={settings}
                  onUpdateSetting={onUpdateSetting}
                  handleLanguageChange={handleLanguageChange}
                  highlightItemId={highlightItemId}
                />
              )}
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.MAKEUP && (
                <MakeupSection
                  settings={settings}
                  fileName={fileName}
                  onUpdateSetting={onUpdateSetting}
                  onFileNameChange={onFileNameChange}
                  highlightItemId={highlightItemId}
                />
              )}
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.DECORATE && (
                <DecorateSection
                  settings={settings}
                  onUpdateSetting={onUpdateSetting}
                  highlightItemId={highlightItemId}
                />
              )}
              {activeMenu === _PLAYGROUND_SETTINGS_TAB.TEMPLATE && (
                <TemplateSection
                  code={code}
                  settings={settings}
                  fileName={fileName}
                  onImportTemplate={onImportTemplate || (() => {})}
                  onExportTemplate={onExportTemplate || (() => {})}
                  onUpdateSetting={onUpdateSetting}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  },
);

SettingsPanel.displayName = "SettingsPanel";

export default SettingsPanel;
