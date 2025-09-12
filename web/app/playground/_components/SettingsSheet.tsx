"use client";

import React from "react";
import { Settings, X } from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import { cn } from "@/utils";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import FontSelector from "./FontSelector";
import BackgroundSelector from "./BackgroundSelector";

interface SettingsSheetProps {
  isOpen: boolean;
  settings: CodeSettings;
  showLineNumbers: boolean;
  onClose: () => void;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
  onToggleLineNumbers: (value: boolean) => void;
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({
  isOpen,
  settings,
  showLineNumbers,
  onClose,
  onUpdateSetting,
  onToggleLineNumbers,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Settings Sheet */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/20 z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 p-4 bg-gradient-to-b from-white/90 to-white/80 backdrop-blur-xl border-b border-white/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center">
              <div className="relative mr-2">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"></div>
                <Settings className="relative w-5 h-5 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text" />
              </div>
              Settings
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 h-full overflow-y-auto">
          <div className="space-y-5">
            {/* Language Selector Component */}
            <LanguageSelector
              selectedLanguage={settings.language as SupportedLanguage}
              onLanguageChange={(language) =>
                onUpdateSetting("language", language)
              }
            />

            {/* Background Theme Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-lg">
              <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></span>
                Background Theme
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateSetting("theme", "light")}
                  className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                    settings.theme === "light"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="w-full h-8 bg-white rounded-md border mb-1"></div>
                  <span className="text-xs font-medium">Light</span>
                </button>
                <button
                  onClick={() => onUpdateSetting("theme", "dark")}
                  className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                    settings.theme === "dark"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="w-full h-8 bg-gray-800 rounded-md border mb-1"></div>
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
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-lg">
              <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></span>
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
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-lg">
              <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-2"></span>
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
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-lg">
              <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2"></span>
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
            {/* Enhanced Toggles */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mr-2"></span>
                Display Options
              </h4>
              <div className="space-y-4">
                <label className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      🎨 Show Background
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showBackground}
                    onChange={(e) =>
                      onUpdateSetting("showBackground", e.target.checked)
                    }
                    className="w-5 h-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </label>

                <label className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      🪟 Window Controls
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showWindowControls}
                    onChange={(e) =>
                      onUpdateSetting("showWindowControls", e.target.checked)
                    }
                    className="w-5 h-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </label>

                <label className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      🔢 Line Numbers
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showLineNumbers}
                    onChange={(e) => onToggleLineNumbers(e.target.checked)}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </label>
              </div>
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
    </>
  );
};

export default SettingsSheet;
