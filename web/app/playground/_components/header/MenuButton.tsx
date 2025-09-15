"use client";

import React from "react";
// Inline MenuButton component (merged from separate file)
export default function MenuButton({
  label,
  index,
  isOpen,
  forwardedRef,
  onToggle,
  active = false,
  icon,
  activeColorClass,
  activeColorValue,
}: {
  label: string;
  isOpen: boolean;
  index: number;
  forwardedRef: (el: HTMLButtonElement | null) => void;
  onToggle: (idx: number) => void;
  active?: boolean;
  icon?: React.ReactNode;
  activeColorClass?: string;
  activeColorValue?: string;
}) {
  const isActive = isOpen || active;
  return (
    <button
      ref={forwardedRef}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(index);
      }}
      aria-expanded={isOpen}
      className={
        "group relative inline-flex items-center rounded-md transition-all duration-200 ease-out select-none bg-transparent" +
        isActive
      }
      style={{
        transform: isOpen ? "scale(0.995)" : undefined,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = isOpen
          ? "scale(0.995)"
          : "scale(1.01)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = isOpen
          ? "translateY(1px) scale(0.995)"
          : "translateY(0) scale(1)";
      }}
      onFocus={(e) => {
        if (!isActive && activeColorValue) {
          (e.currentTarget as HTMLElement).style.color = activeColorValue;
        }
      }}
      onBlur={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.color = "";
        }
      }}
    >
      {icon && (
        <span className="w-3.5 h-3.5 mr-1 inline-flex items-center justify-center">
          {icon}
        </span>
      )}
      <span
        className={`text-sm font-normal ${activeColorClass ?? "text-gray-700"}`}
      >
        {label}
      </span>
      <span
        className={`absolute left-0 -bottom-1 h-px rounded-full ease-in-out duration-200 w-0 bg-current ${
          active ? "w-full" : "group-hover:w-full"
        } ${activeColorClass}`}
      />
    </button>
  );
}
