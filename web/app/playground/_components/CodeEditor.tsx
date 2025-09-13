"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Eye,
  Edit3,
  Maximize2,
  Minimize2,
  Code,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import {
  themes,
  syntaxHighlight,
  getFileExtension,
  transparentGridPatterns,
} from "@/utils";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  settings: CodeSettings;
  showLineNumbers: boolean;
  fileName?: string;
  className?: string;
  onUpdateSetting?: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
}

const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  (
    {
      code,
      onChange,
      settings,
      showLineNumbers,
      fileName,
      className = "",
      onUpdateSetting,
    },
    ref
  ) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<string>("");
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [startSize, setStartSize] = useState({ width: 0, height: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
    const [transparentGridDataUrl, setTransparentGridDataUrl] =
      useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLPreElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const currentTheme = themes[settings.theme as ThemeName];

    // Callback ref to handle both refs
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // Auto-focus when entering edit mode
    useEffect(() => {
      if (isEditing && textareaRef.current) {
        textareaRef.current.focus();
        const length = textareaRef.current.value.length;
        textareaRef.current.setSelectionRange(length, length);
      }
    }, [isEditing]);

    // Generate transparent grid pattern on client side
    useEffect(() => {
      if (typeof window !== "undefined") {
        const gridDataUrl = transparentGridPatterns.editor();
        setTransparentGridDataUrl(gridDataUrl);
      }
    }, []);

    // Handle click on preview to start editing
    const handlePreviewClick = useCallback(() => {
      setIsEditing(true);
    }, []);

    // Handle blur to exit editing
    const handleBlur = useCallback(() => {
      setIsEditing(false);
    }, []);

    // Resize handlers
    const handleResizeStart = useCallback(
      (e: React.MouseEvent, direction: string) => {
        if (isFullscreen || !onUpdateSetting || !containerRef.current) return;

        e.preventDefault();
        e.stopPropagation();

        const rect = containerRef.current.getBoundingClientRect();
        setIsResizing(true);
        setResizeDirection(direction);
        setStartPos({ x: e.clientX, y: e.clientY });
        setStartSize({
          width: settings.width || rect.width,
          height: settings.height || rect.height,
        });
        setStartPosition({ x: position.x, y: position.y });
      },
      [isFullscreen, onUpdateSetting, settings.width, settings.height, position]
    );

    const handleResizeMove = useCallback(
      (e: MouseEvent) => {
        if (!isResizing || !onUpdateSetting) return;

        const deltaX = e.clientX - startPos.x;
        const deltaY = e.clientY - startPos.y;

        let newWidth = startSize.width;
        let newHeight = startSize.height;
        let newX = startPosition.x;
        let newY = startPosition.y;

        if (resizeDirection.includes("right")) {
          newWidth = Math.max(200, startSize.width + deltaX);
        }
        if (resizeDirection.includes("left")) {
          newWidth = Math.max(200, startSize.width - deltaX);
          newX = startPosition.x + (startSize.width - newWidth);
        }
        if (resizeDirection.includes("bottom")) {
          newHeight = Math.max(100, startSize.height + deltaY);
        }
        if (resizeDirection.includes("top")) {
          newHeight = Math.max(100, startSize.height - deltaY);
          newY = startPosition.y + (startSize.height - newHeight);
        }

        setPosition({ x: newX, y: newY });
        onUpdateSetting("width", Math.round(newWidth));
        onUpdateSetting("height", Math.round(newHeight));
      },
      [
        isResizing,
        onUpdateSetting,
        startPos,
        startSize,
        resizeDirection,
        startPosition,
      ]
    );

    const handleResizeEnd = useCallback(() => {
      setIsResizing(false);
      setResizeDirection("");
    }, []);

    // Add global mouse events for resizing
    useEffect(() => {
      if (isResizing) {
        document.addEventListener("mousemove", handleResizeMove);
        document.addEventListener("mouseup", handleResizeEnd);
        return () => {
          document.removeEventListener("mousemove", handleResizeMove);
          document.removeEventListener("mouseup", handleResizeEnd);
        };
      }
    }, [isResizing, handleResizeMove, handleResizeEnd]);

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
            const newCode =
              code.substring(0, start) + "  " + code.substring(end);
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
        <div
          ref={setRefs}
          className={`relative transition-all duration-300 ${
            settings.showBackground ? "" : ""
          } ${isResizing ? "select-none" : ""}`}
          style={{
            background: isFullscreen
              ? "white"
              : settings.showBackground
              ? settings.background === "transparent"
                ? transparentGridDataUrl
                  ? `url("${transparentGridDataUrl}")`
                  : "repeating-conic-gradient(#e2e8f0 0deg 90deg, #f8fafc 90deg 180deg) 0 0/20px 20px"
                : settings.background
              : "transparent",
            backgroundRepeat:
              settings.showBackground && settings.background === "transparent"
                ? "repeat"
                : "no-repeat",
            backgroundSize:
              settings.showBackground && settings.background === "transparent"
                ? "auto"
                : "cover",
            backgroundPosition: "center",
            padding: `${settings.padding}px`,
            borderRadius: `${settings.borderRadius}px`,
            width: isFullscreen
              ? "auto"
              : settings.width
              ? `${settings.width}px`
              : "auto",
            height: isFullscreen
              ? "auto"
              : settings.height
              ? `${settings.height}px`
              : "auto",
            minHeight: !isFullscreen && !settings.height ? "10px" : undefined,
            maxHeight: isFullscreen
              ? "none"
              : settings.height
              ? undefined
              : "800px",
            display: "flex",
            flexDirection: "column",
            transform: !isFullscreen
              ? `translate(${position.x}px, ${position.y}px)`
              : undefined,
          }}
        >
          {/* Snip Area Wrapper - Window Controls + Code Content */}
          <div className="relative">
            <div
              className="relative flex flex-col"
              style={{
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
                      {settings.showFileName && fileName && fileName.trim() && (
                        <span className="text-sm font-medium text-gray-600">
                          {fileName}.{getFileExtension(settings.language)}
                        </span>
                      )}
                    </div>
                  </div>

                  {settings.showLineCount && (
                    <span className="flex items-center space-x-2 text-xs text-gray-500">
                      {lineCount} lines
                    </span>
                  )}
                </div>
              )}

              {/* Code Content Area */}
              <div
                className="relative flex-1 overflow-auto"
                style={{
                  backgroundColor: currentTheme.background,
                  borderRadius: settings.showWindowControls
                    ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                    : `${settings.borderRadius}px`,
                  maxHeight: settings.height
                    ? `${
                        settings.height -
                        settings.padding * 2 -
                        (settings.showWindowControls ? 50 : 0)
                      }px`
                    : undefined,
                  minHeight: settings.height
                    ? `${Math.max(
                        100,
                        settings.height -
                          settings.padding * 2 -
                          (settings.showWindowControls ? 50 : 0)
                      )}px`
                    : "100px",
                }}
              >
                {/* Preview Mode */}
                {!isEditing && (
                  <div
                    onClick={handlePreviewClick}
                    className="relative cursor-text group h-full flex overflow-auto custom-scrollbar"
                    style={{
                      backgroundColor: currentTheme.background,
                      borderRadius: settings.showWindowControls
                        ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                        : `${settings.borderRadius}px`,
                      minHeight: "10px",
                    }}
                  >
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg pointer-events-none"></div>

                    {/* Line Numbers */}
                    {showLineNumbers && (
                      <div
                        className="select-none flex flex-col items-end px-3 py-4 flex-shrink-0"
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
                    <div className="flex-1 overflow-auto custom-scrollbar">
                      <pre
                        ref={previewRef}
                        className="px-4 py-4"
                        style={{
                          color: currentTheme.foreground,
                          fontFamily: `"${settings.fontFamily}", "Fira Code", "Monaco", "Consolas", "Source Code Pro", monospace`,
                          fontSize: `${settings.fontSize}px`,
                          lineHeight: 1.6,
                          margin: 0,
                          background: "transparent",
                          whiteSpace: settings.wordWrap ? "pre-wrap" : "pre",
                          wordWrap: settings.wordWrap ? "break-word" : "normal",
                        }}
                      >
                        <code
                          dangerouslySetInnerHTML={{
                            __html: syntaxHighlight(
                              code,
                              settings.language as SupportedLanguage,
                              currentTheme
                            ),
                          }}
                        />
                      </pre>
                    </div>
                  </div>
                )}

                {/* Edit Mode */}
                {isEditing && (
                  <div
                    className="relative h-full overflow-auto"
                    style={{
                      backgroundColor: currentTheme.background,
                      borderRadius: settings.showWindowControls
                        ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                        : `${settings.borderRadius}px`,
                    }}
                  >
                    <div className="flex !pb-0 h-full">
                      {/* Line Numbers for Edit Mode */}
                      {showLineNumbers && (
                        <div
                          className="select-none flex flex-col items-end px-3 py-4"
                          style={{
                            color: currentTheme.foreground + "60",
                            fontFamily: `"${settings.fontFamily}", "Fira Code", "Monaco", "Consolas", "Source Code Pro", monospace`,
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
                        className="flex-1 resize-none border-none outline-none p-4 bg-transparent custom-scrollbar"
                        style={{
                          color: currentTheme.foreground,
                          fontFamily: `"${settings.fontFamily}", "Fira Code", "Monaco", "Consolas", "Source Code Pro", monospace`,
                          fontSize: `${settings.fontSize}px`,
                          lineHeight: 1.6,
                          minHeight: "10px",
                          whiteSpace: settings.wordWrap ? "pre-wrap" : "pre",
                          wordWrap: settings.wordWrap ? "break-word" : "normal",
                        }}
                        placeholder="Start typing your code..."
                        rows={Math.max(1, lineCount)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>{" "}
          {/* End of shadow wrapper */}
          {/* End of Snip Area Wrapper */}
          {/* Resize Handles */}
          {!isFullscreen && onUpdateSetting && (
            <>
              {/* Edge handles - positioned on outer frame */}
              <div
                className="absolute top-0 left-0 right-0 h-1 cursor-n-resize hover:bg-blue-500/20 transition-colors"
                onMouseDown={(e) => handleResizeStart(e, "top")}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize hover:bg-blue-500/20 transition-colors"
                onMouseDown={(e) => handleResizeStart(e, "bottom")}
              />
              <div
                className="absolute top-0 bottom-0 left-0 w-1 cursor-w-resize hover:bg-blue-500/20 transition-colors"
                onMouseDown={(e) => handleResizeStart(e, "left")}
              />
              <div
                className="absolute top-0 bottom-0 right-0 w-1 cursor-e-resize hover:bg-blue-500/20 transition-colors"
                onMouseDown={(e) => handleResizeStart(e, "right")}
              />

              {/* Corner handles - positioned at frame corners */}
              <div
                className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize hover:bg-blue-500/30 transition-colors"
                onMouseDown={(e) => handleResizeStart(e, "top-left")}
              />
              <div
                className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize hover:bg-blue-500/30 transition-colors"
                onMouseDown={(e) => handleResizeStart(e, "top-right")}
              />
              <div
                className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize hover:bg-blue-500/30 transition-colors"
                onMouseDown={(e) => handleResizeStart(e, "bottom-left")}
              />
              <div
                className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize hover:bg-blue-500/30 transition-colors"
                onMouseDown={(e) => handleResizeStart(e, "bottom-right")}
              />
            </>
          )}
          {isEditing ? (
            <div className="absolute bottom-1 right-1">
              <div className="text-slate-300 text-xs px-2">
                Press{" "}
                <kbd className="bg-white/30 px-1 rounded text-slate-300">
                  Esc
                </kbd>{" "}
                or click outside to finish
              </div>
            </div>
          ) : (
            <div className="absolute bottom-1 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="text-slate-300 text-xs flex items-center space-x-1">
                <Edit3 className="w-3 h-3" />
                <span>Click to edit</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;
