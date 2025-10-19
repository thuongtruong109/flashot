import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

export interface Option<T> {
  value: T;
  label: React.ReactNode;
}

interface CustomSelectProps<T> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
}

function CustomSelect<T extends string | number | boolean>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  // Set position IMMEDIATELY when opening using useLayoutEffect
  useLayoutEffect(() => {
    if (!open) {
      setDropdownPosition(null);
      setMounted(false);
      return;
    }

    // Calculate position synchronously before paint
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
      // Trigger animation after position is set
      setTimeout(() => setMounted(true), 10);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setIsClosing(false);
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleClose = () => {
    setMounted(false);
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
    }, 200);
  };

  useEffect(() => {
    if (open && highlighted === -1 && options.length > 0) {
      setHighlighted(options.findIndex((opt) => opt.value === value));
    }
  }, [open, value, options, highlighted]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }
    if (e.key === "Escape") {
      handleClose();
      return;
    }
    if (e.key === "ArrowDown") {
      setHighlighted((h) => Math.min(h + 1, options.length - 1));
      e.preventDefault();
    }
    if (e.key === "ArrowUp") {
      setHighlighted((h) => Math.max(h - 1, 0));
      e.preventDefault();
    }
    if (e.key === "Enter" && highlighted >= 0) {
      onChange(options[highlighted].value);
      handleClose();
      e.preventDefault();
    }
  };

  return (
    <div className={`relative min-w-max ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="custom-select-list"
        className="group w-full flex items-center justify-between text-sm border border-white/80 dark:border-gray-700/80 rounded-xl px-3 py-1.5 font-medium transition-all duration-300 cursor-pointer bg-gradient-to-br from-white/60 via-white/40 to-white/20 dark:from-gray-800/60 dark:via-gray-800/40 dark:to-gray-800/20 backdrop-blur-lg
      shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05)]
      dark:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.2)]
      hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.18),inset_0_2px_6px_rgba(255,255,255,1),inset_0_-2px_6px_rgba(0,0,0,0.08)]
      dark:hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5),inset_0_2px_6px_rgba(255,255,255,0.15),inset_0_-2px_6px_rgba(0,0,0,0.3)]
      hover:scale-[1.02] active:scale-[0.98]"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
      >
        <span className="truncate text-gray-700 dark:text-gray-200">
          {options.find((opt) => opt.value === value)?.label || (
            <span className="text-gray-400 dark:text-gray-500">
              {placeholder}
            </span>
          )}
        </span>
        <svg
          className={`ml-2 w-3 h-3 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] group-hover:drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] ${
            open
              ? "rotate-180 text-blue-500 dark:text-blue-400"
              : "text-gray-500 dark:text-gray-400"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open &&
        dropdownPosition &&
        createPortal(
          <div
            ref={listRef}
            id="custom-select-list"
            role="listbox"
            tabIndex={-1}
            className={`min-w-fit rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl dark:shadow-gray-900/50 z-[99999] custom-scrollbar max-h-60 overflow-y-auto sm:max-h-none sm:overflow-visible p-1 transition-all duration-200 ease-out ${
              mounted && !isClosing
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
            style={{
              position: "fixed",
              top: `${dropdownPosition.top + 5}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
              transformOrigin: "top center",
            }}
          >
            {options.map((opt, i) => (
              <div
                key={String(opt.value)}
                role="option"
                aria-selected={value === opt.value}
                className={`flex items-center space-x-2 px-2 py-1.5 rounded-md transition-all duration-150 cursor-pointer text-sm ${
                  value === opt.value
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : i === highlighted
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
                onMouseEnter={() => setHighlighted(i)}
                onMouseDown={() => {
                  onChange(opt.value);
                  handleClose();
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}

export default CustomSelect;
