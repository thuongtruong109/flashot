#!/bin/bash

echo "🚀 Setting up Flashot Web - Code to Image Converter"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the web directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🎨 Installing additional image generation dependencies..."
npm install html2canvas @types/html2canvas

echo "🔧 Setting up development environment..."
echo "✅ Dependencies installed successfully!"

echo ""
echo "🎉 Setup complete! You can now run:"
echo "   npm run dev     - Start development server"
echo "   npm run build   - Build for production"
echo "   npm run start   - Start production server"
echo ""
echo "📝 Don't forget to:"
echo "   - Update the metadata in src/app/layout.tsx"
echo "   - Add your domain to metadataBase"
echo "   - Add your actual Google verification code"
echo "   - Create favicon files in public/"
echo ""
