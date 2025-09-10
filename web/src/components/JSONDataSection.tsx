"use client";

import React from "react";
import { FileText, Copy, Check, X } from "lucide-react";
import { CodeSettings } from "@/types";

interface JSONDataSectionProps {
  code: string;
  settings: CodeSettings;
  showLineNumbers: boolean;
  onCopyJSON: () => void;
  copySuccess: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const JSONDataSection: React.FC<JSONDataSectionProps> = ({
  code,
  settings,
  showLineNumbers,
  onCopyJSON,
  copySuccess,
  isOpen,
  onClose,
}) => {
  const jsonData = {
    code,
    settings,
    showLineNumbers,
    timestamp: new Date().toISOString(),
  };

  const formattedJSON = JSON.stringify(jsonData, null, 2);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* JSON Data Sheet */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-white/20 z-50 transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 bg-gradient-to-b from-white/80 to-white/60 h-full overflow-y-auto enhanced-scrollbar-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center">
              <div className="relative mr-2">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg blur opacity-20"></div>
                <FileText className="relative w-5 h-5 text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text" />
              </div>
              JSON Data
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-4">
            <button
              onClick={onCopyJSON}
              className="group relative flex items-center space-x-2 px-3 py-2.5 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-all duration-200 font-semibold shadow-lg shadow-emerald-500/25"
            >
              {copySuccess ? (
                <Check className="w-4 h-4 transition-transform group-hover:scale-110" />
              ) : (
                <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
              )}
              <span>{copySuccess ? "✓ Copied!" : "📋 Copy JSON"}</span>
              {copySuccess && (
                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
              )}
            </button>
          </div>

          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 max-h-[calc(100vh-200px)] overflow-auto shadow-lg enhanced-scrollbar-dark">
            <div className="mb-3 text-xs text-gray-400 font-medium flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>JSON Configuration</span>
              </span>
              <span className="bg-gray-800 px-2 py-1 rounded-md text-green-400">
                {formattedJSON.split("\n").length} lines
              </span>
            </div>
            <div className="relative">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">
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
};

export default JSONDataSection;
