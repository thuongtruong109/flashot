"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Search,
  X,
  Settings,
  Palette,
  FileCode,
  Sparkles,
  Command,
} from "lucide-react";
import { cn } from "@/utils";
import { useLocalization } from "../LocalizationContext";
import Modal from "./base/Modal";

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: "view" | "theme" | "decorate" | "general";
  keywords: string[];
  action?: () => void;
  icon?: React.ReactNode;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (section: string, itemId?: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { t } = useLocalization();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Define all searchable items
  const searchableItems: SearchItem[] = useMemo(
    () => [
      // View Settings
      {
        id: "font-size",
        title: t("searchModal.items.fontSize.title"),
        description: t("searchModal.items.fontSize.description"),
        category: "view",
        keywords: ["font", "size", "text", "scale", "zoom"],
        icon: <FileCode className="size-4" />,
      },
      {
        id: "padding",
        title: t("searchModal.items.padding.title"),
        description: t("searchModal.items.padding.description"),
        category: "view",
        keywords: ["padding", "spacing", "margin", "gap"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "border-radius",
        title: t("searchModal.items.borderRadius.title"),
        description: t("searchModal.items.borderRadius.description"),
        category: "view",
        keywords: ["border", "radius", "corner", "round", "curve"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "sizing",
        title: t("searchModal.items.sizing.title"),
        description: t("searchModal.items.sizing.description"),
        category: "view",
        keywords: ["size", "width", "height", "dimension", "resolution"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "word-wrap",
        title: t("searchModal.items.wordWrap.title"),
        description: t("searchModal.items.wordWrap.description"),
        category: "view",
        keywords: ["wrap", "text", "line", "break", "overflow"],
        icon: <FileCode className="size-4" />,
      },
      {
        id: "project-name",
        title: t("searchModal.items.projectName.title"),
        description: t("searchModal.items.projectName.description"),
        category: "general",
        keywords: ["project", "name", "header", "custom", "title", "window"],
        icon: <FileCode className="size-4" />,
      },
      {
        id: "line-numbers",
        title: t("searchModal.items.lineNumbers.title"),
        description: t("searchModal.items.lineNumbers.description"),
        category: "general",
        keywords: ["line", "number", "count", "gutter"],
        icon: <FileCode className="size-4" />,
      },
      {
        id: "window-header",
        title: t("searchModal.items.windowHeader.title"),
        description: t("searchModal.items.windowHeader.description"),
        category: "general",
        keywords: ["window", "header", "controls", "traffic", "lights", "mac"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "filename",
        title: t("searchModal.items.filename.title"),
        description: t("searchModal.items.filename.description"),
        category: "general",
        keywords: ["file", "name", "title", "label"],
        icon: <FileCode className="size-4" />,
      },

      // Theme Settings
      {
        id: "language",
        title: t("searchModal.items.language.title"),
        description: t("searchModal.items.language.description"),
        category: "theme",
        keywords: [
          "language",
          "syntax",
          "javascript",
          "python",
          "typescript",
          "code",
        ],
        icon: <Palette className="size-4" />,
      },
      {
        id: "font-family",
        title: t("searchModal.items.fontFamily.title"),
        description: t("searchModal.items.fontFamily.description"),
        category: "theme",
        keywords: [
          "font",
          "family",
          "typeface",
          "fira",
          "jetbrains",
          "monospace",
        ],
        icon: <Palette className="size-4" />,
      },
      {
        id: "color-theme",
        title: t("searchModal.items.colorTheme.title"),
        description: t("searchModal.items.colorTheme.description"),
        category: "theme",
        keywords: [
          "theme",
          "color",
          "dark",
          "light",
          "monokai",
          "dracula",
          "nord",
        ],
        icon: <Palette className="size-4" />,
      },
      {
        id: "background",
        title: t("searchModal.items.background.title"),
        description: t("searchModal.items.background.description"),
        category: "theme",
        keywords: ["background", "gradient", "color", "solid", "image"],
        icon: <Palette className="size-4" />,
      },
      {
        id: "pattern",
        title: t("searchModal.items.pattern.title"),
        description: t("searchModal.items.pattern.description"),
        category: "theme",
        keywords: ["pattern", "vercel", "supabase", "tailwind", "grid", "dots"],
        icon: <Palette className="size-4" />,
      },
      {
        id: "gradient-angle",
        title: t("searchModal.items.gradientAngle.title"),
        description: t("searchModal.items.gradientAngle.description"),
        category: "theme",
        keywords: ["gradient", "angle", "direction", "rotation"],
        icon: <Palette className="size-4" />,
      },

      // Decorate Settings
      {
        id: "border",
        title: t("searchModal.items.border.title"),
        description: t("searchModal.items.border.description"),
        category: "decorate",
        keywords: ["border", "outline", "frame", "edge"],
        icon: <Sparkles className="size-4" />,
      },
      {
        id: "watermark",
        title: t("searchModal.items.watermark.title"),
        description: t("searchModal.items.watermark.description"),
        category: "decorate",
        keywords: ["watermark", "logo", "brand", "signature"],
        icon: <Sparkles className="size-4" />,
      },
      {
        id: "label",
        title: t("searchModal.items.label.title"),
        description: t("searchModal.items.label.description"),
        category: "decorate",
        keywords: ["label", "caption", "text", "footer"],
        icon: <Sparkles className="size-4" />,
      },
      {
        id: "highlights",
        title: t("searchModal.items.highlights.title"),
        description: t("searchModal.items.highlights.description"),
        category: "decorate",
        keywords: ["highlight", "emphasis", "focus", "attention"],
        icon: <Sparkles className="size-4" />,
      },

      // General Features
      {
        id: "export",
        title: t("searchModal.items.export.title"),
        description: t("searchModal.items.export.description"),
        category: "general",
        keywords: ["export", "download", "save", "png", "jpg", "svg"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "copy",
        title: t("searchModal.items.copy.title"),
        description: t("searchModal.items.copy.description"),
        category: "general",
        keywords: ["copy", "clipboard", "paste"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "import",
        title: t("searchModal.items.import.title"),
        description: t("searchModal.items.import.description"),
        category: "general",
        keywords: ["import", "load", "fetch", "github", "url"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "shortcuts",
        title: t("searchModal.items.shortcuts.title"),
        description: t("searchModal.items.shortcuts.description"),
        category: "general",
        keywords: ["keyboard", "shortcuts", "hotkeys", "keys"],
        icon: <Command className="size-4" />,
      },
    ],
    [t]
  );

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return searchableItems;
    }

    const query = searchQuery.toLowerCase();
    return searchableItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.keywords.some((keyword) => keyword.toLowerCase().includes(query))
      );
    });
  }, [searchQuery, searchableItems]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleItemClick = useCallback(
    (item: SearchItem) => {
      if (item.action) {
        item.action();
      } else if (onNavigate) {
        // Map category to settings tab
        const categoryToTab: Record<string, string> = {
          view: "View",
          theme: "Theme",
          decorate: "Decorate",
          general: "Makeup", // Makeup for window-header, filename, caption, etc.
        };

        // Special handling for specific items
        const itemToTab: Record<string, string> = {
          "window-header": "Makeup",
          filename: "Makeup",
          caption: "Makeup",
          highlights: "Makeup",
          "line-numbers": "Makeup",
          "header-customization": "Makeup",
        };

        const tab =
          itemToTab[item.id] || categoryToTab[item.category] || "View";
        // Pass both tab and item id for highlighting
        onNavigate(tab, item.id);
      }
      onClose();
    },
    [onNavigate, onClose]
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredItems[selectedIndex]) {
            handleItemClick(filteredItems[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, handleItemClick]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "view":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "theme":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
      case "decorate":
        return "bg-pink-500/10 text-pink-600 dark:text-pink-400";
      case "general":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      default:
        return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "view":
        return t("searchModal.categories.view");
      case "theme":
        return t("searchModal.categories.theme");
      case "decorate":
        return t("searchModal.categories.decorate");
      case "general":
        return t("searchModal.categories.general");
      default:
        return category;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl dark:shadow-gray-950/50 max-w-2xl w-full max-h-[90vh] flex flex-col border border-white/20 dark:border-gray-700/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Search Input */}
        <div className="px-3 py-2 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-t-2xl">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-md flex-shrink-0">
              <Search className="size-3.5 text-white" />
            </div>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchModal.placeholder")}
                className="w-full px-1.5 py-0.5 text-xs bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-0.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
              >
                <X className="size-3 text-gray-400 dark:text-gray-500" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-0.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 group flex-shrink-0"
            >
              <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto
            [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-thumb]:dark:bg-gray-600
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:border-2
            [&::-webkit-scrollbar-thumb]:border-transparent
            [&::-webkit-scrollbar-thumb]:bg-clip-padding
            [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
            [&::-webkit-scrollbar-thumb]:dark:hover:bg-gray-500
            scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center">
              <Search className="size-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("searchModal.noResults")} &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {t("searchModal.tryDifferent")}
              </p>
            </div>
          ) : (
            <div className="py-1">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  data-index={index}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "w-full px-3 py-2 flex items-start gap-2 transition-colors text-left",
                    selectedIndex === index
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "mt-0.5 p-1.5 rounded-md",
                      getCategoryColor(item.category)
                    )}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {item.title}
                      </h3>
                      <span
                        className={cn(
                          "px-1 py-0.5 text-[9px] font-medium rounded uppercase tracking-wide",
                          getCategoryColor(item.category)
                        )}
                      >
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  {selectedIndex === index && (
                    <div className="mt-1.5">
                      <svg
                        className="size-3.5 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-3 rounded-b-xl py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-[9px] font-mono">
                  ↑↓
                </kbd>
                <span className="text-[10px]">{t("searchModal.navigate")}</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-[9px] font-mono">
                  Enter
                </kbd>
                <span className="text-[10px]">{t("searchModal.select")}</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-[9px] font-mono">
                  Esc
                </kbd>
                <span className="text-[10px]">{t("searchModal.close")}</span>
              </span>
            </div>
            <span className="text-[10px]">
              {filteredItems.length}{" "}
              {filteredItems.length !== 1
                ? t("searchModal.results")
                : t("searchModal.result")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
