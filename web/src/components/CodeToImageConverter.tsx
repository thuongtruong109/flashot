"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Edit3,
  Eye,
  Info,
  Download,
  Copy,
  Settings,
  Check,
  Palette,
  FileText,
  Code2,
} from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import {
  themes,
  syntaxHighlight,
  copyToClipboard,
  cn,
  supportedLanguages,
  fontFamilies,
  backgrounds,
} from "@/utils";
import { generateAndDownloadImage } from "@/lib/imageGenerator";
import Header from "./Header";
import SettingsSheet from "./SettingsSheet";
import JSONDataSection from "./JSONDataSection";
import TipsModal from "./TipsModal";

const defaultCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`;

const CodeToImageConverter: React.FC = () => {
  const [code, setCode] = useState(defaultCode);
  const [settings, setSettings] = useState<CodeSettings>({
    language: "javascript",
    theme: "dark",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    showBackground: true,
    padding: 32,
    borderRadius: 8,
    showWindowControls: true,
    fontFamily: "Fira Code",
    fontSize: 14,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [jsonCopySuccess, setJsonCopySuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const editableRef = useRef<HTMLTextAreaElement>(null);

  const updateSetting = <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleCopyCode = async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleCopyJSON = async () => {
    const jsonData = {
      code,
      settings,
      showLineNumbers,
      timestamp: new Date().toISOString(),
    };
    const success = await copyToClipboard(JSON.stringify(jsonData, null, 2));
    if (success) {
      setJsonCopySuccess(true);
      setTimeout(() => setJsonCopySuccess(false), 2000);
    }
  };

  const handleDownloadImage = useCallback(async () => {
    if (!codeRef.current) return;

    setIsGenerating(true);
    try {
      const success = await generateAndDownloadImage(
        codeRef.current,
        { ...settings, code },
        "code-snippet.png"
      );

      if (!success) {
        alert("Failed to generate image. Please try again.");
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [code, settings]);

  const handleStartEdit = () => {
    setIsEditing(true);
    // Focus the textarea after a brief delay to ensure it's rendered
    setTimeout(() => {
      if (editableRef.current) {
        editableRef.current.focus();
        // Position cursor at the end
        const length = editableRef.current.value.length;
        editableRef.current.setSelectionRange(length, length);
      }
    }, 10);
  };

  const handleFinishEdit = () => {
    setIsEditing(false);
  };

  const handleToggleEditMode = () => {
    if (isEditing) {
      handleFinishEdit();
    } else {
      handleStartEdit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Escape key to exit editing
    if (e.key === "Escape") {
      handleFinishEdit();
      return;
    }

    // Handle Ctrl+Enter to finish editing
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleFinishEdit();
      return;
    }

    // Handle Tab key for indentation
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      if (e.shiftKey) {
        // Shift+Tab: Remove indentation
        const beforeCursor = code.substring(0, start);
        const afterCursor = code.substring(end);
        const currentLine = beforeCursor.split("\n").pop() || "";

        if (currentLine.startsWith("  ")) {
          const newValue =
            beforeCursor.slice(0, -currentLine.length) +
            currentLine.slice(2) +
            afterCursor;
          setCode(newValue);
          setTimeout(() => {
            target.setSelectionRange(start - 2, start - 2);
          }, 0);
        }
      } else {
        // Tab: Add indentation
        const newValue = code.substring(0, start) + "  " + code.substring(end);
        setCode(newValue);

        // Update cursor position
        setTimeout(() => {
          target.setSelectionRange(start + 2, start + 2);
        }, 0);
      }
    }
  };

  const currentTheme = themes[settings.theme as ThemeName];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Code2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Flashot</h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleEditMode}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium",
                isEditing
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {isEditing ? (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </>
              )}
            </button>
            <button
              onClick={() => setShowTipsModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>Help</span>
            </button>
            <button
              onClick={() => setShowSettingsSheet(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Config</span>
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? "Generating..." : "Export"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="mt-8">
                <div className="flex justify-center">
                  <div
                    ref={codeRef}
                    className={cn(
                      "inline-block relative",
                      `theme-${settings.theme}`,
                      isEditing && "ring-2 ring-blue-500 ring-opacity-50"
                    )}
                    style={{
                      background: settings.showBackground
                        ? settings.background
                        : "transparent",
                      padding: settings.showBackground
                        ? `${settings.padding}px`
                        : "0",
                      borderRadius: `${settings.borderRadius}px`,
                    }}
                    onDoubleClick={handleStartEdit}
                  >
                    {settings.showWindowControls && (
                      <div
                        className="flex items-center px-4 py-3 border-b"
                        style={{
                          backgroundColor:
                            settings.theme === "light" ? "#e5e5e5" : "#2d2d2d",
                          borderTopLeftRadius: `${settings.borderRadius}px`,
                          borderTopRightRadius: `${settings.borderRadius}px`,
                        }}
                      >
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        {isEditing && (
                          <div className="ml-auto">
                            <button
                              onClick={handleFinishEdit}
                              className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                              Done
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="relative">
                      {/* Syntax highlighted code display */}
                      {!isEditing && (
                        <div
                          className="flex overflow-x-auto cursor-text hover:bg-opacity-10 hover:bg-blue-500 transition-colors"
                          style={{
                            backgroundColor: currentTheme.background,
                            borderRadius: settings.showWindowControls
                              ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                              : `${settings.borderRadius}px`,
                            minWidth: "300px",
                          }}
                        >
                          {/* Line numbers */}
                          {showLineNumbers && (
                            <div
                              className="py-6 px-4 text-right border-r border-opacity-20 select-none"
                              style={{
                                backgroundColor: currentTheme.background,
                                color: `${currentTheme.foreground}60`,
                                fontFamily: `${settings.fontFamily}, monospace`,
                                fontSize: `${settings.fontSize}px`,
                                lineHeight: 1.5,
                                borderColor: currentTheme.foreground,
                              }}
                            >
                              {code.split("\n").map((_, index) => (
                                <div key={index} className="leading-6">
                                  {index + 1}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Code content */}
                          <pre
                            className="flex-1 p-6"
                            style={{
                              color: currentTheme.foreground,
                              fontFamily: `${settings.fontFamily}, monospace`,
                              fontSize: `${settings.fontSize}px`,
                              lineHeight: 1.5,
                              margin: 0,
                              background: "transparent",
                            }}
                          >
                            <code
                              dangerouslySetInnerHTML={{
                                __html: syntaxHighlight(
                                  code,
                                  settings.language as SupportedLanguage
                                ),
                              }}
                              style={{
                                fontFamily: `${settings.fontFamily}, monospace`,
                              }}
                            />
                          </pre>
                        </div>
                      )}

                      {/* Editable textarea (shown when editing) */}
                      {isEditing && (
                        <div
                          className="flex overflow-x-auto"
                          style={{
                            backgroundColor: currentTheme.background,
                            borderRadius: settings.showWindowControls
                              ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                              : `${settings.borderRadius}px`,
                            minWidth: "300px",
                          }}
                        >
                          {/* Line numbers for editing mode */}
                          {showLineNumbers && (
                            <div
                              className="py-6 px-4 text-right border-r border-opacity-20 select-none"
                              style={{
                                color: `${currentTheme.foreground}60`,
                                fontFamily: `${settings.fontFamily}, monospace`,
                                fontSize: `${settings.fontSize}px`,
                                lineHeight: 1.5,
                                borderColor: currentTheme.foreground,
                              }}
                            >
                              {code.split("\n").map((_, index) => (
                                <div key={index} className="leading-6">
                                  {index + 1}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Textarea */}
                          <textarea
                            ref={editableRef}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={handleFinishEdit}
                            className="flex-1 resize-none border-none outline-none p-6 bg-transparent"
                            style={{
                              color: currentTheme.foreground,
                              fontFamily: `${settings.fontFamily}, monospace`,
                              fontSize: `${settings.fontSize}px`,
                              lineHeight: 1.5,
                              minHeight: "200px",
                            }}
                            rows={Math.max(6, code.split("\n").length + 1)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Settings Panel */}
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Settings
            </h3>
          </div>

          <div className="space-y-4">
            {/* Language Option */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) =>
                  updateSetting("language", e.target.value as SupportedLanguage)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) =>
                  updateSetting("theme", e.target.value as ThemeName)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="monokai">Monokai</option>
                <option value="github">GitHub</option>
              </select>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font
              </label>
              <select
                value={settings.fontFamily}
                onChange={(e) => updateSetting("fontFamily", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {fontFamilies.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size: {settings.fontSize}px
              </label>
              <input
                type="range"
                min="10"
                max="24"
                value={settings.fontSize}
                onChange={(e) =>
                  updateSetting("fontSize", parseInt(e.target.value))
                }
                className="w-full"
              />
            </div>

            {/* Padding */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Padding: {settings.padding}px
              </label>
              <input
                type="range"
                min="0"
                max="64"
                value={settings.padding}
                onChange={(e) =>
                  updateSetting("padding", parseInt(e.target.value))
                }
                className="w-full"
              />
            </div>

            {/* Border Radius */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius: {settings.borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="32"
                value={settings.borderRadius}
                onChange={(e) =>
                  updateSetting("borderRadius", parseInt(e.target.value))
                }
                className="w-full"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.showBackground}
                  onChange={(e) =>
                    updateSetting("showBackground", e.target.checked)
                  }
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Show Background
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.showWindowControls}
                  onChange={(e) =>
                    updateSetting("showWindowControls", e.target.checked)
                  }
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Window Controls
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showLineNumbers}
                  onChange={(e) => setShowLineNumbers(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Line Numbers</span>
              </label>
            </div>
          </div>

          {/* Background Colors */}
          {settings.showBackground && (
            <div className="mt-6">
              <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Background
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {backgrounds.map((bg, index) => (
                  <button
                    key={index}
                    onClick={() => updateSetting("background", bg)}
                    className={cn(
                      "w-full h-10 rounded-md border-2 transition-all",
                      settings.background === bg
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                    style={{
                      background: bg.startsWith("linear-gradient") ? bg : bg,
                      backgroundColor: !bg.startsWith("linear-gradient")
                        ? bg
                        : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* JSON Data Sheet Component */}
      <JSONDataSection
        code={code}
        settings={settings}
        showLineNumbers={showLineNumbers}
        onCopyJSON={handleCopyJSON}
        copySuccess={jsonCopySuccess}
        isOpen={showSettingsSheet}
        onClose={() => setShowSettingsSheet(false)}
      />

      {/* Tips Modal Component */}
      <TipsModal
        isOpen={showTipsModal}
        onClose={() => setShowTipsModal(false)}
      />
    </div>
  );
};

export default CodeToImageConverter;
