import React, { useState, useEffect, useRef } from "react";

interface HeightRulerProps {
  width: number;
  height: number;
  editorPosition: { x: number; y: number };
  showJSONPanel?: boolean;
  isHovered?: boolean;
}

export default function HeightRuler({
  width,
  height,
  editorPosition,
  showJSONPanel = false,
  isHovered = false,
}: HeightRulerProps) {
  const rulerRef = useRef<HTMLDivElement>(null);

  // Calculate position similar to WidthRuler logic
  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1200;

  // Account for JSON panel width on desktop
  const jsonPanelWidth = showJSONPanel && viewportWidth >= 1024 ? 320 : 0; // 320px = w-80
  const availableWidth = viewportWidth - jsonPanelWidth;
  const viewportCenterX = jsonPanelWidth + availableWidth / 2;

  // Editor left edge with position offset
  const editorLeft = viewportCenterX + editorPosition.x - width / 2;

  // Position ruler well outside the editor area
  const rulerX = editorLeft - 200; // Increased gap to ensure it's outside

  return (
    <div
      ref={rulerRef}
      className={`absolute top-1/2 transform -translate-y-1/2 w-3 bg-transparent transition-opacity duration-200 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: `${rulerX}px`,
        height: `${height}px`,
      }}
    >
      {/* Top limit marker */}
      <div className="absolute top-0 left-0 w-full h-0 border-t border-gray-400 dark:border-gray-500 border-dashed"></div>

      {/* Bottom limit marker */}
      <div className="absolute bottom-0 left-0 w-full h-0 border-b border-gray-400 dark:border-gray-500 border-dashed"></div>

      {/* Main ruler line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0 border-l border-gray-400 dark:border-gray-500 border-dashed"></div>

      {/* Center height display */}
      <div className="absolute -left-full -translate-x-3 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 -rotate-90 origin-center">
        {height}px
      </div>
    </div>
  );
}
