"use client";

import React from "react";
import Image from "next/image";
import { Github, Heart, Code2, Package, Coffee } from "lucide-react";
import { _VERSION } from "@/shared";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto w-full">
      <div className="w-full px-6 sm:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-1">
                <Image
                  src="/favicon.png"
                  alt="Flashot"
                  width={30}
                  height={30}
                  className="filter brightness-110"
                />
                <h3 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Flashot
                </h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed max-w-md">
                Rapidly snapshot code snippets as images
              </p>
              <div className="mt-4 flex items-center flex-wrap space-x-3">
                <a
                  href="https://github.com/thuongtruong109/flashot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white transition-all duration-200 rounded-md group backdrop-blur-sm"
                >
                  <Github className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">GitHub</span>
                </a>
                <a
                  href="https://www.npmjs.com/package/flashot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 text-red-300 hover:text-red-200 transition-all duration-200 rounded-md group backdrop-blur-sm"
                >
                  <Package className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">NPM</span>
                </a>
                <a
                  href="https://jsr.io/@thuongtruong/flashot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/20 hover:border-yellow-500/30 text-yellow-300 hover:text-yellow-200 transition-all duration-200 rounded-md group backdrop-blur-sm"
                >
                  <Code2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">JSR</span>
                </a>
              </div>
            </div>
            <div className="space-y-4 pt-2 flex flex-col items-start md:items-end">
              <h4 className="font-medium text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                Support the Project
              </h4>
              <p className="text-sm text-white/60 leading-relaxed">
                Love Flashot? Help us keep improving features!
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/sponsors/thuongtruong109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center space-x-1.5 px-2.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition-all duration-200 text-xs font-medium hover:scale-105"
                >
                  <Heart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>Sponsor</span>
                </a>
                <a
                  href="https://buymeacoffee.com/thuongtruong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center space-x-1.5 px-2.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-all duration-200 text-xs font-medium hover:scale-105"
                >
                  <Coffee className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  <span>Buy me a Coffee</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
              <div className="flex items-center space-x-1 text-white/60">
                <span>© {currentYear} Flashot.</span>
                <span>Crafted with</span>
                <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
                <span>by</span>
                <a
                  href="https://github.com/thuongtruong109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Thuong Truong
                </a>
              </div>

              {/* <div className="text-white/50">{_VERSION}</div> */}
              <span className="px-1.5 py-px text-slate-400 rounded-full border border-slate-600">
                {_VERSION}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20px 20px, rgba(59, 130, 246, 0.3) 1px, transparent 0),
              radial-gradient(circle at 80px 80px, rgba(168, 85, 247, 0.2) 1px, transparent 0),
              radial-gradient(circle at 60px 20px, rgba(236, 72, 153, 0.1) 1px, transparent 0)
            `,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
