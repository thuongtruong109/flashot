# Quick Reference: Localization API

## Hook: `useLocalization()`

### Import

```tsx
import { useLocalization } from "../../LocalizationContext";
```

### Returns

```tsx
{
  language: SupportedLanguage;    // Current language code
  setLanguage: (lang) => void;    // Change language
  t: (key: string) => any;        // Translate function
  translations: any;              // All translations for current language
}
```

## Translation Function: `t(key)`

### Simple String

```tsx
t("common.copy"); // → "Copy"
t("header.tips"); // → "Tips & Info"
```

### Nested Object

```tsx
t("tipsModal.about.title"); // → "About Flashot"
```

### Array

```tsx
t("tipsModal.about.features"); // → Array of strings
```

### Dynamic Key

```tsx
const format = "png";
t(`tipsModal.exportFormats.${format}.name`); // → "PNG"
```

## Language Codes

| Code | Language | Flag |
| ---- | -------- | ---- |
| `en` | English  | 🇺🇸   |
| `es` | Spanish  | 🇪🇸   |
| `fr` | French   | 🇫🇷   |
| `ja` | Japanese | 🇯🇵   |
| `zh` | Chinese  | 🇨🇳   |

## Common Patterns

### Button Text

```tsx
<button>{t("common.download")}</button>
```

### Title

```tsx
<h1>{t("tipsModal.title")}</h1>
```

### List

```tsx
{
  t("tipsModal.about.features").map((item: string, i: number) => (
    <li key={i}>{item}</li>
  ));
}
```

### Object Array

```tsx
{
  t("tipsModal.about.whyItems").map((item: any, i: number) => (
    <div key={i}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  ));
}
```

### Change Language

```tsx
const { setLanguage } = useLocalization();
<button onClick={() => setLanguage("es")}>Español</button>;
```

### Get Current Language

```tsx
const { language } = useLocalization();
console.log(language); // "en"
```

## Translation Keys Structure

```
common.*                    # Common UI elements
header.*                    # Header components
tipsModal.*                 # Tips modal
  about.*                   # About section
    features[]              # Array of features
    whyItems[]              # Array of why items
  quickStart.*              # Quick start section
    steps[]                 # Array of steps
  exportFormats.*           # Export formats
    png/jpg/webp/avif.*     # Individual formats
  languages.*               # Supported languages
  proTips.*                 # Pro tips
    tips[]                  # Array of tips
shortcutsModal.*            # Shortcuts modal
  categories.*              # Shortcut categories
    editor/appearance/etc.* # Individual categories
  proTip.*                  # Pro tip section
settings.*                  # Settings labels
```

## Examples by Use Case

### Modal Title

```tsx
<Modal title={t("tipsModal.title")} />
```

### Feature List

```tsx
{
  t("tipsModal.about.features").map((feature: string, index: number) => (
    <div key={index}>
      <span>{icons[index]}</span>
      <span>{feature}</span>
    </div>
  ));
}
```

### Shortcut Category

```tsx
{
  t("shortcutsModal.categories.editor.shortcuts").map((item: any) => (
    <div>
      <kbd>{item.key}</kbd>
      <span>{item.description}</span>
    </div>
  ));
}
```

### Conditional Text

```tsx
{
  isGenerating ? t("header.generating") : t("common.export");
}
```

### Interpolation (Manual)

```tsx
{t("tipsModal.about.madeWith")} ❤️ {t("tipsModal.about.madeBy")}
```

## Adding New Translations

### 1. Add to English

```json
// locales/en.json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

### 2. Use in Component

```tsx
<h1>{t("mySection.title")}</h1>
<p>{t("mySection.description")}</p>
```

### 3. Add to Other Languages

Repeat for `es.json`, `fr.json`, `ja.json`, `zh.json`

## Tips

- ✅ Always test in all languages
- ✅ Keep keys descriptive
- ✅ Use fallback for missing translations
- ✅ Avoid hardcoded strings
- ✅ Consider text length variations
- ✅ Use consistent key naming
- ✅ Document new sections

## Common Mistakes

❌ **Don't:**

```tsx
<button>Copy</button> // Hardcoded
```

✅ **Do:**

```tsx
<button>{t("common.copy")}</button>
```

---

❌ **Don't:**

```tsx
t("tipsModal.features"); // Wrong key
```

✅ **Do:**

```tsx
t("tipsModal.about.features"); // Correct nested key
```

---

❌ **Don't:**

```tsx
{features.map(...)}  // Using hardcoded array
```

✅ **Do:**

```tsx
{t("tipsModal.about.features").map(...)}  // Using translated array
```

## Debugging

### Missing Translation

If you see a translation key instead of text:

1. Check if key exists in `locales/en.json`
2. Verify key path is correct
3. Check spelling and nesting

### Language Not Changing

1. Verify `LocalizationProvider` wraps your component
2. Check `useLocalization()` hook is called
3. Clear localStorage and try again

### Type Errors

```tsx
// Add type annotations for arrays
{t("array.key").map((item: any, index: number) => ...)}
```

---

**Last Updated**: November 5, 2025
**Version**: 1.0.0
