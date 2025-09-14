"use client";

import React from "react";
import { Share2, Info, MessageCircle } from "lucide-react";

interface FloatingButtonsProps {
  onShowTips: () => void;
  "data-tour"?: string;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  onShowTips,
  "data-tour": dataTour,
}) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Flashot - Code Screenshot",
        text: "Check out this beautiful code screenshot!",
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleReportIssue = () => {
    window.open(
      "https://github.com/thuongtruong109/flashot/issues/new",
      "_blank"
    );
  };

  return (
    <div
      className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-3"
      data-tour={dataTour}
    >
      {/* Share Button */}
      <button
        className="group w-11 h-11 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-[2px_2px_6px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(0,0,0,0.05),inset_1px_1px_2px_rgba(255,255,255,0.8)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),inset_-0.5px_-0.5px_1px_rgba(0,0,0,0.1),inset_0.5px_0.5px_1px_rgba(255,255,255,0.9)] transition-all duration-300 flex items-center justify-center hover:scale-95 active:scale-90"
        onClick={handleShare}
        title="Share"
      >
        <Share2 className="w-4 h-4 text-blue-600 group-hover:text-blue-700 transition-all duration-300 group-hover:scale-110" />
      </button>

      {/* Report Issue Button */}
      <button
        className="group w-11 h-11 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-[2px_2px_6px_rgba(0,0,0,0.1),inset_-1px_-1px_2px_rgba(0,0,0,0.05),inset_1px_1px_2px_rgba(255,255,255,0.8)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),inset_-0.5px_-0.5px_1px_rgba(0,0,0,0.1),inset_0.5px_0.5px_1px_rgba(255,255,255,0.9)] transition-all duration-300 flex items-center justify-center hover:scale-95 active:scale-90"
        onClick={handleReportIssue}
        title="Report Bug"
      >
        <MessageCircle className="w-4 h-4 text-orange-600 group-hover:text-orange-700 transition-all duration-300 group-hover:scale-110" />
      </button>
    </div>
  );
};

export default FloatingButtons;
