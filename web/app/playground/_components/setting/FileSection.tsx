import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { _PLAYGROUND_SETTINGS_TAB } from "@/shared";
import type { CodeSettings } from "@/types";

interface FileSectionProps {
  settings: CodeSettings;
  onUpdateSetting: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
}

const FileSection: React.FC<FileSectionProps> = ({
  settings,
  onUpdateSetting,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  return (
    <>
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
