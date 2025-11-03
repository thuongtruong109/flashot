"use client";

import React, { useEffect, useState } from "react";

interface HighlightOverlayProps {
  itemId: string;
  highlightItemId?: string;
  children: React.ReactNode;
}

const HighlightOverlay: React.FC<HighlightOverlayProps> = ({
  itemId,
  highlightItemId,
  children,
}) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (highlightItemId === itemId) {
      setIsHighlighted(true);
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsHighlighted(false);
    }
  }, [highlightItemId, itemId]);

  return (
    <div className="relative">
      <div
        className={`absolute -inset-x-2.5 -inset-y-1.5 rounded-lg pointer-events-none z-0
          bg-gradient-to-br from-blue-400/16 via-indigo-400/10 to-purple-400/16
          dark:from-blue-400/20 dark:via-indigo-400/14 dark:to-purple-400/20
          border border-blue-400/35 dark:border-blue-400/45
          transition-all duration-300 ease-out
          ${
            isHighlighted
              ? "opacity-100 scale-100"
              : "opacity-0 scale-98 pointer-events-none"
          }`}
        style={{
          boxShadow: isHighlighted
            ? "0 0 0 1px rgba(99, 102, 241, 0.15), 0 2px 12px -2px rgba(99, 102, 241, 0.25), inset 0 0 16px rgba(59, 130, 246, 0.08)"
            : "none",
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default HighlightOverlay;
