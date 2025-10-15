import React, { useState, useEffect } from "react";
import {
  Move,
  BarChart3,
  CornerRightDown,
  Type,
  WrapText,
  Highlighter,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { CodeSettings, HighlightRange } from "@/types";

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

  useEffect(() => {
    setWidthInput(settings.width?.toString() || "");
  }, [settings.width]);

  useEffect(() => {
    setHeightInput(settings.height?.toString() || "");
  }, [settings.height]);
  return (
    <>
      {/* Font Size */}
      <div>
        <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
          <div className="flex items-center text-orange-600">
            <Type className="w-3.5 h-3.5 mr-1.5" />
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
            className="w-full h-1 bg-gradient-to-r from-orange-200 to-red-200 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
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
          <div className="flex items-center text-pink-600">
            <Move className="w-3.5 h-3.5 mr-1.5" />
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
            className="w-full h-1 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-pink-500 [&::-webkit-slider-thumb]:to-purple-500
              [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
          <div className="flex items-center text-teal-600 dark:text-teal-400">
            <CornerRightDown className="w-3.5 h-3.5 mr-1.5" />
            Border Radius (All)
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
            className="w-full h-1 bg-gradient-to-r from-teal-200 to-cyan-200 dark:from-teal-900 dark:to-cyan-900 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-teal-500 [&::-webkit-slider-thumb]:to-cyan-500
              [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>
      </div>

      {/* Frame Border Radius */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
          <div className="flex items-center text-purple-600 dark:text-purple-400">
            <CornerRightDown className="w-3.5 h-3.5 mr-1.5" />
            Frame Border
          </div>
          <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-bold">
            {settings.frameBorderRadius ?? settings.borderRadius}px
          </span>
        </label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="50"
            value={settings.frameBorderRadius ?? settings.borderRadius}
            onChange={(e) =>
              onUpdateSetting("frameBorderRadius", parseInt(e.target.value))
            }
            className="w-full h-1 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-pink-500
              [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>
      </div>

      {/* Code Border Radius */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
          <div className="flex items-center text-indigo-600 dark:text-indigo-400">
            <CornerRightDown className="w-3.5 h-3.5 mr-1.5" />
            Code Border
          </div>
          <span className="text-xs bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent font-bold">
            {settings.codeBorderRadius ?? settings.borderRadius}px
          </span>
        </label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="50"
            value={settings.codeBorderRadius ?? settings.borderRadius}
            onChange={(e) =>
              onUpdateSetting("codeBorderRadius", parseInt(e.target.value))
            }
            className="w-full h-1 bg-gradient-to-r from-indigo-200 to-blue-200 dark:from-indigo-900 dark:to-blue-900 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-blue-500
              [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
          />
        </div>
      </div>

      {/* Sizing */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-between">
          <div className="flex items-center text-blue-600">
            <Move className="w-3.5 h-3.5 mr-1.5" />
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
            className="w-full px-2 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            placeholder="600"
          />
          {/* Height Input */}

          <span className="opacity-70 text-xs">x</span>

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
            className="w-full px-2 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
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

      {/* Line Highlights */}
      <div>
        <div className="text-xs font-semibold text-gray-700 mb-3 flex items-center justify-between">
          <label className="flex items-center text-yellow-600">
            <Highlighter className="w-3.5 h-3.5 mr-1.5" />
            Line Highlights
          </label>
          <button
            type="button"
            onClick={() => {
              const newHighlight: HighlightRange = {
                id: Date.now().toString(),
                startLine: 1,
                endLine: 1,
                color: "#22c55e20",
                type: "add",
              };
              onUpdateSetting("highlights", [
                ...(settings.highlights || []),
                newHighlight,
              ]);
            }}
            className="w-fit px-2 py-1 text-xs rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-sm transition-all flex items-center space-x-1"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>

        {/* Highlight List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {settings.highlights && settings.highlights.length > 0 ? (
            settings.highlights.map((highlight, index) => (
              <div
                key={highlight.id}
                className="p-2 rounded-lg bg-green-600/10 border border-white/60 shadow-sm space-y-2"
              >
                {/* Preview */}
                <div className="flex items-center justify-between space-x-2">
                  <div
                    className="w-full px-2 py-1 rounded text-[10px] font-mono border"
                    style={{
                      backgroundColor: highlight.color,
                      borderColor: highlight.color.slice(0, 7) + "40",
                    }}
                  >
                    Preview: Lines {highlight.startLine}-{highlight.endLine}
                  </div>
                  <button
                    onClick={() => {
                      const newHighlights = settings.highlights?.filter(
                        (_, i) => i !== index
                      );
                      onUpdateSetting("highlights", newHighlights || []);
                    }}
                    className="p-1 rounded-md bg-red-50 hover:bg-red-100 text-red-600 border border-red-500/30 transition-all"
                    title="Remove highlight"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Type Selector */}
                <div className="flex items-center gap-2">
                  <label className="text-[10px] text-gray-600 font-medium w-8">
                    Type:
                  </label>
                  <div className="flex-1 flex gap-1">
                    {[
                      {
                        value: "add",
                        label: "+",
                        color: "bg-green-100 text-green-700 border-green-300",
                      },
                      {
                        value: "remove",
                        label: "-",
                        color: "bg-red-100 text-red-700 border-red-300",
                      },
                      {
                        value: "change",
                        label: "~",
                        color: "bg-blue-100 text-blue-700 border-blue-300",
                      },
                      {
                        value: "neutral",
                        label: "•",
                        color: "bg-gray-100 text-gray-700 border-gray-300",
                      },
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() => {
                          const newHighlights = [
                            ...(settings.highlights || []),
                          ];
                          newHighlights[index] = {
                            ...highlight,
                            type: type.value as HighlightRange["type"],
                            color:
                              type.value === "add"
                                ? "#22c55e20"
                                : type.value === "remove"
                                ? "#ef444420"
                                : type.value === "change"
                                ? "#3b82f620"
                                : "#6b728020",
                          };
                          onUpdateSetting("highlights", newHighlights);
                        }}
                        className={`flex-1 px-2 py-1 text-xs rounded border transition-all ${
                          highlight.type === type.value
                            ? type.color + " font-bold shadow-sm"
                            : "bg-white/40 text-gray-500 border-gray-200 hover:bg-white/60"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Range */}
                <div className="flex items-center space-x-2">
                  <label className="text-[10px] text-gray-600 font-medium w-8">
                    Lines:
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={highlight.startLine}
                    onChange={(e) => {
                      const newHighlights = [...(settings.highlights || [])];
                      const newStart = parseInt(e.target.value) || 1;
                      newHighlights[index] = {
                        ...highlight,
                        startLine: newStart,
                        endLine: Math.max(newStart, highlight.endLine),
                      };
                      onUpdateSetting("highlights", newHighlights);
                    }}
                    className="w-full px-2 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                    placeholder="Start"
                  />
                  <span className="text-xs text-gray-500 w-12">to</span>
                  <input
                    type="number"
                    min={highlight.startLine}
                    value={highlight.endLine}
                    onChange={(e) => {
                      const newHighlights = [...(settings.highlights || [])];
                      newHighlights[index] = {
                        ...highlight,
                        endLine: Math.max(
                          highlight.startLine,
                          parseInt(e.target.value) || highlight.startLine
                        ),
                      };
                      onUpdateSetting("highlights", newHighlights);
                    }}
                    className="w-full px-2 py-1 text-xs rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                    placeholder="End"
                  />
                </div>

                {/* Color Picker */}
                <div className="flex items-center justify-between space-x-2 w-full">
                  <label className="text-[10px] text-gray-600 font-medium w-8">
                    Color:
                  </label>
                  <input
                    type="color"
                    value={highlight.color.slice(0, 7)}
                    onChange={(e) => {
                      const newHighlights = [...(settings.highlights || [])];
                      // Keep opacity from original color or default to 20%
                      const opacity =
                        highlight.color.length > 7
                          ? highlight.color.slice(7)
                          : "20";
                      newHighlights[index] = {
                        ...highlight,
                        color: e.target.value + opacity,
                      };
                      onUpdateSetting("highlights", newHighlights);
                    }}
                    className="w-10 h-6 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={
                      highlight.color.length > 7
                        ? parseInt(highlight.color.slice(7), 16) / 2.55
                        : 12
                    }
                    onChange={(e) => {
                      const newHighlights = [...(settings.highlights || [])];
                      const opacity = Math.round(
                        parseInt(e.target.value) * 2.55
                      )
                        .toString(16)
                        .padStart(2, "0");
                      newHighlights[index] = {
                        ...highlight,
                        color: highlight.color.slice(0, 7) + opacity,
                      };
                      onUpdateSetting("highlights", newHighlights);
                    }}
                    className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">
                    {highlight.color.length > 7
                      ? Math.round(
                          parseInt(highlight.color.slice(7), 16) / 2.55
                        )
                      : 12}
                    %
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-4 bg-gray-50/50 dark:bg-gray-900/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
              No highlights added. Click &ldquo;Add&rdquo; to create one.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewSection;
