"use client";

import React from "react";
import { Terminal, Github, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  isVisible: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isVisible }) => {
  return (
    <section className="container mx-auto px-6 pt-16 pb-20">
      <div
        className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 mb-8 backdrop-blur-sm">
          ⚡ Blazing-fast image generation
        </div>

        <h1 className="text-6xl md:text-8xl mb-8 tracking-tight font-bold">
          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Flash
          </span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            o
          </span>
          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            t
          </span>
        </h1>

        <p className="text-xl text-white/70 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
          Transform your code snippets into{" "}
          <span className="text-blue-400 font-medium">
            stunning, shareable images
          </span>{" "}
          with elegant design, flawless performance and{" "}
          <span className="text-purple-400 font-medium">
            professional syntax highlighting
          </span>
          .
        </p>

        <div className="mb-16 flex flex-wrap justify-center items-center gap-8 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>800+ downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>MIT Licensed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>TypeScript ready</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <Link
            href="/playground"
            className="group flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Terminal className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Try playground</span>
          </Link>

          <Link
            href="/docs"
            className="group flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Documentation</span>
          </Link>

          <button
            onClick={() =>
              window.open(
                "https://github.com/thuongtruong109/flashot",
                "_blank"
              )
            }
            className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 text-white/90 hover:text-white text-sm font-medium rounded-md backdrop-blur-sm transition-all duration-200"
          >
            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>View on GitHub</span>
            <div className="w-0 group-hover:w-4 transition-all duration-200 overflow-hidden">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
