"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
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

  // Share to social media
  const handleShareToSocial = async (platform: string) => {
    if (!editorRef) {
      alert("Editor not ready. Please try again.");
      return;
    }

    setShareModalAction(platform);
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

      const jsonString = JSON.stringify(jsonData);
      const jsonBase64 = btoa(unescape(encodeURIComponent(jsonString)));
      const shareableLink = `${window.location.origin}${window.location.pathname}?share=${jsonBase64}`;

      const text = "Check out this beautiful code snippet!";
      const hashtags = "flashot,code,programming";

      let shareUrl = "";
      switch (platform) {
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(shareableLink)}&hashtags=${hashtags}`;
          break;
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareableLink
          )}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareableLink
          )}`;
          break;
        case "reddit":
          shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(
            shareableLink
          )}&title=${encodeURIComponent(text)}`;
          break;
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${encodeURIComponent(
            `${text} ${shareableLink}`
          )}`;
          break;
        case "telegram":
          shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
            shareableLink
          )}&text=${encodeURIComponent(text)}`;
          break;
        case "discord":
          // Discord doesn't have a direct share URL, copy link instead
          await navigator.clipboard.writeText(shareableLink);
          alert("Link copied! You can paste it in Discord.");
          closeShareModal();
          return;
        case "slack":
          // Slack doesn't have a simple share URL, copy link instead
          await navigator.clipboard.writeText(shareableLink);
          alert("Link copied! You can paste it in Slack.");
          closeShareModal();
          return;
        case "email":
          shareUrl = `mailto:?subject=${encodeURIComponent(
            "Check out this code snippet"
          )}&body=${encodeURIComponent(`${text}\n\n${shareableLink}`)}`;
          break;
        case "copy":
          await navigator.clipboard.writeText(shareableLink);
          alert("Link copied to clipboard!");
          closeShareModal();
          return;
        default:
          return;
      }

      window.open(shareUrl, "_blank", "width=600,height=400");
      closeShareModal();
    } catch (error) {
      console.error(`Failed to share to ${platform}:`, error);
      alert(`Failed to share to ${platform}.`);
    } finally {
      setShareModalAction(null);
    }
  };

  const getButtonStyles = (color: string, disabled: boolean = false) => {
    const baseStyles =
      "group relative flex items-center space-x-1.5 px-2.5 py-1 rounded-lg transition-all duration-200 " +
      "bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl " +
      "border border-white dark:border-gray-700/60 " +
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
      {showShareModal &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999999]"
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
              <div className="p-4 space-y-2.5">
                {/* Copy as Image Link Option */}
                <button
                  onClick={handleCopyAsImageLink}
                  disabled={shareModalAction === "link"}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <Link className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
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
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                      {shareModalAction === "image"
                        ? "Copying..."
                        : "Copy Image"}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Copy image directly to clipboard
                    </p>
                  </div>
                </button>

                {/* Divider */}
                <div className="relative my-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                      Share to Social
                    </span>
                  </div>
                </div>

                {/* Social Share Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {/* Twitter */}
                  <button
                    onClick={() => handleShareToSocial("twitter")}
                    disabled={!!shareModalAction}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border border-sky-200 dark:border-sky-800 hover:from-sky-100 hover:to-blue-100 dark:hover:from-sky-900/30 dark:hover:to-blue-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Share to Twitter"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                      Twitter
                    </span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => handleShareToSocial("facebook")}
                    disabled={!!shareModalAction}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Share to Facebook"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                      Facebook
                    </span>
                  </button>

                  {/* LinkedIn */}
                  <button
                    onClick={() => handleShareToSocial("linkedin")}
                    disabled={!!shareModalAction}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Share to LinkedIn"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                      LinkedIn
                    </span>
                  </button>

                  {/* Reddit */}
                  <button
                    onClick={() => handleShareToSocial("reddit")}
                    disabled={!!shareModalAction}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Share to Reddit"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                      Reddit
                    </span>
                  </button>

                  {/* WhatsApp */}
                  <button
                    onClick={() => handleShareToSocial("whatsapp")}
                    disabled={!!shareModalAction}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Share to WhatsApp"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                      WhatsApp
                    </span>
                  </button>
                </div>

                {/* Row 2 - More Social Networks */}
                <div className="grid grid-cols-5 gap-2">
                  {/* Telegram */}
                  <button
                    onClick={() => handleShareToSocial("telegram")}
                    disabled={!!shareModalAction}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 border border-sky-200 dark:border-sky-800 hover:from-sky-100 hover:to-cyan-100 dark:hover:from-sky-900/30 dark:hover:to-cyan-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Share to Telegram"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                      Telegram
                    </span>
                  </button>

                  {/* Discord */}
                  <button
                    onClick={() => handleShareToSocial("discord")}
                    disabled={!!shareModalAction}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Share to Discord"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                      Discord
                    </span>
                  </button>

                  {/* Slack */}
                  <button
                    onClick={() => handleShareToSocial("slack")}
                    disabled={!!shareModalAction}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 border border-purple-200 dark:border-purple-800 hover:from-purple-100 hover:to-fuchsia-100 dark:hover:from-purple-900/30 dark:hover:to-fuchsia-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Share to Slack"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                      Slack
                    </span>
                  </button>

                  {/* Email */}
                  <button
                    onClick={() => handleShareToSocial("email")}
                    disabled={!!shareModalAction}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border border-gray-200 dark:border-gray-800 hover:from-gray-100 hover:to-slate-100 dark:hover:from-gray-900/30 dark:hover:to-slate-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Share via Email"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-600 to-slate-700 flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </span>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={() => handleShareToSocial("copy")}
                    disabled={!!shareModalAction}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border border-teal-200 dark:border-teal-800 hover:from-teal-100 hover:to-emerald-100 dark:hover:from-teal-900/30 dark:hover:to-emerald-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    title="Copy Link"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-sm">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                      Copy
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default EditorActionButtons;
