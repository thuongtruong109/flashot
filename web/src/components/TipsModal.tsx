"use client";

import React from "react";
import {
  X,
  Info,
  Keyboard,
  Mouse,
  Palette,
  Download,
  Code2,
} from "lucide-react";

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TipsModal: React.FC<TipsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Info className="w-6 h-6 mr-2 text-blue-600" />
            Tips & Help
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Keyboard Shortcuts */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Keyboard className="w-5 h-5 mr-2 text-green-600" />
              Keyboard Shortcuts
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  Start/Enter edit mode
                </span>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">E</kbd>
                  <span className="text-xs text-gray-500">or</span>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">
                    Double Click
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Finish editing</span>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">
                    Escape
                  </kbd>
                  <span className="text-xs text-gray-500">or</span>
                  <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">
                    Ctrl + Enter
                  </kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Indent code</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Tab</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Unindent code</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">
                  Shift + Tab
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Copy code</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">
                  Ctrl + C
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Export image</span>
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">
                  Ctrl + S
                </kbd>
              </div>
            </div>
          </div>

          {/* Mouse Interactions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Mouse className="w-5 h-5 mr-2 text-purple-600" />
              Mouse Interactions
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Edit code</span>
                <span className="text-xs text-gray-500">
                  Double-click code area
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Quick edit</span>
                <span className="text-xs text-gray-500">
                  Single-click code area
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Select background</span>
                <span className="text-xs text-gray-500">
                  Click color swatches
                </span>
              </div>
            </div>
          </div>

          {/* Customization Features */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-pink-600" />
              Customization Features
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  Themes
                </h4>
                <p className="text-xs text-gray-600">
                  Choose from Dark, Light, Monokai, or GitHub themes for syntax
                  highlighting.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  Backgrounds
                </h4>
                <p className="text-xs text-gray-600">
                  Select gradient backgrounds or solid colors. Toggle background
                  visibility.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  Typography
                </h4>
                <p className="text-xs text-gray-600">
                  Adjust font family and size. Support for popular monospace
                  fonts.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  Layout
                </h4>
                <p className="text-xs text-gray-600">
                  Customize padding, border radius, and window controls
                  appearance.
                </p>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Download className="w-5 h-5 mr-2 text-orange-600" />
              Export Options
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  High-Quality Images
                </h4>
                <p className="text-xs text-gray-600">
                  Export as PNG with transparent or custom backgrounds.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  Multiple Formats
                </h4>
                <p className="text-xs text-gray-600">
                  Support for different image formats and resolutions.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  JSON Export
                </h4>
                <p className="text-xs text-gray-600">
                  Export your settings and code as JSON for sharing or backup.
                </p>
              </div>
            </div>
          </div>

          {/* Supported Languages */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Code2 className="w-5 h-5 mr-2 text-blue-600" />
              Supported Languages
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <span>JavaScript</span>
                <span>TypeScript</span>
                <span>Python</span>
                <span>Java</span>
                <span>C++</span>
                <span>C#</span>
                <span>PHP</span>
                <span>Ruby</span>
                <span>Go</span>
                <span>Rust</span>
                <span>Swift</span>
                <span>Kotlin</span>
                <span>HTML</span>
                <span>CSS</span>
                <span>JSON</span>
                <span>XML</span>
                <span>SQL</span>
                <span>Bash</span>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              💡 Pro Tips
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <p className="text-sm text-blue-800">
                <strong>•</strong> Use line numbers for code documentation and
                tutorials
              </p>
              <p className="text-sm text-blue-800">
                <strong>•</strong> Disable backgrounds for transparent overlays
              </p>
              <p className="text-sm text-blue-800">
                <strong>•</strong> Adjust padding for better framing in
                presentations
              </p>
              <p className="text-sm text-blue-800">
                <strong>•</strong> Copy JSON data to recreate settings later
              </p>
              <p className="text-sm text-blue-800">
                <strong>•</strong> Use window controls for a more authentic
                editor look
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsModal;
