"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";
import { cn } from "@/utils";

interface SearchButtonProps {
  onNavigate?: (section: string, itemId?: string) => void;
  className?: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({
  onNavigate,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "group relative flex items-center space-x-1.5 px-2.5 rounded-lg transition-all duration-200 h-[1.95rem]",
          "bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl",
          "border border-white/60 dark:border-gray-700/60",
          "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.5)_inset]",
          "dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,0.1)_inset]",
          "hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15),0_1px_2px_rgba(255,255,255,0.6)_inset]",
          "dark:hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.15)_inset]",
          "hover:bg-white/80 dark:hover:bg-gray-800/80",
          "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white",
          "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/50 before:to-transparent before:opacity-60 dark:before:from-white/10",
          "after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-black/5 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity",
          className
        )}
        title="Search settings (Ctrl+K)"
      >
        <Search className="size-3.5 transition-all duration-200 relative z-10 text-blue-500 group-hover:text-blue-600" />
      </button>

      {mounted &&
        createPortal(
          <SearchModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onNavigate={onNavigate}
          />,
          document.body
        )}
    </>
  );
};

export default SearchButton;
