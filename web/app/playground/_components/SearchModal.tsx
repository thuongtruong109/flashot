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
  onNavigate?: (section: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
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
        title: "Font Size",
        description: "Adjust the size of code text",
        category: "view",
        keywords: ["font", "size", "text", "scale", "zoom"],
        icon: <FileCode className="size-4" />,
      },
      {
        id: "padding",
        title: "Padding",
        description: "Control spacing around code block",
        category: "view",
        keywords: ["padding", "spacing", "margin", "gap"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "border-radius",
        title: "Border Radius",
        description: "Adjust corner roundness",
        category: "view",
        keywords: ["border", "radius", "corner", "round", "curve"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "sizing",
        title: "Image Sizing",
        description: "Set custom width and height",
        category: "view",
        keywords: ["size", "width", "height", "dimension", "resolution"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "word-wrap",
        title: "Word Wrap",
        description: "Enable text wrapping for long lines",
        category: "view",
        keywords: ["wrap", "text", "line", "break", "overflow"],
        icon: <FileCode className="size-4" />,
      },
      {
        id: "line-numbers",
        title: "Line Numbers",
        description: "Show or hide line numbers",
        category: "view",
        keywords: ["line", "number", "count", "gutter"],
        icon: <FileCode className="size-4" />,
      },
      {
        id: "window-header",
        title: "Window Header",
        description: "Toggle window control buttons",
        category: "view",
        keywords: ["window", "header", "controls", "traffic", "lights", "mac"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "filename",
        title: "File Name",
        description: "Show or customize file name",
        category: "view",
        keywords: ["file", "name", "title", "label"],
        icon: <FileCode className="size-4" />,
      },

      // Theme Settings
      {
        id: "language",
        title: "Programming Language",
        description: "Select syntax highlighting language",
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
        title: "Font Family",
        description: "Choose code font style",
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
        title: "Color Theme",
        description: "Select syntax color scheme",
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
        title: "Background",
        description: "Choose background color or gradient",
        category: "theme",
        keywords: ["background", "gradient", "color", "solid", "image"],
        icon: <Palette className="size-4" />,
      },
      {
        id: "pattern",
        title: "Pattern Background",
        description: "Apply brand-inspired patterns",
        category: "theme",
        keywords: ["pattern", "vercel", "supabase", "tailwind", "grid", "dots"],
        icon: <Palette className="size-4" />,
      },
      {
        id: "gradient-angle",
        title: "Gradient Angle",
        description: "Adjust gradient direction",
        category: "theme",
        keywords: ["gradient", "angle", "direction", "rotation"],
        icon: <Palette className="size-4" />,
      },

      // Decorate Settings
      {
        id: "border",
        title: "Border Customization",
        description: "Add and style borders",
        category: "decorate",
        keywords: ["border", "outline", "frame", "edge"],
        icon: <Sparkles className="size-4" />,
      },
      {
        id: "watermark",
        title: "Watermark",
        description: "Add text or image watermark",
        category: "decorate",
        keywords: ["watermark", "logo", "brand", "signature"],
        icon: <Sparkles className="size-4" />,
      },
      {
        id: "label",
        title: "Label",
        description: "Add custom label to image",
        category: "decorate",
        keywords: ["label", "caption", "text", "footer"],
        icon: <Sparkles className="size-4" />,
      },
      {
        id: "highlights",
        title: "Line Highlights",
        description: "Highlight specific code lines",
        category: "decorate",
        keywords: ["highlight", "emphasis", "focus", "attention"],
        icon: <Sparkles className="size-4" />,
      },

      // General Features
      {
        id: "export",
        title: "Export Image",
        description: "Download as PNG, JPG, or SVG",
        category: "general",
        keywords: ["export", "download", "save", "png", "jpg", "svg"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "copy",
        title: "Copy to Clipboard",
        description: "Quick copy image or code",
        category: "general",
        keywords: ["copy", "clipboard", "paste"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "import",
        title: "Import Code",
        description: "Load code from URL or GitHub",
        category: "general",
        keywords: ["import", "load", "fetch", "github", "url"],
        icon: <Settings className="size-4" />,
      },
      {
        id: "shortcuts",
        title: "Keyboard Shortcuts",
        description: "View all available shortcuts",
        category: "general",
        keywords: ["keyboard", "shortcuts", "hotkeys", "keys"],
        icon: <Command className="size-4" />,
      },
    ],
    []
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
          general: "View", // Default to View for general features
        };
        const tab = categoryToTab[item.category] || "View";
        onNavigate(tab);
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
        return "View";
      case "theme":
        return "Theme";
      case "decorate":
        return "Decorate";
      case "general":
        return "General";
      default:
        return category;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] bg-black/50 dark:bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative border-b border-gray-200 dark:border-gray-700">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400 dark:text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search settings and features..."
            className="w-full pl-12 pr-12 py-4 text-base bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="size-4 text-gray-400 dark:text-gray-500" />
            </button>
          )}
        </div>

        {/* Results */}
        <div
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center">
              <Search className="size-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No results found for &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Try different keywords or check spelling
              </p>
            </div>
          ) : (
            <div className="py-2">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  data-index={index}
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "w-full px-4 py-3 flex items-start gap-3 transition-colors text-left",
                    selectedIndex === index
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "mt-0.5 p-2 rounded-lg",
                      getCategoryColor(item.category)
                    )}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item.title}
                      </h3>
                      <span
                        className={cn(
                          "px-1.5 py-0.5 text-[10px] font-medium rounded uppercase tracking-wide",
                          getCategoryColor(item.category)
                        )}
                      >
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  {selectedIndex === index && (
                    <div className="mt-2">
                      <svg
                        className="size-4 text-blue-600 dark:text-blue-400"
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
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-[10px] font-mono">
                  ↑↓
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-[10px] font-mono">
                  Enter
                </kbd>
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-[10px] font-mono">
                  Esc
                </kbd>
                Close
              </span>
            </div>
            <span className="text-[10px]">
              {filteredItems.length} result
              {filteredItems.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
