"use client";

import React from "react";
import Image from "next/image";
import { Github, Heart, Code2, Package, Coffee } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/20 mt-auto w-full">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Image
                  src="/favicon.png"
                  alt="Flashot"
                  width={36}
                  height={20}
                />
                <h3 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Flashot
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Transform your code into stunning, shareable images with
                beautiful themes, multiple export formats, and professional
                styling.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <a
                    href="https://github.com/thuongtruong109/flashot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors group"
                  >
                    <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                  <a
                    href="https://www.npmjs.com/package/flashot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors group"
                  >
                    <Package className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Npm</span>
                  </a>
                  <a
                    href="https://jsr.io/@thuongtruong/flashot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-600 hover:text-yellow-600 transition-colors group"
                  >
                    <Code2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Jsr</span>
                  </a>
                </div>

                {/* Product Hunter Badge */}
                <div className="pt-2">
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src="/product-hunt.avif"
                      alt="Flashot - Transform your code into stunning shareable images | Product Hunt"
                      width={250}
                      height={54}
                      className="hover:opacity-80 transition-opacity"
                    />
                  </a>
                </div>
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

            {/* Combined References & Support Section */}
            <div className="space-y-4">
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-900">References</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <a
                    href="https://nextjs.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-1 group"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-blue-500 rounded-full transition-colors"></div>
                    <span>Next.js</span>
                  </a>
                  <a
                    href="https://tailwindcss.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-cyan-600 transition-colors flex items-center space-x-1 group"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-cyan-500 rounded-full transition-colors"></div>
                    <span>Tailwind CSS</span>
                  </a>
                  <a
                    href="https://prismjs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-purple-600 transition-colors flex items-center space-x-1 group"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-purple-500 rounded-full transition-colors"></div>
                    <span>Prism.js</span>
                  </a>
                  <a
                    href="https://react.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-400 transition-colors flex items-center space-x-1 group"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-400 group-hover:bg-blue-400 rounded-full transition-colors"></div>
                    <span>React</span>
                  </a>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200/50">
                <h4 className="text-lg font-bold text-gray-900">Support</h4>
                <p className="text-sm text-gray-600">
                  Love Flashot? Consider supporting the project!
                </p>
                <div className="flex flex-row space-x-3">
                  <a
                    href="https://github.com/sponsors/thuongtruong109"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md group"
                  >
                    <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Sponsor</span>
                  </a>
                  <a
                    href="https://ko-fi.com/thuongtruong109"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md group"
                  >
                    <Coffee className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Buy me a coffee</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-200/50">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <span>© {currentYear} Flashot.</span>
                <span>Maintained with</span>
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

              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
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
