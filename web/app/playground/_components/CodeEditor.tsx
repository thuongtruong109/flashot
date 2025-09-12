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
  GripVertical,
} from "lucide-react";
import { CodeSettings, SupportedLanguage, ThemeName } from "@/types";
import { themes, syntaxHighlight, getFileExtension } from "@/utils";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  settings: CodeSettings;
  showLineNumbers: boolean;
  fileName?: string;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  settings,
  showLineNumbers,
  fileName,
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLPreElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
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

  // Drag handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isFullscreen) return; // Disable drag in fullscreen

      const rect = dragRef.current?.getBoundingClientRect();
      const container = dragRef.current?.parentElement;
      if (!rect || !container) return;

      // Cache container rect for performance
      setContainerRect(container.getBoundingClientRect());
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      e.preventDefault();
      e.stopPropagation(); // Prevent event bubbling
    },
    [isFullscreen]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRect || !dragRef.current) return;

      // Use requestAnimationFrame for smoother movement
      requestAnimationFrame(() => {
        if (!containerRect) return;

        const editorRect = dragRef.current?.getBoundingClientRect();
        if (!editorRect) return;

        const newX = e.clientX - containerRect.left - dragOffset.x;
        const newY = e.clientY - containerRect.top - dragOffset.y;

        // Allow more freedom with looser constraints - only prevent going completely off-screen
        const minX = -editorRect.width + 100; // Allow 100px to remain visible
        const maxX = containerRect.width - 100; // Allow 100px to remain visible
        const minY = -editorRect.height + 100;
        const maxY = containerRect.height - 100;

        setPosition({
          x: Math.max(minX, Math.min(newX, maxX)),
          y: Math.max(minY, Math.min(newY, maxY)),
        });
      });
    },
    [isDragging, dragOffset, containerRect]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setContainerRect(null); // Clear cached rect
  }, []);

  // Reset position to center on double-click
  const handleDoubleClick = useCallback(() => {
    if (!isFullscreen) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isFullscreen]);

  // Add global mouse events for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

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
          : "absolute"
      } ${className} ${isDragging ? "cursor-grabbing" : "cursor-auto"}`}
      ref={!isFullscreen ? dragRef : undefined}
      style={
        !isFullscreen
          ? {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isDragging ? 1000 : 1,
            }
          : undefined
      }
    >
      <div
        className={`relative transition-all duration-300 ${
          settings.showBackground ? "border border-gray-200/50" : "border-0"
        } ${!isFullscreen ? "cursor-grab active:cursor-grabbing" : ""}`}
        onMouseDown={!isFullscreen ? handleMouseDown : undefined}
        style={{
          background: isFullscreen
            ? "white"
            : settings.showBackground
            ? settings.background
            : "transparent",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow:
            settings.showBackground && settings.shadow
              ? `0 ${Math.round(settings.shadow * 0.25)}px ${Math.round(
                  settings.shadow * 0.5
                )}px 0 rgba(0, 0, 0, 0.1), 0 ${Math.round(
                  settings.shadow * 0.5
                )}px ${settings.shadow}px 0 rgba(0, 0, 0, 0.15)`
              : "none",
        }}
      >
        {/* Window Controls */}
        {settings.showWindowControls && (
          <div
            className={`flex items-center justify-between px-4 py-3 border-b backdrop-blur-sm ${
              !isFullscreen ? "cursor-grab active:cursor-grabbing" : ""
            }`}
            onMouseDown={!isFullscreen ? handleMouseDown : undefined}
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
          }}
        >
          {/* Preview Mode */}
          {!isEditing && (
            <div
              onClick={handlePreviewClick}
              onMouseDown={(e) => e.stopPropagation()} // Prevent drag in content area
              className="relative cursor-text group py-4 bg-red-200 h-full"
              style={{
                backgroundColor: currentTheme.background,
                borderRadius: settings.showWindowControls
                  ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                  : `${settings.borderRadius}px`,
                minHeight: "10px",
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
                <div className="flex-1 overflow-x-auto custom-scrollbar">
                  <pre
                    ref={previewRef}
                    className="px-4"
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
            </div>
          )}

          {/* Edit Mode */}
          {isEditing && (
            <div
              onMouseDown={(e) => e.stopPropagation()} // Prevent drag in content area
              className="relative h-full"
              style={{
                backgroundColor: currentTheme.background,
                borderRadius: settings.showWindowControls
                  ? `0 0 ${settings.borderRadius}px ${settings.borderRadius}px`
                  : `${settings.borderRadius}px`,
              }}
            >
              <div className="flex !pb-0">
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
        {isEditing ? (
          <div className="absolute bottom-1 right-1">
            <div className="text-slate-300 text-xs px-2">
              Press{" "}
              <kbd className="bg-white/30 px-1 rounded text-slate-300">Esc</kbd>{" "}
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
};

export default CodeEditor;
