# Enhanced Search Functionality

## Overview

A powerful search system that helps users quickly find settings and features within the Flashot playground.

## Features

### 🔍 Global Search Modal

- **Instant Search**: Real-time filtering as you type
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Smart Matching**: Searches titles, descriptions, and keywords
- **Visual Categorization**: Color-coded categories (View, Theme, Decorate, General)
- **Quick Access**: Keyboard shortcut (Ctrl+K / ⌘K)

### 📋 Searchable Categories

#### View Settings

- Font Size
- Padding
- Border Radius
- Image Sizing (Width/Height)
- Word Wrap
- Line Numbers
- Window Header
- File Name

#### Theme Settings

- Programming Language
- Font Family
- Color Theme
- Background (Custom/Gradient/Solid)
- Pattern Background (Vercel, Supabase, Tailwind, etc.)
- Gradient Angle

#### Decorate Settings

- Border Customization
- Watermark (Text/Image)
- Label
- Line Highlights

#### General Features

- Export Image (PNG/JPG/SVG)
- Copy to Clipboard
- Import Code (URL/GitHub)
- Keyboard Shortcuts

## Usage

### Opening the Search

1. **Click** the Search button in the header
2. **Keyboard**: Press `Ctrl+K` (Windows/Linux) or `⌘K` (Mac)

### Navigating Results

- **↑↓ Arrow Keys**: Move through results
- **Enter**: Select highlighted item
- **Esc**: Close search modal
- **Type**: Filter results in real-time

### Search Tips

1. **Use Keywords**: Try searching for "font", "color", "border", "export", etc.
2. **Partial Matches**: No need to type full words - "grad" finds "gradient"
3. **Alternative Terms**: Search uses multiple keywords (e.g., "wrap" finds "Word Wrap")
4. **Category Names**: Filter by category like "theme", "view", "decorate"

## Components

### SearchModal.tsx

Main search interface with:

- Fuzzy search algorithm
- Keyboard navigation
- Category filtering
- Result highlighting
- Responsive design

### SearchButton.tsx

Trigger component featuring:

- Visual search icon
- Keyboard shortcut display
- Platform detection (Mac/Windows)
- Global shortcut listener
- Hover effects

## Technical Details

### Performance

- **Memoized Results**: useMemo for efficient filtering
- **Debounced Updates**: Smooth typing experience
- **Virtual Scrolling**: Handles large result sets
- **Lazy Loading**: Components load on demand

### Accessibility

- **ARIA Labels**: Screen reader support
- **Focus Management**: Proper focus trapping
- **Keyboard Only**: Full keyboard navigation
- **High Contrast**: Dark mode support

### Mobile Support

- **Touch Friendly**: Large tap targets
- **Responsive Layout**: Adapts to screen size
- **Virtual Keyboard**: Proper input handling

## Keyboard Shortcuts

| Shortcut        | Action          |
| --------------- | --------------- |
| `Ctrl+K` / `⌘K` | Open search     |
| `↑`             | Previous result |
| `↓`             | Next result     |
| `Enter`         | Select result   |
| `Esc`           | Close search    |

## Customization

### Adding New Search Items

Edit `SearchModal.tsx` and add items to `searchableItems`:

```typescript
{
  id: "new-feature",
  title: "New Feature",
  description: "Description of the feature",
  category: "general", // or "view", "theme", "decorate"
  keywords: ["keyword1", "keyword2", "alternative"],
  icon: <IconComponent className="size-4" />,
}
```

### Styling

All components use Tailwind CSS with:

- Dark mode support (`dark:` prefix)
- Responsive breakpoints (`sm:`, `md:`, `lg:`)
- Custom animations and transitions
- Consistent color scheme

## Future Enhancements

### Planned Features

- [ ] Recent searches history
- [ ] Search suggestions/autocomplete
- [ ] Fuzzy matching improvements
- [ ] Search result ranking
- [ ] Custom search filters
- [ ] Save favorite searches
- [ ] Search analytics

### Potential Integrations

- [ ] Context-aware search (current section)
- [ ] Tutorial integration
- [ ] Documentation links
- [ ] Video tutorials
- [ ] Community examples

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## License

Part of the Flashot project - see main LICENSE file.
