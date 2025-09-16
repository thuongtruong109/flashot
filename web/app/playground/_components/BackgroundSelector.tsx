"use client";

import React, { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { cn, transparentGridPatterns } from "@/utils";

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
}

const backgrounds = [
  // Transparent Option (First in gradients list)
  "transparent",

  // Premium Gradient Backgrounds
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
}) => {
  const [transparentGridDataUrl, setTransparentGridDataUrl] =
    useState<string>("");

  useEffect(() => {
    // Generate transparent grid pattern on client side
    if (typeof window !== "undefined") {
      const gridDataUrl = transparentGridPatterns.selector();
      setTransparentGridDataUrl(gridDataUrl);
    }
  }, []);

  const renderBackgroundButton = (
    bg: string,
    index: number,
    isGradient: boolean = false
  ) => {
    const isTransparent = bg === "transparent";
    const isSelected = selectedBackground === bg;
    const isWhite = bg === "#ffffff";
    const isDark = bg === "#1a1a1a";
    const isThemeColor = isWhite || isDark;

    return (
      <button
        key={bg}
        onClick={() => onBackgroundChange(bg)}
        className={cn(
          "group relative overflow-hidden transition-all duration-500 ease-out transform-gpu",
          "w-full h-10 rounded-xl",
          // 3D Morphism Base Styling
          "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.05)] backdrop-blur-md border border-white/20",
          // Interactive States
          isSelected
            ? "scale-105 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_4px_16px_rgba(99,102,241,0.3),0_8px_32px_rgba(99,102,241,0.1)] ring-2 ring-indigo-200/50 z-10"
            : "hover:scale-102 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_3px_12px_rgba(0,0,0,0.15),0_6px_24px_rgba(0,0,0,0.08)] hover:ring-1 hover:ring-white/30",
          // Animation delays for staggered effect
          `animate-in slide-in-from-bottom-4 fade-in duration-700`
        )}
        style={{
          background: isTransparent
            ? transparentGridDataUrl
              ? `url("${transparentGridDataUrl}")`
              : "repeating-conic-gradient(#e5e7eb 0deg 90deg, #f9fafb 90deg 180deg) 0 0/12px 12px"
            : bg,
          backgroundRepeat: isTransparent ? "repeat" : "no-repeat",
          backgroundSize: isTransparent ? "auto" : "cover",
          animationDelay: `${index * 50}ms`,
        }}
        title={
          isTransparent
            ? "Transparent Background"
            : isWhite
            ? "Light Theme"
            : isDark
            ? "Dark Theme"
            : isGradient
            ? `Gradient ${index}`
            : bg
        }
      >
        {/* Glass Morphism Overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-black/5 backdrop-blur-sm" />

        {/* Shimmer Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />

        {/* Selection Indicator */}
        {isSelected && (
          <>
            {/* Outer Glow */}
            <div className="absolute inset-0 rounded-xl border-2 border-indigo-400 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10" />

            {/* Inner Check */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-indigo-600"
              >
                <circle cx="9" cy="9" r="9" fill="white" fillOpacity="0.85" />
                <path
                  d="M5 9.5l2.5 2.5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </>
        )}

        {/* 3D Highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-t-xl" />
      </button>
    );
  };

  return (
    <div>
      <div className="space-y-4">
        {/* Gradients & Transparent */}
        <div className="grid grid-cols-5 gap-2">
          {backgrounds
            .filter(
              (bg) => bg.startsWith("linear-gradient") || bg === "transparent"
            )
            .map((bg, index) => renderBackgroundButton(bg, index, true))}
        </div>

        {/* Solid Colors */}
        <div className="grid grid-cols-5 gap-2">
          {backgrounds
            .filter(
              (bg) => !bg.startsWith("linear-gradient") && bg !== "transparent"
            )
            .map((bg, index) => renderBackgroundButton(bg, index + 20, false))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundSelector;
