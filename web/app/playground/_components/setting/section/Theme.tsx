"use client";

import React from "react";
import { Palette } from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import LanguageSelector from "@/app/playground/_components/LanguageSelector";
import FontSelector from "@/app/playground/_components/FontSelector";
import ThemeSelector from "@/app/playground/_components/ThemeSelector";
import BackgroundSelector from "@/app/playground/_components/BackgroundSelector";
import HighlightOverlay from "@/app/playground/_components/setting/HighlightOverlay";
import { useLocalization } from "../../../LocalizationContext";

interface ThemeSectionProps {
  settings: CodeSettings;
  highlightItemId?: string;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K],
  ) => void;
  handleLanguageChange: (language: SupportedLanguage) => void;
}

const ThemeSection: React.FC<ThemeSectionProps> = ({
  settings,
  highlightItemId,
  onUpdateSetting,
  handleLanguageChange,
}) => {
  const { t } = useLocalization();
  return (
    <>
      <HighlightOverlay itemId="language" highlightItemId={highlightItemId}>
        <LanguageSelector
          selectedLanguage={settings.language as SupportedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </HighlightOverlay>

      <HighlightOverlay itemId="font-family" highlightItemId={highlightItemId}>
        <FontSelector
          selectedFont={settings.fontFamily}
          onFontChange={(fontFamily) =>
            onUpdateSetting("fontFamily", fontFamily)
          }
        />
      </HighlightOverlay>

      <HighlightOverlay itemId="color-theme" highlightItemId={highlightItemId}>
        <ThemeSelector
          selectedTheme={settings.theme as ThemeName}
          onThemeChange={(theme) => onUpdateSetting("theme", theme)}
        />
      </HighlightOverlay>

      <HighlightOverlay itemId="background" highlightItemId={highlightItemId}>
        <div>
          <label className="flex items-center justify-between cursor-pointer mb-4">
            <div className="flex items-center gap-2">
              <Palette
                className={`size-4 transition-colors ${
                  settings.showBackground
                    ? "text-blue-600 group-hover:text-blue-700"
                    : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  settings.showBackground
                    ? "text-blue-600 group-hover:text-blue-700"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              >
                {t("settingsPanel.theme.background")}
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
                className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                  settings.showBackground
                    ? "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"
                    : ""
                }`}
              >
                <svg
                  className={`size-3 text-blue-700 dark:text-blue-300 font-bold transition-opacity duration-200 ${
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
            <BackgroundSelector
              selectedBackground={settings.background}
              onBackgroundChange={(background) =>
                onUpdateSetting("background", background)
              }
              gradientAngle={settings.gradientAngle || 135}
              onGradientAngleChange={(angle) =>
                onUpdateSetting("gradientAngle", angle)
              }
              selectedPattern={settings.backgroundPattern || "none"}
              onPatternChange={(pattern) =>
                onUpdateSetting("backgroundPattern", pattern)
              }
            />
          )}
        </div>
      </HighlightOverlay>
    </>
  );
};

export default ThemeSection;
