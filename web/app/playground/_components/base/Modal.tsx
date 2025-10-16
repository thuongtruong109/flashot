"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
  maxWidth = "2xl",
  className = "",
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl dark:shadow-gray-950/50 ${maxWidthClasses[maxWidth]} w-full max-h-[90vh] flex flex-col border border-white/20 dark:border-gray-700/30 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-t-2xl">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent flex items-center">
              {icon && (
                <div className="relative mr-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-xl blur opacity-20"></div>
                  <div className="relative">{icon}</div>
                </div>
              )}
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto enhanced-scrollbar-light dark:enhanced-scrollbar-dark">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
