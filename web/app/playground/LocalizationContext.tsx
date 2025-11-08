"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import enTranslations from "./locales/en.json";
import esTranslations from "./locales/es.json";
import frTranslations from "./locales/fr.json";
import jaTranslations from "./locales/ja.json";
import zhTranslations from "./locales/zh.json";

export type SupportedLanguage = "en" | "es" | "fr" | "ja" | "zh";

type TranslationKey = string;

interface LocalizationContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: TranslationKey) => any;
  translations: any;
}

const translations = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  ja: jaTranslations,
  zh: zhTranslations,
};

export const languageNames: Record<SupportedLanguage, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  ja: "日本語",
  zh: "中文",
};

export const languageFlags: Record<SupportedLanguage, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  ja: "🇯🇵",
  zh: "🇨🇳",
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
);

const STORAGE_KEY = "flashot_playground_language";

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem(
      STORAGE_KEY
    ) as SupportedLanguage;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang in translations) {
        setLanguageState(browserLang as SupportedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  };

  // Translation function with nested key support (e.g., "common.copy")
  const t = (key: TranslationKey): any => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation is missing
        let fallbackValue: any = translations.en;
        for (const fk of keys) {
          if (
            fallbackValue &&
            typeof fallbackValue === "object" &&
            fk in fallbackValue
          ) {
            fallbackValue = fallbackValue[fk];
          } else {
            return key; // Return key if not found
          }
        }
        return fallbackValue;
      }
    }

    return value;
  };

  return (
    <LocalizationContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translations: translations[language],
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};
