"use client";

import React, { useState } from "react";
import {
  Trash2,
  Copy,
  Share2,
  Check,
  Link,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { generateCodeImage } from "@/lib/imageGenerator";
import { CodeSettings } from "@/types";

interface EditorActionButtonsProps {
  code: string;
  onClear: () => void;
  settings: CodeSettings;
  editorRef: HTMLDivElement | null;
}

const EditorActionButtons: React.FC<EditorActionButtonsProps> = ({
  code,
  onClear,
  settings,
  editorRef,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareModalAction, setShareModalAction] = useState<string | null>(null);

  // Clear code handler
  const handleClear = () => {
    if (confirm("Are you sure you want to clear the code?")) {
      onClear();
    }
  };

  // Copy code handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
      alert("Failed to copy code to clipboard");
    }
  };

  // Share button handler - opens modal
  const handleShareClick = () => {
    setShowShareModal(true);
  };

  // Close modal
  const closeShareModal = () => {
    setShowShareModal(false);
    setShareModalAction(null);
  };

  // Generate base64 image and create JSON data link
  const handleCopyAsImageLink = async () => {
    if (!editorRef) {
      alert("Editor not ready. Please try again.");
      return;
    }

    setShareModalAction("link");
    try {
      // Generate base64 image
      const base64Image = await generateCodeImage(
        editorRef,
        { ...settings, code },
        "png"
      );

      if (!base64Image) {
        throw new Error("Failed to generate image");
      }

      // Create JSON data with base64 image
      const jsonData = {
        image: base64Image,
        code: code,
        settings: settings,
        timestamp: new Date().toISOString(),
      };

      // Convert JSON to base64
      const jsonString = JSON.stringify(jsonData);
      const jsonBase64 = btoa(unescape(encodeURIComponent(jsonString)));

      // Create shareable link
      const shareableLink = `${window.location.origin}${window.location.pathname}?share=${jsonBase64}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(shareableLink);
      alert("Link copied to clipboard! Paste it in browser to view the image.");
      closeShareModal();
    } catch (error) {
      console.error("Failed to generate link:", error);
      alert("Failed to generate shareable link.");
    } finally {
      setShareModalAction(null);
    }
  };

  // Copy image to clipboard
  const handleCopyImage = async () => {
    if (!editorRef) {
      alert("Editor not ready. Please try again.");
      return;
    }

    setShareModalAction("image");
    try {
      // Generate base64 image
      const base64Image = await generateCodeImage(
        editorRef,
        { ...settings, code },
        "png"
      );

      if (!base64Image) {
        throw new Error("Failed to generate image");
      }

      // Convert base64 to blob
      const response = await fetch(base64Image);
      const blob = await response.blob();

      // Copy image to clipboard
      if (navigator.clipboard && ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        alert("Image copied to clipboard!");
        closeShareModal();
      } else {
        throw new Error("Clipboard API not supported");
      }
    } catch (error) {
      console.error("Failed to copy image:", error);
      alert("Failed to copy image to clipboard.");
    } finally {
      setShareModalAction(null);
    }
  };

  const getButtonStyles = (color: string, disabled: boolean = false) => {
    const baseStyles =
      "group relative flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition-all duration-200 " +
      "bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl " +
      "border border-white/60 dark:border-gray-700/60 " +
      "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.5)_inset] " +
      "dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,0.1)_inset] " +
      "hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15),0_1px_2px_rgba(255,255,255,0.6)_inset] " +
      "dark:hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.15)_inset] " +
      "hover:bg-white/80 dark:hover:bg-gray-800/80 " +
      "hover:-translate-y-0.5 active:translate-y-0 " +
      "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/50 before:to-transparent before:opacity-60 dark:before:from-white/10 " +
      "after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-black/5 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity";

    if (disabled) {
      return `${baseStyles} opacity-50 cursor-not-allowed hover:translate-y-0`;
    }

    return `${baseStyles} text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white`;
  };

  const colorMap = {
    red: "text-red-500 group-hover:text-red-600",
    blue: "text-blue-500 group-hover:text-blue-600",
    purple: "text-purple-500 group-hover:text-purple-600",
    green: "text-green-500 group-hover:text-green-600",
  };

  const getIconStyles = (color: keyof typeof colorMap) => {
    return `size-3.5 transition-all duration-200 relative z-10 ${colorMap[color]}`;
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Clear Button */}
        <button
          onClick={handleClear}
          className={getButtonStyles("red")}
          title="Clear code"
        >
          <Trash2 className={getIconStyles("red")} />
          <span className="text-[13px] relative z-10">Clear</span>
        </button>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className={getButtonStyles("blue", isCopied)}
          title="Copy code to clipboard"
          disabled={isCopied}
        >
          {isCopied ? (
            <>
              <Check className={getIconStyles("green")} />
              <span className="text-[13px] relative z-10 text-green-500">
                Copied!
              </span>
            </>
          ) : (
            <>
              <Copy className={getIconStyles("blue")} />
              <span className="text-[13px] relative z-10">Copy</span>
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShareClick}
          className={getButtonStyles("purple")}
          title="Share code snippet"
        >
          <Share2 className={getIconStyles("purple")} />
          <span className="text-[13px] relative z-10">Share</span>
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={closeShareModal}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-gray-200 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Share2 className="w-5 h-5 text-purple-500" />
                Share Code Snippet
              </h3>
              <button
                onClick={closeShareModal}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-3">
              {/* Copy as Image Link Option */}
              <button
                onClick={handleCopyAsImageLink}
                disabled={shareModalAction === "link"}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Link className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-0.5">
                    {shareModalAction === "link"
                      ? "Generating..."
                      : "Copy as Image Link"}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Generate shareable link that displays image
                  </p>
                </div>
              </button>

              {/* Copy Image Option */}
              <button
                onClick={handleCopyImage}
                disabled={shareModalAction === "image"}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-0.5">
                    {shareModalAction === "image" ? "Copying..." : "Copy Image"}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Copy image directly to clipboard
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorActionButtons;
