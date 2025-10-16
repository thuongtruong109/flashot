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
import Caption from "./Caption";

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
  settings: CodeSettings;
  showLineNumbers?: boolean;
  fileName?: string;
  className?: string;
  onUpdateSetting?: <K extends keyof CodeSettings>(
    key: K,
    value: CodeSettings[K]
  ) => void;
  onPositionChange?: (position: { x: number; y: number }) => void;
  onSizeChange?: (size: { width: number; height: number }) => void;
}

const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      code,
      onChange,
      settings,
      showLineNumbers,
      fileName,
      className = "",
      onUpdateSetting,
      onPositionChange,
      onSizeChange,
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
    const [previewWidth, setPreviewWidth] = useState<number | null>(null);
    const [transparentGridDataUrl, setTransparentGridDataUrl] =
      useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const previewRef = useRef<HTMLPreElement>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const currentTheme = themes[settings.theme as ThemeName];

    const prevSettingsRef = useRef({
      width: settings.width,
      height: settings.height,
    });
    const positionRef = useRef({ x: 0, y: 0 });

    // Callback ref to handle both refs
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        // Gọi onSizeChange ngay khi ref có giá trị (mount)
        if (node && onSizeChange) {
          const rect = node.getBoundingClientRect();
          onSizeChange({
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      },
      [ref, onSizeChange]
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
      // Only observe the parent container, not the textarea itself to avoid width changes
      const container = ta.parentElement?.parentElement;
      if (container) {
        const ro = new ResizeObserver(resize);
        ro.observe(container);
        return () => ro.disconnect();
      }
    }, [code, settings.fontSize, settings.fontFamily, isEditing]);

    // Reset preview width when settings change or exiting edit mode
    useEffect(() => {
      if (!isEditing || settings.width) {
        setPreviewWidth(null);
      }
    }, [isEditing, settings.width]);

    // Capture initial width when component mounts or settings change (for auto width)
    useEffect(() => {
      if (!settings.width && containerRef.current && !isEditing) {
        // Use setTimeout to ensure DOM is fully rendered
        const timer = setTimeout(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setPreviewWidth(rect.width);
          }
        }, 0);
        return () => clearTimeout(timer);
      }
    }, [
      settings.width,
      settings.height,
      settings.padding,
      settings.fontSize,
      settings.fontFamily,
      isEditing,
    ]);

    // Maintain center when settings change by resetting position to center
    useEffect(() => {
      // Always reset to center when settings change (including after resize)
      const centerPos = { x: 0, y: 0 };
      positionRef.current = centerPos;
      setPosition(centerPos);
    }, [settings.width, settings.height]);

    // Reset position to center after resize completes
    useEffect(() => {
      if (!isResizing) {
        const centerPos = { x: 0, y: 0 };
        positionRef.current = centerPos;
        setPosition(centerPos);
      }
    }, [isResizing]);

    // Use ResizeObserver for real-time size updates
    useLayoutEffect(() => {
      if (!onSizeChange || !containerRef.current || isFullscreen) return;

      // Immediately notify parent of initial size
      const rect = containerRef.current.getBoundingClientRect();
      onSizeChange({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });

      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // Use getBoundingClientRect to get the full outer frame width including padding
          const rect = entry.target.getBoundingClientRect();
          onSizeChange({
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }, [onSizeChange, isFullscreen]);

    // Handle click on preview to start editing
    const handlePreviewClick = useCallback(() => {
      // Capture current width before switching to edit mode
      if (containerRef.current && !settings.width) {
        const rect = containerRef.current.getBoundingClientRect();
        setPreviewWidth(rect.width);
      }
      setIsEditing(true);
    }, [settings.width]);

    // Handle blur to exit editing
    const handleBlur = useCallback(() => {
      setIsEditing(false);
      // Reset preview width when exiting edit mode
      setPreviewWidth(null);
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

        if (resizeDirection.includes("right")) {
          newWidth = Math.max(200, startSize.width + deltaX);
        }
        if (resizeDirection.includes("left")) {
          newWidth = Math.max(200, startSize.width - deltaX);
        }
        if (resizeDirection.includes("bottom")) {
          newHeight = Math.max(100, startSize.height + deltaY);
        }
        if (resizeDirection.includes("top")) {
          newHeight = Math.max(100, startSize.height - deltaY);
        }

        // Keep position fixed at center
        setPosition({ x: startPosition.x, y: startPosition.y });

        // Clamp width and height to min/max constraints before updating settings
        const clampedWidth = Math.min(800, Math.max(360, Math.round(newWidth)));
        const clampedHeight = Math.min(
          800,
          Math.max(100, Math.round(newHeight))
        );

        onUpdateSetting("width", clampedWidth);
        onUpdateSetting("height", clampedHeight);

        // Notify parent component about size change for rulers
        if (onSizeChange) {
          onSizeChange({
            width: clampedWidth,
            height: clampedHeight,
          });
        }
      },
      [
        isResizing,
        onUpdateSetting,
        startPos,
        startSize,
        resizeDirection,
        startPosition,
        onSizeChange,
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
        {/* Container outer frame */}
        <div
          ref={setRefs}
          className={`relative transition-all duration-300 ${
            settings.showBackground ? "" : ""
          }
        `}
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
                : settings.background.startsWith("url(")
                ? "no-repeat"
                : "no-repeat",
            backgroundSize:
              settings.showBackground && settings.background === "transparent"
                ? "auto"
                : settings.background.startsWith("url(")
                ? "cover"
                : "cover",
            backgroundPosition: settings.background.startsWith("url(")
              ? "center"
              : "center",
            padding: `${settings.padding}px`,
            borderRadius: `${
              settings.frameBorderRadius ?? settings.borderRadius
            }px`,
            width: isFullscreen
              ? "auto"
              : settings.width
              ? `${settings.width}px`
              : isEditing && previewWidth
              ? `${previewWidth}px`
              : "auto",
            height: isFullscreen
              ? "auto"
              : settings.height
              ? `${settings.height}px`
              : "auto",
            minWidth: isFullscreen ? "auto" : "360px",
            maxWidth: isFullscreen ? "none" : "800px",
            maxHeight: isFullscreen
              ? "none"
              : settings.height
              ? `${settings.height}px`
              : "800px",
            display: "flex",
            flexDirection:
              settings.captionPosition === "top"
                ? "column-reverse"
                : settings.captionPosition === "left"
                ? "row-reverse"
                : settings.captionPosition === "right"
                ? "row"
                : "column",
            transform: !isFullscreen
              ? `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`
              : undefined,
            // Center the editor when not fullscreen
            position: !isFullscreen ? "absolute" : "relative",
            left: !isFullscreen ? "50%" : "auto",
            top: !isFullscreen ? "50%" : "auto",
            transformOrigin: !isFullscreen ? "center" : "initial",
          }}
        >
          {/* Snip Area Wrapper - Window Controls + Code Content */}
          <div className="relative flex-1 flex flex-col min-h-0">
            <div
              className="relative flex flex-col flex-1 min-h-0"
              style={{
                borderRadius: `${
                  settings.codeBorderRadius ?? settings.borderRadius
                }px`,
              }}
            >
              {/* Window Controls */}
              {settings.showWindowHeader && (
                <div
                  data-export-header
                  data-window-header-align={settings.windowHeaderAlign}
                  data-show-traffic-lights-color={
                    settings.showTrafficLightsColor
                  }
                  className="flex items-center justify-between px-4 py-3 border-b space-x-2"
                  style={{
                    backgroundColor:
                      settings.theme === "light" ? "#f8f9fa" : "#2a2d3a",
                    borderBottomColor: `${currentTheme.foreground}20`,
                    borderTopLeftRadius: `${
                      settings.codeBorderRadius ?? settings.borderRadius
                    }px`,
                    borderTopRightRadius: `${
                      settings.codeBorderRadius ?? settings.borderRadius
                    }px`,
                  }}
                >
                  {settings.windowHeaderAlign === "right" ? (
                    <>
                      {/* File name */}
                      {settings.showFileName && fileName?.trim() && (
                        <span
                          data-export-filename
                          className="text-sm font-medium text-white truncate min-w-0"
                          style={{
                            opacity: settings.fileNameOpacity ?? 1,
                            fontWeight: settings.fileNameFontWeight ?? 400,
                            fontSize: settings.fileNameFontSize ?? 14,
                          }}
                        >
                          {fileName}.{getFileExtension(settings.language)}
                        </span>
                      )}

                      {/* Line count and Traffic Lights grouped */}
                      <div className="flex items-center order-last">
                        {/* Line count */}
                        {settings.showLineCount && (
                          <span
                            data-export-linecount
                            className="flex items-center space-x-2 text-xs text-white"
                            style={{
                              opacity: settings.lineCountOpacity ?? 1,
                              fontWeight: settings.lineCountFontWeight ?? 400,
                              fontSize: settings.lineCountFontSize ?? 12,
                            }}
                          >
                            {lineCount} lines
                          </span>
                        )}

                        {/* Traffic Lights Component */}
                        {settings.showTrafficLights !== false && (
                          <div
                            data-export-traffic
                            className="flex items-center space-x-1.5 ml-4"
                            style={{
                              height: "100%",
                              marginRight: 0,
                            }}
                          >
                            {settings.showTrafficLightsColor !== false ? (
                              <>
                                <div
                                  className="w-3 h-3 rounded-full shadow-sm"
                                  style={{
                                    background:
                                      "linear-gradient(to bottom right, #ef4444, #dc2626)",
                                  }}
                                />
                                <div
                                  className="w-3 h-3 rounded-full shadow-sm"
                                  style={{
                                    background:
                                      "linear-gradient(to bottom right, #facc15, #ca8a04)",
                                  }}
                                />
                                <div
                                  className="w-3 h-3 rounded-full shadow-sm"
                                  style={{
                                    background:
                                      "linear-gradient(to bottom right, #22c55e, #15803d)",
                                  }}
                                />
                              </>
                            ) : (
                              Array.from({ length: 3 }).map((_, idx) => (
                                <div
                                  key={idx}
                                  className="w-3 h-3 rounded-full shadow-sm bg-gradient-to-br from-gray-400 to-gray-600"
                                />
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Traffic Lights and File name grouped */}
                      <div className="flex items-center">
                        {/* Traffic Lights Component */}
                        {settings.showTrafficLights !== false && (
                          <div
                            data-export-traffic
                            className="flex items-center space-x-1.5"
                            style={{
                              height: "100%",
                              marginRight: 12,
                            }}
                          >
                            {settings.showTrafficLightsColor !== false ? (
                              <>
                                <div
                                  className="w-3 h-3 rounded-full shadow-sm"
                                  style={{
                                    background:
                                      "linear-gradient(to bottom right, #ef4444, #dc2626)",
                                  }}
                                />
                                <div
                                  className="w-3 h-3 rounded-full shadow-sm"
                                  style={{
                                    background:
                                      "linear-gradient(to bottom right, #facc15, #ca8a04)",
                                  }}
                                />
                                <div
                                  className="w-3 h-3 rounded-full shadow-sm"
                                  style={{
                                    background:
                                      "linear-gradient(to bottom right, #22c55e, #15803d)",
                                  }}
                                />
                              </>
                            ) : (
                              Array.from({ length: 3 }).map((_, idx) => (
                                <div
                                  key={idx}
                                  className="w-3 h-3 rounded-full shadow-sm bg-gradient-to-br from-gray-400 to-gray-600"
                                />
                              ))
                            )}
                          </div>
                        )}

                        {/* File name */}
                        {settings.showFileName && fileName?.trim() && (
                          <span
                            data-export-filename
                            className="text-sm font-medium text-white truncate min-w-0"
                            style={{
                              opacity: settings.fileNameOpacity ?? 1,
                              fontWeight: settings.fileNameFontWeight ?? 400,
                              fontSize: settings.fileNameFontSize ?? 14,
                            }}
                          >
                            {fileName}.{getFileExtension(settings.language)}
                          </span>
                        )}
                      </div>

                      {/* Line count */}
                      {settings.showLineCount && (
                        <span
                          data-export-linecount
                          className="flex items-center space-x-2 text-[13px] text-white"
                          style={{
                            opacity: settings.lineCountOpacity ?? 1,
                            fontWeight: settings.lineCountFontWeight ?? 400,
                            fontSize: settings.lineCountFontSize ?? 13,
                          }}
                        >
                          {lineCount} lines
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Code Content Area */}
              <div
                className="relative flex-1 flex flex-col"
                style={{
                  backgroundColor: currentTheme.background,
                  borderRadius: settings.showWindowHeader
                    ? `0 0 ${
                        settings.codeBorderRadius ?? settings.borderRadius
                      }px ${
                        settings.codeBorderRadius ?? settings.borderRadius
                      }px`
                    : `${settings.codeBorderRadius ?? settings.borderRadius}px`,
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
                        borderRadius: settings.showWindowHeader
                          ? `0 0 ${
                              settings.codeBorderRadius ?? settings.borderRadius
                            }px ${
                              settings.codeBorderRadius ?? settings.borderRadius
                            }px`
                          : `${
                              settings.codeBorderRadius ?? settings.borderRadius
                            }px`,
                      }}
                    ></div>

                    {/* Scroll container */}
                    <div
                      onClick={handlePreviewClick}
                      className="cursor-text flex-1 flex code-editor-scrollbar"
                      style={{
                        backgroundColor: currentTheme.background,
                        borderRadius: settings.showWindowHeader
                          ? `0 0 ${
                              settings.codeBorderRadius ?? settings.borderRadius
                            }px ${
                              settings.codeBorderRadius ?? settings.borderRadius
                            }px`
                          : `${
                              settings.codeBorderRadius ?? settings.borderRadius
                            }px`,
                        overflow: "auto",
                        maxWidth: "100%",
                        height: "100%",
                        minHeight: 0,
                      }}
                    >
                      {/* Line Numbers */}
                      {(showLineNumbers ??
                        settings.showLineNumbers ??
                        true) && (
                        <div
                          className={`select-none flex flex-col py-[15px] pl-3 pr-2 flex-shrink-0 ${
                            settings.lineNumberTextAlign === "left"
                              ? "items-start"
                              : settings.lineNumberTextAlign === "center"
                              ? "items-center"
                              : "items-end"
                          }`}
                          style={{
                            backgroundColor: currentTheme.background,
                            color: currentTheme.foreground + "60",
                            fontFamily: `${settings.fontFamily}, monospace`,
                            fontSize: `${settings.fontSize}px`,
                            lineHeight: 1.6,
                            opacity: settings.lineNumberOpacity,
                            borderRight:
                              settings.lineNumberBorder === true
                                ? `1px solid ${currentTheme.foreground}20`
                                : "1px solid transparent",
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

                      {/* Preview Mode Code Display */}
                      <div className="flex-1 relative">
                        {/* Highlight backgrounds */}
                        {settings.highlights &&
                          settings.highlights.length > 0 && (
                            <div className="absolute inset-0 pointer-events-none">
                              <div
                                className="py-4 pl-4 pr-2"
                                style={{
                                  fontFamily: `"${settings.fontFamily}", "Fira Code", "Monaco", "Consolas", "Source Code Pro", monospace`,
                                  fontSize: `${settings.fontSize}px`,
                                  lineHeight: 1.6,
                                }}
                              >
                                {code.split("\n").map((line, lineIndex) => {
                                  const highlight = settings.highlights?.find(
                                    (h) =>
                                      lineIndex + 1 >= h.startLine &&
                                      lineIndex + 1 <= h.endLine
                                  );
                                  return (
                                    <div
                                      key={lineIndex}
                                      className="leading-relaxed min-h-[1.6em]"
                                      style={{
                                        backgroundColor:
                                          highlight?.color || "transparent",
                                        marginLeft: "-1rem",
                                        marginRight: "-0.5rem",
                                        paddingLeft: "1rem",
                                        paddingRight: "0.5rem",
                                      }}
                                    >
                                      &nbsp;
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        <pre
                          ref={previewRef}
                          className="py-4 pl-4 pr-2 relative z-10"
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
                            tabSize: settings.tabSize || 2,
                            MozTabSize: settings.tabSize || 2,
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
                      borderRadius: settings.showWindowHeader
                        ? `0 0 ${
                            settings.codeBorderRadius ?? settings.borderRadius
                          }px ${
                            settings.codeBorderRadius ?? settings.borderRadius
                          }px`
                        : `${
                            settings.codeBorderRadius ?? settings.borderRadius
                          }px`,
                      overflowY: "auto",
                      overflowX: "auto", // Show X scrollbar on outer
                      height: "100%",
                      minHeight: 0,
                      display: "flex",
                    }}
                  >
                    {/* Line Numbers for Edit Mode */}
                    {(showLineNumbers ?? settings.showLineNumbers ?? true) && (
                      <div
                        className={`select-none flex flex-col py-[15px] pl-3 pr-2 flex-shrink-0 ${
                          settings.lineNumberTextAlign === "left"
                            ? "items-start"
                            : settings.lineNumberTextAlign === "center"
                            ? "items-center"
                            : "items-end"
                        }`}
                        style={{
                          color: currentTheme.foreground + "60",
                          fontFamily: `"${settings.fontFamily}", "Fira Code", "Monaco", "Consolas", "Source Code Pro", monospace`,
                          fontSize: `${settings.fontSize}px`,
                          lineHeight: 1.6,
                          opacity: settings.lineNumberOpacity ?? 1,
                          borderRight: settings.lineNumberBorder
                            ? `1px solid ${currentTheme.foreground}20`
                            : "none",
                          minWidth: "40px",
                          minHeight: "fit-content",
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
                    <div
                      className="flex-1 relative"
                      style={{ minWidth: "100%", width: "100%" }}
                    >
                      {/* Highlight backgrounds for edit mode */}
                      {settings.highlights &&
                        settings.highlights.length > 0 && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div
                              className="pt-4 pb-0 pl-4 pr-2"
                              style={{
                                fontFamily: `"${settings.fontFamily}", "Fira Code", "Monaco", "Consolas", "Source Code Pro", monospace`,
                                fontSize: `${settings.fontSize}px`,
                                lineHeight: 1.6,
                              }}
                            >
                              {code.split("\n").map((line, lineIndex) => {
                                const highlight = settings.highlights?.find(
                                  (h) =>
                                    lineIndex + 1 >= h.startLine &&
                                    lineIndex + 1 <= h.endLine
                                );
                                return (
                                  <div
                                    key={lineIndex}
                                    className="leading-relaxed min-h-[1.6em]"
                                    style={{
                                      backgroundColor:
                                        highlight?.color || "transparent",
                                      marginLeft: "-1rem",
                                      marginRight: "-0.5rem",
                                      paddingLeft: "1rem",
                                      paddingRight: "0.5rem",
                                    }}
                                  >
                                    &nbsp;
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      <textarea
                        ref={textareaRef}
                        value={code}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        className="pt-4 pb-0 !mb-0 pl-4 pr-2 w-full resize-none border-none outline-none hover:bg-white/5 transition-colors duration-200 relative z-10"
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
                          width: "100%", // Ensure full width
                          minWidth: settings.wordWrap ? "100%" : "max-content", // Allow horizontal overflow
                          tabSize: settings.tabSize || 2,
                          MozTabSize: settings.tabSize || 2,
                        }}
                        placeholder="Start typing your code..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Watermark Overlay */}
              {settings.watermark?.enabled && !isFullscreen && (
                <>
                  {settings.watermark.type === "image" &&
                  settings.watermark.imageUrl ? (
                    <img
                      src={settings.watermark.imageUrl}
                      alt="Watermark"
                      className="absolute pointer-events-none select-none z-50"
                      style={{
                        left: `${settings.watermark.x}%`,
                        top: `${settings.watermark.y}%`,
                        transform: `translate(-50%, -50%) rotate(${settings.watermark.rotation}deg)`,
                        opacity: settings.watermark.opacity,
                        width: `${settings.watermark.imageWidth}px`,
                        height: `${settings.watermark.imageHeight}px`,
                        objectFit: "contain",
                        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))",
                      }}
                    />
                  ) : (
                    settings.watermark.text && (
                      <div
                        className="absolute pointer-events-none select-none z-50"
                        style={{
                          left: `${settings.watermark.x}%`,
                          top: `${settings.watermark.y}%`,
                          transform: `translate(-50%, -50%) rotate(${settings.watermark.rotation}deg)`,
                          opacity: settings.watermark.opacity,
                          color: settings.watermark.color,
                          fontSize: `${settings.watermark.fontSize}px`,
                          fontWeight: settings.watermark.fontWeight || 700,
                          whiteSpace: "nowrap",
                          textShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          fontFamily: `"${settings.fontFamily}", system-ui, -apple-system, sans-serif`,
                        }}
                      >
                        {settings.watermark.text}
                      </div>
                    )
                  )}
                </>
              )}
            </div>
          </div>

          {settings.showCaption && settings.captionText && !isFullscreen && (
            <Caption settings={settings} currentTheme={currentTheme} />
          )}

          {!isFullscreen && onUpdateSetting && (
            <>
              {/* Edge handles - positioned on outer frame */}
              <div
                data-export-ignore
                className="absolute top-[-4px] left-1/2 transform -translate-x-1/2 size-2 bg-white dark:bg-gray-800 rounded-full cursor-n-resize hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors border border-gray-300 dark:border-gray-600 shadow-sm"
                onMouseDown={(e) => handleResizeStart(e, "top")}
              />
              <div
                data-export-ignore
                className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 size-2 bg-white dark:bg-gray-800 rounded-full cursor-s-resize hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors border border-gray-300 dark:border-gray-600 shadow-sm"
                onMouseDown={(e) => handleResizeStart(e, "bottom")}
              />
              <div
                data-export-ignore
                className="absolute top-1/2 left-[-4px] transform -translate-y-1/2 size-2 bg-white dark:bg-gray-800 rounded-full cursor-w-resize hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors border border-gray-300 dark:border-gray-600 shadow-sm"
                onMouseDown={(e) => handleResizeStart(e, "left")}
              />
              <div
                data-export-ignore
                className="absolute top-1/2 right-[-4px] transform -translate-y-1/2 size-2 bg-white dark:bg-gray-800 rounded-full cursor-e-resize hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors border border-gray-300 dark:border-gray-600 shadow-sm"
                onMouseDown={(e) => handleResizeStart(e, "right")}
              />

              {/* Corner handles - positioned at frame corners */}
              <div
                data-export-ignore
                className="absolute top-[-4px] left-[-4px] size-2 bg-white dark:bg-gray-800 rounded-full cursor-nw-resize hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors border border-gray-300 dark:border-gray-600 shadow-sm"
                onMouseDown={(e) => handleResizeStart(e, "top-left")}
              />
              <div
                data-export-ignore
                className="absolute top-[-4px] right-[-4px] size-2 bg-white dark:bg-gray-800 rounded-full cursor-ne-resize hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors border border-gray-300 dark:border-gray-600 shadow-sm"
                onMouseDown={(e) => handleResizeStart(e, "top-right")}
              />
              <div
                data-export-ignore
                className="absolute bottom-[-4px] left-[-4px] size-2 bg-white dark:bg-gray-800 rounded-full cursor-sw-resize hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors border border-gray-300 dark:border-gray-600 shadow-sm"
                onMouseDown={(e) => handleResizeStart(e, "bottom-left")}
              />
              <div
                data-export-ignore
                className="absolute bottom-[-4px] right-[-4px] size-2 bg-white dark:bg-gray-800 rounded-full cursor-se-resize hover:bg-blue-200 dark:hover:bg-blue-600 transition-colors border border-gray-300 dark:border-gray-600 shadow-sm"
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

Editor.displayName = "Editor";

export default Editor;
