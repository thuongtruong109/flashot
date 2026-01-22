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
  return (
    <div
      className={`absolute -left-10 top-0 transform w-3 bg-transparent transition-opacity duration-200 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
      style={{
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
      <div className="absolute -left-[34px] top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 -rotate-90 origin-center">
        {height}px
      </div>
    </div>
  );
}
