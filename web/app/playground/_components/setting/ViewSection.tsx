import React, { useState, useEffect } from "react";
import {
  Move,
  BarChart3,
  CornerRightDown,
  Type,
  Download,
  Loader2,
  WrapText,
} from "lucide-react";
import { CodeSettings } from "@/types";

interface ViewSectionProps {
  settings: CodeSettings;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
}

const ViewSection: React.FC<ViewSectionProps> = ({
  settings,
  onUpdateSetting,
}) => {
  const [widthInput, setWidthInput] = useState(
    settings.width?.toString() || ""
  );
  const [heightInput, setHeightInput] = useState(
    settings.height?.toString() || ""
  );
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    setWidthInput(settings.width?.toString() || "");
  }, [settings.width]);

  useEffect(() => {
    setHeightInput(settings.height?.toString() || "");
  }, [settings.height]);
  return (
    <>
      {/* Export Format */}
      <div>
        <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
          <Download className="w-3.5 h-3.5 text-green-600 mr-1.5" />
          Export
        </h4>
        <div className="pl-4">
          <div className="grid grid-cols-4 gap-2 my-3">
            {["png", "jpg", "webp", "avif"].map((format) => (
              <button
                type="button"
                title={`${format}_format`}
                key={format}
                onClick={() =>
                  onUpdateSetting(
                    "exportFormat",
                    format as
                      | "png"
                      | "jpg"
                      | "webp"
                      | "avif"
                      | "original"
                      | "plain"
                  )
                }
                className={`p-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
                  settings.exportFormat === format
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {format}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 my-3">
            {["original", "plain"].map((format) => (
              <button
                type="button"
                title={`${format}_format`}
                key={format}
                onClick={() =>
                  onUpdateSetting(
                    "exportFormat",
                    format as "original" | "plain"
                  )
                }
                className={`p-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
                  settings.exportFormat === format
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {format}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                setIsExporting(true);
                window.dispatchEvent(new CustomEvent("flashot:export"));
                setTimeout(() => setIsExporting(false), 2000);
              }
            }}
            disabled={isExporting}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-xs font-semibold shadow-sm hover:shadow-md ${
              isExporting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isExporting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{isExporting ? "Exporting..." : "Export"}</span>
          </button>
        </div>
      </div>
      {/* Font Size */}
      <div>
        <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Type className="w-3.5 h-3.5 text-orange-600 mr-1.5" />
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
      <div>
        <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <Move className="w-3.5 h-3.5 text-pink-600 mr-1.5" />
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
      <div>
        <label className="text-xs font-semibold text-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <CornerRightDown className="w-3.5 h-3.5 text-teal-600 mr-1.5" />
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

      {/* Sizing */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Move className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
            Sizing
          </div>
          <button
            onClick={() => {
              onUpdateSetting("width", undefined);
              onUpdateSetting("height", undefined);
              setWidthInput("");
              setHeightInput("");
            }}
            disabled={!settings.width && !settings.height}
            className={`px-3 py-1 text-xs rounded-lg transition-all ${
              !settings.width && !settings.height
                ? "text-gray-700 bg-gradient-to-b from-white to-gray-50 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.95)] cursor-not-allowed"
                : "text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-md cursor-pointer"
            }`}
          >
            Auto
          </button>
        </label>

        <div className="flex items-center space-x-2">
          {/* Width Input */}
          <input
            type="number"
            min="0"
            max="1200"
            value={widthInput}
            onChange={(e) => {
              const value = e.target.value;
              setWidthInput(value);
              if (value === "") {
                onUpdateSetting("width", undefined);
              } else {
                const numValue = parseInt(value);
                if (!isNaN(numValue) && numValue >= 0) {
                  onUpdateSetting("width", numValue);
                }
              }
            }}
            onBlur={() => {
              if (widthInput === "") {
                onUpdateSetting("width", undefined);
              } else {
                const numValue = parseInt(widthInput);
                if (!isNaN(numValue) && numValue >= 0) {
                  onUpdateSetting("width", numValue);
                } else {
                  setWidthInput(settings.width?.toString() || "");
                }
              }
            }}
            className="w-full px-2 py-1 text-xs rounded-md border border-gray-200"
            placeholder="600"
          />
          {/* Height Input */}

          <span>x</span>

          <input
            type="number"
            min="0"
            max="800"
            value={heightInput}
            onChange={(e) => {
              const value = e.target.value;
              setHeightInput(value);
              if (value === "") {
                onUpdateSetting("height", undefined);
              } else {
                const numValue = parseInt(value);
                if (!isNaN(numValue) && numValue >= 0) {
                  onUpdateSetting("height", numValue);
                }
              }
            }}
            onBlur={() => {
              if (heightInput === "") {
                onUpdateSetting("height", undefined);
              } else {
                const numValue = parseInt(heightInput);
                if (!isNaN(numValue) && numValue >= 0) {
                  onUpdateSetting("height", numValue);
                } else {
                  setHeightInput(settings.height?.toString() || "");
                }
              }
            }}
            className="w-full px-2 py-1 text-xs rounded-md border border-gray-200"
            placeholder="400"
          />
        </div>

        {/* Social Media Size Presets */}
        <div className="mb-3 space-y-2">
          <p className="text-[10px] text-gray-500 font-medium mb-1.5">
            Social Media Size
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            <button
              onClick={() => {
                // Instagram Square: 1:1 ratio, max 800px
                const size = Math.min(800, window.innerWidth - 400);
                onUpdateSetting("width", size);
                onUpdateSetting("height", size);
                setWidthInput(size.toString());
                setHeightInput(size.toString());
              }}
              className="px-2 py-1 text-[10px] rounded-md bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-sm transition-all"
              title="Instagram Square Post (1:1)"
            >
              IG Square
            </button>
            <button
              onClick={() => {
                // Instagram Portrait: 4:5 ratio
                const maxWidth = Math.min(800, window.innerWidth - 400);
                const maxHeight = window.innerHeight - 200;
                const width = Math.min(maxWidth, maxHeight * 0.8);
                const height = width * 1.25;
                onUpdateSetting("width", Math.round(width));
                onUpdateSetting("height", Math.round(height));
                setWidthInput(Math.round(width).toString());
                setHeightInput(Math.round(height).toString());
              }}
              className="px-2 py-1 text-[10px] rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-sm transition-all"
              title="Instagram Portrait Post (4:5)"
            >
              IG Portrait
            </button>
            <button
              onClick={() => {
                // Instagram Story: 9:16 ratio
                const maxWidth = Math.min(800, window.innerWidth - 400);
                const maxHeight = window.innerHeight - 200;
                const width = Math.min(maxWidth, maxHeight * 0.5625);
                const height = width * 1.778;
                onUpdateSetting("width", Math.round(width));
                onUpdateSetting("height", Math.round(height));
                setWidthInput(Math.round(width).toString());
                setHeightInput(Math.round(height).toString());
              }}
              className="px-2 py-1 text-[10px] rounded-md bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white hover:from-fuchsia-600 hover:to-purple-600 shadow-sm transition-all"
              title="Instagram Story (9:16)"
            >
              IG Story
            </button>
            <button
              onClick={() => {
                // Twitter/X: 16:9 ratio
                const maxWidth = Math.min(800, window.innerWidth - 400);
                const maxHeight = window.innerHeight - 200;
                const width = Math.min(maxWidth, maxHeight * 1.778);
                const height = width * 0.5625;
                onUpdateSetting("width", Math.round(width));
                onUpdateSetting("height", Math.round(height));
                setWidthInput(Math.round(width).toString());
                setHeightInput(Math.round(height).toString());
              }}
              className="px-2 py-1 text-[10px] rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-sm transition-all"
              title="Twitter/X Post (16:9)"
            >
              Twitter/X
            </button>
            <button
              onClick={() => {
                // Facebook: 1.91:1 ratio
                const maxWidth = Math.min(800, window.innerWidth - 400);
                const maxHeight = window.innerHeight - 200;
                const width = Math.min(maxWidth, maxHeight * 1.91);
                const height = width * 0.524;
                onUpdateSetting("width", Math.round(width));
                onUpdateSetting("height", Math.round(height));
                setWidthInput(Math.round(width).toString());
                setHeightInput(Math.round(height).toString());
              }}
              className="px-2 py-1 text-[10px] rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow-sm transition-all"
              title="Facebook Post (1.91:1)"
            >
              Facebook
            </button>
            <button
              onClick={() => {
                // LinkedIn: 1.91:1 ratio (similar to Facebook)
                const maxWidth = Math.min(800, window.innerWidth - 400);
                const maxHeight = window.innerHeight - 200;
                const width = Math.min(maxWidth, maxHeight * 1.91);
                const height = width * 0.522;
                onUpdateSetting("width", Math.round(width));
                onUpdateSetting("height", Math.round(height));
                setWidthInput(Math.round(width).toString());
                setHeightInput(Math.round(height).toString());
              }}
              className="px-2 py-1 text-[10px] rounded-md bg-gradient-to-r from-blue-700 to-indigo-700 text-white hover:from-blue-800 hover:to-indigo-800 shadow-sm transition-all"
              title="LinkedIn Post (1.91:1)"
            >
              LinkedIn
            </button>
            <button
              onClick={() => {
                // YouTube: 16:9 ratio
                const maxWidth = Math.min(800, window.innerWidth - 400);
                const maxHeight = window.innerHeight - 200;
                const width = Math.min(maxWidth, maxHeight * 1.778);
                const height = width * 0.5625;
                onUpdateSetting("width", Math.round(width));
                onUpdateSetting("height", Math.round(height));
                setWidthInput(Math.round(width).toString());
                setHeightInput(Math.round(height).toString());
              }}
              className="px-2 py-1 text-[10px] rounded-md bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-sm transition-all"
              title="YouTube Thumbnail (16:9)"
            >
              YouTube
            </button>
            <button
              onClick={() => {
                // Blog Header: 1.91:1 ratio
                const maxWidth = Math.min(800, window.innerWidth - 400);
                const maxHeight = window.innerHeight - 200;
                const width = Math.min(maxWidth, maxHeight * 1.91);
                const height = width * 0.523;
                onUpdateSetting("width", Math.round(width));
                onUpdateSetting("height", Math.round(height));
                setWidthInput(Math.round(width).toString());
                setHeightInput(Math.round(height).toString());
              }}
              className="px-2 py-1 text-[10px] rounded-md bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-sm transition-all"
              title="Blog Post Header (1.91:1)"
            >
              Blog
            </button>
          </div>
        </div>
      </div>

      <div>
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
    </>
  );
};

export default ViewSection;
