import React from "react";
import { MessageSquare } from "lucide-react";
import { CodeSettings } from "@/types";

interface CaptionSectionProps {
  settings: CodeSettings;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
}

const CaptionSection: React.FC<CaptionSectionProps> = ({
  settings,
  onUpdateSetting,
}) => {
  return (
    <div className="space-y-6">
      <label className="flex items-center justify-between group cursor-pointer">
        <div className="flex items-center space-x-2">
          <MessageSquare className="size-4 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            Caption
          </span>
        </div>
        <div className="relative">
          <input
            type="checkbox"
            checked={settings.showCaption || false}
            onChange={(e) => onUpdateSetting("showCaption", e.target.checked)}
            className="sr-only peer"
          />
          <div
            className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
              settings.showCaption
                ? "bg-gradient-to-br from-indigo-100 to-indigo-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                : ""
            }`}
          >
            <svg
              className={`size-3 text-indigo-700 font-bold transition-opacity duration-200 ${
                settings.showCaption ? "opacity-100" : "opacity-0"
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

      <input
        type="text"
        value={settings.captionText || ""}
        onChange={(e) => onUpdateSetting("captionText", e.target.value)}
        className="w-full px-2.5 py-1.5 text-sm border border-gray-300/60 hover:border-gray-400/80 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all duration-200"
        placeholder="Enter figure caption..."
      />

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onUpdateSetting("captionStyle", "normal")}
          className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
            (settings.captionStyle || "normal") === "normal"
              ? "bg-indigo-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Normal
        </button>
        <button
          onClick={() => onUpdateSetting("captionStyle", "italic")}
          className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
            settings.captionStyle === "italic"
              ? "bg-indigo-500 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <em>Italic</em>
        </button>
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
          <span>Opacity</span>
          <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-bold">
            {Math.round((settings.captionOpacity || 1) * 100)}%
          </span>
        </label>
        <div className="relative">
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={settings.captionOpacity || 1}
            onChange={(e) =>
              onUpdateSetting("captionOpacity", parseFloat(e.target.value))
            }
            className="w-full h-1.5 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-purple-500
              [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {["top", "bottom", "left", "right"].map((position) => (
          <button
            key={position}
            onClick={() =>
              onUpdateSetting(
                "captionPosition",
                position as "top" | "bottom" | "left" | "right"
              )
            }
            className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
              (settings.captionPosition || "bottom") === position
                ? "bg-indigo-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {position}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CaptionSection;
