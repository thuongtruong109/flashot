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
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l border-gray-200 z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Raw JSON Data
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <button
            onClick={onCopyJSON}
            className="flex items-center space-x-2 px-3 py-2 w-full bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {copySuccess ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copySuccess ? "Copied!" : "Copy JSON"}</span>
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
            {formattedJSON}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default JSONDataSection;
