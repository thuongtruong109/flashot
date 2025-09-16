import React, { useState, useEffect } from "react";
import { Move, BarChart3, CornerRightDown, Type } from "lucide-react";
import { CodeSettings } from "@/types";

interface SizeSectionProps {
  settings: CodeSettings;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
}

const SizeSection: React.FC<SizeSectionProps> = ({
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

      {/* Width */}
      <div>
        <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Move className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
            Width
          </div>
          <span className="text-xs bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent font-bold">
            {settings.width ? `${settings.width}px` : "Auto"}
          </span>
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => {
              onUpdateSetting("width", undefined);
              setWidthInput("");
            }}
            disabled={!settings.width}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
              !settings.width
                ? "text-gray-700 bg-gradient-to-b from-white to-gray-50 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.95)]"
                : "text-white bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md"
            }`}
          >
            Auto
          </button>
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
            className="flex-1 px-2 py-1 text-xs rounded-md border border-gray-200"
            placeholder="600"
          />
        </div>
      </div>

      {/* Height */}
      <div>
        <label className="text-xs font-semibold text-gray-700 mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="w-3.5 h-3.5 text-green-600 mr-1.5" />
            Height
          </div>
          <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent font-bold">
            {settings.height ? `${settings.height}px` : "Auto"}
          </span>
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => {
              onUpdateSetting("height", undefined);
              setHeightInput("");
            }}
            disabled={!settings.height}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
              !settings.height
                ? "text-gray-700 bg-gradient-to-b from-white to-gray-50 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.95)]"
                : "text-white bg-gradient-to-r from-emerald-500 to-green-500 shadow-md"
            }`}
          >
            Auto
          </button>
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
            className="flex-1 px-2 py-1 text-xs rounded-md border border-gray-200"
            placeholder="400"
          />
        </div>
      </div>
    </>
  );
};

export default SizeSection;
