"use client";

import React, { useEffect, useState, useRef } from "react";
import { Palette, Upload, X, Link as LinkIcon } from "lucide-react";
import { cn, transparentGridPatterns } from "@/utils";
import PatternSelector from "./PatternSelector";

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
  gradientAngle?: number;
  onGradientAngleChange?: (angle: number) => void;
  selectedPattern?: string;
  onPatternChange?: (pattern: string) => void;
}

const backgrounds = [
  // Transparent Option (First in gradients list)
  "transparent",

  // Premium Gradient Backgrounds
  "linear-gradient(140deg, rgb(207, 47, 152), rgb(106, 61, 236))",
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

  // Vibrant Gradients
  "linear-gradient(135deg, #f76b1c 0%, #fad961 100%)",
  "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
  "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
  "linear-gradient(135deg, #136a8a 0%, #267871 100%)",
  "linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)",
  "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
  "linear-gradient(135deg, #f83600 0%, #f9d423 100%)",
  "linear-gradient(135deg, #4481eb 0%, #04befe 100%)",
  "linear-gradient(135deg, #e100ff 0%, #7f00ff 100%)",
  "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)",

  // Sunset & Nature Gradients
  "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
  "linear-gradient(135deg, #00f260 0%, #0575e6 100%)",
  "linear-gradient(135deg, #e65c00 0%, #f9d423 100%)",
  "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
  "linear-gradient(135deg, #56ccf2 0%, #2f80ed 100%)",
  "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)",
  "linear-gradient(135deg, #614385 0%, #516395 100%)",
  "linear-gradient(135deg, #02aab0 0%, #00cdac 100%)",

  // Neon & Cyber Gradients
  "linear-gradient(135deg, #bc4e9c 0%, #f80759 100%)",
  "linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)",
  "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)",
  "linear-gradient(135deg, #dd5e89 0%, #f7bb97 100%)",
  "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
  "linear-gradient(135deg, #08aeea 0%, #2af598 100%)",
  "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
  "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",

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
  "#3182ce",
  "#319795",
  "#d53f8c",
  "#9f7aea",
  "#ed8936",
  "#48bb78",
  "#f56565",
  "#4299e1",
  "#ed64a6",
  "#ecc94b",

  // Subtle Gradients
  "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
  "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
  "linear-gradient(135deg, #bee3f8 0%, #90cdf4 100%)",
  "linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)",
  "linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)",
  "linear-gradient(135deg, #e9d8fd 0%, #d6bcfa 100%)",
  "linear-gradient(135deg, #feebc8 0%, #fbd38d 100%)",
  "linear-gradient(135deg, #fbb6ce 0%, #f687b3 100%)",

  // Dark Mode Gradients
  "linear-gradient(135deg, #434343 0%, #000000 100%)",
  "linear-gradient(135deg, #0f2027 0%, #203a43 0%, #2c5364 100%)",
  "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #16213e 0%, #0f3460 100%)",
  "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
  "linear-gradient(135deg, #232526 0%, #414345 100%)",
  "linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 100%)",
  "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
  "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
  "linear-gradient(135deg, #360033 0%, #0b8793 100%)",
];

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  selectedBackground,
  onBackgroundChange,
  gradientAngle = 135,
  onGradientAngleChange,
  selectedPattern = "none",
  onPatternChange,
}) => {
  const [transparentGridDataUrl, setTransparentGridDataUrl] =
    useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "custom" | "gradient" | "solid" | "pattern"
  >("gradient");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Generate transparent grid pattern on client side
    if (typeof window !== "undefined") {
      const gridDataUrl = transparentGridPatterns.selector();
      setTransparentGridDataUrl(gridDataUrl);
    }
  }, []);

  // Initialize imageUrl from selectedBackground if it's an image URL
  useEffect(() => {
    if (
      selectedBackground &&
      (selectedBackground.startsWith("url(") ||
        selectedBackground.startsWith("http"))
    ) {
      const urlMatch = selectedBackground.match(/url\(['"]?(.*?)['"]?\)/);
      if (urlMatch) {
        setImageUrl(urlMatch[1]);
        setIsImageUploaded(true);
        setActiveTab("custom");
      } else if (selectedBackground.startsWith("http")) {
        setImageUrl(selectedBackground);
        setIsImageUploaded(false);
        setActiveTab("custom");
      }
    } else if (
      selectedBackground?.startsWith("linear-gradient") ||
      selectedBackground === "transparent"
    ) {
      setActiveTab("gradient");
    } else if (selectedBackground?.startsWith("#")) {
      setActiveTab("solid");
    }

    // Set pattern tab if pattern is selected
    if (selectedPattern && selectedPattern !== "none") {
      setActiveTab("pattern");
    }
  }, [selectedBackground, selectedPattern]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageUrl(result);
        setIsImageUploaded(true);
        onBackgroundChange(`url('${result}')`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url && !isImageUploaded) {
      // If URL is entered manually, apply it as background
      if (url.startsWith("http")) {
        onBackgroundChange(`url('${url}')`);
      }
    }
  };

  const handleUrlInputBlur = () => {
    if (imageUrl && !isImageUploaded && imageUrl.startsWith("http")) {
      onBackgroundChange(`url('${imageUrl}')`);
    }
  };

  const handleResetImage = () => {
    setImageUrl("");
    setIsImageUploaded(false);
    onBackgroundChange("transparent");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

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
        onClick={() => {
          onBackgroundChange(bg);
          // Clear image URL when selecting a preset background
          if (!bg.startsWith("url(")) {
            setImageUrl("");
            setIsImageUploaded(false);
          }
        }}
        className={cn(
          "group relative overflow-hidden transition-all duration-200 ease-out",
          "w-full h-10 rounded-lg cursor-pointer",
          // Ultra minimal border - học từ Apple/Radix
          isSelected
            ? "ring-[1.5px] ring-blue-500 dark:ring-blue-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-950"
            : "ring-1 ring-black/[0.06] dark:ring-white/[0.06] hover:ring-black/[0.12] dark:hover:ring-white/[0.12]"
        )}
        style={{
          background: isTransparent
            ? transparentGridDataUrl
              ? `url("${transparentGridDataUrl}")`
              : "repeating-conic-gradient(#e5e7eb 0deg 90deg, #f9fafb 90deg 180deg) 0 0/12px 12px"
            : bg,
          backgroundRepeat: isTransparent ? "repeat" : "no-repeat",
          backgroundSize: isTransparent ? "auto" : "cover",
          backgroundPosition: "center",
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
        {/* Ultra simple checkmark - chỉ khi selected */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Simple solid circle với icon */}
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 dark:bg-blue-400">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6l2.5 2.5L10 3"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        )}
      </button>
    );
  };

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex items-center space-x-2 mb-4">
        {[
          { value: "custom", label: "Custom" },
          { value: "gradient", label: "Gradient" },
          { value: "solid", label: "Solid" },
          { value: "pattern", label: "Pattern" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() =>
              setActiveTab(
                tab.value as "custom" | "gradient" | "solid" | "pattern"
              )
            }
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              activeTab === tab.value
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Custom Image Tab */}
      {activeTab === "custom" && (
        <div className="space-y-1">
          <label className="text-[10px] font-medium text-gray-500 dark:text-gray-400 tracking-wider">
            Custom Image
          </label>

          {/* URL Input and Buttons */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={imageUrl}
                onChange={handleUrlInputChange}
                onBlur={handleUrlInputBlur}
                readOnly={isImageUploaded}
                placeholder="Enter image URL or upload from device"
                className={cn(
                  "w-full px-2 py-1.5 text-xs rounded-md border transition-all outline-none",
                  isImageUploaded
                    ? "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-not-allowed"
                    : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                )}
              />
            </div>

            {/* Upload Button */}
            <button
              type="button"
              onClick={handleUploadButtonClick}
              className="px-2 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5"
              title="Upload image from device"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Upload</span>
            </button>

            {/* Reset Button */}
            {(imageUrl || isImageUploaded) && (
              <button
                type="button"
                onClick={handleResetImage}
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5"
                title="Reset image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Gradient Tab */}
      {activeTab === "gradient" && (
        <div className="space-y-3">
          {/* Gradient Angle Control */}
          {selectedBackground.startsWith("linear-gradient") &&
            onGradientAngleChange && (
              <div className="py-3">
                <label className="text-xs flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Gradient Angle
                  </span>
                  <span className="text-purple-600 dark:text-purple-400 font-medium">
                    {gradientAngle}°
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={gradientAngle}
                  onChange={(e) =>
                    onGradientAngleChange(parseInt(e.target.value))
                  }
                  className="w-full h-1 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900 dark:to-pink-900 rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                  [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-pink-500
                  [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-110"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>0° (→)</span>
                  <span>90° (↓)</span>
                  <span>180° (←)</span>
                  <span>270° (↑)</span>
                </div>
              </div>
            )}

          <div className="grid grid-cols-5 gap-2.5">
            {backgrounds
              .filter(
                (bg) => bg.startsWith("linear-gradient") || bg === "transparent"
              )
              .map((bg, index) => renderBackgroundButton(bg, index, true))}
          </div>
        </div>
      )}

      {/* Solid Tab */}
      {activeTab === "solid" && (
        <div className="space-y-2">
          <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 tracking-wider">
            Solid Colors
          </p>
          <div className="grid grid-cols-5 gap-2.5">
            {backgrounds
              .filter(
                (bg) =>
                  !bg.startsWith("linear-gradient") && bg !== "transparent"
              )
              .map((bg, index) =>
                renderBackgroundButton(bg, index + 20, false)
              )}
          </div>
        </div>
      )}

      {/* Pattern Tab */}
      {activeTab === "pattern" && onPatternChange && (
        <PatternSelector
          selectedPattern={selectedPattern}
          onPatternChange={onPatternChange}
        />
      )}
    </div>
  );
};

export default BackgroundSelector;
