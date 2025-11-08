# Playground Localization

This directory contains the localization (i18n) implementation for the Flashot playground.

## Overview

The playground now supports multiple languages with a complete localization system that allows users to switch between languages seamlessly.

## Supported Languages

- 🇺🇸 **English** (en) - Default
- 🇪🇸 **Spanish** (es)
- 🇫🇷 **French** (fr)
- 🇯🇵 **Japanese** (ja)
- 🇨🇳 **Chinese** (zh)

## Structure

```
playground/
├── locales/              # Translation files
│   ├── en.json          # English translations
│   ├── es.json          # Spanish translations
│   ├── fr.json          # French translations
│   ├── ja.json          # Japanese translations
│   └── zh.json          # Chinese translations
├── LocalizationContext.tsx  # Context provider for localization
└── _components/
    └── header/
        └── LanguageSwitcher.tsx  # Language switcher component
```

## Usage

### Using Translations in Components

```tsx
import { useLocalization } from "../../LocalizationContext";

function MyComponent() {
  const { t, language, setLanguage } = useLocalization();

  return (
    <div>
      <h1>{t("tipsModal.title")}</h1>
      <p>{t("tipsModal.about.description")}</p>
    </div>
  );
}
```

### Translation Keys

The translation keys follow a nested structure:

- `common.*` - Common UI elements (buttons, actions)
- `header.*` - Header component strings
- `tipsModal.*` - Tips modal content
- `shortcutsModal.*` - Shortcuts modal content
- `settings.*` - Settings panel labels

Example:

```tsx
t("common.copy"); // "Copy"
t("header.tips"); // "Tips & Info"
t("tipsModal.title"); // "Information & Quick Start"
```

### Array Translations

For arrays of content (like features list), use `.map()`:

```tsx
{
  t("tipsModal.about.features").map((feature: string, index: number) => (
    <div key={index}>{feature}</div>
  ));
}
```

## Adding a New Language

1. Create a new JSON file in `locales/` directory (e.g., `de.json` for German)
2. Copy the structure from `en.json` and translate all values
3. Update `LocalizationContext.tsx`:
   - Import the new translation file
   - Add it to the `translations` object
   - Add the language code to `SupportedLanguage` type
   - Add language name to `languageNames`
   - Add language flag to `languageFlags`

Example:

```tsx
// LocalizationContext.tsx
import deTranslations from "./locales/de.json";

export type SupportedLanguage = "en" | "es" | "fr" | "ja" | "zh" | "de";

const translations = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  ja: jaTranslations,
  zh: zhTranslations,
  de: deTranslations,
};

export const languageNames: Record<SupportedLanguage, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  ja: "日本語",
  zh: "中文",
  de: "Deutsch",
};

export const languageFlags: Record<SupportedLanguage, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  ja: "🇯🇵",
  zh: "🇨🇳",
  de: "🇩🇪",
};
```

## Features

### Automatic Language Detection

- Detects browser language on first visit
- Falls back to English if browser language is not supported

### Persistent Language Selection

- User's language choice is saved to `localStorage`
- Language preference persists across sessions

### Fallback System

- If a translation is missing in the selected language, it falls back to English
- If translation is still not found, the key itself is returned

### Language Switcher Component

- Dropdown menu with flag icons
- Shows current language
- Responsive design (shows only flag on mobile)
- Click outside to close

## Components Updated

The following components have been localized:

1. **TipsModal** - All about information, features, quick start guide
2. **ShortcutsModal** - Keyboard shortcuts and categories
3. **Header** - Language switcher integration
4. **Page** - Wrapped with LocalizationProvider

## Translation File Structure

Each language file follows this structure:

```json
{
  "common": {
    "copy": "...",
    "download": "...",
    ...
  },
  "header": {
    "brand": "...",
    "tips": "...",
    ...
  },
  "tipsModal": {
    "title": "...",
    "about": {
      "title": "...",
      "features": [...],
      ...
    },
    ...
  },
  "shortcutsModal": {
    "title": "...",
    "categories": {
      "editor": {...},
      ...
    },
    ...
  },
  "settings": {
    "theme": "...",
    ...
  }
}
```

## Best Practices

1. **Keep Keys Consistent** - Use the same key structure across all language files
2. **Avoid Hardcoding** - Always use translation keys instead of hardcoded strings
3. **Use Descriptive Keys** - Make keys self-explanatory (e.g., `tipsModal.about.title`)
4. **Test All Languages** - Switch between languages to ensure all translations work
5. **Handle Plurals** - Consider plural forms when translating (some languages have complex plural rules)
6. **Context Matters** - Same English word might translate differently based on context

## Future Enhancements

- [ ] Add more languages (German, Italian, Portuguese, Korean, etc.)
- [ ] RTL (Right-to-Left) support for Arabic, Hebrew
- [ ] Lazy loading of translation files for better performance
- [ ] Translation management UI for easier updates
- [ ] Pluralization support for complex languages
- [ ] Date/time formatting based on locale
- [ ] Number formatting based on locale

## Contributing

When adding new features to the playground:

1. Add English strings to `locales/en.json`
2. Use translation keys in your component: `t("your.new.key")`
3. Update all other language files with translations
4. If you need help with translations, mark them as `[NEEDS TRANSLATION]` in the JSON files

## Support

For issues or questions about localization:

- Check if the translation key exists in all language files
- Verify the LocalizationProvider wraps your component
- Ensure you're using the `useLocalization` hook correctly
- Check browser console for any errors

---

Made with ❤️ for the global developer community
