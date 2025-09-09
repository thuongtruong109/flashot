"use client";

import React from "react";
import { Palette, Settings, X } from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import { backgrounds, supportedLanguages, fontFamilies, cn } from "@/utils";

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
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-200 z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          {/* Language Option */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) =>
                onUpdateSetting("language", e.target.value as SupportedLanguage)
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) =>
                onUpdateSetting("theme", e.target.value as ThemeName)
              }
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="monokai">Monokai</option>
              <option value="github">GitHub</option>
            </select>
          </div>
          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font
            </label>
            <select
              value={settings.fontFamily}
              onChange={(e) => onUpdateSetting("fontFamily", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>
          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size: {settings.fontSize}px
            </label>
            <input
              type="range"
              min="10"
              max="24"
              value={settings.fontSize}
              onChange={(e) =>
                onUpdateSetting("fontSize", parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>
          {/* Padding */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Padding: {settings.padding}px
            </label>
            <input
              type="range"
              min="0"
              max="64"
              value={settings.padding}
              onChange={(e) =>
                onUpdateSetting("padding", parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>
          {/* Border Radius */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Radius: {settings.borderRadius}px
            </label>
            <input
              type="range"
              min="0"
              max="32"
              value={settings.borderRadius}
              onChange={(e) =>
                onUpdateSetting("borderRadius", parseInt(e.target.value))
              }
              className="w-full"
            />
          </div>
          {/* Toggles */}
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.showBackground}
                onChange={(e) =>
                  onUpdateSetting("showBackground", e.target.checked)
                }
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Show Background
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.showWindowControls}
                onChange={(e) =>
                  onUpdateSetting("showWindowControls", e.target.checked)
                }
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                Window Controls
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={(e) => onToggleLineNumbers(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Line Numbers</span>
            </label>
          </div>
        </div>
        {/* Background Colors */}
        {settings.showBackground && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 mt-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Background
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {backgrounds.map((bg, index) => (
                <button
                  key={index}
                  onClick={() => onUpdateSetting("background", bg)}
                  className={cn(
                    "w-full h-12 rounded-lg border-2 transition-all",
                    settings.background === bg
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-300 hover:border-gray-400"
                  )}
                  style={{
                    background: bg.startsWith("linear-gradient") ? bg : bg,
                    backgroundColor: !bg.startsWith("linear-gradient")
                      ? bg
                      : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsSheet;
