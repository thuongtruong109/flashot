"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface DropdownPortalProps {
  open: boolean;
  position: { top: number; left: number };
  children: React.ReactNode;
  onClose: () => void;
}

export default function DropdownPortal({
  open,
  position,
  children,
  onClose,
}: DropdownPortalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (typeof window === "undefined" || !open) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 z-[99999]"
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{ position: "absolute", top: position.top, left: position.left }}
        className="pointer-events-auto"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
