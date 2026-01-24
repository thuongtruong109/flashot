"use client";

import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  isVisible,
  onClose,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<
    "enter" | "idle" | "exit"
  >("enter");

  useEffect(() => {
    if (isVisible) {
      setAnimationPhase("enter");
      setIsAnimating(true);

      // Start bounce animation
      setTimeout(() => setAnimationPhase("idle"), 100);

      const timer = setTimeout(() => {
        setAnimationPhase("exit");
        setTimeout(() => {
          setIsAnimating(false);
          onClose();
        }, 400); // Wait for exit animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible && !isAnimating) return null;

  const getTypeStyles = () => {
    const baseGlassmorphism =
      "group relative flex items-center rounded-lg transition-all duration-200 backdrop-blur-xl border shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.5)_inset] dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,0.1)_inset] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15),0_1px_2px_rgba(255,255,255,0.6)_inset] dark:hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.15)_inset] before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/50 before:to-transparent before:opacity-60 dark:before:from-white/10 after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-black/5 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity";

    switch (type) {
      case "success":
        return `${baseGlassmorphism} bg-emerald-50/80 dark:bg-emerald-900/70 border-emerald-200/60 dark:border-emerald-700/60 hover:bg-emerald-50/90 dark:hover:bg-emerald-900/80`;
      case "error":
        return `${baseGlassmorphism} bg-red-50/80 dark:bg-red-900/70 border-red-200/60 dark:border-red-700/60 hover:bg-red-50/90 dark:hover:bg-red-900/80`;
      case "info":
        return `${baseGlassmorphism} bg-blue-50/80 dark:bg-blue-900/70 border-blue-200/60 dark:border-blue-700/60 hover:bg-blue-50/90 dark:hover:bg-blue-900/80`;
      default:
        return `${baseGlassmorphism} bg-emerald-50/80 dark:bg-emerald-900/70 border-emerald-200/60 dark:border-emerald-700/60 hover:bg-emerald-50/90 dark:hover:bg-emerald-900/80`;
    }
  };

  const getAnimationClasses = () => {
    switch (animationPhase) {
      case "enter":
        return "animate-in slide-in-from-top-4 fade-in duration-300";
      case "idle":
        return "scale-100 opacity-100";
      case "exit":
        return "animate-out slide-out-to-top-4 fade-out duration-400";
      default:
        return "";
    }
  };

  const getIcon = () => {
    const iconClasses = "size-3.5 transition-all duration-200 relative z-10";
    switch (type) {
      case "success":
        return (
          <Check
            className={`${iconClasses} text-emerald-600 dark:text-emerald-400`}
          />
        );
      case "error":
        return (
          <X className={`${iconClasses} text-red-600 dark:text-red-400`} />
        );
      default:
        return (
          <Check
            className={`${iconClasses} text-blue-600 dark:text-blue-400`}
          />
        );
    }
  };

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ease-out ${
        animationPhase === "enter"
          ? "animate-in slide-in-from-top-4 fade-in duration-300"
          : animationPhase === "idle"
            ? "scale-100 opacity-100"
            : "animate-out slide-out-to-top-4 fade-out duration-400"
      }`}
    >
      <div
        className={`${getTypeStyles()} rounded-lg px-3 py-2 flex items-center space-x-1 min-w-[320px] max-w-md relative overflow-hidden`}
      >
        <div className="flex-shrink-0 relative z-10">{getIcon()}</div>

        <p className="text-[13px] font-medium flex-1 text-gray-800 dark:text-gray-200 leading-relaxed relative z-10">
          {message}
        </p>

        <button
          onClick={() => {
            setAnimationPhase("exit");
            setTimeout(() => {
              setIsAnimating(false);
              onClose();
            }, 400);
          }}
          className="flex-shrink-0 hover:scale-110 transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 relative z-10"
          aria-label="Close"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
