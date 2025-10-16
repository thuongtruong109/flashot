import {
  Monitor,
  Hash,
  BarChart3,
  WrapText,
  TrafficCone,
  MessageSquare,
  X,
  Highlighter,
  Plus,
  Trash2,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Folder, Edit2 } from "lucide-react";
import { getFileExtension } from "@/utils";
import { _PLAYGROUND_SETTINGS_TAB } from "@/shared";
import type { CodeSettings, HighlightRange } from "@/types";
import SubTitle from "@/app/playground/_components/setting/sub/Title";
import SubSeparate from "@/app/playground/_components/setting/sub/Separate";

interface MakeupSectionProps {
  settings: CodeSettings;
  fileName: string;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
  onFileNameChange: (fileName: string) => void;
}

const MakeupSection: React.FC<MakeupSectionProps> = ({
  settings,
  onUpdateSetting,
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
              className={`w-5 h-5 bg-gradient-to-br rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                settings.showWindowHeader
                  ? "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"
                  : "dark:from-gray-800 dark:to-gray-900"
              }`}
            >
              <svg
                className={`size-3 text-blue-700 dark:text-blue-300 font-bold transition-opacity duration-200 ${
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
                  className={`w-5 h-5 bg-gradient-to-br rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    settings.showTrafficLights !== false
                      ? "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"
                      : "dark:from-gray-800 dark:to-gray-900"
                  }`}
                >
                  <svg
                    className={`size-3 text-green-700 dark:text-green-300 font-bold transition-opacity duration-200 ${
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
                      className={`w-5 h-5 bg-gradient-to-br rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                        settings.showTrafficLightsColor !== false
                          ? "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"
                          : "dark:from-gray-800 dark:to-gray-900"
                      }`}
                    >
                      <svg
                        className={`size-3 text-green-700 dark:text-green-300 font-bold transition-opacity duration-200 ${
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
                      className={`px-2 rounded-md text-xs transition-all duration-200 capitalize ${
                        !settings.windowHeaderAlign ||
                        settings.windowHeaderAlign === "left"
                          ? "bg-green-500 dark:bg-green-600 text-white shadow-md py-1 font-medium"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-[5px]"
                      }`}
                      onClick={() =>
                        onUpdateSetting("windowHeaderAlign", "left")
                      }
                    >
                      Left
                    </button>
                    <button
                      type="button"
                      className={`px-2 rounded-md text-xs transition-all duration-200 capitalize ${
                        settings.windowHeaderAlign === "right"
                          ? "bg-green-500 dark:bg-green-600 text-white shadow-md py-1 font-medium"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-[5px]"
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
                  className={`w-5 h-5 bg-gradient-to-br rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    settings.showFileName
                      ? "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-800 dark:to-yellow-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"
                      : "dark:from-gray-800 dark:to-gray-900"
                  }`}
                >
                  <svg
                    className={`size-3 text-yellow-700 dark:text-yellow-300 font-bold transition-opacity duration-200 ${
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
                      className="flex-1 px-2.5 py-1.5 text-xs border border-gray-300/60 hover:border-gray-400/80 dark:border-gray-700/60 dark:hover:border-gray-600/80 dark:bg-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500/40 focus:border-yellow-500/60 transition-all duration-200"
                      placeholder="Enter filename"
                    />
                  ) : (
                    <div
                      className="flex-1 flex items-center space-x-2 group cursor-pointer px-2.5 py-1.5 rounded-md border border-gray-200 hover:border-yellow-400 dark:border-gray-700 dark:hover:border-yellow-500 dark:bg-gray-900"
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
                  {/* Filename Alignment */}
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500">Alignment</label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          onUpdateSetting("fileNameAlign", "left")
                        }
                        className={`flex-1 px-2 py-1.5 rounded-md text-xs transition-all duration-200 ${
                          (settings.fileNameAlign || "left") === "left"
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 text-white shadow-md font-medium"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        Default
                      </button>
                      <button
                        onClick={() =>
                          onUpdateSetting("fileNameAlign", "center")
                        }
                        className={`flex-1 px-2 py-1.5 rounded-md text-xs transition-all duration-200 ${
                          settings.fileNameAlign === "center"
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-600 dark:to-orange-600 text-white shadow-md font-medium"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        Center
                      </button>
                    </div>
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
                  className={`w-5 h-5 bg-gradient-to-br rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    settings.showLineCount
                      ? "bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-800 dark:to-sky-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"
                      : "dark:from-gray-800 dark:to-gray-900"
                  }`}
                >
                  <svg
                    className={`size-3 text-sky-700 dark:text-sky-300 font-bold transition-opacity duration-200 ${
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

      <div className="space-y-4">
        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-1.5">
            <Hash
              className={`size-4 transition-colors ${
                settings.showLineNumbers
                  ? "text-teal-600 group-hover:text-teal-700"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                settings.showLineNumbers
                  ? "text-teal-600 group-hover:text-teal-700"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            >
              Line Numbers
            </span>
          </div>
          <div className="relative">
            <input
              type="checkbox"
              checked={settings.showLineNumbers || false}
              onChange={(e) =>
                onUpdateSetting("showLineNumbers", e.target.checked)
              }
              className="sr-only peer"
            />
            <div
              className={`w-5 h-5 bg-gradient-to-br rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                settings.showLineNumbers
                  ? "bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"
                  : "dark:from-gray-800 dark:to-gray-900"
              }`}
            >
              <svg
                className={`size-3 text-teal-700 dark:text-teal-300 font-bold transition-opacity duration-200 ${
                  settings.showLineNumbers ? "opacity-100" : "opacity-0"
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
        {settings.showLineNumbers && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <label
                htmlFor="lineNumberOpacity"
                className="text-xs flex items-center justify-between w-full"
              >
                <span className="text-xs text-gray-500">Opacity</span>
                <span className="text-xs bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent font-bold">
                  {Math.round((settings.lineNumberOpacity ?? 0.5) * 100)}%
                </span>
              </label>
              <input
                id="lineNumberOpacity"
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={settings.lineNumberOpacity}
                onChange={(e) =>
                  onUpdateSetting(
                    "lineNumberOpacity",
                    parseFloat(e.target.value)
                  )
                }
                className="w-full h-1 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                [&::-webkit-slider-thumb]:from-teal-500 [&::-webkit-slider-thumb]:to-cyan-500
                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                style={{ verticalAlign: "middle" }}
              />
            </div>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-gray-500">Border</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={settings.lineNumberBorder}
                  onChange={(e) =>
                    onUpdateSetting("lineNumberBorder", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div
                  className={`w-5 h-5 bg-gradient-to-br rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    settings.lineNumberBorder
                      ? "bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"
                      : "dark:from-gray-800 dark:to-gray-900"
                  }`}
                >
                  <svg
                    className={`size-3 text-teal-700 dark:text-teal-300 font-bold transition-opacity duration-200 ${
                      settings.lineNumberBorder ? "opacity-100" : "opacity-0"
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
              <span className="text-xs text-gray-500">Text Align</span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => onUpdateSetting("lineNumberTextAlign", "left")}
                  className={`px-2 rounded-md text-xs transition-all duration-200 capitalize ${
                    (settings.lineNumberTextAlign || "right") === "left"
                      ? "bg-teal-500 dark:bg-teal-600 text-white shadow-md py-1 font-medium"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-[5px]"
                  }`}
                >
                  Left
                </button>
                <button
                  onClick={() =>
                    onUpdateSetting("lineNumberTextAlign", "center")
                  }
                  className={`px-2 rounded-md text-xs transition-all duration-200 capitalize ${
                    settings.lineNumberTextAlign === "center"
                      ? "bg-teal-500 dark:bg-teal-600 text-white shadow-md py-1 font-medium"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-[5px]"
                  }`}
                >
                  Center
                </button>
                <button
                  onClick={() =>
                    onUpdateSetting("lineNumberTextAlign", "right")
                  }
                  className={`px-2 rounded-md text-xs transition-all duration-200 capitalize ${
                    (settings.lineNumberTextAlign || "right") === "right"
                      ? "bg-teal-500 dark:bg-teal-600 text-white shadow-md py-1 font-medium"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-[5px]"
                  }`}
                >
                  Right
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Caption Section */}
      <div className="space-y-4">
        <label className="flex items-center justify-between group cursor-pointer">
          <div className="flex items-center space-x-2">
            <MessageSquare
              className={`size-4 ${
                settings.showCaption ? "text-indigo-600" : "text-gray-500"
              }`}
            />
            <span
              className={`text-sm font-medium transition-colors ${
                settings.showCaption ? "text-indigo-600" : "text-gray-500"
              }`}
            >
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
              className={`w-5 h-5 bg-gradient-to-br rounded-lg shadow-[inset_2px_2px_6px_rgba(0,0,0,0.1),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer flex items-center justify-center ${
                settings.showCaption
                  ? "bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-800 dark:to-indigo-900 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)] dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]"
                  : "dark:from-gray-800 dark:to-gray-900"
              }`}
            >
              <svg
                className={`size-3 text-indigo-700 dark:text-indigo-300 font-bold transition-opacity duration-200 ${
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

        {settings.showCaption && (
          <div className="space-y-4">
            <input
              type="text"
              value={settings.captionText || ""}
              onChange={(e) => onUpdateSetting("captionText", e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-gray-300/60 hover:border-gray-400/80 dark:border-gray-700/60 dark:hover:border-gray-600/80 dark:bg-gray-900 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-all duration-200"
              placeholder="Enter figure caption..."
            />

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Style</span>
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => onUpdateSetting("captionStyle", "normal")}
                  className={`px-2 rounded-md text-xs transition-all duration-200 capitalize ${
                    (settings.captionStyle || "normal") === "normal"
                      ? "bg-indigo-500 dark:bg-indigo-600 text-white shadow-md py-1 font-medium"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-[5px]"
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => onUpdateSetting("captionStyle", "italic")}
                  className={`px-2 rounded-md text-xs transition-all duration-200 capitalize ${
                    settings.captionStyle === "italic"
                      ? "bg-indigo-500 dark:bg-indigo-600 text-white shadow-md py-1 font-medium"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-[5px]"
                  }`}
                >
                  <em>Italic</em>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <label
                htmlFor="captionOpacity"
                className="text-xs flex items-center justify-between w-full"
              >
                <span className="text-xs text-gray-500">Opacity</span>

                <span className="text-xs bg-gradient-to-r from-indigo-500 to-indigo-500 bg-clip-text text-transparent font-bold">
                  {Math.round((settings.captionOpacity || 1) * 100)}%
                </span>
              </label>
              <input
                id="captionOpacity"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={settings.captionOpacity || 1}
                onChange={(e) =>
                  onUpdateSetting("captionOpacity", parseFloat(e.target.value))
                }
                className="w-full h-1 bg-gradient-to-r from-indigo-200 to-indigo-200 rounded-lg appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
          [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-indigo-500
          [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
          [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                style={{ verticalAlign: "middle" }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 mr-2">Position</span>
              <div className="grid grid-cols-4 gap-1.5">
                {["top", "bottom", "left", "right"].map((position) => (
                  <button
                    key={position}
                    onClick={() =>
                      onUpdateSetting(
                        "captionPosition",
                        position as "top" | "bottom" | "left" | "right"
                      )
                    }
                    className={`px-1.5 rounded-md text-xs  transition-all duration-200 capitalize ${
                      (settings.captionPosition || "bottom") === position
                        ? "bg-indigo-500 dark:bg-indigo-600 text-white shadow-md py-1 font-medium"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-[5px]"
                    }`}
                  >
                    {position}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Line Highlights Section */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center justify-between">
          <label className="flex items-center text-yellow-600 dark:text-yellow-400">
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
            className="w-fit px-2 py-1 text-xs rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 dark:from-yellow-600 dark:to-amber-600 hover:from-yellow-600 hover:to-amber-600 dark:hover:from-yellow-700 dark:hover:to-amber-700 text-white shadow-sm transition-all flex items-center space-x-1"
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
                className="p-2 rounded-lg bg-green-600/10 dark:bg-green-900/20 border border-white/60 dark:border-gray-700/60 shadow-sm space-y-2"
              >
                {/* Preview */}
                <div className="flex items-center justify-between space-x-2">
                  <div
                    className="w-full px-2 py-1 rounded text-[10px] font-mono border dark:text-gray-300"
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
                    className="p-1 rounded-md bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 border border-red-500/30 dark:border-red-700/50 transition-all"
                    title="Remove highlight"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Type Selector */}
                <div className="flex items-center gap-2">
                  <label className="text-[10px] text-gray-600 dark:text-gray-400 font-medium w-8">
                    Type:
                  </label>
                  <div className="flex-1 flex gap-1">
                    {[
                      {
                        value: "add",
                        label: "+",
                        color:
                          "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700",
                      },
                      {
                        value: "remove",
                        label: "-",
                        color:
                          "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700",
                      },
                      {
                        value: "change",
                        label: "~",
                        color:
                          "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700",
                      },
                      {
                        value: "neutral",
                        label: "•",
                        color:
                          "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600",
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
                            : "bg-white/40 dark:bg-gray-800/40 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-white/60 dark:hover:bg-gray-800/60"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Range */}
                <div className="flex items-center space-x-2">
                  <label className="text-[10px] text-gray-600 dark:text-gray-400 font-medium w-8">
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
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-12">
                    to
                  </span>
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
                  <label className="text-[10px] text-gray-600 dark:text-gray-400 font-medium w-8">
                    Color:
                  </label>
                  <input
                    type="color"
                    value={highlight.color.slice(0, 7)}
                    onChange={(e) => {
                      const newHighlights = [...(settings.highlights || [])];
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
                    className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
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

export default MakeupSection;
