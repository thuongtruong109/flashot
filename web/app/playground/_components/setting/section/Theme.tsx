import React from "react";
import { Palette } from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import LanguageSelector from "@/app/playground/_components/LanguageSelector";
import FontSelector from "@/app/playground/_components/FontSelector";
import ThemeSelector from "@/app/playground/_components/ThemeSelector";
import BackgroundSelector from "@/app/playground/_components/BackgroundSelector";

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
              Background
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
        {settings.showBackground && (
          <>
            <BackgroundSelector
              selectedBackground={settings.background}
              onBackgroundChange={(background) =>
                onUpdateSetting("background", background)
              }
            />

            {/* Gradient Angle Control */}
            {settings.background.includes("gradient") && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <label className="text-xs flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Gradient Angle
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    {settings.gradientAngle || 135}°
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={settings.gradientAngle || 135}
                  onChange={(e) =>
                    onUpdateSetting("gradientAngle", parseInt(e.target.value))
                  }
                  className="w-full h-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                    [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-pink-500
                    [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>0° (→)</span>
                  <span>90° (↓)</span>
                  <span>180° (←)</span>
                  <span>270° (↑)</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ThemeSection;
