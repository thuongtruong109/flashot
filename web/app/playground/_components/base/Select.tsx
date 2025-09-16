import React, { useState, useRef, useEffect } from "react";
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
  const [highlighted, setHighlighted] = useState<number>(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    right: number;
    width: number;
  }>({ top: 0, right: 0, width: 0 });

  useEffect(() => {
    if (!open) return;
    // Position dropdown below button
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        right: window.innerWidth - rect.right + window.scrollX,
        width: rect.width,
      });
    }
    const handleClickOutside = (e: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open && highlighted === -1 && options.length > 0) {
      setHighlighted(options.findIndex((opt) => opt.value === value));
    }
  }, [open, value, options]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
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
      setOpen(false);
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
        className="w-full flex items-center justify-between text-sm border border-slate-100 rounded-xl px-3 py-1.5 text-gray-700 font-medium transition-all duration-200 cursor-pointer bg-gradient-to-b from-white to-gray-50
      shadow-[inset_2px_2px_6px_rgba(0,0,0,0.04),inset_-2px_-2px_6px_rgba(255,255,255,0.9),6px_6px_14px_rgba(2,6,23,0.06),-6px_-6px_14px_rgba(255,255,255,0.9)]
      hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.06),inset_-2px_-2px_6px_rgba(255,255,255,1),8px_8px_18px_rgba(2,6,23,0.08),-6px_-6px_14px_rgba(255,255,255,1)]"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
      >
        <span className="truncate">
          {options.find((opt) => opt.value === value)?.label || (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <svg
          className={`ml-2 w-3 h-3 transition-transform duration-200 ${
            open ? "rotate-180 text-blue-500" : "text-gray-400"
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
        createPortal(
          <div
            ref={listRef}
            id="custom-select-list"
            role="listbox"
            tabIndex={-1}
            className="min-w-fit rounded-xl bg-white border border-gray-200 shadow-lg z-[99999] custom-scrollbar max-h-60 overflow-y-auto sm:max-h-none sm:overflow-visible p-1"
            style={{
              position: "absolute",
              top: dropdownPosition.top + 5,
              right: dropdownPosition.right,
              width: dropdownPosition.width,
            }}
          >
            {options.map((opt, i) => (
              <div
                key={String(opt.value)}
                role="option"
                aria-selected={value === opt.value}
                className={`flex items-center space-x-2 px-2 py-1.5 rounded-md transition-all duration-150 cursor-pointer text-sm ${
                  value === opt.value
                    ? "bg-blue-50 text-blue-700"
                    : i === highlighted
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onMouseEnter={() => setHighlighted(i)}
                onMouseDown={() => {
                  onChange(opt.value);
                  setOpen(false);
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
