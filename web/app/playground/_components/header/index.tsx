"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronRight,
  Download,
  FileText,
  Palette,
  Type,
  Move,
  CornerRightDown,
  Layers,
  Paintbrush,
  Monitor,
  Hash,
  BarChart3,
  Folder,
  WrapText,
  MessageSquare,
  AlignCenter,
} from "lucide-react";
import MenuButton from "./MenuButton";
import DropdownPortal from "./DropdownPortal";

export default function HeaderTop() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  // menuAssignments now contains full setting objects for each menu in insertion order
  const menuAssignments: {
    label: string;
    items: Array<{
      key: string;
      label: string;
      icon?: React.ReactNode;
      hint?: string;
    }>;
  }[] = [
    {
      label: "File",
      items: [
        {
          key: "showFileName",
          label: "Show File Name",
          icon: <Folder className="w-4 h-4 text-yellow-600" />,
        },
        {
          key: "fileName",
          label: "File Name",
          icon: <FileText className="w-4 h-4 text-blue-600" />,
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          key: "width",
          label: "Width",
          icon: <Move className="w-4 h-4 text-blue-600" />,
        },
        {
          key: "height",
          label: "Height",
          icon: <BarChart3 className="w-4 h-4 text-green-600" />,
        },
        {
          key: "fontSize",
          label: "Font Size",
          icon: <Type className="w-4 h-4 text-orange-600" />,
        },
        {
          key: "padding",
          label: "Padding",
          icon: <Move className="w-4 h-4 text-pink-600" />,
        },
        {
          key: "borderRadius",
          label: "Border Radius",
          icon: <CornerRightDown className="w-4 h-4 text-teal-600" />,
        },
      ],
    },
    {
      label: "Select",
      items: [
        {
          key: "theme",
          label: "Editor Theme",
          icon: <Palette className="w-4 h-4 text-purple-600" />,
        },
        {
          key: "fontFamily",
          label: "Font Family",
          icon: <Type className="w-4 h-4 text-orange-600" />,
        },
        {
          key: "exportFormat",
          label: "Export Format",
          icon: <Download className="w-4 h-4 text-green-600" />,
        },
      ],
    },
    {
      label: "View",
      items: [
        {
          key: "showWindowControls",
          label: "Window Controls",
          icon: <Monitor className="w-4 h-4 text-blue-600" />,
        },
        {
          key: "lineNumbers",
          label: "Line Numbers",
          icon: <Hash className="w-4 h-4 text-green-600" />,
        },
        {
          key: "showLineCount",
          label: "Line Count",
          icon: <BarChart3 className="w-4 h-4 text-orange-600" />,
        },
        {
          key: "wordWrap",
          label: "Word Wrap",
          icon: <WrapText className="w-4 h-4 text-blue-600" />,
        },
      ],
    },
    {
      label: "Background",
      items: [
        {
          key: "background",
          label: "Background",
          icon: <Layers className="w-4 h-4 text-cyan-600" />,
        },
        {
          key: "showBackground",
          label: "Show Background",
          icon: <Paintbrush className="w-4 h-4 text-purple-600" />,
        },
      ],
    },
    {
      label: "Caption",
      items: [
        {
          key: "showCaption",
          label: "Show Caption",
          icon: <MessageSquare className="w-4 h-4 text-indigo-600" />,
        },
        {
          key: "captionText",
          label: "Caption Text",
          icon: <AlignCenter className="w-4 h-4 text-indigo-600" />,
        },
        {
          key: "captionStyle",
          label: "Caption Style",
          icon: <AlignCenter className="w-4 h-4 text-indigo-600" />,
        },
        {
          key: "captionOpacity",
          label: "Caption Opacity",
          icon: <AlignCenter className="w-4 h-4 text-indigo-600" />,
        },
        {
          key: "captionPosition",
          label: "Caption Position",
          icon: <AlignCenter className="w-4 h-4 text-indigo-600" />,
        },
      ],
    },
  ];

  // Use menuAssignments insertion order for menu labels. No static fallback lists.
  const menuLabels: string[] = menuAssignments.map((m) => m.label);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) close();
    };

    const onScrollOrResize = () => {
      if (openIndex !== null && buttonRefs.current[openIndex]) {
        const rect = buttonRefs.current[openIndex]!.getBoundingClientRect();
        setDropdownPos({
          top: rect.bottom + window.scrollY + 6,
          left: rect.left + window.scrollX,
        });
      }
    };

    document.addEventListener("click", onDocClick);
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      document.removeEventListener("click", onDocClick);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [openIndex, close]);

  const handleToggle = (idx: number) => {
    const next = openIndex === idx ? null : idx;
    setOpenIndex(next);
    if (next !== null && buttonRefs.current[next]) {
      const rect = buttonRefs.current[next]!.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
      });
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      style={{
        background: "linear-gradient(180deg, #f7f7fb, #ffffff)",
        boxShadow:
          "inset 6px 6px 14px rgba(0,0,0,0.03), inset -6px -6px 14px rgba(255,255,255,0.8)",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-3 h-12 flex items-center text-sm select-none">
        <div className="flex items-center gap-2">
          {menuLabels.map((label: string, idx: number) => (
            <MenuButton
              key={label}
              label={label}
              index={idx}
              isOpen={openIndex === idx}
              forwardedRef={(el) => (buttonRefs.current[idx] = el)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>

      <DropdownPortal
        open={openIndex !== null}
        position={dropdownPos}
        onClose={close}
      >
        <div
          className="bg-[#f6f7fb] rounded-2xl overflow-hidden w-64"
          style={{
            boxShadow:
              "18px 18px 36px rgba(2,6,23,0.08), -12px -12px 30px rgba(255,255,255,0.95)",
            border: "1px solid rgba(0,0,0,0.04)",
            background:
              "linear-gradient(180deg, rgba(250,250,255,0.98), rgba(245,246,250,0.96))",
          }}
        >
          {(() => {
            const idx = openIndex!;
            const menu = menuAssignments[idx];
            const items = menu?.items ?? [];
            if (items.length > 0) {
              return (
                <div className="p-2">
                  {items.map((s, i) => (
                    <div
                      key={s.key}
                      className={
                        "flex items-center gap-3 px-3 py-3 text-sm text-gray-700 cursor-pointer rounded-lg transition-all transform " +
                        (i < items.length - 1 ? "border-b border-white/8" : "")
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        close();
                      }}
                      onMouseEnter={(ev) => {
                        (ev.currentTarget as HTMLElement).style.transform =
                          "translateY(-4px) scale(1.01)";
                        (ev.currentTarget as HTMLElement).style.boxShadow =
                          "12px 20px 40px rgba(2,6,23,0.06)";
                      }}
                      onMouseLeave={(ev) => {
                        (ev.currentTarget as HTMLElement).style.transform =
                          "translateY(0) scale(1)";
                        (ev.currentTarget as HTMLElement).style.boxShadow =
                          "none";
                      }}
                    >
                      <div
                        className="w-9 h-9 flex items-center justify-center rounded-full"
                        style={{
                          background: "linear-gradient(180deg,#ffffff,#f0f3ff)",
                          boxShadow:
                            "4px 6px 12px rgba(2,6,23,0.06), -3px -3px 8px rgba(255,255,255,0.9)",
                        }}
                      >
                        {s.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">
                          {s.label}
                        </div>
                        {s.hint && (
                          <div className="text-xs text-gray-400">{s.hint}</div>
                        )}
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    </div>
                  ))}
                </div>
              );
            }

            return <div className="p-2 text-sm text-gray-500">No items</div>;
          })()}
        </div>
      </DropdownPortal>
    </div>
  );
}
