# Flashot Web - Code to Image Converter

A modern Next.js application that converts code snippets into beautiful, shareable images with syntax highlighting and customizable themes.

## Features

- 🎨 **Multiple Themes**: Dark, Light, Monokai, and GitHub themes
- 🌈 **Syntax Highlighting**: Support for JavaScript, TypeScript, Python, Java, C++, HTML, and CSS
- 🎯 **Customizable**: Adjust font size, padding, border radius, and background colors
- 📱 **Responsive Design**: Works perfectly on all device sizes
- 🚀 **Fast & Modern**: Built with Next.js 14, TypeScript, and Tailwind CSS
- 📸 **High Quality Export**: Generate high-resolution PNG images
- 🎪 **Window Controls**: Optional macOS-style window decorations
- 📋 **Copy to Clipboard**: Easy code sharing functionality

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Image Generation**: html2canvas
- **Font**: Fira Code and Inter

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd flashot/web
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Enter Your Code**: Paste or type your code in the textarea
2. **Select Language**: Choose the programming language for proper syntax highlighting
3. **Customize Appearance**:
   - Select a theme (Dark, Light, Monokai, GitHub)
   - Choose a font family
   - Adjust font size, padding, and border radius
   - Toggle background and window controls
   - Pick a background color or gradient
4. **Preview**: See your code rendered in real-time
5. **Export**: Click the "Export" button to download as PNG
6. **Copy**: Use the "Copy" button to copy code to clipboard

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles with Tailwind
│   ├── layout.tsx      # Root layout with SEO metadata
│   └── page.tsx        # Home page
├── components/         # React components
│   └── CodeToImageConverter.tsx
├── lib/               # Utility libraries
│   └── imageGenerator.ts
├── types/             # TypeScript type definitions
│   └── index.ts
└── utils/             # Utility functions
    └── index.ts
```

## SEO Features

- **Metadata**: Comprehensive meta tags for better search engine visibility
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: Rich snippets support
- **Sitemap**: Auto-generated sitemap
- **Robots.txt**: Search engine crawling instructions

## Performance

- **Static Generation**: Pre-rendered pages for optimal performance
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loading
- **Bundle Analysis**: Built-in bundle analyzer

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with default settings

### Other Platforms

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ by the Flashot Team
