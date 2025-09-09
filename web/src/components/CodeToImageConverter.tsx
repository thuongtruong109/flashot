"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Download,
  Copy,
  Palette,
  Settings,
  Code2,
  Check,
  Edit3,
  X,
  Menu,
  Eye,
  FileText,
  Info,
} from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import {
  themes,
  backgrounds,
  supportedLanguages,
  fontFamilies,
  syntaxHighlight,
  copyToClipboard,
  cn,
} from "@/utils";
import { generateAndDownloadImage } from "@/lib/imageGenerator";

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
  const [isEditing, setIsEditing] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "edit" | "tips">(
    "preview"
  );
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
    setActiveTab("edit");
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
    setActiveTab("preview");
  };

  const handleTabChange = (tab: "preview" | "edit" | "tips") => {
    setActiveTab(tab);
    if (tab === "edit") {
      handleStartEdit();
    } else if (tab === "preview" && isEditing) {
      handleFinishEdit();
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Flashot - Code to Image
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {copySuccess ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copySuccess ? "Copied!" : "Copy"}</span>
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? "Generating..." : "Export"}</span>
            </button>
            <button
              onClick={() => setShowSettingsSheet(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </header>

      {/* Top Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => handleTabChange("preview")}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2",
                activeTab === "preview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => handleTabChange("edit")}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2",
                activeTab === "edit"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Code</span>
            </button>
            <button
              onClick={() => handleTabChange("tips")}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2",
                activeTab === "tips"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <Info className="w-4 h-4" />
              <span>Tips & Help</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Code Preview and Controls */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      updateSetting(
                        "language",
                        e.target.value as SupportedLanguage
                      )
                    }
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {supportedLanguages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleStartEdit}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Code</span>
              </button>
            </div>

            {/* Inline editing instructions */}
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <p>
                <strong>💡 Tip:</strong> Click "Edit Code" or double-click the
                code area below to edit directly.
              </p>
              <p className="mt-1">
                <strong>⌨️ Shortcuts:</strong>{" "}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs mx-1">
                  Escape
                </kbd>{" "}
                or{" "}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs mx-1">
                  Ctrl+Enter
                </kbd>{" "}
                to finish,{" "}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs mx-1">
                  Tab
                </kbd>{" "}
                to indent,{" "}
                <kbd className="px-2 py-1 bg-gray-200 rounded text-xs mx-1">
                  Shift+Tab
                </kbd>{" "}
                to unindent
              </p>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </h3>

              <div className="space-y-4">
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
                    onChange={(e) =>
                      updateSetting("fontFamily", e.target.value)
                    }
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
                    <span className="ml-2 text-sm text-gray-700">
                      Line Numbers
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Background Colors */}
            {settings.showBackground && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Background
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {backgrounds.map((bg, index) => (
                    <button
                      key={index}
                      onClick={() => updateSetting("background", bg)}
                      className={cn(
                        "w-full h-12 rounded-lg border-2 transition-all",
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

        {/* Interactive Code Editor */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Code Editor
            {isEditing && (
              <span className="ml-2 text-sm font-normal text-blue-600">
                (Editing mode - Press Escape to finish)
              </span>
            )}
          </h3>
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
                    onClick={handleStartEdit}
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

                {/* Edit overlay hint */}
                {!isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-20 rounded-lg">
                    <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center space-x-2">
                      <Edit3 className="w-4 h-4" />
                      <span>Click to edit code</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeToImageConverter;
