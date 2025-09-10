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
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-white/20 z-50 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 bg-gradient-to-b from-white/80 to-white/60 h-full overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center">
            <div className="relative mr-3">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20"></div>
              <Settings className="relative w-6 h-6 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text" />
            </div>
            Settings
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-6">
          {/* Language Selector Component */}
          <LanguageSelector
            selectedLanguage={settings.language as SupportedLanguage}
            onLanguageChange={(language) =>
              onUpdateSetting("language", language)
            }
          />

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
            fontSize={settings.fontSize}
            onFontSizeChange={(fontSize) =>
              onUpdateSetting("fontSize", fontSize)
            }
          />
          {/* Font Size */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
            <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2"></span>
                Font Size
              </div>
              <span className="text-xs bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-bold">
                {settings.fontSize}px
              </span>
            </label>
            <input
              type="range"
              min="10"
              max="24"
              value={settings.fontSize}
              onChange={(e) =>
                onUpdateSetting("fontSize", parseInt(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Padding */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
            <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-2"></span>
                Padding
              </div>
              <span className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-bold">
                {settings.padding}px
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="64"
              value={settings.padding}
              onChange={(e) =>
                onUpdateSetting("padding", parseInt(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Border Radius */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
            <label className="text-sm font-semibold text-gray-800 mb-3 flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2"></span>
                Border Radius
              </div>
              <span className="text-xs bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent font-bold">
                {settings.borderRadius}px
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="32"
              value={settings.borderRadius}
              onChange={(e) =>
                onUpdateSetting("borderRadius", parseInt(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          {/* Enhanced Toggles */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg">
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
  );
};

export default SettingsSheet;
