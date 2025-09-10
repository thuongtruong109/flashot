"use client";

import React from "react";
import { Github, Heart, Code2, Star, Coffee } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white/70 backdrop-blur-xl border-t border-white/20 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white/90 p-2 rounded-xl shadow-lg">
                  <Code2 className="w-6 h-6 text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text" />
                </div>
              </div>
              <h3 className="text-xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Flashot
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Transform your code into stunning, shareable images with beautiful
              themes, multiple export formats, and professional styling.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/thuongtruong109/flashot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">GitHub</span>
              </a>
              <a
                href="https://github.com/thuongtruong109/flashot/stargazers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors group"
              >
                <Star className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Star us</span>
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>25+ Programming Languages</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span>12+ Beautiful Themes</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                <span>Multiple Export Formats</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>Real-time Code Editing</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                <span>Customizable Backgrounds</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                <span>Professional Fonts</span>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900">Support</h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Love Flashot? Consider supporting the project!
              </p>
              <div className="flex flex-col space-y-2">
                <a
                  href="https://github.com/sponsors/thuongtruong109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md group w-fit"
                >
                  <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Sponsor</span>
                </a>
                <a
                  href="https://ko-fi.com/thuongtruong109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md group w-fit"
                >
                  <Coffee className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Buy me a coffee</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>© {currentYear} Flashot.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>by</span>
              <a
                href="https://github.com/thuongtruong109"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Thuong Truong
              </a>
            </div>

            <div className="flex items-center space-x-6 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </span>
              <span>v2.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20px 20px, rgba(59, 130, 246, 0.8) 1px, transparent 0),
              radial-gradient(circle at 80px 80px, rgba(168, 85, 247, 0.6) 1px, transparent 0)
            `,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>
    </footer>
  );
};

export default Footer;
