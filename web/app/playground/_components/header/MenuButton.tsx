"use client";

import React from "react";

interface MenuButtonProps {
  label: string;
  isOpen: boolean;
  index: number;
  forwardedRef: (el: HTMLButtonElement | null) => void;
  onToggle: (idx: number) => void;
}

export default function MenuButton({
  label,
  index,
  isOpen,
  forwardedRef,
  onToggle,
}: MenuButtonProps) {
  return (
    <button
      ref={forwardedRef}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(index);
      }}
      aria-expanded={isOpen}
      className={
        "flex items-center gap-2 px-4 py-2 rounded-2xl relative transition-transform duration-200 ease-out select-none " +
        (isOpen ? "text-gray-900" : "text-gray-700")
      }
      style={{
        background: isOpen
          ? "linear-gradient(180deg, rgba(235,235,240,0.98), rgba(250,250,255,0.99))"
          : "linear-gradient(180deg, #ffffff, #f4f6fb)",
        boxShadow: isOpen
          ? "inset 6px 6px 14px rgba(0,0,0,0.08), inset -6px -6px 14px rgba(255,255,255,0.9)"
          : "12px 12px 24px rgba(2,6,23,0.08), -8px -8px 18px rgba(255,255,255,0.95)",
        transform: isOpen ? "translateY(1px) scale(0.995)" : undefined,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = isOpen
          ? "translateY(1px) scale(0.995)"
          : "translateY(-2px) scale(1.01)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = isOpen
          ? "translateY(1px) scale(0.995)"
          : "translateY(0) scale(1)";
      }}
      onFocus={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 24px rgba(2,6,23,0.12), 0 -4px 12px rgba(255,255,255,0.95)";
      }}
      onBlur={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = isOpen
          ? "inset 6px 6px 14px rgba(0,0,0,0.08), inset -6px -6px 14px rgba(255,255,255,0.9)"
          : "12px 12px 24px rgba(2,6,23,0.08), -8px -8px 18px rgba(255,255,255,0.95)";
      }}
    >
      <span className="font-medium text-gray-700">{label}</span>
    </button>
  );
}
