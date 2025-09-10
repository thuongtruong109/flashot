"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Eye, Edit3, Maximize2, Minimize2, Code, Sparkles } from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import { themes, syntaxHighlight } from "@/utils";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  settings: CodeSettings;
  showLineNumbers: boolean;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  settings,
  showLineNumbers,
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLPreElement>(null);
  const currentTheme = themes[settings.theme as ThemeName];

  // Auto-focus when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

  // Handle click on preview to start editing
  const handlePreviewClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  // Handle blur to exit editing
  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  // Handle key shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Escape to exit editing
      if (e.key === "Escape") {
        setIsEditing(false);
        e.currentTarget.blur();
        return;
      }

      // Ctrl/Cmd + Enter to exit editing
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsEditing(false);
        e.currentTarget.blur();
        return;
      }

      // Tab handling
      if (e.key === "Tab") {
        e.preventDefault();
        const target = e.target as HTMLTextAreaElement;
        const start = target.selectionStart;
        const end = target.selectionEnd;

        if (e.shiftKey) {
          // Shift+Tab: Remove indentation
          const beforeCursor = code.substring(0, start);
          const afterCursor = code.substring(end);
          const lines = beforeCursor.split("\n");
          const currentLine = lines[lines.length - 1];

          if (currentLine.startsWith("  ")) {
            const newCode =
              beforeCursor.slice(0, -currentLine.length) +
              currentLine.slice(2) +
              afterCursor;
            onChange(newCode);
            setTimeout(() => {
              target.setSelectionRange(
                Math.max(0, start - 2),
                Math.max(0, start - 2)
              );
            }, 0);
          }
        } else {
          // Tab: Add indentation
          const newCode = code.substring(0, start) + "  " + code.substring(end);
          onChange(newCode);
          setTimeout(() => {
            target.setSelectionRange(start + 2, start + 2);
          }, 0);
        }
      }
    },
    [code, onChange]
  );

  const lineCount = code.split("\n").length;

  return (
    <div
      className={`relative group transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-8 flex items-center justify-center"
          : ""
      } ${className}`}
    >
      {/* Floating Editor Controls */}
      <div
        className={`absolute top-4 right-4 z-20 flex items-center space-x-2 ${
          isEditing ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } transition-all duration-200`}
      >
        <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg border border-white/20">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`p-1.5 rounded-md transition-all duration-200 ${
              isEditing
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "hover:bg-gray-100 text-gray-600"
            }`}
            title={isEditing ? "Preview (Esc)" : "Edit Code"}
          >
            {isEditing ? (
              <Eye className="w-3 h-3" />
            ) : (
              <Edit3 className="w-3 h-3" />
            )}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600 transition-all duration-200"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3 h-3" />
            ) : (
              <Maximize2 className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Code Container */}
      <div
        className={`relative overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl ${
          isFullscreen ? "w-full max-w-7xl bg-white rounded-2xl" : ""
        }`}
        style={{
          background: isFullscreen
            ? "white"
            : settings.showBackground
            ? settings.background
            : "transparent",
          padding: settings.showBackground ? `${settings.padding}px` : "0",
          borderRadius: `${settings.borderRadius}px`,
        }}
      >
        {/* Window Controls */}
        {settings.showWindowControls && (
          <div
            className="flex items-center justify-between px-4 py-3 border-b backdrop-blur-sm"
            style={{
              backgroundColor:
                settings.theme === "light" ? "#f8f9fa" : "#2a2d3a",
              borderBottomColor: currentTheme.foreground + "20",
              borderTopLeftRadius: `${settings.borderRadius}px`,
              borderTopRightRadius: `${settings.borderRadius}px`,
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-sm"></div>
                <div className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-sm"></div>
                <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-sm"></div>
              </div>
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">
                  {settings.language}.
                  {settings.language === "javascript"
                    ? "js"
                    : settings.language === "typescript"
                    ? "ts"
                    : "txt"}
                </span>
              </div>
            </div>

            <span className="flex items-center space-x-2 text-xs text-gray-500">
              {lineCount} lines
            </span>
          </div>
        )}

        {/* Code Content Area */}
        <div className="relative">
          {/* Preview Mode */}
          {!isEditing && (
            <div
              onClick={handlePreviewClick}
              className="relative cursor-text group py-4"
              style={{
                backgroundColor: currentTheme.background,
                borderRadius: settings.showWindowControls
                  ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                  : `${settings.borderRadius}px`,
                minHeight: "200px",
              }}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg"></div>

              <div className="flex">
                {/* Line Numbers */}
                {showLineNumbers && (
                  <div
                    className="select-none flex flex-col items-end px-3"
                    style={{
                      backgroundColor: currentTheme.background,
                      color: currentTheme.foreground + "60",
                      fontFamily: `${settings.fontFamily}, monospace`,
                      fontSize: `${settings.fontSize}px`,
                      lineHeight: 1.6,
                      borderColor: currentTheme.foreground,
                    }}
                  >
                    {code.split("\n").map((_, index) => (
                      <div
                        key={index}
                        className="leading-relaxed min-h-[1.6em] flex items-center"
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                )}

                {/* Code Display */}
                <div className="flex-1 overflow-x-auto">
                  <pre
                    ref={previewRef}
                    className="px-4"
                    style={{
                      color: currentTheme.foreground,
                      fontFamily: `${settings.fontFamily}, monospace`,
                      fontSize: `${settings.fontSize}px`,
                      lineHeight: 1.6,
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
                    />
                  </pre>
                </div>
              </div>

              {/* Click to edit hint */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-blue-500/90 text-white text-xs px-2 py-1 rounded-md flex items-center space-x-1 backdrop-blur-sm">
                  <Edit3 className="w-3 h-3" />
                  <span>Click to edit</span>
                </div>
              </div>
            </div>
          )}

          {/* Edit Mode */}
          {isEditing && (
            <div
              className="relative"
              style={{
                backgroundColor: currentTheme.background,
                borderRadius: settings.showWindowControls
                  ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                  : `${settings.borderRadius}px`,
              }}
            >
              <div className="flex">
                {/* Line Numbers for Edit Mode */}
                {showLineNumbers && (
                  <div
                    className="select-none flex flex-col items-end px-3 py-4"
                    style={{
                      color: currentTheme.foreground + "60",
                      fontFamily: `${settings.fontFamily}, monospace`,
                      fontSize: `${settings.fontSize}px`,
                      lineHeight: 1.6,
                      borderColor: currentTheme.foreground,
                    }}
                  >
                    {code.split("\n").map((_, index) => (
                      <div
                        key={index}
                        className="leading-relaxed min-h-[1.6em] flex items-center"
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                )}

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  className="flex-1 resize-none border-none outline-none p-4 bg-transparent"
                  style={{
                    color: currentTheme.foreground,
                    fontFamily: `${settings.fontFamily}, monospace`,
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: 1.6,
                    minHeight: "200px",
                  }}
                  placeholder="Start typing your code..."
                  rows={Math.max(8, lineCount + 2)}
                />
              </div>

              {/* Edit mode help text */}
              <div className="absolute bottom-2 right-2">
                <div className="bg-green-500/90 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                  Press <kbd className="bg-white/20 px-1 rounded">Esc</kbd> or
                  click outside to finish
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Backdrop */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsFullscreen(false)}
        />
      )}
    </div>
  );
};

export default CodeEditor;
