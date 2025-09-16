import React from "react";
import { Layers, Sun, Moon, Palette } from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import LanguageSelector from "../LanguageSelector";
import FontSelector from "../FontSelector";
import ThemeSelector from "../ThemeSelector";
import BackgroundSelector from "../BackgroundSelector";

interface ThemeSectionProps {
  settings: CodeSettings;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
  handleLanguageChange: (language: SupportedLanguage) => void;
}

const ThemeSection: React.FC<ThemeSectionProps> = ({
  settings,
  onUpdateSetting,
  handleLanguageChange,
}) => {
  return (
    <>
      <LanguageSelector
        selectedLanguage={settings.language as SupportedLanguage}
        onLanguageChange={handleLanguageChange}
      />

      <FontSelector
        selectedFont={settings.fontFamily}
        onFontChange={(fontFamily) => onUpdateSetting("fontFamily", fontFamily)}
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
              <span className="text-xs text-white font-medium">Dark</span>
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
                  settings.showBackground ? "opacity-100" : "opacity-0"
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
  );
};

export default ThemeSection;
