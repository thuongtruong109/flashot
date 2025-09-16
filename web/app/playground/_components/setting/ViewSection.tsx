import React from "react";
import { Monitor, Hash, BarChart3, WrapText } from "lucide-react";
import { CodeSettings } from "@/types";

interface ViewSectionProps {
  settings: CodeSettings;
  showLineNumbers: boolean;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
  onToggleLineNumbers: (value: boolean) => void;
}

const ViewSection: React.FC<ViewSectionProps> = ({
  settings,
  showLineNumbers,
  onUpdateSetting,
  onToggleLineNumbers,
}) => {
  return (
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
              onUpdateSetting("showWindowControls", e.target.checked)
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
                settings.showWindowControls ? "opacity-100" : "opacity-0"
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
            onChange={(e) => onUpdateSetting("showLineCount", e.target.checked)}
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
            onChange={(e) => onUpdateSetting("wordWrap", e.target.checked)}
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
  );
};

export default ViewSection;
