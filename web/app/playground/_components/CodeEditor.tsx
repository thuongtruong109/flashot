"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
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

    // Auto-resize textarea so it fills the outer container and relies on outer scrollbar
    useLayoutEffect(() => {
      const ta = textareaRef.current;
      if (!ta) return;

      const resize = () => {
        // Reset height to get correct scrollHeight
        ta.style.height = "0px";
        const sh = ta.scrollHeight;
        ta.style.height = `${sh}px`;
      };

      // Resize on content change
      resize();

      // Observe font-size or width changes that may affect scrollHeight
      const ro = new ResizeObserver(resize);
      ro.observe(ta);

      return () => ro.disconnect();
    }, [code, settings.fontSize, settings.fontFamily, isEditing]);

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
        {/* Caption - positioned outside the resizable container */}
        {settings.showCaption && settings.captionText && !isFullscreen && (
          <div
            className={`absolute z-10 transition-all duration-300 pointer-events-none ${
              settings.captionPosition === "top"
                ? "-top-10 left-0 right-0 text-center"
                : settings.captionPosition === "bottom"
                ? "-bottom-10 left-0 right-0 text-center"
                : settings.captionPosition === "left"
                ? "top-0 bottom-0 -left-24 w-20 flex items-center justify-center"
                : settings.captionPosition === "right"
                ? "top-0 bottom-0 -right-24 w-20 flex items-center justify-center"
                : "-bottom-10 left-0 right-0 text-center" // default to bottom
            }`}
            style={{
              opacity: settings.captionOpacity || 1,
              color: currentTheme.foreground,
              fontStyle:
                settings.captionStyle === "italic" ? "italic" : "normal",
              fontSize: `${Math.max(11, settings.fontSize - 3)}px`,
              fontFamily: settings.fontFamily,
              writingMode:
                settings.captionPosition === "left" ||
                settings.captionPosition === "right"
                  ? "vertical-rl"
                  : "horizontal-tb",
              textOrientation:
                settings.captionPosition === "left" ||
                settings.captionPosition === "right"
                  ? "mixed"
                  : "initial",
              textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
              letterSpacing: "0.025em",
            }}
          >
            {settings.captionText}
          </div>
        )}

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
            maxHeight: isFullscreen
              ? "none"
              : settings.height
              ? `${settings.height}px`
              : "800px",
            display: "flex",
            flexDirection: "column",
            transform: !isFullscreen
              ? `translate(${position.x}px, ${position.y}px)`
              : undefined,
          }}
        >
          {/* Snip Area Wrapper - Window Controls + Code Content */}
          <div className="relative flex-1 flex flex-col min-h-0">
            <div
              className="relative flex flex-col flex-1 min-h-0"
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
                className="relative flex-1 flex flex-col"
                style={{
                  backgroundColor: currentTheme.background,
                  borderRadius: settings.showWindowControls
                    ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                    : `${settings.borderRadius}px`,
                  minHeight: 0, // Allow flex item to shrink below content size
                }}
              >
                {/* Preview Mode */}
                {!isEditing && (
                  <div className="relative flex-1 group min-h-0">
                    {/* Hover overlay - positioned outside scroll container */}
                    <div
                      className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10"
                      style={{
                        borderRadius: settings.showWindowControls
                          ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                          : `${settings.borderRadius}px`,
                      }}
                    ></div>

                    {/* Scroll container */}
                    <div
                      onClick={handlePreviewClick}
                      className="cursor-text flex-1 flex code-editor-scrollbar"
                      style={{
                        backgroundColor: currentTheme.background,
                        borderRadius: settings.showWindowControls
                          ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                          : `${settings.borderRadius}px`,
                        overflow: "auto",
                        maxWidth: "100%",
                        height: "100%",
                        minHeight: 0,
                      }}
                    >
                      {/* Line Numbers */}
                      {showLineNumbers && (
                        <div
                          className="select-none flex flex-col items-end py-4 pl-3 pr-2 flex-shrink-0"
                          style={{
                            backgroundColor: currentTheme.background,
                            color: currentTheme.foreground + "60",
                            fontFamily: `${settings.fontFamily}, monospace`,
                            fontSize: `${settings.fontSize}px`,
                            lineHeight: 1.6,
                            borderRight: `1px solid ${currentTheme.foreground}20`,
                            minWidth: "40px",
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
                      <div className="flex-1">
                        <pre
                          ref={previewRef}
                          className="py-4 pl-4 pr-2"
                          style={{
                            color: currentTheme.foreground,
                            fontFamily: `"${settings.fontFamily}", "Fira Code", "Monaco", "Consolas", "Source Code Pro", monospace`,
                            fontSize: `${settings.fontSize}px`,
                            lineHeight: 1.6,
                            margin: 0,
                            background: "transparent",
                            whiteSpace: settings.wordWrap ? "pre-wrap" : "pre",
                            wordWrap: settings.wordWrap
                              ? "break-word"
                              : "normal",
                            width: settings.wordWrap ? "100%" : "max-content",
                            minWidth: "100%",
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
                  </div>
                )}

                {/* Edit Mode */}
                {isEditing && (
                  <div
                    className="relative flex-1 flex code-editor-scrollbar"
                    style={{
                      backgroundColor: currentTheme.background,
                      borderRadius: settings.showWindowControls
                        ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                        : `${settings.borderRadius}px`,
                      overflowY: "auto",
                      overflowX: "auto", // Show X scrollbar on outer
                      height: "100%",
                      minHeight: 0,
                      display: "flex",
                    }}
                  >
                    {/* Line Numbers for Edit Mode */}
                    {showLineNumbers && (
                      <div
                        className="select-none flex flex-col items-end py-4 pl-3 pr-2 flex-shrink-0"
                        style={{
                          color: currentTheme.foreground + "60",
                          fontFamily: `"${settings.fontFamily}", "Fira Code", "Monaco", "Consolas", "Source Code Pro", monospace`,
                          fontSize: `${settings.fontSize}px`,
                          lineHeight: 1.6,
                          borderRight: `1px solid ${currentTheme.foreground}20`,
                          minWidth: "40px",
                          minHeight: "fit-content", // Let it size naturally
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

                    {/* Textarea - Exact same structure as preview */}
                    <div className="flex-1" style={{ minWidth: "100%" }}>
                      <textarea
                        ref={textareaRef}
                        value={code}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        className="py-4 pl-4 pr-2 w-full resize-none border-none outline-none bg-transparent hover:bg-white/5 transition-colors duration-200"
                        style={{
                          color: currentTheme.foreground,
                          fontFamily: `"${settings.fontFamily}", "Fira Code", "Monaco", "Consolas", "Source Code Pro", monospace`,
                          fontSize: `${settings.fontSize}px`,
                          lineHeight: 1.6,
                          margin: 0,
                          background: "transparent",
                          whiteSpace: settings.wordWrap ? "pre-wrap" : "pre",
                          wordWrap: settings.wordWrap ? "break-word" : "normal",
                          height: "100%",
                          minHeight: 0,
                          boxSizing: "border-box",
                          overflowY: "hidden",
                          overflowX: "hidden", // Hide X scrollbar on textarea
                          minWidth: settings.wordWrap ? "100%" : "max-content", // Allow horizontal overflow
                        }}
                        placeholder="Start typing your code..."
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
