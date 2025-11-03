# Search Feature Demo Guide

## Quick Start

### 1. Open Search

**Three ways to access:**

- Click the "Search" button in the header (next to Shortcuts)
- Press `Ctrl+K` (Windows/Linux)
- Press `⌘K` (Mac)

### 2. Search for Settings

Type any keyword to find settings:

- "font" → Find Font Size, Font Family
- "color" → Find Color Theme, Background
- "pattern" → Find Pattern Background (Vercel, Supabase, etc.)
- "border" → Find Border customization
- "export" → Find Export options
- "watermark" → Find Watermark settings

### 3. Navigate Results

- Use ↑↓ arrow keys to move through results
- Press Enter to jump to that setting
- Press Esc to close search

## Example Searches

### Common Tasks

**Changing Code Appearance:**

```
Search: "font size"
→ Jump directly to Font Size slider

Search: "theme"
→ See all theme-related settings
```

**Background Customization:**

```
Search: "gradient"
→ Find Gradient angle and Background options

Search: "vercel"
→ Jump to Vercel pattern background
```

**Adding Decorations:**

```
Search: "watermark"
→ Access watermark settings

Search: "border"
→ Configure border width, offset, opacity
```

**Export & Share:**

```
Search: "export"
→ Find export options (PNG, JPG, SVG)

Search: "copy"
→ Quick access to clipboard copy
```

## Visual Indicators

### Category Colors

- 🔵 **Blue**: View Settings (Font Size, Padding, Line Numbers, etc.)
- 🟣 **Purple**: Theme Settings (Language, Color Theme, Background, etc.)
- 🌸 **Pink**: Decorate Settings (Border, Watermark, Label, etc.)
- 🟢 **Green**: General Features (Export, Copy, Import, etc.)

### Result Layout

```
┌─────────────────────────────────────────┐
│  [Icon] Font Size           [VIEW]      │
│         Adjust the size of code text    │
└─────────────────────────────────────────┘
```

## Pro Tips

### 1. Partial Matches Work

You don't need to type full words:

- "grad" finds "Gradient Angle"
- "wrap" finds "Word Wrap"
- "num" finds "Line Numbers"

### 2. Use Alternative Keywords

Multiple keywords are indexed:

- Border: "border", "outline", "frame", "edge"
- Padding: "padding", "spacing", "margin", "gap"
- Export: "export", "download", "save", "png", "jpg"

### 3. Filter by Category

Search by category name:

- "view" → All view settings
- "theme" → All theme settings
- "decorate" → All decoration options
- "general" → All general features

### 4. Keyboard Only Workflow

Never touch your mouse:

1. `Ctrl+K` → Open search
2. Type query → Filter results
3. ↓ → Navigate to result
4. Enter → Jump to setting
5. Adjust setting
6. `Ctrl+K` → Search again

## Troubleshooting

### Search Not Opening?

- Make sure you're on the playground page
- Try clicking the Search button in header
- Check if another modal is open (close it first)

### Results Not Showing?

- Check your spelling
- Try shorter keywords
- Use category names (view, theme, etc.)
- Try alternative terms

### Keyboard Shortcut Not Working?

- Check if input field has focus (click elsewhere first)
- Some browsers may intercept Ctrl+K (use button instead)
- Mac users: Use ⌘K not Ctrl+K

## Accessibility

### Screen Readers

- All buttons have proper ARIA labels
- Search results are announced
- Keyboard focus is clearly indicated

### Keyboard Navigation

- Tab through all interactive elements
- Arrow keys navigate results
- Enter selects
- Esc closes

### Visual Accessibility

- High contrast in both light and dark modes
- Clear focus indicators
- Large touch targets on mobile
- Readable font sizes

## Mobile Usage

### Touch Interactions

- Tap Search button to open
- Tap result to select
- Swipe to scroll results
- Tap outside to close

### Mobile Layout

- Full-screen modal on small screens
- Large tap targets
- Optimized for one-handed use
- Virtual keyboard friendly

## Integration with Settings Panel

The search feature complements the settings panel:

1. **Search** → Find what you need quickly
2. **Jump** → Navigate to that section
3. **Adjust** → Modify the setting
4. **Search Again** → Find next setting

This workflow is faster than manually scrolling through all settings!

## Common Workflows

### Quick Font Change

```
Ctrl+K → "font family" → Enter → Select font
```

### Apply Pattern Background

```
Ctrl+K → "pattern" → Enter → Choose Vercel/Supabase/etc.
```

### Export Image

```
Ctrl+K → "export" → Enter → Select format → Download
```

### Add Watermark

```
Ctrl+K → "watermark" → Enter → Enable → Configure
```

## Performance Notes

- Search is instant (no network requests)
- Results update in real-time as you type
- Optimized for 100+ searchable items
- Smooth animations even on mobile

## Future Features

Coming soon:

- Recent searches history
- Search suggestions as you type
- More searchable items
- Context-aware results
- Keyboard shortcuts in results

---

**Need Help?** Check the main documentation or contact support.
