import React, { useState, useRef, useEffect } from "react";
import { Folder, Edit2, Download, Loader2 } from "lucide-react";
import { getFileExtension } from "@/utils";
import { _PLAYGROUND_SETTINGS_TAB } from "@/shared";
import type { CodeSettings, SupportedLanguage } from "@/types";

interface FileSectionProps {
  settings: CodeSettings;
  fileName: string;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
  onFileNameChange: (fileName: string) => void;
}

const FileSection: React.FC<FileSectionProps> = ({
  settings,
  fileName,
  onUpdateSetting,
  onFileNameChange,
}) => {
  const [isEditingFileName, setIsEditingFileName] = useState(false);
  const [tempFileName, setTempFileName] = useState(fileName);
  const [isExporting, setIsExporting] = useState(false);
  const fileNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempFileName(fileName);
  }, [fileName]);

  useEffect(() => {
    if (isEditingFileName && fileNameInputRef.current) {
      fileNameInputRef.current.focus();
      fileNameInputRef.current.select();
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
      <div>
        <label className="flex items-center justify-between cursor-pointer mb-3">
          <div className="flex items-center gap-2">
            <Folder
              className={`size-4 transition-colors ${
                settings.showFileName
                  ? "text-yellow-600 group-hover:text-yellow-700"
                  : "text-gray-400 group-hover:text-gray-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                settings.showFileName
                  ? "text-yellow-600 group-hover:text-yellow-700"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            >
              File display
            </span>
          </div>
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
        <div className="flex items-center space-x-2">
          {isEditingFileName ? (
            <div className="flex-1 flex items-center space-x-1">
              <input
                ref={fileNameInputRef}
                type="text"
                value={tempFileName}
                onChange={(e) => handleFileNameChange(e.target.value)}
                onKeyDown={handleFileNameKeyDown}
                onBlur={handleFileNameBlur}
                className="flex-1 px-2.5 py-1.5 text-sm border border-gray-300/60 hover:border-gray-400/80 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60 transition-all duration-200"
                placeholder="Enter filename"
              />
              <span className="text-sm text-gray-500">
                .{getFileExtension(settings.language)}
              </span>
            </div>
          ) : (
            <div
              className="flex-1 flex items-center space-x-2 group cursor-pointer px-2.5 py-1.5 rounded-md border border-gray-300/60 hover:border-gray-400/80"
              onClick={handleFileNameEdit}
            >
              <span className="flex-1 text-sm font-medium text-gray-700 truncate group-hover:text-blue-600 transition-colors">
                {fileName}.{getFileExtension(settings.language)}
              </span>
              <Edit2 className="size-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
            </div>
          )}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
          <Download className="w-3.5 h-3.5 text-green-600 mr-1.5" />
          Export Format
        </h4>
        <div className="grid grid-cols-4 gap-2 my-4">
          {["png", "jpg", "webp", "avif"].map((format) => (
            <button
              key={format}
              onClick={() =>
                onUpdateSetting(
                  "exportFormat",
                  format as "png" | "jpg" | "webp" | "avif"
                )
              }
              className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 capitalize ${
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
    </>
  );
};

export default FileSection;
