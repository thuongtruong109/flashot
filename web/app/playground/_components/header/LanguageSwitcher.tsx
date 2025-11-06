"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Globe } from "lucide-react";
import {
  useLocalization,
  SupportedLanguage,
  languageNames,
  languageFlags,
} from "../../LocalizationContext";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update dropdown position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const languages = Object.keys(languageNames) as SupportedLanguage[];

  const dropdown =
    isOpen && typeof window !== "undefined"
      ? createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: `${dropdownPosition.top}px`,
              right: `${dropdownPosition.right}px`,
              zIndex: 999999,
            }}
            className="min-w-fit rounded-xl bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-2xl dark:shadow-gray-900/50 overflow-hidden p-1"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-2 py-1 text-xs flex items-center space-x-3 rounded-lg transition-all duration-150 ${
                  language === lang
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <span className="text-lg">{languageFlags[lang]}</span>
                <span className="flex-1 font-medium">
                  {languageNames[lang]}
                </span>
                {language === lang && (
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-[1.98rem] h-[1.95rem] rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_1px_1px_rgba(255,255,255,0.5)_inset] dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.3),0_1px_1px_rgba(255,255,255,0.1)_inset] hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15),0_1px_2px_rgba(255,255,255,0.6)_inset] dark:hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.4),0_1px_2px_rgba(255,255,255,0.15)_inset] hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-b before:from-white/50 before:to-transparent before:opacity-60 dark:before:from-white/10 after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-black/5 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity"
        title="Change Language"
        aria-label="Change Language"
      >
        <Globe className="w-3.5 h-3.5 relative z-10 text-blue-500 dark:text-blue-400" />
      </button>
      {dropdown}
    </>
  );
};

export default LanguageSwitcher;
