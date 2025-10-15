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
      {/* Image Upload Section */}
      <div className="space-y-1 mb-4">
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

      <div className="space-y-4">
        {/* Gradients & Transparent */}
        <div className="space-y-2">
          <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 tracking-wider">
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
      </div>
    </div>
  );
};

export default BackgroundSelector;
