"use client";

import React from "react";
import { Eye, Palette } from "lucide-react";
import { cn } from "@/utils";

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
  isVisible: boolean;
}

const backgrounds = [
  // Transparent Option
  "transparent",

  // Gradient Backgrounds
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  "linear-gradient(135deg, #ff8a80 0%, #ea80fc 100%)",
  "linear-gradient(135deg, #8bc34a 0%, #4caf50 100%)",
  "linear-gradient(135deg, #ff5722 0%, #ff9800 100%)",
  "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
  "linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)",
  "linear-gradient(135deg, #607d8b 0%, #455a64 100%)",
  "linear-gradient(135deg, #ffeb3b 0%, #ffc107 100%)",
  "linear-gradient(135deg, #e91e63 0%, #f06292 100%)",

  // Solid Colors
  "#1a1a1a",
  "#ffffff",
  "#2d3748",
  "#1a202c",
  "#2b6cb0",
  "#38a169",
  "#d69e2e",
  "#e53e3e",
  "#805ad5",
  "#dd6b20",

  // Subtle Gradients
  "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
  "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
  "linear-gradient(135deg, #bee3f8 0%, #90cdf4 100%)",
  "linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)",
  "linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)",
  "linear-gradient(135deg, #e9d8fd 0%, #d6bcfa 100%)",
];

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  selectedBackground,
  onBackgroundChange,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div>
      <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center">
        <Palette className="w-3.5 h-3.5 text-indigo-600 mr-1.5" />
        Background
      </h4>

      <div className="space-y-4">
        {/* Transparent Option */}
        <div>
          <button
            onClick={() => onBackgroundChange("transparent")}
            className={cn(
              "group relative w-full h-10 rounded-lg border-2 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center",
              selectedBackground === "transparent"
                ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                : "border-gray-200/50 hover:border-gray-300 hover:scale-105"
            )}
            style={{
              background:
                "repeating-conic-gradient(#808080 0deg 90deg, transparent 90deg 180deg) 0 0/20px 20px",
            }}
            title="Transparent Background"
          >
            <div className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-sm"></div>
            {selectedBackground === "transparent" && (
              <div className="absolute inset-0 rounded-lg border-2 border-white bg-white/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
              </div>
            )}
          </button>
        </div>

        {/* Gradient Backgrounds */}
        <div className="border-t border-gray-200 border-dashed pt-4">
          <div className="grid grid-cols-5 gap-2">
            {backgrounds
              .filter((bg) => bg.startsWith("linear-gradient"))
              .map((bg, index) => (
                <button
                  key={index}
                  onClick={() => onBackgroundChange(bg)}
                  className={cn(
                    "group relative w-full h-10 rounded-lg border-2 transition-all duration-200 shadow-md hover:shadow-lg",
                    selectedBackground === bg
                      ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                      : "border-gray-200/50 hover:border-gray-300 hover:scale-105"
                  )}
                  style={{
                    background: bg,
                  }}
                  title={`Gradient ${index + 1}`}
                >
                  {selectedBackground === bg && (
                    <div className="absolute inset-0 rounded-lg border-2 border-white bg-white/20 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full shadow-lg"></div>
                    </div>
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* Solid Colors */}
        <div className="border-t border-gray-200 border-dashed pt-4">
          <div className="grid grid-cols-5 gap-2">
            {backgrounds
              .filter(
                (bg) =>
                  !bg.startsWith("linear-gradient") && bg !== "transparent"
              )
              .map((bg, index) => (
                <button
                  key={index}
                  onClick={() => onBackgroundChange(bg)}
                  className={cn(
                    "group relative w-full h-10 rounded-lg border-2 transition-all duration-200 shadow-md hover:shadow-lg",
                    selectedBackground === bg
                      ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                      : "border-gray-200/50 hover:border-gray-300 hover:scale-105"
                  )}
                  style={{
                    backgroundColor: bg,
                  }}
                  title={bg}
                >
                  {selectedBackground === bg && (
                    <div className="absolute inset-0 rounded-lg border-2 border-white bg-white/20 flex items-center justify-center">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full shadow-lg",
                          bg === "#ffffff" || bg.includes("f7fafc")
                            ? "bg-gray-800"
                            : "bg-white"
                        )}
                      ></div>
                    </div>
                  )}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSelector;
