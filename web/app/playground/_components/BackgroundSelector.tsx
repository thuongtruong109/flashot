"use client";

import React, { useEffect, useState, useRef } from "react";
import { Palette, Upload, X, Link as LinkIcon } from "lucide-react";
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
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
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
      } else if (selectedBackground.startsWith("http")) {
        setImageUrl(selectedBackground);
        setIsImageUploaded(false);
      }
    }
  }, [selectedBackground]);

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
          "group relative overflow-hidden transition-all duration-300 ease-out transform-gpu",
          "w-full h-10 rounded-lg",
          // Enhanced 3D Morphism Base Styling
          "shadow-[0_2px_6px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.3)]",
          "border backdrop-blur-sm cursor-pointer",
          // Interactive States
          isSelected
            ? "scale-[1.05] shadow-[0_6px_20px_rgba(99,102,241,0.25),0_3px_10px_rgba(99,102,241,0.15),inset_0_1px_0_rgba(255,255,255,0.5)] border-indigo-400/80 z-20"
            : "border-white/30 hover:border-white/60 hover:scale-[1.02] hover:shadow-[0_3px_12px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.4)] active:scale-100"
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
        {/* Enhanced Glass Morphism Overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-white/5 to-transparent" />

        {/* Enhanced Shimmer Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out" />

        {/* Inner Border Highlight */}
        <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />

        {/* Selection Indicator */}
        {isSelected && (
          <>
            {/* Enhanced Check Icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="relative">
                {/* Soft glow effect */}
                <div className="absolute inset-0 rounded-full bg-indigo-400/40 blur-lg scale-125 animate-pulse" />

                {/* Check icon with better design */}
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative drop-shadow-lg"
                >
                  {/* Outer circle with gradient */}
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    fill="url(#checkGradient)"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  {/* Inner shadow circle */}
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    fill="none"
                    stroke="rgba(79, 70, 229, 0.3)"
                    strokeWidth="2"
                  />
                  {/* Checkmark with smoother path */}
                  <path
                    d="M7 12l3.5 3.5L17 9"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient
                      id="checkGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </>
        )}
      </button>
    );
  };

  return (
    <div>
      {/* Image Upload Section */}
      <div className="space-y-3 mb-4">
        {/* <label className="text-xs font-semibold text-gray-700 flex items-center">
          <LinkIcon className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
          Custom Background Image
        </label> */}

        <label className="text-[10px] font-medium text-gray-500 tracking-wider">
          Custom Background Image
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
                "w-full px-3 py-2 text-xs rounded-lg border transition-all outline-none",
                isImageUploaded
                  ? "bg-gray-50 border-gray-300 cursor-not-allowed"
                  : "bg-white border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              )}
            />
          </div>

          {/* Upload Button */}
          <button
            type="button"
            onClick={handleUploadButtonClick}
            className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-1.5"
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

      <div className="space-y-4">
        {/* Gradients & Transparent */}
        <div>
          <p className="text-[10px] font-medium text-gray-500 tracking-wider">
            Gradients & Transparent
          </p>
          <div className="grid grid-cols-5 gap-2.5">
            {backgrounds
              .filter(
                (bg) => bg.startsWith("linear-gradient") || bg === "transparent"
              )
              .map((bg, index) => renderBackgroundButton(bg, index, true))}
          </div>
        </div>

        {/* Solid Colors */}
        <div>
          <p className="text-[10px] font-medium text-gray-500 tracking-wider">
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
      </div>
    </div>
  );
};

export default BackgroundSelector;
