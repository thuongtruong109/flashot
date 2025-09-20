import React, { useState, useEffect } from "react";

interface WidthRulerProps {
  width: number;
  height: number;
  editorPosition: { x: number; y: number };
}

export default function WidthRuler({
  width,
  height,
  editorPosition,
}: WidthRulerProps) {
  // Calculate position: center horizontally, below frame with 50px gap
  const containerHeight =
    typeof window !== "undefined" ? window.innerHeight : 800;
  const containerCenterY = containerHeight / 2;
  const editorCenterY = containerCenterY + editorPosition.y;
  const editorBottom = editorCenterY + height / 2;
  const rulerTop = editorBottom;

  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 h-3 bg-transparent"
      style={{
        top: `${rulerTop}px`,
        width: `${width}px`,
      }}
    >
      {/* Left limit marker */}
      <div className="absolute left-0 top-0 w-0 h-full border-l border-gray-400 border-dashed"></div>

      {/* Right limit marker */}
      <div className="absolute right-0 top-0 w-0 h-full border-r border-gray-400 border-dashed"></div>

      {/* Main ruler line */}
      <div className="absolute top-1/2 left-0 right-0 h-0 border-b border-gray-400 border-dashed"></div>

      {/* Center width display */}
      <div className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm border">
        {width}px
      </div>
    </div>
  );
}
