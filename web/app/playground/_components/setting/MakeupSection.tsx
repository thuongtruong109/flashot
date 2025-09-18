import {
  Monitor,
  Hash,
  BarChart3,
  WrapText,
  TrafficCone,
  MessageSquare,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Folder, Edit2 } from "lucide-react";
import { getFileExtension } from "@/utils";
import { _PLAYGROUND_SETTINGS_TAB } from "@/shared";
import type { CodeSettings } from "@/types";
import SubTitle from "@/app/playground/_components/setting/sub/Title";
import SubSeparate from "@/app/playground/_components/setting/sub/Separate";

interface MakeupSectionProps {
  settings: CodeSettings;
  showLineNumbers: boolean;
  fileName: string;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
  onToggleLineNumbers: (value: boolean) => void;
  onFileNameChange: (fileName: string) => void;
}

const MakeupSection: React.FC<MakeupSectionProps> = ({
  settings,
  showLineNumbers,
  onUpdateSetting,
  onToggleLineNumbers,
  fileName,
  onFileNameChange,
}) => {
  const [isEditingFileName, setIsEditingFileName] = useState(false);
  const [tempFileName, setTempFileName] = useState(fileName);
  const fileNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempFileName(fileName);
  }, [fileName]);

  useEffect(() => {
    if (isEditingFileName && fileNameInputRef.current) {
      fileNameInputRef.current.focus();
    }
  }, [isEditingFileName]);

  const handleFileNameEdit = () => setIsEditingFileName(true);
  const handleFileNameChange = (value: string) => {
    setTempFileName(value);
    onFileNameChange(value.trim());
  };
  const handleFileNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") setIsEditingFileName(false);
  };
  const handleFileNameBlur = () => setIsEditingFileName(false);

  return (
    <>
      <div className="space-y-4">
        {/* Window Header Display Toggle */}
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-1.5">
            <Monitor
              className={`size-4 transition-colors ${
                settings.showWindowHeader
                  ? "text-blue-600 group-hover:text-blue-700"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                settings.showWindowHeader
                  ? "text-blue-600 group-hover:text-blue-700"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            >
              Window Header
            </span>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={settings.showWindowHeader}
              onChange={(e) =>
                onUpdateSetting("showWindowHeader", e.target.checked)
              }
              className="sr-only peer"
            />
            <div
              className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                settings.showWindowHeader
                  ? "bg-gradient-to-br from-blue-100 to-blue-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                  : ""
              }`}
            >
              <svg
                className={`size-3 text-blue-700 font-bold transition-opacity duration-200 ${
                  settings.showWindowHeader ? "opacity-100" : "opacity-0"
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

        {/* Traffic Light Buttons Option (under Window Header) */}
        {settings.showWindowHeader && (
          <div className="space-y-2 pl-4">
            <label className="flex items-center justify-between cursor-pointer">
              <SubTitle
                icon={TrafficCone}
                title="Traffic Light"
                color={
                  settings.showTrafficLights
                    ? "text-green-500"
                    : "text-gray-500"
                }
              />
              <SubSeparate
                color={
                  settings.showTrafficLights
                    ? "border-green-600"
                    : "border-gray-600"
                }
              />
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.showTrafficLights !== false}
                  onChange={(e) =>
                    onUpdateSetting("showTrafficLights", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div
                  className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    settings.showTrafficLights !== false
                      ? "bg-gradient-to-br from-green-100 to-green-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                      : ""
                  }`}
                >
                  <svg
                    className={`size-3 text-green-700 font-bold transition-opacity duration-200 ${
                      settings.showTrafficLights !== false
                        ? "opacity-100"
                        : "opacity-0"
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

            {settings.showTrafficLights !== false && (
              <>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs text-gray-500">Color</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={settings.showTrafficLightsColor !== false}
                      onChange={(e) =>
                        onUpdateSetting(
                          "showTrafficLightsColor",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div
                      className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                        settings.showTrafficLightsColor !== false
                          ? "bg-gradient-to-br from-green-100 to-green-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                          : ""
                      }`}
                    >
                      <svg
                        className={`size-3 text-green-700 font-bold transition-opacity duration-200 ${
                          settings.showTrafficLightsColor !== false
                            ? "opacity-100"
                            : "opacity-0"
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

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Align</span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      className={`px-2 rounded-md text-xs font-medium transition-all duration-200 capitalize ${
                        !settings.windowHeaderAlign ||
                        settings.windowHeaderAlign === "left"
                          ? "bg-green-500 text-white shadow-md py-1"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 py-[5px]"
                      }`}
                      onClick={() =>
                        onUpdateSetting("windowHeaderAlign", "left")
                      }
                    >
                      Left
                    </button>
                    <button
                      type="button"
                      className={`px-2 rounded-md text-xs font-medium transition-all duration-200 capitalize ${
                        settings.windowHeaderAlign === "right"
                          ? "bg-green-500 text-white shadow-md py-1"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 py-[5px]"
                      }`}
                      onClick={() =>
                        onUpdateSetting("windowHeaderAlign", "right")
                      }
                    >
                      Right
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {settings.showWindowHeader && (
          <div className="space-y-3 pl-4">
            <label className="flex items-center justify-between cursor-pointer">
              <SubTitle
                icon={Folder}
                title="File Name"
                color={
                  settings.showFileName ? "text-yellow-500" : "text-gray-500"
                }
              />
              <SubSeparate
                color={
                  settings.showFileName
                    ? "border-yellow-600"
                    : "border-gray-600"
                }
              />
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.showFileName || false}
                  onChange={(e) =>
                    onUpdateSetting("showFileName", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div
                  className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    settings.showFileName
                      ? "bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                      : ""
                  }`}
                >
                  <svg
                    className={`size-3 text-yellow-700 font-bold transition-opacity duration-200 ${
                      settings.showFileName ? "opacity-100" : "opacity-0"
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
            {settings.showFileName && (
              <>
                <div className="flex items-center space-x-2">
                  {isEditingFileName ? (
                    <input
                      ref={fileNameInputRef}
                      type="text"
                      value={tempFileName}
                      onChange={(e) => handleFileNameChange(e.target.value)}
                      onKeyDown={handleFileNameKeyDown}
                      onBlur={handleFileNameBlur}
                      className="flex-1 px-2.5 py-1.5 text-xs border border-gray-300/60 hover:border-gray-400/80 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500/60 transition-all duration-200"
                      placeholder="Enter filename"
                    />
                  ) : (
                    <div
                      className="flex-1 flex items-center space-x-2 group cursor-pointer px-2.5 py-1.5 rounded-md border border-gray-200 hover:border-yellow-400"
                      onClick={handleFileNameEdit}
                    >
                      <span className="flex-1 text-xs font-medium text-gray-600 truncate group-hover:text-yellow-600 transition-colors">
                        {fileName}.{getFileExtension(settings.language)}
                      </span>
                      <Edit2 className="size-3 text-yellow-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="fileNameOpacity"
                      className="text-xs flex items-center justify-between w-full"
                    >
                      <span className="text-xs text-gray-500">Opacity</span>

                      <span className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent font-bold">
                        {Math.round((settings.fileNameOpacity ?? 1) * 100)}%
                      </span>
                    </label>
                    <input
                      id="fileNameOpacity"
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={settings.fileNameOpacity ?? 1}
                      onChange={(e) =>
                        onUpdateSetting(
                          "fileNameOpacity",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full h-1 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                    [&::-webkit-slider-thumb]:from-yellow-500 [&::-webkit-slider-thumb]:to-orange-500
                    [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                      style={{ verticalAlign: "middle" }}
                    />
                  </div>
                  {/* Font Weight slider */}
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="fileNameFontWeight"
                      className="text-xs text-gray-700 flex items-center justify-between w-full"
                    >
                      <span className="text-xs text-gray-500">Font Weight</span>
                      <span className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent font-bold">
                        {settings.fileNameFontWeight ?? 400}
                      </span>
                    </label>
                    <input
                      id="fileNameFontWeight"
                      type="range"
                      min={100}
                      max={900}
                      step={100}
                      value={settings.fileNameFontWeight ?? 400}
                      onChange={(e) =>
                        onUpdateSetting(
                          "fileNameFontWeight",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-1 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                        [&::-webkit-slider-thumb]:from-yellow-500 [&::-webkit-slider-thumb]:to-orange-500
                        [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                      style={{ verticalAlign: "middle" }}
                    />
                  </div>
                  {/* Font Size slider */}
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="fileNameFontSize"
                      className="text-xs text-gray-700 flex items-center justify-between w-full"
                    >
                      <span className="text-xs text-gray-500">Font Size</span>
                      <span className="text-xs bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent font-bold">
                        {settings.fileNameFontSize ?? 14}px
                      </span>
                    </label>
                    <input
                      id="fileNameFontSize"
                      type="range"
                      min={10}
                      max={20}
                      step={1}
                      value={settings.fileNameFontSize ?? 14}
                      onChange={(e) =>
                        onUpdateSetting(
                          "fileNameFontSize",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full h-1 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                        [&::-webkit-slider-thumb]:from-yellow-500 [&::-webkit-slider-thumb]:to-orange-500
                        [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                      style={{ verticalAlign: "middle" }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {settings.showWindowHeader && (
          <div className="space-y-3 pl-4">
            <label className="flex items-center justify-between cursor-pointer">
              <SubTitle
                icon={BarChart3}
                title="Line Count"
                color={
                  settings.showLineCount ? "text-sky-500" : "text-gray-500"
                }
              />
              <SubSeparate
                color={
                  settings.showLineCount ? "border-sky-600" : "border-gray-600"
                }
              />
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.showLineCount || false}
                  onChange={(e) =>
                    onUpdateSetting("showLineCount", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div
                  className={`w-5 h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    settings.showLineCount
                      ? "bg-gradient-to-br from-sky-100 to-sky-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
                      : ""
                  }`}
                >
                  <svg
                    className={`size-3 text-sky-700 font-bold transition-opacity duration-200 ${
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
            {settings.showLineCount && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="lineCountOpacity"
                    className="text-xs text-gray-700 flex items-center justify-between w-full"
                  >
                    <span className="text-xs text-gray-500">Opacity</span>
                    <span className="text-xs bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent font-bold">
                      {Math.round((settings.lineCountOpacity ?? 1) * 100)}%
                    </span>
                  </label>
                  <input
                    id="lineCountOpacity"
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={settings.lineCountOpacity ?? 1}
                    onChange={(e) =>
                      onUpdateSetting(
                        "lineCountOpacity",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full h-1 bg-gradient-to-r from-sky-200 to-blue-200 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                    [&::-webkit-slider-thumb]:from-sky-500 [&::-webkit-slider-thumb]:to-blue-500
                    [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                  />
                </div>
                {/* Line Count Font Weight slider */}
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="lineCountFontWeight"
                    className="text-xs text-gray-700 flex items-center justify-between w-full"
                  >
                    <span className="text-xs text-gray-500">Font Weight</span>
                    <span className="text-xs bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent font-bold">
                      {settings.lineCountFontWeight ?? 400}
                    </span>
                  </label>
                  <input
                    id="lineCountFontWeight"
                    type="range"
                    min={100}
                    max={900}
                    step={100}
                    value={settings.lineCountFontWeight ?? 400}
                    onChange={(e) =>
                      onUpdateSetting(
                        "lineCountFontWeight",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-1 bg-gradient-to-r from-sky-200 to-blue-200 rounded-lg appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                      [&::-webkit-slider-thumb]:from-sky-500 [&::-webkit-slider-thumb]:to-blue-500
                      [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                    style={{ verticalAlign: "middle" }}
                  />
                </div>
                {/* Line Count Font Size slider */}
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="lineCountFontSize"
                    className="text-xs text-gray-700 flex items-center justify-between w-full"
                  >
                    <span className="text-xs text-gray-500">Font Size</span>
                    <span className="text-xs bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent font-bold">
                      {settings.lineCountFontSize ?? 13}px
                    </span>
                  </label>
                  <input
                    id="lineCountFontSize"
                    type="range"
                    min={10}
                    max={20}
                    step={1}
                    value={settings.lineCountFontSize ?? 13}
                    onChange={(e) =>
                      onUpdateSetting(
                        "lineCountFontSize",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full h-1 bg-gradient-to-r from-sky-200 to-blue-200 rounded-lg appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                      [&::-webkit-slider-thumb]:from-sky-500 [&::-webkit-slider-thumb]:to-blue-500
                      [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                    style={{ verticalAlign: "middle" }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
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

      {/* Caption Section */}
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
    </>
  );
};

export default MakeupSection;
