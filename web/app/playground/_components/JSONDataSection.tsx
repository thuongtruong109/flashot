"use client";

import React, { forwardRef } from "react";
import { FileText, Copy, Check, X, Download, Upload } from "lucide-react";
import { CodeSettings } from "@/types";

interface JSONDataSectionProps {
  code: string;
  settings: CodeSettings;
  onCopyJSON: () => void;
  copySuccess: boolean;
  isOpen: boolean;
  onClose: () => void;
  onImportJSON: (data: { code: string; settings: CodeSettings }) => void;
  onExportJSON: () => void;
}

const JSONDataSection = forwardRef<HTMLDivElement, JSONDataSectionProps>(
  (
    {
      code,
      settings,
      onCopyJSON,
      copySuccess,
      isOpen,
      onClose,
      onImportJSON,
      onExportJSON,
    },
    ref
  ) => {
    const jsonData = {
      code,
      settings,
      timestamp: new Date().toISOString(),
    };

    const formattedJSON = JSON.stringify(jsonData, null, 2);

    const handleImport = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              const data = JSON.parse(event.target?.result as string);
              if (data.code && data.settings) {
                onImportJSON(data);
              } else {
                alert("Invalid JSON file format");
              }
            } catch (error) {
              alert("Error parsing JSON file");
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    };

    return (
      <>
        {/* Mobile Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={onClose}
          />
        )}

        {/* JSON Data Panel */}
        <div
          ref={ref}
          className={`
        ${isOpen ? "translate-x-0 lg:w-80" : "-translate-x-full lg:w-0"}
         w-80 fixed lg:relative top-0 left-0 z-30
         h-[100vh] lg:max-h-[calc(100vh-60px)]
        bg-white/95 backdrop-blur-xl shadow-2xl
        border-r border-white/20
        transition-all duration-300 ease-in-out
        overflow-hidden
        flex flex-col
      `}
        >
          {/* Header */}
          <div className="flex items-center justify-between py-2 border-b border-white/30 bg-white/70 backdrop-blur-md px-3">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <FileText className="relative w-5 h-5" />
              <span>JSON Data</span>
            </h3>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden shadow-lg">
              <div className="p-2 text-xs text-gray-400 font-medium flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onCopyJSON}
                    className="group relative flex items-center space-x-1 px-2 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-all duration-200 text-xs font-medium"
                    title="Copy JSON"
                  >
                    {copySuccess ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copySuccess ? "Copied!" : "Copy"}</span>
                  </button>
                  <button
                    onClick={handleImport}
                    className="group relative flex items-center space-x-1 px-2 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all duration-200 text-xs font-medium"
                    title="Import JSON"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import</span>
                  </button>
                  <button
                    onClick={onExportJSON}
                    className="group relative flex items-center space-x-1 px-2 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-all duration-200 text-xs font-medium"
                    title="Export JSON"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>
                </div>
                <span className="bg-gray-800 px-2 py-1 rounded-md text-green-400">
                  {formattedJSON.split("\n").length} lines
                </span>
              </div>
              <div className="relative">
                <pre className="text-sm text-gray-300 font-mono leading-relaxed overflow-y-auto max-h-[calc(100vh-200px)] p-3">
                  <code className="language-json">
                    {formattedJSON.split("\n").map((line, index) => (
                      <div key={index} className="flex">
                        <span className="text-gray-600 select-none w-8 text-right pr-2 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span
                          className="flex-1"
                          dangerouslySetInnerHTML={{
                            __html: line
                              .replace(
                                /(".*?")/g,
                                '<span class="text-green-400">$1</span>'
                              )
                              .replace(
                                /(:\s*)(true|false|null|\d+)/g,
                                '$1<span class="text-blue-400">$2</span>'
                              )
                              .replace(
                                /([{}[\],])/g,
                                '<span class="text-gray-500">$1</span>'
                              ),
                          }}
                        />
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

JSONDataSection.displayName = "JSONDataSection";

export default JSONDataSection;
